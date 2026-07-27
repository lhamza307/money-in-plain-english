// Trivial change to trigger a real Render redeploy for Phase 0.4's
// acceptance test (data survives a redeploy).
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

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
  db.exec(`
    INSERT INTO categories (name, description) VALUES
      ('dining', 'Restaurants, delivery, coffee shops'),
      ('groceries', 'Supermarkets, grocery delivery'),
      ('subscriptions', 'Recurring digital/streaming charges');
  `);
}

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-secret-not-for-production';
if (process.env.NODE_ENV === 'production' && SESSION_SECRET === 'dev-only-secret-not-for-production') {
  throw new Error('SESSION_SECRET must be set in production -- refusing to start with the public dev default.');
}

const app = express();
app.use(express.json());
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

// Dev-only helper so the browser test can give each test account a
// visibly different account nickname without building the full CSV
// upload flow (that's Phase 1).
app.post('/api/seed-account', requireLogin, (req, res) => {
  const { nickname } = req.body;
  const result = db.prepare('INSERT INTO accounts (user_id, nickname, account_type) VALUES (?, ?, ?)')
    .run(req.session.userId, nickname, 'checking');
  res.json({ id: result.lastInsertRowid, nickname });
});

// Scoped through accounts.user_id -- a transaction has no user_id of its
// own, so isolation here depends on the join, not a direct column check.
app.get('/api/my-transactions', requireLogin, (req, res) => {
  const rows = db.prepare(`
    SELECT t.id, t.date, t.raw_merchant, t.amount_cents
    FROM transactions t
    JOIN accounts a ON a.id = t.account_id
    WHERE a.user_id = ?
  `).all(req.session.userId);
  res.json(rows);
});

app.get('/api/my-budgets', requireLogin, (req, res) => {
  const rows = db.prepare('SELECT id, category_id, amount_cents, effective_from FROM budgets WHERE user_id = ?')
    .all(req.session.userId);
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
