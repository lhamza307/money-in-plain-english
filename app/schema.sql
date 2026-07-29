-- Money in Plain English — v1 data model
-- Phase 0.1 of project-plan.md
-- SQLite dialect. See data-model.md for entity/relationship rationale.

PRAGMA foreign_keys = ON;

-- One row per signed-up person.
CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- A linked bank/card account. A user can have more than one (Phase 1.5).
CREATE TABLE accounts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id      INTEGER NOT NULL REFERENCES users(id),
  nickname     TEXT NOT NULL,                 -- e.g. "Chase Checking"
  account_type TEXT NOT NULL CHECK (account_type IN ('checking', 'credit_card', 'other')),
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Fixed v1 taxonomy (Phase 1.1, see category-taxonomy.md -- brand-guide.md's
-- "no categories to maintain" promise is why this is fixed rather than
-- user-editable). Global, not per-user, since 1.1 didn't decide otherwise.
-- is_spend_category = 0 for Income / Transfers Between Your Accounts --
-- lets any budget/pace-check query exclude non-spend rows by a WHERE
-- clause instead of relying on every future query remembering to skip
-- them by name.
CREATE TABLE categories (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  name               TEXT NOT NULL UNIQUE,
  description        TEXT NOT NULL,
  is_spend_category  INTEGER NOT NULL DEFAULT 1 CHECK (is_spend_category IN (0, 1))
);

-- One row per uploaded CSV file (Phase 1.2/1.3). Exists so every
-- transaction can trace back to the file it came from.
CREATE TABLE import_batches (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id        INTEGER NOT NULL REFERENCES accounts(id),
  original_filename TEXT NOT NULL,
  row_count         INTEGER NOT NULL,
  uploaded_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The core record. dedup_fingerprint is a hash of
-- (account_id, date, amount_cents, raw_merchant) computed from the
-- plaintext values before encryption -- the UNIQUE constraint is what
-- actually enforces Phase 1.6 (no double-counting on overlapping
-- re-imports) at the database level, not just in application code.
--
-- raw_merchant, normalized_merchant, and amount_cents hold AES-256-GCM
-- ciphertext (base64 text), not plaintext (Phase 0.6 -- encryption at
-- rest for financial data). See crypto.js. amount_cents is TEXT rather
-- than INTEGER for this reason: it can no longer be summed or filtered
-- in SQL, only after the application decrypts it. date and category_id
-- stay plaintext on purpose, so date-range/category queries (Phase 3/4)
-- can still run in SQL.
CREATE TABLE transactions (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id            INTEGER NOT NULL REFERENCES accounts(id),
  import_batch_id       INTEGER NOT NULL REFERENCES import_batches(id),
  date                  TEXT NOT NULL,             -- ISO 8601, e.g. 2026-07-14
  raw_merchant          TEXT NOT NULL,              -- encrypted; exactly as the bank exported it
  normalized_merchant   TEXT NOT NULL,               -- encrypted; Phase 2.2 output
  amount_cents          TEXT NOT NULL,               -- encrypted; negative = money out
  category_id           INTEGER REFERENCES categories(id), -- NULL = uncategorized (Phase 1.4 fallback)
  is_manually_corrected INTEGER NOT NULL DEFAULT 0 CHECK (is_manually_corrected IN (0, 1)),
  dedup_fingerprint     TEXT NOT NULL UNIQUE,
  created_at            TEXT NOT NULL DEFAULT (datetime('now'))
);

-- A user's per-category dollar target. New row per change instead of
-- overwriting, so Phase 3.2 (self-calibration) has real history to
-- compare the original guess against, not just the latest number.
CREATE TABLE budgets (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL REFERENCES users(id),
  category_id    INTEGER NOT NULL REFERENCES categories(id),
  amount_cents   INTEGER NOT NULL,
  effective_from TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, category_id, effective_from)
);

-- "Every time" correction rules (Phase 2.3), keyed off the normalized
-- merchant so they survive different raw formatting of the same merchant.
CREATE TABLE correction_rules (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id             INTEGER NOT NULL REFERENCES users(id),
  normalized_merchant TEXT NOT NULL,
  category_id         INTEGER NOT NULL REFERENCES categories(id),
  created_at          TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, normalized_merchant)
);

CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_category ON transactions(category_id);
CREATE INDEX idx_budgets_user_category ON budgets(user_id, category_id);
