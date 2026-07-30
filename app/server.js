// Must load before any other module -- Sentry's auto-instrumentation
// depends on load order (Phase 0.5).
const Sentry = require('./instrument');

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { encryptField, decryptField } = require('./crypto');
const nodeCrypto = require('crypto');
const { parse: parseCsv } = require('csv-parse/sync');

// DB_PATH is overridden in production (Render sets it to the mounted
// persistent disk, e.g. /var/data/dev.sqlite3). Defaults to a local
// file for dev.
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'db', 'dev.sqlite3');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const isFreshDb = !fs.existsSync(DB_PATH);

// Only initialize schema + seed categories on first run. A redeploy
// restarts this process, so wiping the DB unconditionally here would
// destroy production data on every deploy -- exactly what Phase 0.4's
// acceptance test ("data survives a redeploy") checks for.
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
if (isFreshDb) {
  db.exec(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  // Full v1 taxonomy -- see category-taxonomy.md (Phase 1.1) for the
  // reasoning behind this exact list, and why Income/Transfers are
  // marked is_spend_category = 0.
  db.exec(`
    INSERT INTO categories (name, description, is_spend_category) VALUES
      ('Housing & Utilities', 'Rent/mortgage, electric, water, internet, renters/home insurance.', 1),
      ('Debt Payments', 'Student loan and credit card payments, and other loan payments.', 1),
      ('Transportation', 'Gas, car insurance, parking, tolls, rideshare, public transit.', 1),
      ('Groceries', 'Supermarkets and grocery delivery.', 1),
      ('Dining & Delivery', 'Restaurants, coffee shops, food delivery apps.', 1),
      ('Shopping', 'General retail and one-off purchases not covered elsewhere -- clothing, electronics, home goods, cosmetics, entertainment purchases.', 1),
      ('Subscriptions', 'Recurring digital/streaming charges and membership fees.', 1),
      ('Phone', 'Cell phone bill.', 1),
      ('Health & Personal Care', 'Pharmacy, doctor/dentist copays, personal care purchases not already covered under Shopping.', 1),
      ('Fees & Bank Charges', 'Overdraft fees, ATM fees, monthly account service fees.', 1),
      ('Cash & ATM Withdrawals', 'Cash pulled out at an ATM -- counted as spend even though the app can''t know what it was used for.', 1),
      ('Income', 'Paycheck deposits, refunds, and other money in. Excluded from spend budgets and pace-check math.', 0),
      ('Transfers Between Your Accounts', 'Money moved between the user''s own linked accounts -- not real spending. Excluded from spend budgets and pace-check math to avoid double-counting.', 0),
      ('Transfers to/from People', 'Peer-to-peer payments (Zelle, Venmo, Cash App, etc.) sent or received -- money moving between the user and another person, not a merchant. Excluded from spend budgets and pace-check math.', 0);
  `);
} else {
  // Phase 0.6 migration: bring a pre-existing database's transactions
  // table up to the encrypted-at-rest shape (see migrations/0001).
  // Guarded on the table being empty -- see that file for why that's
  // true of every database that exists today, and why this refuses to
  // run at all if it ever isn't.
  const amountCol = db.prepare("PRAGMA table_info(transactions)").all().find(c => c.name === 'amount_cents');
  if (amountCol && amountCol.type === 'INTEGER') {
    const { n } = db.prepare('SELECT COUNT(*) AS n FROM transactions').get();
    if (n > 0) {
      throw new Error('Phase 0.6 migration would drop and recreate transactions, but it already has rows -- refusing to run automatically.');
    }
    db.exec(fs.readFileSync(path.join(__dirname, 'migrations', '0001_encrypt_transactions.sql'), 'utf8'));
  }

  // Phase 1.1 migration: upgrade Phase 0's 3-category placeholder seed
  // to the full taxonomy. Guarded on is_spend_category not already
  // existing so this only ever runs once per database.
  const categoryCols = db.prepare("PRAGMA table_info(categories)").all();
  if (!categoryCols.some(c => c.name === 'is_spend_category')) {
    db.exec(fs.readFileSync(path.join(__dirname, 'migrations', '0002_full_category_taxonomy.sql'), 'utf8'));
  }

  // Phase 1.1 revision: Cash & ATM Withdrawals + Transfers to/from
  // People, added after real-data testing (category-taxonomy.md).
  // Safe to run every startup -- INSERT OR IGNORE is idempotent.
  db.exec(fs.readFileSync(path.join(__dirname, 'migrations', '0003_transfers_and_cash_categories.sql'), 'utf8'));
}

// categories are a fixed v1 taxonomy (Phase 1.1) that never changes at
// runtime, so this is safe to build once at startup instead of querying
// per request.
const categoryIdByName = Object.fromEntries(
  db.prepare('SELECT id, name FROM categories').all().map(c => [c.name, c.id])
);

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-secret-not-for-production';
if (process.env.NODE_ENV === 'production' && SESSION_SECRET === 'dev-only-secret-not-for-production') {
  throw new Error('SESSION_SECRET must be set in production -- refusing to start with the public dev default.');
}

const app = express();
app.use(express.json());
// No index.html exists -- without this, hitting the bare domain root
// (what anyone will type first) hits Express's default 404 instead of
// landing anywhere in the app.
app.get('/', (req, res) => res.redirect('/login.html'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

function requireLogin(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  next();
}

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const hash = await bcrypt.hash(password, 10);
  const result = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash);
  req.session.userId = result.lastInsertRowid;
  res.json({ id: result.lastInsertRowid, email });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

  req.session.userId = user.id;
  res.json({ id: user.id, email: user.email });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/me', requireLogin, (req, res) => {
  const user = db.prepare('SELECT id, email FROM users WHERE id = ?').get(req.session.userId);
  res.json(user);
});

