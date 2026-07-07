# Week 5 Progress — Session Summary

**Date:** June 2026
**Session focus:** Revenue model selection, stress testing, and unit economics
**Files created or modified this session:** `unit-economics.md` (new), `week5-progress.md` (new)
**Files to read before resuming:** `business-model-canvas.md`, `unit-economics.md`

---

## What We Did Today

Four things, in order:

1. Stress-tested the Revenue Streams block from the Business Model Canvas
2. Evaluated every revenue model option against the actual data
3. Stress-tested the recommended model by walking through exactly how money changes hands
4. Built unit economics from scratch and audited for missing costs

---

## 1. Revenue Streams Stress Test

### The core finding

The Revenue Streams block in the Business Model Canvas had no interview evidence behind it. Zero. Neither Noor nor Ben was ever asked what they pay for financial tools, whether they have paid before, or what outcome would be worth paying for. Every revenue model in the canvas was structural inference, not validated data.

### What the data actually shows about current payment behavior

| Person | Current solution | What they pay |
|---|---|---|
| Noor, 24 (target customer) | Nothing — operates on intention alone | $0 |
| Ben, 36 (non-target) | Two bank accounts + Bank of America free app | $0 |

Both subjects currently pay $0 for financial management tools. This does not prove they won't pay. It proves willingness to pay has never been established.

### Competitive pricing (the only real pricing data available)

| Competitor | Model | Price |
|---|---|---|
| YNAB | Subscription | ~$109/year |
| Monarch Money | Subscription | ~$100/year |
| EveryDollar | Freemium | Free + paid tier |
| Rocket Money | Freemium | Free + paid tier |
| Credit Karma | Referral/affiliate | $0 to user |

User complaints across competitors consistently flag "upsells" and "upgrade prompts" as friction — the target segment reacts negatively to aggressive monetization. This is a constraint, not a pricing signal.

---

## 2. Revenue Models Evaluated

Every option was assessed against interview data and competitive evidence.

### Subscription (B2C)
- **Supported by:** Market comps show $100–109/year is the established range. Some users do pay for YNAB and Monarch.
- **Against:** YNAB and Monarch serve a more committed user who has already decided to budget. Noor has no system, no tool, has never paid for anything in this category, and did not ask for a product. Asking for money before value is proven is the hardest motion given those facts. Tally raised significant capital with a compelling pitch and could not sustain subscriptions. Mint was free and still shut down.
- **Verdict:** Structurally familiar but wrong fit for a customer who has not asked for the product.

### One-time purchase
- **Against:** Product requires ongoing bank connections, AI infrastructure, and compliance. Recurring costs cannot be covered by a single payment. No competitive precedent in fintech.
- **Verdict:** Not applicable.

### Transaction fee
- **Against:** Product does not facilitate transactions. No basis for this model.
- **Verdict:** Not applicable.

### Freemium
- **Supported by:** Two competitors use it (EveryDollar, Rocket Money). Lowest adoption barrier. Gets Noor in without requiring upfront payment from someone who hasn't asked for the product.
- **Against:** Users complain about upgrade pressure. Free users cost money (Plaid charges per connected account regardless of revenue). Consumer fintech freemium conversion rates are typically 2–5%. The paid tier is currently undefined — if the free tier delivers the core awareness value, the upgrade case is hard.
- **Verdict:** Right for acquisition. Cannot sustain itself alone.

### B2B2C — employer or university
- **Supported by:** Removes end-user willingness-to-pay entirely. Employer financial wellness market is real and established (Financial Finesse, LearnLux, Origin exist in this space). Universities already pay for student financial wellness tools (EVERFI, iGrad). Institutional buyers have budget and procurement processes.
- **Against:** Zero institutional validation. No employer or university has been approached. Longer sales cycles (6–18 months). Must compete against established vendors with existing relationships and SOC 2 certifications.
- **Verdict:** Strongest long-term revenue path. Difficult to reach without a product and user base first.

### Referral / affiliate (Credit Karma model)
- **Supported by:** Removes price barrier entirely for users. Credit Karma proves this works at scale.
- **Against:** Requires massive scale to generate meaningful revenue. Creates incentive misalignment — product purpose is financial health; revenue source would be steering users toward financial products. Noor is already carrying debt. Recommending more credit products to her is a real harm risk.
- **Verdict:** Structurally available but misaligned with the stated purpose.

---

## 3. Recommended Revenue Model: Freemium → B2B2C

### Why this was selected

Not because it is what the data confirms. Because it is the path most consistent with what the data shows about the user and the market.

