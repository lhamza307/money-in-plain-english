-- Phase 0.6: transactions.amount_cents changed from INTEGER to TEXT to
-- hold an AES-256-GCM ciphertext instead of a plaintext integer (see
-- ../crypto.js). raw_merchant/normalized_merchant were already TEXT and
-- keep their column type, but now hold ciphertext too.
--
-- Only applied against a pre-existing (non-fresh) database whose
-- transactions table still has the old INTEGER column -- a brand-new
-- database gets the current shape straight from schema.sql and never
-- needs this. server.js checks the table is empty before running this;
-- Phase 1 (CSV import) is the first thing that ever writes a row here,
-- and it hasn't been built yet, so on every database that exists today
-- this is a schema fix, not a real data migration.
DROP TABLE transactions;

CREATE TABLE transactions (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id            INTEGER NOT NULL REFERENCES accounts(id),
  import_batch_id       INTEGER NOT NULL REFERENCES import_batches(id),
  date                  TEXT NOT NULL,
  raw_merchant          TEXT NOT NULL,
  normalized_merchant   TEXT NOT NULL,
  amount_cents          TEXT NOT NULL,
  category_id           INTEGER REFERENCES categories(id),
  is_manually_corrected INTEGER NOT NULL DEFAULT 0 CHECK (is_manually_corrected IN (0, 1)),
  dedup_fingerprint     TEXT NOT NULL UNIQUE,
  created_at            TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_category ON transactions(category_id);
