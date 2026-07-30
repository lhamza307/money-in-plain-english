-- Phase 3.1 UI tweak: budget form now shows each category's description
-- as an inline "what counts here" hint. Transportation's description
-- was missing two common examples (car note, maintenance) that came up
-- when that hint text was requested -- add them. Safe to run every
-- startup, same idempotent UPDATE pattern as 0003.
UPDATE categories
SET description = 'Gas, car insurance, parking, tolls, car note, maintenance, rideshare, public transit.'
WHERE name = 'Transportation';