The reasoning:
- Noor has not asked for a product. She will not pay upfront for something she has not decided she needs. B2C subscription requires trust and payment simultaneously from someone who demonstrated no prior willingness to pay in this category. That fails at acquisition.
- Freemium removes the payment barrier and gets Noor in the door. The free tier delivers the core value. No upgrade pressure at the start.
- Freemium alone cannot survive the cost structure. Plaid costs money per connected user. AI, hosting, and compliance are all real costs before any revenue. A free tier is a liability until institutional revenue covers it.
- B2B2C solves the unit economics. An employer or university paying $6–10 PMPM makes the model work. The user receives the product free. The institutional buyer has budget.
- The sequencing matters: freemium first to build a user base and prove engagement, then institutional sales with real engagement data to show buyers.

### What this requires

- A product that is compelling enough to acquire free users organically
- Engagement data sufficient to convince institutional buyers the product works
- Enough runway to survive 18–36 months before institutional revenue materializes
- Outside capital or a much faster institutional sales cycle than industry average

---

## 4. The Challenge Exercise — Who Actually Writes the Check

The model was stress-tested by tracing exactly how money moves in each scenario.

### Freemium → B2B2C (the recommendation)

**Free tier:**
- Who pays: No one. $0 revenue.
- What it costs: $0.73–0.89/user/month in direct variable costs (Plaid, AI, hosting, email delivery, support time).
- What triggers upgrade: User experiences enough value; paid tier offers something meaningfully better; user enters payment info. All three steps are currently unvalidated.
- If they say no: User stays free. You pay Plaid indefinitely with no return.

**Institutional side:**
- Who pays: An HR Director or university Financial Aid Director — not Noor.
- When: After a procurement cycle. 6–18 months from first contact. Annual budget cycles mean missing a window = waiting a year.
- What triggers payment: Institution identifies a gap, your product fills it better than established vendors, security review is cleared, someone inside champions the purchase, contract is signed.
- If they say no: No revenue. Go find the next institution. Start the clock again.

**The structural problem:** These phases are sequential, not parallel. You need the free product and engagement data before institutions will talk to you. Building the free product costs money before any institutional revenue arrives. That gap — roughly 18–24 months of operating at a loss — requires outside capital or a drastically shorter sales cycle.

### B2C Subscription (the alternative evaluated)

**Who pays:** Noor.
**When:** At sign-up or after a trial.
**What triggers payment:** She discovers the product (not currently searching), trusts it with bank credentials (untested), uses it enough to experience value, decides to pay before sustained behavior change has occurred.
**If she says no:** No revenue, no free tier to retain her, she is gone.

**Why it fails first:** Every step in the sequence requires more trust and commitment from someone who has not asked for the product and currently pays $0 for anything like it. The failure point is acquisition and conversion before value is proven.

### Which survives contact with reality

Neither survives cleanly. Freemium → B2B2C fails in the middle (cash gap between free users and first institutional check). B2C subscription fails at the start (acquisition from someone not searching for the product).

The model with the most realistic path was identified as **direct B2B2C from day one** — skip consumer acquisition entirely, sell to one institution first, let them distribute to users. This eliminates the consumer acquisition problem and the revenue timing problem simultaneously. The tradeoff: you are not building for Noor first; you are building for the institution that serves her. Different product, different company.

This was not adopted as the primary recommendation but was flagged as the path that most directly survives contact with reality.

---

## 5. Unit Economics — What Was Built

File: `unit-economics.md`

### Revenue per user (institutional)

| Pricing tier | Rate | Basis |
|---|---|---|
| Conservative | $3 PMPM | University buyer estimate — unvalidated assumption |
| Base case | $6 PMPM | Employer buyer estimate — unvalidated assumption |
| Optimistic | $10 PMPM | Premium employer positioning — unvalidated assumption |

No institutional pricing data exists from any interview or buyer conversation. These are competitive market estimates only.

### Cost to serve one institutional user per month (after audit)

| Cost item | Monthly per user | Basis |
|---|---|---|
| Plaid (bank aggregation) | $0.45 | Assumption — approximate from industry discussion |
| AI / LLM API | $0.03 | Based on published token pricing |
| Hosting / infrastructure | $0.25 | Assumption |
| Email delivery (weekly summaries) | $0.01 | Based on SendGrid pricing |
| Customer support time | $0.15 | Assumption — 3% contact rate, 20 min/contact |
| **Total variable** | **$0.89/user/month** | |

