# Category Taxonomy — Money in Plain English (App)

Phase 1.1 of `project-plan.md`. See `schema.sql` for the runnable `categories` table this defines, and `data-model.md` for the broader schema this sits inside.

## Fixed vs. user-editable — decision

**Fixed in v1. Not user-editable.**

`brand-guide.md`'s own company description promises "no categories to maintain" as a core part of the product's pitch — the whole premise is that the user doesn't have to do the setup work a typical budgeting app demands. Letting users create/rename/merge categories in v1 would directly contradict that promise, add real UI surface area nothing in the plan currently accounts for, and complicate every category-dependent feature downstream (correction rules, budget history, pace-check). If a real guinea pig's spending genuinely doesn't fit the fixed set, that's a signal to revise the taxonomy itself (this file), not to hand editing power to the user.

## Where this list came from

Not invented from scratch. `spending-ab-test.html` already contains a category breakdown (Housing & Utilities, Debt Payments, Transportation, Groceries, Dining & Delivery, Shopping, Subscriptions, Phone) built around a real guinea pig's real spending pattern and feedback ("this happens after I get paid..." — Noor's quote, referenced again in Phase 4.2 of the plan). Those 8 are carried over here unchanged, since they're the closest thing this project already has to a validated taxonomy. The remaining 6 below are new additions made for reasons explained under each one — 4 added speculatively up front, 2 more added after the real-data test below turned up gaps the first draft missed.

## Test result (run for real)

Run against a real, recent Chase checking CSV export (`Chase0761_Activity_20260728.csv`) — not the founder's own account being used as guinea pig #1, since no pilot guinea pig had been recruited yet at the time this was run. All 105 real transaction rows in the file were categorized by hand (not just the 20 the plan's test technically requires), against the taxonomy as it stood before this test.

**Result: failed the first pass.** 17 of 105 transactions (16%) didn't fit cleanly:
- **16 were Zelle payments** (both sent and received — to/from named individuals, not merchants). Not spend at a merchant, not a same-user internal transfer, not paycheck income. At 15% of all transactions, this wasn't a one-off edge case — for a target user who's newly financially independent and likely splitting rent/bills or getting family support, P2P payments are a routine, recurring transaction type.
- **1 was an ATM cash withdrawal.** Real money out, but not a fee and not spend at an identifiable merchant.

**Fixed by adding two categories** (below). Re-categorizing all 105 rows against the revised taxonomy: 0 transactions failed to fit. Passes the plan's bar.

**What this test hasn't covered yet:** only one bank (Chase), one account. `Pre-Pilot Checklist` already flags the equivalent gap for merchant normalization ("tested across every guinea pig's actual bank format, not just one") — the same caveat applies here. Worth a quick re-check once real guinea pigs with other banks are recruited (Phase 1.2), but not blocking Phase 1.3 from starting against this real, known format.

## The categories

### Spend categories (count toward budgets and pace-check)

