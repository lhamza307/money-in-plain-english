-- Phase 1.1 revision: two categories added after testing the taxonomy
-- against a real Chase checking CSV export turned up gaps -- see
-- category-taxonomy.md's "Test result" section. 16 of 105 real
-- transactions were Zelle P2P payments (no home in the original
-- taxonomy) and 1 was an ATM cash withdrawal (also no home).
--
-- Idempotent via INSERT OR IGNORE (categories.name is UNIQUE) --
-- server.js runs this unconditionally on every non-fresh-DB startup,
-- unlike 0001/0002 which needed a one-time-only guard because they
-- also included ALTER TABLE / rename statements.
INSERT OR IGNORE INTO categories (name, description, is_spend_category) VALUES
  ('Cash & ATM Withdrawals', 'Cash pulled out at an ATM -- counted as spend even though the app can''t know what it was used for.', 1),
  ('Transfers to/from People', 'Peer-to-peer payments (Zelle, Venmo, Cash App, etc.) sent or received -- money moving between the user and another person, not a merchant. Excluded from spend budgets and pace-check math.', 0);

-- Also fold the "tolls" clarification into Transportation's description
-- for any database that already ran migration 0002 with the old wording.
UPDATE categories SET description = 'Gas, car insurance, parking, tolls, rideshare, public transit.' WHERE name = 'Transportation';