### Fixed costs per month (revised after audit)

| Item | Monthly | Basis |
|---|---|---|
| SOC 2 Type II (amortized) | $1,250–3,333 | Assumption — required for institutional sales |
| Cyber liability insurance | $167–500 | Assumption |
| E&O / professional liability insurance | $42–167 | Added in audit — missing from original |
| Data privacy legal | $500–1,500 | Assumption |
| Minimum infrastructure | $100–200 | Assumption |
| Software tools (GitHub, Figma, Slack, etc.) | ~$100 | Added in audit — missing from original |
| Accounting / bookkeeping | ~$150 | Added in audit — missing from original |
| Email service base fee | ~$15 | Added in audit |
| Backup / data retention | ~$30 | Added in audit |
| Business banking | ~$15 | Added in audit |
| **Working total** | **~$3,850/month** | Revised up from original $3,500 |

Founder time: $2,400/month (40 hrs/week at $15/hr — estimated, not yet tracked)

**Total monthly overhead: ~$6,250/month** (fixed costs + founder time)

### Gross margin per institutional user (variable costs only)

| PMPM rate | Revenue | Variable cost | Gross margin | Margin % |
|---|---|---|---|---|
| $3 | $3.00 | $0.89 | $2.11 | 70% |
| $6 | $6.00 | $0.89 | $5.11 | 85% |
| $10 | $10.00 | $0.89 | $9.11 | 91% |

Variable-cost gross margins are strong. This is typical for SaaS. The per-user economics are not the problem.

### Break-even (revised after cost audit)

Contribution margin = Revenue PMPM − $0.89 variable cost

| PMPM rate | Contribution margin | Users to break even | Contracts (at 200 users) |
|---|---|---|---|
| $3 | $2.11 | ~2,962 | ~15 contracts |
| $6 | $5.11 | ~1,223 | ~7 contracts |
| $10 | $9.11 | ~686 | ~4 contracts |

At the base case ($6 PMPM), you need approximately 7 signed institutional contracts covering ~200 users each to stop losing money on monthly operations. At one contract per quarter, that is 21 months.

### Free user drag

Every free user costs $0.89/month in direct variable costs and generates $0 revenue. At 1,000 free users: $890/month in direct costs before fixed overhead. The free tier is a necessary cost to prove engagement — but it burns runway.

---

## 6. Cost Audit — What Was Missing from the Original Model

The original unit economics were audited for every possible cost category. Most omissions were minor. One was significant.

### The one number that changes the model: App store fees

If this is a mobile app and consumer upgrades are processed through Apple or Google, the platforms take **30%** of every in-app payment.

- On a $6/month consumer upgrade via iOS: Apple takes $1.80. Net revenue is $4.20, not $6.00.
- That 30% is larger than the entire variable cost stack combined.
- This does **not** apply to institutional contracts invoiced directly (outside the app store).
- **Mitigation:** Route consumer payments through a web checkout (Stripe) rather than in-app purchase. This is a deliberate architectural decision that must be made before building the consumer payment flow.

### Other missing costs (minor individually, real collectively)

| Missing item | Monthly estimate | Notes |
|---|---|---|
| E&O / professional liability insurance | $42–167 | Required for a financial product — added to model |
| Software tools (GitHub, Figma, etc.) | ~$100 | Every business runs on SaaS — added to model |
| Accounting / bookkeeping | ~$150 | Required once institutional contracts exist — added |
| Contract legal review per institutional sale | $300–1,000 per contract | Real cost of closing each deal — not yet in model |
| Conference / sales travel | $167–583/month amortized | Required for institutional BD — not yet in model |
| Self-employment tax | 15.3% on net income | Does not change unit economics; changes what break-even means for personal income |
| SaaS sales tax (by state) | Varies | Some states require collection on software subscriptions |
| App store developer fees | $99/year (Apple), $25 one-time (Google) | Minor |
| Paid advertising (contingency) | $30–250 CAC per free user | Not in model — enters if organic acquisition fails |

---

## 7. Where We Stopped

The cost audit of `unit-economics.md` is complete. Every cost category has been evaluated, labeled as included / excluded / assumed $0 / missing, and the model has been revised where meaningful omissions were found.

The revised variable cost per user is **$0.89/month** (up from $0.73).
The revised fixed cost estimate is **~$3,850/month** (up from $3,500).
Neither change materially alters the break-even conclusions.

The model is structurally sound. The margins work at the per-user level. The problem — as identified throughout the session — is not the unit economics. It is the cash gap between today and the first institutional contract.