// The actual data-isolation test: only ever returns accounts scoped to
// the logged-in session's user_id -- never all accounts.
app.get('/api/my-accounts', requireLogin, (req, res) => {
  const accounts = db.prepare('SELECT id, nickname, account_type FROM accounts WHERE user_id = ?').all(req.session.userId);
  res.json(accounts);
});

const ACCOUNT_TYPES = ['checking', 'credit_card', 'other'];

app.post('/api/accounts', requireLogin, (req, res) => {
  const { nickname, account_type } = req.body;
  if (!nickname || !nickname.trim()) return res.status(400).json({ error: 'Nickname required' });
  if (!ACCOUNT_TYPES.includes(account_type)) {
    return res.status(400).json({ error: `account_type must be one of: ${ACCOUNT_TYPES.join(', ')}` });
  }
  const result = db.prepare('INSERT INTO accounts (user_id, nickname, account_type) VALUES (?, ?, ?)')
    .run(req.session.userId, nickname.trim(), account_type);
  res.json({ id: result.lastInsertRowid, nickname: nickname.trim(), account_type });
});

// Scoped through accounts.user_id -- a transaction has no user_id of its
// own, so isolation here depends on the join, not a direct column check.
app.get('/api/my-transactions', requireLogin, (req, res) => {
  const rows = db.prepare(`
    SELECT t.id, t.account_id, t.date, t.raw_merchant, t.amount_cents, t.category_id, c.name AS category_name
    FROM transactions t
    JOIN accounts a ON a.id = t.account_id
    LEFT JOIN categories c ON c.id = t.category_id
    WHERE a.user_id = ?
    ORDER BY t.date DESC, t.id DESC
  `).all(req.session.userId);
  // raw_merchant and amount_cents are encrypted at rest (Phase 0.6) --
  // decrypt here, at the boundary, so nothing downstream of this route
  // ever has to think about ciphertext.
  const decrypted = rows.map(r => ({
    ...r,
    raw_merchant: decryptField(r.raw_merchant),
    amount_cents: Number(decryptField(r.amount_cents)),
  }));
  res.json(decrypted);
});