| Category | Definition | Example merchants |
|---|---|---|
| **Housing & Utilities** | Rent/mortgage, electric, water, internet, renters/home insurance. | Rent, Duke Energy, Spectrum, renters insurance |
| **Debt Payments** | Student loan and credit card payments, and other loan payments. | MOHELA, Chase credit card (min. payment) |
| **Transportation** | Gas, car insurance, parking, tolls, rideshare, public transit. | BP, Shell, Sunoco, car insurance, Uber/Lyft, toll authority (e.g. Chase CSV's "CFX - E-PASS") |
| **Groceries** | Supermarkets and grocery delivery. | Publix, Trader Joe's, Instacart |
| **Dining & Delivery** | Restaurants, coffee shops, food delivery apps. | DoorDash, Starbucks, Chipotle, Chick-fil-A |
| **Shopping** | General retail and one-off purchases not covered elsewhere — clothing, electronics, home goods, cosmetics, entertainment purchases. | Amazon (non-Prime purchases), Ulta, H&M, movie tickets |
| **Subscriptions** | Recurring digital/streaming charges and membership fees. | Netflix, Spotify, Hulu, Planet Fitness, Amazon Prime, Apple.com/Bill (iCloud/App Store) |
| **Phone** | Cell phone bill. | T-Mobile, Verizon, AT&T |
| **Health & Personal Care** *(new)* | Pharmacy, doctor/dentist copays, personal care purchases not already covered under Shopping. | CVS pharmacy, doctor copay, dentist |
| **Fees & Bank Charges** *(new)* | Overdraft fees, ATM fees, monthly account service fees. | Overdraft fee, out-of-network ATM fee |
| **Cash & ATM Withdrawals** *(new — found via real-data test below)* | Cash pulled out at an ATM. Counted as spend even though the app can't know what the cash was actually used for — the money did leave the account. | "ATM WITHDRAWAL" |

**Why Health & Personal Care and Fees & Bank Charges:** neither appears in the validated mock data, but both are close to universal on a real checking/credit card statement (a bank fee or a pharmacy run shows up on almost anyone's account sooner or later) — added speculatively before the real-data test below, on that reasoning. Cash & ATM Withdrawals wasn't anticipated the same way; it only got added because the real test actually turned one up.

### Non-spend categories (excluded from budgets and pace-check math)

| Category | Definition | Example merchants |
|---|---|---|
| **Income** *(new)* | Paycheck deposits, refunds, and other money in. | Payroll deposit, tax refund |
| **Transfers Between Your Accounts** *(new)* | Money moved between the user's own linked accounts. | Checking → savings transfer |
| **Transfers to/from People** *(new — found via real-data test below)* | Peer-to-peer payments sent or received via Zelle/Venmo/Cash App/etc. — money moving between the user and another person, not a merchant. | "Zelle payment to Amir", "Zelle payment from Lina Hamza" |

**Why these exist and are marked non-spend, not just omitted:** a real checking account CSV always contains deposits and often contains internal transfers. Without a home for them, they'd fall into "uncategorized" by default, which would drag down Phase 1.4's 80%-correct acceptance bar for no good reason (an incoming paycheck is trivially categorizable — it's not an auto-categorization failure). More importantly, once Phase 4.5 (multi-account merge) exists, an inter-account transfer that got miscategorized as spending would inflate a category's total every time money moves from checking to savings — a real double-counting bug, not a cosmetic one, in the same family as the double-counting problem Phase 1.6 already exists to prevent for re-imported CSVs. `schema.sql`'s new `categories.is_spend_category` flag makes this exclusion structural (any pace-check/budget query can filter on it) rather than a convention every future query has to remember by hand — worth being strict about, since `data-model.md` already calls out that the pace-check math being exactly right is the product's core credibility.

**Why Transfers to/from People is separate from both Income and Transfers Between Your Accounts, not folded into either:** it would be tempting to file an incoming Zelle payment under "Income" (the definition's "other money in" technically covers it) — but doing that would blend a friend paying back their share of a dinner bill into the same bucket as an actual paycheck, corrupting the one number ("how much did I actually earn") the category exists to answer. Same logic on the spend side: an outgoing Zelle payment isn't a same-user account transfer, so it doesn't belong there either. This showed up in the real test data at real volume (16 of 105 transactions, 15%) — a young professional splitting rent/bills or getting family support over Zelle is a routine pattern for this exact user, not an edge case.

### Uncategorized (not a real row)

Per `schema.sql`, `transactions.category_id` is nullable — `NULL` is the fallback bucket for anything that doesn't match a category rule (Phase 1.4). Not listed as a taxonomy entry here because it isn't one; it's the "we don't know yet" state, not a category a transaction is deliberately filed under.

## Test (per the plan's acceptance criteria for 1.1)

Run for real — see the "Test result" section above. All 105 transactions in a real Chase checking CSV export categorize cleanly against the current (post-revision) taxonomy. Worth re-running once a second real guinea pig with a different bank is recruited, to check the taxonomy holds beyond one bank's transaction-description conventions.