---

## 8. What's Next

### Immediate validation priorities (in order of importance)

These are the assumptions in the unit economics that, if wrong, break the model. They should be tested before building further.

1. **Institutional PMPM rate** — The $6 base case is a competitive estimate. One conversation with an HR benefits buyer and one with a university financial aid director asking what they currently pay for comparable programs would replace the biggest assumption in the model with real data.

2. **Willingness to connect a bank account** — The entire product depends on this. Noor has never been asked. This should be the first question in the next customer interview.

3. **Sales cycle length** — 6–18 months is an industry norm. One conversation with a founder who has sold SaaS to HR departments or universities would give a more accurate estimate for this specific product category.

4. **SOC 2 actual cost** — Request a quote from Vanta or Drata. This is a 30-minute call and converts the largest fixed cost assumption into data.

5. **App store strategy** — Decide now whether consumer payments go through the app store (30% fee) or a web checkout (Stripe, ~2.9% + $0.30). This is an architectural and legal question, not a revenue question, and it should be resolved before any consumer payment flow is designed.

### Next document to build

The unit economics are built but rest heavily on assumptions. Before building forward (pitch deck, go-to-market plan, or the next assignment), the highest-value next step is a single institutional pricing conversation — one phone call to an HR benefits manager asking what their company pays per employee per year for financial wellness programs. That one number either validates the base case or forces a revision to every break-even calculation in the model.

If the assignment requires moving forward before that conversation happens, treat the base case ($6 PMPM, 7 contracts to break even) as the working assumption — and flag it prominently as unvalidated.

---

## Files in This Project (after Session 1)

| File | Contents | Status |
|---|---|---|
| `VENTURE.md` | Problem, target customer, competitive landscape, direction, open questions | Current |
| `business-model-canvas.md` | All 9 BMC blocks with evidence ratings | Current |
| `venture-direction.md` | Refined problem statement, target customer, direction decision, validation plan | Current |
| `interviews/synthesis.md` | Per-interview summaries with key quotes | Current |
| `interviews/patterns.md` | Cross-interview patterns, contradictions, surprises | Current |
| `assumption-scorecard.md` | 3 core assumptions rated against evidence | Current |
| `customer-discovery-synthesis.pdf` | Full report combining all Week 4 work | Current |
| `generate_report.py` | Script that generates the PDF | Current |
| `unit-economics.md` | Unit economics model + cost audit | New this session |
| `week5-progress.md` | This file | New this session |
| `assignments/` | Weeks 1–3 assignment docs | Historical |
| `interviews/` | Interview1.docx, Interview2.docx | Historical |

---

# Session 2 — June 24, 2026

**Session focus:** Financial model build, pricing test design, base-case revision, stress testing, VENTURE.md update, assignment submission report, and PDF generation
**Files created this session:** `financial-model.xlsx`, `pricing-test.md`, `week5-assignment.md`, `week5-assignment.pdf`
**Files modified this session:** `financial-model.xlsx` (base case PMPM revised, stress test added), `VENTURE.md` (Revenue Model section appended)

---

## 1. Venture State Summary

Read and synthesized six files at session open (`week5-progress.md`, `VENTURE.md`, `venture-direction.md`, `business-model-canvas.md`, `assumption-scorecard.md`, `unit-economics.md`). Confirmed: pre-product, pre-revenue, two customer interviews completed, no institutional buyer contacted, no consumer asked about willingness to pay or bank-account connection. The unit economics were complete from Session 1. The missing work was the financial model, a pricing test, and the assignment submission.

---

## 2. Financial Model Built (`financial-model.xlsx`)

Built a three-scenario Excel model from scratch using Python/openpyxl. All scenario calculations reference a single assumptions section with formulas; changing any input cell cascades through all outputs automatically.

**Model structure:**

- **Section 1 — Input Assumptions:** PMPM rate, institutional users, free users, contracts, all variable cost rates (Plaid, AI, hosting, email, support), all fixed costs (SOC 2, insurances, legal, infrastructure, tools, accounting, banking), and founder time at $15/hr.
- **Section 2 — Scenario Model:** Revenue, variable costs split into institutional and free-user blocks, gross profit and margin %, fixed costs (referenced from Section 1), founder time, total costs, net monthly income/(loss) in green/red format, annualized run rate, and full break-even analysis (contribution margin, overhead, users to break even, contracts to break even, gap at Month 12).
- **Key Insights block:** Plain-language statements of what breaks the model and what variable has the most swing.

**Initial scenario values (at build):**