// Chase checking CSV column layout, identified by hand against a real
// export (project-plan.md Phase 1.2). Bank-specific on purpose -- only
// one real guinea pig sample exists so far. Once a second bank's format
// shows up, this needs to become format-aware (e.g. detect columns by
// header) instead of assuming these exact Chase column names.
const CHASE_DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

// Returns null for a row that can't be trusted -- caller counts it as
// malformed and moves on rather than crashing the whole import (Phase
// 1.3's explicit requirement).
function parseChaseRow(record) {
  const dateMatch = CHASE_DATE_RE.exec((record['Posting Date'] || '').trim());
  const amount = parseFloat(record['Amount']);
  const rawMerchant = (record['Description'] || '').trim();
  if (!dateMatch || !Number.isFinite(amount) || !rawMerchant) return null;
  const [, mm, dd, yyyy] = dateMatch;
  return {
    date: `${yyyy}-${mm}-${dd}`,
    raw_merchant: rawMerchant,
    amount_cents: Math.round(amount * 100),
  };
}

// Phase 1.4: rule-based auto-categorization, applied at import time.
// Keyword rules built from a real guinea pig's actual Chase transactions
// (project-plan.md 1.2/1.3) -- not exhaustive for every bank, but real
// signal rather than a guess. Order matters: non-spend keywords (Zelle,
// internal transfers, ATM, card payment) are checked first so they can't
// get mistaken for a merchant purchase; Shopping is last since it's the
// broadest catch-all. If nothing matches, a positive amount falls back
// to Income -- this bank labels deposits/refunds/reversals many
// different ways, and "money came in" is a safe generic signal without
// hardcoding every one.
const CATEGORY_KEYWORD_RULES = [
  [/zelle/i, 'Transfers to/from People'],
  [/online transfer/i, 'Transfers Between Your Accounts'],
  [/atm withdrawal/i, 'Cash & ATM Withdrawals'],
  [/payment to chase card/i, 'Debt Payments'],
  [/dunkin|starbucks|chick-fil-a|chipotle|mcdonald|doordash|panera|taco bell|subway|firehouse subs|m & h food|shiso sushi|downtown hospitality|fixtion|the kitchens/i, 'Dining & Delivery'],
  [/publix|aldi|wm supercenter|trader joe/i, 'Groceries'],
  [/racetrac|e-pass|7-eleven|wawa|tollway|autozone|advance auto|car wash|lyft|uber|city of .*pkg|onstreet|rebel#/i, 'Transportation'],
  [/netflix|peacock|la fitness|planet fitness|apple\.com\/bill|spotify|hulu|anthropic|openai/i, 'Subscriptions'],
  [/vagaro|pharmacy|cvs|dentist/i, 'Health & Personal Care'],
  [/ross stores|shein|amazon|lululemon|academy\.com|best buy|klarna|h&m|american airlines|frontier ai|walmart\.com|socialsnap/i, 'Shopping'],
];

function categorizeTransaction(rawMerchant, amountCents) {
  for (const [pattern, categoryName] of CATEGORY_KEYWORD_RULES) {
    if (pattern.test(rawMerchant)) return categoryIdByName[categoryName] ?? null;
  }
  if (amountCents > 0) return categoryIdByName['Income'] ?? null;
  return null; // uncategorized fallback (Phase 1.4's NULL bucket)
}

app.post('/api/import-csv', requireLogin, (req, res) => {
  const { account_id, filename, csv_text } = req.body;
  if (!account_id || !filename || typeof csv_text !== 'string') {
    return res.status(400).json({ error: 'account_id, filename, and csv_text are required' });
  }

  // Isolation: the account has to belong to this user, or anyone could
  // dump transactions into someone else's account by guessing an id.
  const account = db.prepare('SELECT id FROM accounts WHERE id = ? AND user_id = ?').get(account_id, req.session.userId);
  if (!account) return res.status(404).json({ error: 'Account not found' });

  let records;
  try {
    // Real bank exports (and files that pass through Windows/Mac/Excel)
    // aren't reliably LF-only -- a file with mixed CRLF/LF line endings
    // can make csv-parse silently misparse rows into fewer, broken
    // records instead of erroring, which is worse than a crash (silent
    // data loss). Normalize before parsing so line endings can't affect
    // how many rows come out.
    const normalized = csv_text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    records = parseCsv(normalized, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
    });
  } catch (e) {
    return res.status(400).json({ error: 'Could not parse CSV: ' + e.message });
  }

  const importBatchId = db.prepare(
    'INSERT INTO import_batches (account_id, original_filename, row_count) VALUES (?, ?, ?)'
  ).run(account_id, filename, records.length).lastInsertRowid;

  const insertStmt = db.prepare(`
    INSERT INTO transactions
      (account_id, import_batch_id, date, raw_merchant, normalized_merchant, amount_cents, category_id, dedup_fingerprint)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let imported = 0, malformed = 0, duplicates = 0;

  const importAll = db.transaction((rows) => {
    for (const record of rows) {
      const parsed = parseChaseRow(record);
      if (!parsed) { malformed++; continue; }
      const { date, raw_merchant, amount_cents } = parsed;
      // Placeholder normalization ahead of Phase 2.2's real merchant
      // normalization (which will need to strip reference numbers,
      // recognize the same merchant across formats, etc.).
      const normalized_merchant = raw_merchant.toLowerCase().replace(/\s+/g, ' ');
      const dedup_fingerprint = nodeCrypto
        .createHash('sha256')
        .update(`${account_id}|${date}|${amount_cents}|${raw_merchant}`)
        .digest('hex');
      const category_id = categorizeTransaction(raw_merchant, amount_cents);
      try {
        insertStmt.run(
          account_id, importBatchId, date,
          encryptField(raw_merchant), encryptField(normalized_merchant), encryptField(amount_cents),
          category_id,
          dedup_fingerprint
        );
        imported++;
      } catch (e) {
        // UNIQUE constraint on dedup_fingerprint -- this exact
        // transaction was already imported (Phase 1.6's re-import
        // protection, enforced at the DB level). Not a crash, just
        // don't double-count it.
        if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') duplicates++;
        else throw e;
      }
    }
  });
  importAll(records);

  res.json({ import_batch_id: importBatchId, row_count: records.length, imported, duplicates, malformed });
});

app.get('/api/categories', requireLogin, (req, res) => {
  const rows = db.prepare('SELECT id, name, description, is_spend_category FROM categories ORDER BY id').all();
  res.json(rows);
});

// Phase 3.1: budgets keeps one row per change rather than overwriting
// (data-model.md, for Phase 3.2's future self-calibration history) --
// so "my budgets" means the latest row per category, not every row
// that's ever existed.
app.get('/api/my-budgets', requireLogin, (req, res) => {
  const rows = db.prepare(`
    SELECT b.id, b.category_id, b.amount_cents, b.effective_from
    FROM budgets b
    WHERE b.user_id = ?
      AND b.effective_from = (
        SELECT MAX(b2.effective_from) FROM budgets b2
        WHERE b2.user_id = b.user_id AND b2.category_id = b.category_id
      )
  `).all(req.session.userId);
  res.json(rows);
});

app.post('/api/budgets', requireLogin, (req, res) => {
  const { budgets } = req.body;
  if (!Array.isArray(budgets) || budgets.length === 0) {
    return res.status(400).json({ error: 'budgets must be a non-empty array of { category_id, amount_cents }' });
  }
  const insertStmt = db.prepare('INSERT INTO budgets (user_id, category_id, amount_cents) VALUES (?, ?, ?)');
  const insertAll = db.transaction((rows) => {
    for (const b of rows) insertStmt.run(req.session.userId, b.category_id, Math.round(b.amount_cents));
  });
  insertAll(budgets);
  res.json({ ok: true });
});

// Phase 4.1-4.4: the core weekly loop. Computes pace-check per category,
// finds the single highest-impact pattern (a payday spending spike --
// the same story validated in spending-ab-test.html and confirmed
// against real data in category-taxonomy.md), picks a tone, and writes
// the message from a template rather than a live model call -- for a
// live demo, a deterministic template beats an API call that could
// hang or phrase something oddly on stage. Skips Phase 4.5's
// multi-account merge (single account for now).
app.get('/api/sunday-summary', requireLogin, (req, res) => {
  const userId = req.session.userId;

  const rows = db.prepare(`
    SELECT t.date, t.amount_cents, t.category_id, c.name AS category_name, c.is_spend_category
    FROM transactions t
    JOIN accounts a ON a.id = t.account_id
    JOIN categories c ON c.id = t.category_id
    WHERE a.user_id = ?
  `).all(userId);
  const txns = rows.map(r => ({ ...r, amount_cents: Number(decryptField(r.amount_cents)) }));

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dayOfMonth = today.getDate();
  const daysInMonth = new Date(year, month, 0).getDate();
  const pctElapsed = dayOfMonth / daysInMonth;
  const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;

  const thisMonth = txns.filter(t => t.date.startsWith(monthPrefix));
  const spendTxns = thisMonth.filter(t => t.is_spend_category === 1);

  const budgetRows = db.prepare(`
    SELECT b.category_id, b.amount_cents FROM budgets b
    WHERE b.user_id = ? AND b.effective_from = (
      SELECT MAX(b2.effective_from) FROM budgets b2 WHERE b2.user_id = b.user_id AND b2.category_id = b.category_id
    )
  `).all(userId);
  const budgetByCategory = Object.fromEntries(budgetRows.map(b => [b.category_id, b.amount_cents]));

  // Pace-check (4.1): status per category, only meaningful where a
  // budget has been set.
  const byCategory = {};
  for (const t of spendTxns) {
    byCategory[t.category_id] ??= { category_id: t.category_id, category_name: t.category_name, spent_cents: 0 };
    byCategory[t.category_id].spent_cents += t.amount_cents; // negative = spend
  }
  const PACE_MARGIN = 0.10; // 10 percentage points either side of "on pace"
  const categoryBreakdown = Object.values(byCategory).map(c => {
    const spent = -c.spent_cents;
    const budget = budgetByCategory[c.category_id] ?? null;
    const pctSpent = budget ? spent / budget : null;
    let status = null;
    if (budget) {
      const diff = pctSpent - pctElapsed;
      status = diff > PACE_MARGIN ? 'behind_pace' : diff < -PACE_MARGIN ? 'ahead_of_pace' : 'on_pace';
    }
    return { category_id: c.category_id, category_name: c.category_name, spent_cents: spent, budget_cents: budget, pct_spent: pctSpent, status };
  }).sort((a, b) => b.spent_cents - a.spent_cents);

  // Suggestion-selection (4.2): a "payday" is any Income transaction
  // large enough to be a real paycheck, not a small refund. For each
  // spend category, find what share of its spend fell within 3 days
  // after a payday -- the category with the highest concentration
  // (among categories with non-trivial spend) is the standout pattern.
  const PAYDAY_MIN_CENTS = 30000;
  const paydayDates = thisMonth.filter(t => t.category_name === 'Income' && t.amount_cents >= PAYDAY_MIN_CENTS).map(t => t.date);
  const isWithinPaydayWindow = (date) =>
    paydayDates.some(p => { const d = Math.round((new Date(date) - new Date(p)) / 86400000); return d >= 0 && d <= 3; });

  let topPattern = null;
  if (paydayDates.length > 0) {
    for (const c of categoryBreakdown) {
      if (c.spent_cents < 2000) continue; // ignore trivial categories (<$20)
      const catTxns = spendTxns.filter(t => t.category_id === c.category_id);
      // Require repeated transactions, not just dollars -- a single
      // bill payment that happens to land near a payday would otherwise
      // trivially score 100% "concentration" and crowd out a real,
      // repeated pattern like a dining spike.
      if (catTxns.length < 3) continue;
      const windowCents = -catTxns.filter(t => isWithinPaydayWindow(t.date)).reduce((s, t) => s + t.amount_cents, 0);
      const share = windowCents / c.spent_cents;
      if (!topPattern || share > topPattern.share) {
        topPattern = { category_id: c.category_id, category_name: c.category_name, window_cents: windowCents, quiet_cents: c.spent_cents - windowCents, share };
      }
    }
  }

  // Tone (4.3) + message (4.4). Priority: the payday-spike pattern from
  // 4.2 if its category also has a budget and is behind pace (the
  // flagship story); otherwise whichever budgeted category is furthest
  // behind pace; otherwise the one furthest ahead (praise); otherwise
  // any on-pace budgeted category; otherwise no budgets exist at all.
  const budgeted = categoryBreakdown.filter(c => c.budget_cents != null);
  const topStatus = topPattern ? categoryBreakdown.find(c => c.category_id === topPattern.category_id) : null;
  const worstBehind = budgeted.filter(c => c.status === 'behind_pace').sort((a, b) => b.pct_spent - a.pct_spent)[0];
  const bestAhead = budgeted.filter(c => c.status === 'ahead_of_pace').sort((a, b) => a.pct_spent - b.pct_spent)[0];
  const anyOnPace = budgeted.find(c => c.status === 'on_pace');

  let tone, message;
  if (topPattern && topStatus?.budget_cents != null && topStatus.status === 'behind_pace') {
    tone = 'suggestion';
    message = `Your ${topPattern.category_name} spending picked up right after payday. In the 3 days after each paycheck hit this month, you spent $${(topPattern.window_cents / 100).toFixed(2)} there — compared to $${(topPattern.quiet_cents / 100).toFixed(2)} the rest of the month. Worth keeping an eye on next time a check comes in.`;
  } else if (worstBehind) {
    tone = 'suggestion';
    message = `You've spent $${(worstBehind.spent_cents / 100).toFixed(2)} of your $${(worstBehind.budget_cents / 100).toFixed(2)} ${worstBehind.category_name} budget with ${Math.round(pctElapsed * 100)}% of the month gone — running ahead of pace there. Worth a look before the month closes out.`;
  } else if (bestAhead) {
    tone = 'praise';
    message = `You're at $${(bestAhead.spent_cents / 100).toFixed(2)} of your $${(bestAhead.budget_cents / 100).toFixed(2)} ${bestAhead.category_name} budget with ${Math.round(pctElapsed * 100)}% of the month behind you. Nice pace — keep it up.`;
  } else if (anyOnPace) {
    tone = 'pace-check';
    message = `You've spent ${Math.round(anyOnPace.pct_spent * 100)}% of your ${anyOnPace.category_name} budget with ${Math.round(pctElapsed * 100)}% of the month gone — right about where you'd expect to be.`;
  } else {
    tone = 'pace-check';
    message = `Not enough budget data yet to generate a full summary — set a few category budgets to get your first Sunday Summary.`;
  }

  res.json({
    period: { month: monthPrefix, day_of_month: dayOfMonth, days_in_month: daysInMonth, pct_elapsed: pctElapsed },
    tone,
    message,
    top_pattern: topPattern,
    categories: categoryBreakdown,
  });
});

// Deliberately throws, for Phase 0.5's acceptance test: confirm a
// real crash shows up in the monitoring dashboard with a stack trace.
// Login-gated so it's not a public denial-of-service knob.
app.get('/api/debug-crash', requireLogin, (req, res) => {
  throw new Error('Phase 0.5 test crash -- deliberately triggered, expected to appear in Sentry.');
});

// Must be registered after all routes, before any other error
// handler, per Sentry's current Express integration. This only
// reports to Sentry -- it doesn't shape the client response.
Sentry.setupExpressErrorHandler(app);

// Final handler: Express's own default error page leaks the full
// server file path and stack trace straight to the client, which is
// a real information-disclosure problem for anything public. Sentry
// already has the full detail from the handler above; the client
// only ever gets a generic message.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
