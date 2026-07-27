# Data Model — Money in Plain English (App)

Phase 0.1 of `project-plan.md`. Defines the schema every later phase builds on. See `schema.sql` for the runnable version.

## Storage decision

**SQLite for v1.** No real hosting/database instance exists yet (that's Phase 0.4), and the near-term target is a handful of trusted guinea pigs (Phase 8), not a general public launch. SQLite is a real SQL engine with zero setup cost, which matches the plan's own "prove it cheaply before investing" approach (CSV import before Plaid, a mocked paywall before real Stripe integration per the audit). Migrating to Postgres when Phase 0.4 sets up real hosting is a small, well-understood step later — this isn't a decision that locks anything in.

## Entities

**users** — one row per signed-up person. Login/auth (Phase 0.2) attaches here.

**accounts** — a linked bank/card account, belongs to one user. A user can have more than one (Phase 1.5), which is what makes the Phase 4.5 multi-account merge possible.

**categories** — the fixed v1 taxonomy (food, groceries, transportation, etc.). Kept global rather than per-user for now — Phase 1.1 explicitly hasn't decided "fixed vs. user-editable" yet, so this schema doesn't pre-decide it either. If 1.1 lands on user-editable, this table gains a nullable `user_id` column; nothing else changes.

**import_batches** — one row per uploaded CSV (Phase 1.2/1.3). Every transaction traces back to the exact file it came from, which is what makes debugging a "why does this total look wrong" complaint possible.

**transactions** — the core record. Notes on non-obvious columns:
- `amount_cents` (integer, not a float) — avoids floating-point rounding errors accumulating across a month of category totals. This matters more here than in a typical app because the whole product's credibility rests on the pace-check math being exactly right.
- `normalized_merchant` — separate from `raw_merchant`, built for Phase 2.2 (recognizing "AMAZON.COM*RT4X2" and "AMZN Mktp US" as the same merchant).
- `dedup_fingerprint` with a `UNIQUE` constraint — this is Phase 1.6 (no double-counting on overlapping CSV re-imports) enforced at the database level, not left as an application-logic promise that can be forgotten later.
- `category_id` is nullable — NULL is the "uncategorized" fallback bucket from Phase 1.4.

**budgets** — a user's dollar target per category. Inserts a new row per change (`effective_from`) instead of overwriting the old value, so Phase 3.2's self-calibration has an actual history to compare the original guess against — "we moved you from $400 to $580" requires knowing what the $400 was and when it was set.

**correction_rules** — the "every time" standing rules from Phase 2.3, keyed on the normalized merchant so a rule survives the same merchant showing up formatted differently later (Phase 2.2 dependency, called out explicitly in the audit).

## Relationships

```
users 1──* accounts 1──* import_batches 1──* transactions *──1 categories
users 1──* budgets *──1 categories
users 1──* correction_rules *──1 categories
```

- A user has many accounts.
- An account has many import batches (one per CSV upload).
- An import batch has many transactions (the rows from that file).
- A transaction belongs to exactly one category, or none (uncategorized).
- A user has many budgets, one active row per category at any given time (older rows kept for history).
- A user has many correction rules, one per normalized merchant they've corrected with "every time."

## Test (per the plan's acceptance criteria for 0.1)

The plan's own test for this task: *"Walk the planned CSV import flow through the schema on paper. Confirm every field Phase 1 will need (date, merchant, amount, category, account ID, source file) has a home before writing any import code."*

| Phase 1 need | Column |
|---|---|
| date | `transactions.date` |
| merchant | `transactions.raw_merchant` / `normalized_merchant` |
| amount | `transactions.amount_cents` |
| category | `transactions.category_id` |
| account ID | `transactions.account_id` |
| source file | `transactions.import_batch_id` → `import_batches.original_filename` |

Run for real (not just on paper) in `schema.sql` — see the session log for the actual `sqlite3` walkthrough with sample data.