| | Pessimistic | Base | Optimistic |
|---|---|---|---|
| PMPM rate | $3 | $6 | $10 |
| Institutional users | 100 | 400 | 800 |
| Free users | 150 | 500 | 1,200 |
| Net at $15/hr | −$9,408 | −$4,979 | +$1,605 |
| Break-even contracts | 56 | 7 | 3 |

**Key design decisions:**
- Free users are modeled as a separate cost block (labeled "the drag") to make their runway impact visible.
- Panes frozen at C6 so assumptions and labels stay on-screen while scrolling.
- Net income uses `[Green]"$"#,##0;[Red]-"$"#,##0` format — negative numbers are red, no softening.

---

## 3. Base Case PMPM Revised: $6 → $3

The pricing test documented that no institutional buyer has been contacted and the $6 PMPM base case is competitive inference, not a quote. Revised the base case PMPM (Excel row 8, column D) from $6.00 to $3.00.

**Impact on base case:**

| Metric | Before ($6) | After ($3) | Change |
|---|---|---|---|
| Contribution margin/user | $5.11 | $2.11 | −59% |
| Break-even contracts | 7 | 16 | +9 contracts |
| Months to break-even (1/qtr) | 21 months | 48 months | +27 months |
| Net monthly at Month 12 | −$4,979 | −$6,179 | −$1,200 |

The $1,200/month revenue difference is exactly 400 users × $3 less per user. Costs do not move. The break-even change is the critical one: 16 contracts at one per quarter is four years, not 21 months.

Also revised base case institutional users from 400 (2 contracts) to 200 (1 contract) to reflect the reality that no outreach has started and first-year institutional sales against a 6–18 month cycle realistically produce one close, not two.

---

## 4. Stress Test: 1 Contract + 20% Churn

Added a dedicated Stress Test section to `financial-model.xlsx` below the main model. The original model had no churn mechanism — it assumed perfect retention. This section adds it explicitly.

**Stress test parameters:**
- 1 signed contract, 200 contracted users
- 20% annual churn rate
- Effective paying users: 200 × (1 − 0.20) = 160
- Base case assumptions for all costs (no additional cost changes)

**Results:**

| Metric | Base (1 contract, 0% churn) | Stress test (1 contract, 20% churn) |
|---|---|---|
| Effective paying users | 200 | 160 |
| Monthly revenue | $600 | $480 |
| Monthly net loss | −$6,601 | −$6,685 |
| Break-even effective users | 3,118 | 3,118 (unchanged) |
| Contracted users needed (pre-churn) | 3,118 | 3,898 |
| Break-even contracts | 16 | 20 |
| Months to break-even (1/qtr) | 48 | 60 |

**Key finding:** Churn adds only $506/month to the loss — because it reduces variable costs slightly alongside revenue. The structural damage is to break-even: to end up with 3,118 effective users you must sign 3,898 contracted users when 20% churn out. Break-even contracts rise from 16 to 20. At one per quarter: 60 months (5 years). That is not a projection; it signals the model needs capital or a structural change.

**What actually breaks the model is still timing, not churn.** Fixed costs account for $6,098 of the $6,685 monthly loss. Churn accounts for $120. Solving churn without solving the fixed-cost gap changes nothing material.

---

## 5. VENTURE.md Updated — Revenue Model Section Added

Appended a new "Revenue Model" section to the bottom of `VENTURE.md` covering:
- Chosen model and price point ($3 PMPM revised base, B2B2C, no consumer revenue assumed)
- Unit economics in one paragraph ($0.89/user/month variable, $6,578/month overhead, $2.11 contribution margin, 3,118 users to break even)
- Biggest financial risk (timing: 18–36 month cash gap before institutional revenue arrives)
- What the pricing test resolves (institutional PMPM range and contract size — two questions, one call)

All existing sections in VENTURE.md were preserved.

---

## 6. Pricing Test Designed (`pricing-test.md`)

Designed a full pricing validation plan for the week of June 24–28, 2026.

**Primary test — institutional (highest priority):** Direct ask with HR benefits managers and university financial aid staff. Target: two 15-minute conversations by Thursday. Goal: replace the $3–$6 PMPM assumption with a real buyer-described price range, and learn typical contract size (users covered). Outreach drafted; sources identified (LinkedIn, Rollins alumni, family contacts, faculty introductions).

**Secondary test — consumer:** Add two questions to a target-customer interview: (1) pricing reaction to $4.99/month concept description, and (2) willingness to connect a bank account. The bank-account question was flagged in prior sessions as critically unvalidated and was added to the test plan here.

