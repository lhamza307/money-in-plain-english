# Project Plan — Money in Plain English (App)

Built from the product-scoping conversation defining the v1 build. See `VENTURE.md`, `unit-economics.md`, and `financial-model.xlsx` for the business context this plan sits inside. Revised after a senior-engineer audit — see notes inline where something was added because the audit caught a real gap.

## Project Goal

Build a bank-connected app that turns a person's spending into a weekly plain-language "Sunday Summary" with a specific suggestion, and validate — with a small trusted pilot — that it changes behavior and converts free-trial users into $7.99/month subscribers.

---

## Phase 0 — Technical Foundations

*Added after audit: the original plan started at "import a CSV" as if an app already existed to import CSVs into. It didn't. Nothing below this point works without this phase.*

- [ ] **0.1 Design the data model**
  - [ ] Define entities: User, Account, Transaction, Category, Budget, Correction Rule
  - [ ] Define relationships between them
  - [ ] Decide on storage (SQL vs. NoSQL, etc.)
  - **Dependencies:** None — first task in the project.
  - **Acceptance criteria:** A written schema exists covering users, linked accounts, transactions, categories, budgets, and correction rules, with relationships defined.
  - **Test:** Walk the planned CSV import flow through the schema on paper. Confirm every field Phase 1 will need (date, merchant, amount, category, account ID, source file) has a home before writing any import code.

- [ ] **0.2 Build user accounts & authentication**
  - [ ] Sign-up / login flow
  - [ ] Session handling
  - [ ] Per-user data isolation
  - **Dependencies:** 0.1 (schema must define a User entity).
  - **Acceptance criteria:** Two distinct test accounts can be created, log in independently, and each only ever sees their own data.
  - **Test:** Create two test accounts, upload different data under each, and confirm neither account can see the other's transactions or budgets.

- [ ] **0.3 Build the app shell**
  - [ ] Base navigation shell (Inbox / Summaries / Chatbot tabs as routable, even if empty)
  - [ ] Placeholder screens
  - **Dependencies:** 0.2 (needs a logged-in user to land somewhere).
  - **Acceptance criteria:** A logged-in test user can navigate between all planned tabs without the app crashing or losing session state.
  - **Test:** Log in as a test user, tap through every planned tab, and confirm each loads (even empty) and the session survives navigation.

- [ ] **0.4 Set up hosting & backend infrastructure**
  - [ ] Hosting provider
  - [ ] Database instance
  - [ ] Basic deploy pipeline
  - **Dependencies:** 0.1.
  - **Acceptance criteria:** The app (even empty) is deployed somewhere reachable, and data written to the database survives a redeploy.
  - **Test:** Deploy a trivial change, confirm it goes live, and confirm test data entered before the deploy is still there after.

- [ ] **0.5 Set up error monitoring, crash reporting, and logging**
  - [ ] Wire in a monitoring tool
  - **Dependencies:** 0.3, 0.4.
  - **Acceptance criteria:** A deliberately-triggered test error shows up in the monitoring tool with a usable stack trace.
  - **Test:** Force a test crash in a test build and confirm it appears in the monitoring dashboard within a few minutes. **Do not start Phase 8 (guinea pig pilot) until this passes** — a 4-week trial with no visibility into what breaks is a wasted trial.

- [ ] **0.6 Set up secure storage practices for financial data**
  - [ ] Encryption at rest for transaction data
  - [ ] Confirm no plaintext financial data ends up in logs
  - **Dependencies:** 0.1, 0.4.
  - **Acceptance criteria:** Transaction data in the database is encrypted at rest, and a log review confirms no raw account numbers or full transaction details appear in plaintext anywhere.
  - **Test:** Import a test CSV, then search the application logs for that transaction's exact dollar amounts or merchant names. They should not appear.

---

## Phase 1 — CSV Import & Categorization (data foundation)

The simplest thing that could work: get real transaction data into the app without waiting on a Plaid integration.

- [ ] **1.1 Define the category taxonomy**
  - [ ] List starter categories (food/dining, groceries, transportation, housing, subscriptions, shopping, debt payments, etc.)
  - [ ] Decide whether categories are fixed or user-editable in v1
  - **Dependencies:** Phase 0 complete.
  - **Acceptance criteria:** A written, finite list of categories exists and every category has a clear definition of what belongs in it.
  - **Test:** Take 20 real transaction lines from a guinea pig's actual bank export and manually assign each one to a category by hand. If more than 1–2 transactions don't fit cleanly anywhere, the taxonomy is incomplete — revise before moving on.

