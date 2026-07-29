-- Phase 1.1: replaces Phase 0's 3-category placeholder seed
-- (dining/groceries/subscriptions) with the full v1 taxonomy from
-- category-taxonomy.md, and adds is_spend_category so Income/Transfers
-- can be structurally excluded from budget and pace-check math.
--
-- server.js only runs this once, guarded on is_spend_category not
-- already existing -- see the check next to where this is loaded.
ALTER TABLE categories ADD COLUMN is_spend_category INTEGER NOT NULL DEFAULT 1 CHECK (is_spend_category IN (0, 1));

-- Rename the 3 categories that already existed under Phase 0's
-- placeholder names/descriptions.
UPDATE categories SET name = 'Groceries', description = 'Supermarkets and grocery delivery.' WHERE name = 'groceries';
UPDATE categories SET name = 'Dining & Delivery', description = 'Restaurants, coffee shops, food delivery apps.' WHERE name = 'dining';
UPDATE categories SET name = 'Subscriptions', description = 'Recurring digital/streaming charges and membership fees.' WHERE name = 'subscriptions';

-- The rest of the taxonomy, which never existed before this migration.
INSERT OR IGNORE INTO categories (name, description, is_spend_category) VALUES
  ('Housing & Utilities', 'Rent/mortgage, electric, water, internet, renters/home insurance.', 1),
  ('Debt Payments', 'Student loan and credit card payments, and other loan payments.', 1),
  ('Transportation', 'Gas, car insurance, parking, rideshare, public transit.', 1),
  ('Shopping', 'General retail and one-off purchases not covered elsewhere -- clothing, electronics, home goods, cosmetics, entertainment purchases.', 1),
  ('Phone', 'Cell phone bill.', 1),
  ('Health & Personal Care', 'Pharmacy, doctor/dentist copays, personal care purchases not already covered under Shopping.', 1),
  ('Fees & Bank Charges', 'Overdraft fees, ATM fees, monthly account service fees.', 1),
  ('Income', 'Paycheck deposits, refunds, and other money in. Excluded from spend budgets and pace-check math.', 0),
  ('Transfers Between Your Accounts', 'Money moved between the user''s own linked accounts -- not real spending. Excluded from spend budgets and pace-check math to avoid double-counting.', 0);