**Why direct ask over other methods:**
- No product exists for a Wizard of Oz test
- No customer has asked for the product (pre-sale requires trust not yet built)
- Institutional buyers don't sign up on landing pages

**If the test fails:** Fallback is requesting a sales demo from SmartDollar or LearnLux as a prospective employer customer — their sales rep will quote a real price. One call, 20 minutes, converts an assumption to data.

---

## 7. Assignment Submission Created

### `week5-assignment.md`

Full written report in four sections, formatted as analysis with every number labeled [DATA] or [ASSUMPTION]:

1. **Revenue Model Selection** — each eliminated model with a specific failure mode; chosen model; exact money flow traced from free user through institutional check; evidence for and against.
2. **Unit Economics Analysis** — narrative paragraphs only (no tables; Excel referenced for detailed figures). Covers revenue per user, variable costs and why each exists, fixed costs and why each exists, margins at $0/hr vs. $15/hr, and the cost audit findings including the app store 30% fee risk.
3. **Financial Model Summary** — one table showing three scenarios with columns adapted for a SaaS/B2B2C venture: Items (PMPM rate), Sell-through (institutional users), Storage (free user drag cost/month), Net at $15/hr, Net at $0/hr. Narrative explaining what the numbers mean and the three variables that most affect break-even (contract size, PMPM rate, sales cycle speed).
4. **Pricing Test Plan** — hypothesis, method rationale, day-by-day steps, yes/no criteria, and three specific plan-B paths if the test produces no usable data.

### `week5-assignment.pdf`

10-page professional PDF generated from `week5-assignment.md` using a custom Python/reportlab Platypus renderer (`build_pdf.py` in scratchpad).

**Layout:**
- Navy (`#1F4E79`) headings with blue underrule on `##` section headers
- Helvetica throughout, 10pt/15pt body, justified
- Page 1: header/footer; pages 2–10: venture name + date header, page numbers in footer
- Blockquotes (Source Note, Notation) rendered as blue-left-bordered panels

**Inline markup:**
- `[DATA]` → bold-italic dark green
- `[ASSUMPTION]` → bold-italic amber
- Abbreviated `[D]`/`[A]` forms (used in table) → same colour treatment
- Bold, italic, inline code all rendered correctly

**Table:**
- Net rows: red top-rule, light-red background
- Negative values in red; positive values in green
- Items/Sell-through/Storage rows: light-blue background (conceptual rows)
- Navy header row, alternating row tints on data rows

---

## 8. What the Numbers Say Going Into Pricing Validation

At the close of this session, the model shows:

**If the institutional PMPM is $3 (current base):**
- Break-even requires 16 contracts (~200 users each)
- At one contract per quarter: 48 months (4 years)
- Requires outside capital or a dramatically faster sales cycle

**If the institutional PMPM is $6 (original base, not yet validated):**
- Break-even requires 7 contracts
- At one contract per quarter: 21 months
- Still requires runway bridge, but survivable without large capital raise

**The single most important number to get this week:** What does an institutional buyer actually pay per employee or student per month for a comparable financial wellness program? One phone call answers this. It either validates the base case or forces a revision to every break-even figure in the model.

**Second most important:** How many users does a typical contract cover? Contract size moves the break-even contract count more than price does.

---

## Files in This Project (after Session 2)

| File | Contents | Status |
|---|---|---|
| `VENTURE.md` | Problem, customer, competitive landscape, direction, open questions, **Revenue Model** | Updated |
| `business-model-canvas.md` | All 9 BMC blocks with evidence ratings | Current |
| `venture-direction.md` | Refined direction decision and validation plan | Current |
| `assumption-scorecard.md` | 3 core assumptions rated against evidence | Current |
| `unit-economics.md` | Full cost model + cost audit (Session 1) | Current |
| `financial-model.xlsx` | Three-scenario Excel model + stress test section | New + updated |
| `pricing-test.md` | This-week pricing validation plan | New |
| `week5-assignment.md` | Full assignment submission report (4 sections) | New |
| `week5-assignment.pdf` | PDF of assignment submission (10 pages) | New |
| `week5-progress.md` | This file | Updated |
| `interviews/synthesis.md` | Per-interview summaries | Current |
| `interviews/patterns.md` | Cross-interview patterns | Current |
| `customer-discovery-synthesis.pdf` | Week 4 full report | Historical |
| `assignments/` | Weeks 1–3 assignment docs | Historical |