- [ ] **1.2 Collect real sample exports from each guinea pig's actual bank**
  - [ ] Get at least one recent CSV export from every guinea pig before writing any parsing code
  - **Dependencies:** None additional — can run in parallel with 1.1.
  - **Acceptance criteria:** A real, recent CSV sample exists for every guinea pig's bank/card.
  - **Test:** Open each sample file and confirm you can identify its column layout, date format, and merchant-name convention by hand before Phase 1.3 begins. Writing a parser before this step is backwards.

- [ ] **1.3 Build CSV upload**
  - [ ] Upload UI (pick a file, confirm it loaded)
  - [ ] Parse the actual formats collected in 1.2
  - [ ] Handle malformed rows without crashing the whole import
  - **Dependencies:** 1.1, 1.2.
  - **Acceptance criteria:** A real CSV exported from a guinea pig's bank or credit card portal uploads successfully and every transaction row appears in the app with the correct date, merchant, and amount.
  - **Test:** Upload a real CSV from each guinea pig's actual bank. Manually total the dollar amount in the raw CSV and compare it to the total the app shows. They must match exactly.

- [ ] **1.4 Auto-categorize imported transactions**
  - [ ] Rule-based or keyword-matching categorization (merchant name → category)
  - [ ] Fallback "uncategorized" bucket for anything that doesn't match
  - **Dependencies:** 1.1, 1.3.
  - **Acceptance criteria:** At least 80% of a real guinea pig's imported transactions land in a correct category without manual correction.
  - **Test:** Import one guinea pig's real CSV, manually review every transaction's assigned category, and count how many are wrong. If the error rate is above ~20%, categorization logic isn't ready for Phase 2 yet.

- [ ] **1.5 Support multiple linked accounts per user**
  - [ ] Tag each imported CSV/account with a distinct account identifier under one user
  - **Dependencies:** 0.1 (schema must support multiple accounts per user), 1.3.
  - **Acceptance criteria:** One user can upload two separate CSVs (e.g., checking + credit card) tagged to two distinct accounts, without either overwriting the other.
  - **Test:** Upload two different CSVs under the same test user and confirm both sets of transactions are stored, correctly tagged by account, and neither overwrites the other. This is a real prerequisite for Phase 4.5's multi-account merge — don't skip it and discover the gap there.

- [ ] **1.6 Handle repeat/overlapping CSV imports without double-counting**
  - [ ] Detect and de-duplicate transactions that appear in more than one uploaded file
  - **Dependencies:** 1.3.
  - **Acceptance criteria:** Re-uploading a CSV that overlaps in date range with a previous upload doesn't create duplicate transactions or inflate category totals.
  - **Test:** Upload a CSV, then upload a second CSV covering an overlapping date range (real bank exports commonly do this — e.g., "last 30 days" every time). Confirm the overlapping transactions appear once, not twice, and category totals don't double-count. Without this, the pace-check math in Phase 4 will lie to users.

---

## Phase 2 — Transaction Correction & Learning

- [ ] **2.1 Build the correction UI**
  - [ ] Edit a transaction's category
  - [ ] Edit a transaction's amount
  - [ ] Move a transaction to a different category
  - **Dependencies:** Phase 1 complete (need real, categorized transactions to correct).
  - **Acceptance criteria:** Tapping any transaction lets a user change its category or amount, and the change is reflected immediately in that week's totals.
  - **Test:** Pick a transaction, change its category, and confirm the category-level totals update correctly to reflect the move.

- [ ] **2.2 Merchant name normalization**
  - [ ] Recognize the same real-world merchant across different raw formatting (e.g., "AMAZON.COM*RT4X2" vs. "AMZN Mktp US")
  - **Dependencies:** 1.4.
  - **Acceptance criteria:** Two transaction rows that are the same merchant but formatted differently are treated as the same merchant for rule-matching purposes.
  - **Test:** Take two real transaction rows from different sample CSVs that are actually the same merchant but formatted differently, and confirm a correction rule applied to one also applies to the other. Without this, "every time" rules (2.3) silently stop working the moment a second account or a new bank format shows up.

- [ ] **2.3 "Just this once" vs. "every time" rule learning**
  - [ ] Prompt appears after any manual correction
  - [ ] "Every time" creates a standing rule keyed to that (normalized) merchant
  - [ ] Standing rules apply automatically to future imports
  - **Dependencies:** 2.1, 2.2.
  - **Acceptance criteria:** After choosing "every time" for a merchant correction, re-importing a CSV containing that same merchant auto-applies the corrected category with no manual re-entry.
  - **Test:** Correct a miscategorized merchant and select "every time." Re-import a CSV containing that same merchant again (including under a differently-formatted string, per 2.2). Confirm it's categorized correctly without touching it.

---

## Phase 3 — Budget Setup & Self-Calibration

- [ ] **3.1 Onboarding budget entry**
  - [ ] Category selection screen
  - [ ] Manual dollar budget entry per selected category
  - **Dependencies:** Phase 1.1 (category taxonomy must exist).
  - **Acceptance criteria:** A new user can set a monthly dollar target for each category they choose to track, and those numbers persist.
  - **Test:** Enter budget numbers for 3–5 categories, close and reopen the app, and confirm the same numbers are still there and attached to the right categories.

- [ ] **3.2 Self-calibrating budget engine**
  - [ ] Track actual spend vs. budgeted amount per category over time
  - [ ] After ~1 month, compare actual to budgeted and propose an adjustment
  - **Dependencies:** 3.1, and at least one month of categorized transaction data (Phase 1 + 2).
  - **Acceptance criteria:** After a full month of real data, the app proposes an adjusted budget number for at least one category where actual spend diverged meaningfully from the original guess.
  - **Test:** Feed in a full month of one guinea pig's real transaction data for a category with a known total (e.g., $600 actually spent on food against a $400 budget guess). Confirm the app's proposed adjustment moves meaningfully toward that real $600 figure rather than staying anchored to the original guess.

---

## Phase 4 — Sunday Summary Core Loop

This is the product's central mechanic: retrospective data becomes forward guidance.

- [ ] **4.1 Pace-check logic**
  - [ ] Compute "% of month elapsed" vs. "% of category budget spent"
  - [ ] Classify as ahead of pace, on pace, or behind pace
  - **Dependencies:** Phase 3 (needs budget numbers) + Phase 1/2 (needs categorized, corrected transactions).
  - **Acceptance criteria:** Given any category's budget and actual spend-to-date, the system correctly computes and labels pace status.
  - **Test:** Hand-check 3 scenarios with known numbers — e.g., $400 budget / $200 spent / 15 days into a 30-day month (on pace); $400 / $350 / day 10 (badly behind pace); $400 / $100 / day 25 (well ahead of pace). Confirm the system's output matches your own hand math for all three.

- [ ] **4.2 Suggestion-selection logic**
  - [ ] Identify the single highest-impact pattern for the week (not a list)
  - [ ] Generate a specific, actionable suggestion tied to that pattern
  - **Dependencies:** 4.1.
  - **Acceptance criteria:** Given a week of data with one clear standout pattern (e.g., a payday spending spike in dining), the system surfaces that specific pattern as the suggestion — not a generic tip, and not multiple competing suggestions.
  - **Test:** Feed in a known spending pattern modeled on your own mock dataset (`spending-ab-test.html`'s payday-spike data). Confirm the generated suggestion correctly names the dining/delivery spike and proposes a concrete action, matching the "Version A" style already drafted in that file.

- [ ] **4.3 Tone selection (suggestion / pace-check / praise)**
  - [ ] Decision logic for which of the three tones applies each week
  - **Dependencies:** 4.1, 4.2.
  - **Acceptance criteria:** Three distinct test scenarios (clearly over-budget-and-off-pace, borderline pace, comfortably under budget) each produce the correct, distinct tone.
  - **Test:** Run the three scenarios above through the logic and confirm: over-budget → suggestion, borderline → pace-check, comfortably under → praise. If any scenario produces the wrong tone, do not proceed — a wrong tone directly contradicts the "not always negative" design decision.

- [ ] **4.4 Plain-language message generation**
  - [ ] Turn raw numbers + selected tone into a short, calm message
  - **Dependencies:** 4.3.
  - **Acceptance criteria:** Generated messages read in the brand voice defined in `brand-guide.md` ("Clear. Calm. Human." — no jargon, no alarm, no lecturing).
  - **Test:** Generate messages for all three tone scenarios and read them against the brand-guide checklist. If any message sounds alarmist, judgmental, or jargon-heavy, revise the generation logic before moving on.

- [ ] **4.5 Multi-account merge + Sunday Summary assembly**
  - [ ] Merge all linked accounts/CSVs into one unified categorized view for the summary
  - [ ] Build the separate per-account drill-down view
  - [ ] Assemble the full weekly summary (pace-check/suggestion/praise + category breakdown)
  - [ ] Schedule for every Sunday
  - **Dependencies:** 4.4, and Phase 1.5 (multi-account support) — the capability this task needs was a gap in the original plan; it's now built there instead of assumed here.
  - **Acceptance criteria:** One test user with two accounts (e.g., debit + credit) gets a single merged Sunday Summary reflecting combined category totals, plus a working toggle to view either account alone.
  - **Test:** Import two separate CSVs (e.g., a checking and a credit card export) for the same test user with an overlapping category (like dining on both). Confirm the merged summary's dining total equals the sum of both accounts' dining spend, and confirm the drill-down view can isolate just one account's numbers correctly.

---

## Phase 5 — App Shell & Notifications

- [ ] **5.1 Short push notification**
  - [ ] Sunday-triggered push with a brief teaser message
  - **Dependencies:** Phase 4.5 (a summary must exist to notify about), Phase 0.3 (app shell).
  - **Acceptance criteria:** A test device receives a push notification on the scheduled Sunday send time.
  - **Test:** Manually trigger the Sunday job for a test account and confirm the push notification actually arrives on a real device within a reasonable delay.

- [ ] **5.2 Inbox tab**
  - [ ] Chronological log of all short notifications/messages
  - **Dependencies:** 5.1.
  - **Acceptance criteria:** Every notification sent also appears in the Inbox tab, in order, and tapping one is possible.
  - **Test:** Trigger 2–3 test notifications and confirm all of them appear in the Inbox in the correct order.

- [ ] **5.3 Summaries tab**
  - [ ] Dedicated tab showing full Sunday Summary history
  - **Dependencies:** Phase 4.5.
  - **Acceptance criteria:** Past Sunday Summaries are viewable in full (not just the teaser) in chronological order.
  - **Test:** Generate at least 2 weeks of summaries for a test account and confirm both appear correctly, in order, with full content (category breakdown + suggestion/pace-check/praise) intact.

---

## Phase 6 — AI Chatbot

- [ ] **6.1 Resolve chatbot scope (open decision)**
  - [ ] Decide: personal-data-only, or also general financial advice questions
  - **Dependencies:** None additional beyond Phase 1–3 data existing to reason about.
  - **Acceptance criteria:** A written decision exists covering what the chatbot will and won't attempt to answer, made *before* building it — this determines the system prompt design and whether any safety/guardrail work is needed for advice-type responses.
  - **Test:** The decision is documented and reviewed before Phase 6.2 begins. If 6.2 starts without this, the chatbot gets built once and probably rebuilt once the scope question finally gets answered.

- [ ] **6.2 Build the chatbot, grounded in the user's own data**
  - [ ] Answer questions about the user's real categorized transactions and budget ("how much have I spent on dining this month?")
  - [ ] Respect the scope boundary decided in 6.1
  - **Dependencies:** 6.1, and Phase 1–3 (needs categorized transactions and budget data to reason over).
  - **Acceptance criteria:** The chatbot answers a data-specific question correctly, using the same numbers the Sunday Summary and category views show, and behaves as decided in 6.1 when asked an out-of-scope question.
  - **Test:** Ask the chatbot 5 known-answer questions about a test account's real data and manually verify each answer against the actual computed total. Then ask one out-of-scope general-advice question and confirm its behavior matches the 6.1 decision.

---

## Phase 7 — Subscription Billing & Trial Gate

- [ ] **7.1 Decide the payment rail**
  - [ ] Apple/Google in-app purchase vs. a web-based checkout (e.g., Stripe)
  - **Dependencies:** None additional — must be decided before any billing code is written.
  - **Acceptance criteria:** A written decision exists, with the tradeoff stated plainly: in-app purchase costs 30% off the top per Apple/Google's standard terms; a web checkout avoids that fee but adds friction (directing users outside the app) and, on iOS, is subject to App Store review restrictions on how that's presented.
  - **Test:** The decision is documented and read by whoever builds 7.2/7.3 before they start. This was flagged in your own cost model as a decision to make before building, not after — don't repeat that mistake here.

- [ ] **7.2 4-week free trial tracking**
  - [ ] Start the trial clock at signup
  - [ ] Track which Sunday Summary number (1–4) a user is on
  - **Dependencies:** Phase 4.5 (summaries must exist to count).
  - **Acceptance criteria:** A test account correctly shows "trial, week 2 of 4" (etc.) at the right point in its lifecycle.
  - **Test:** Create a test account and manually trigger 4 Sunday Summary cycles. Confirm the trial-week counter increments correctly each time and reaches "trial complete" after the 4th.

- [ ] **7.3 Paywall + subscription billing**
  - [ ] Charge $7.99/month once the trial ends, via the rail decided in 7.1
  - [ ] Handle payment failure / retry
  - **Dependencies:** 7.1, 7.2.
  - **Acceptance criteria:** A test account is correctly prompted to subscribe after its 4th Sunday Summary, and a test payment successfully processes.
  - **Test:** Run a test account through to "trial complete" and confirm the paywall appears. Process one real test transaction (sandbox/test mode) and confirm it completes and the account's status updates to "paying subscriber."

---

## Pre-Pilot Checklist

*Before touching a single real guinea pig, confirm every item below. These are the things the audit caught that are easy to lose track of once you're heads-down building features — check them off here, not just in the phase they came from.*

- [ ] Error monitoring confirmed working end-to-end (0.5)
- [ ] Secure data storage confirmed — encryption at rest, no plaintext financial data in logs (0.6)
- [ ] CSV de-duplication tested with real overlapping exports, not just synthetic data (1.6)
- [ ] Merchant normalization tested across every guinea pig's actual bank format, not just one (2.2)
- [ ] Payment rail decided and billing tested end-to-end, including a failed-payment case (7.1–7.3)
- [ ] Multi-account support tested for any guinea pig who actually has more than one account (1.5, 4.5)

---

## Phase 8 — Guinea Pig Pilot Launch

- [ ] **8.1 Recruit and onboard guinea pigs**
  - [ ] Each guinea pig uploads a real CSV
  - [ ] Each sets up their budget
  - [ ] Each receives at least one real Sunday Summary
  - **Dependencies:** Phases 0–7 all complete and passing their own tests, plus the Pre-Pilot Checklist above.
  - **Acceptance criteria:** Every guinea pig completes onboarding end-to-end with no blocking bugs.
  - **Test:** Walk each guinea pig through the full flow (import → budget → first Sunday Summary → chatbot question) and confirm none of them get stuck at any step.

- [ ] **8.2 Run the full 4-week trial with real feedback**
  - [ ] Collect qualitative feedback each week (does the suggestion/pace-check/praise feel right? does it change behavior?)
  - [ ] Track who actually converts to paying at week 4
  - **Dependencies:** 8.1, and 4 real weeks of elapsed time.
  - **Acceptance criteria:** You have (a) real conversion data — however small the sample — and (b) qualitative feedback on whether the Sunday Summary actually changed anyone's behavior the following week.
  - **Test:** This phase *is* the test. The result — trial-to-paid conversion rate — is the single number `unit-economics.md` and `financial-model.xlsx` flag as the biggest unknown in the entire venture. Record it and feed it back into those documents.

---

## Phase 9 — Plaid Integration (after the pilot validates the core loop)

Only start this phase once Phase 8 shows the core product logic works — this is deliberately last, since it's the most expensive and slowest piece to build (per `unit-economics.md`'s cost model), and CSV import already proves whether the product itself is worth using.

- [ ] **9.1 Plaid account setup**
  - [ ] Sign up, build against Sandbox
  - [ ] Apply for Trial plan access (real data, up to 10 linked accounts)
  - **Dependencies:** Phase 8 complete with a positive signal (worth automating what CSV import currently does manually).
  - **Acceptance criteria:** Plaid Trial plan is approved and Plaid Link successfully connects to a real test bank account in a non-production test.
  - **Test:** Complete Plaid's own Sandbox/Trial connection flow with one real personal account and confirm transactions are retrievable via their API.

- [ ] **9.2 Route live Plaid data through the existing pipeline**
  - [ ] Replace manual CSV upload with automatic Plaid transaction sync for linked accounts
  - [ ] Keep CSV import available as a permanent fallback option
  - **Dependencies:** 9.1, and the categorization/correction/Sunday Summary pipeline from Phases 1–4 already working.
  - **Acceptance criteria:** A live Plaid-linked account flows into the same categorization, correction, budget, and Sunday Summary system that CSV imports already use — no separate code path needed downstream of ingestion.
  - **Test:** Link one guinea pig's real account via Plaid and compare the resulting categorized transactions and Sunday Summary against what a manual CSV export of the same account would have produced. They should match. If the Plaid-fed pipeline behaves differently from the CSV-fed pipeline, that's a bug — the whole point of building CSV first was so this pipeline would already be proven.
