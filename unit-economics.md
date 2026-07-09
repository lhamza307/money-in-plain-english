# Unit Economics: Freemium → B2B2C Model

**Built:** June 2026. **Revised:** July 2026 — this file was not updated when the PMPM base case was revised ($6→$3) and the cost audit was completed (variable cost $0.73→$0.89, fixed cost ~$3,500→~$3,980) in `week5-progress.md` Session 2. Every table below now reflects those revisions. If a number here ever again diverges from `VENTURE.md`, `business-model-canvas.md`, or `week5-assignment.md`, trust those first.
**Evidence base:** 3 interviews (2 target customers, 1 outside target), competitive landscape research, public vendor pricing
**Every number is labeled: [DATA] = grounded in evidence, [ASSUMPTION] = estimated, flag before using**

---

## First: Define the "Customer" Unit

This model has two customer types with different economics. Both are calculated below.

- **Free user (Noor):** Costs money. Generates $0. Necessary to demonstrate engagement before institutions will buy.
- **Institutional user:** A person served under an employer or university contract. Revenue flows from the institution, not the individual. This is where the money is.

The unit that matters for break-even is the **institutional user** — one person whose access is paid for by an employer or university at a per-member-per-month (PMPM) rate.

---

## 1. Revenue Per Customer

### Free user
**Revenue: $0/month** [DATA — by design]

Every free user generates zero direct revenue until converted or picked up by an institutional contract.

### Institutional user (PMPM rate)

No institutional pricing data exists in the interviews. The following is drawn from competitor and adjacent market pricing:

| Source | Rate | Reliability |
|---|---|---|
| LearnLux (employer financial wellness) | ~$3–8 PMPM | [ASSUMPTION — industry estimates, not verified quotes] |
| Origin Financial (employer) | ~$8–12 PMPM | [ASSUMPTION — industry estimates] |
| SmartDollar (employer, Dave Ramsey) | ~$5–6/employee/year = ~$0.42–0.50 PMPM | [ASSUMPTION — lower-end market] |
| iGrad / EVERFI (university) | ~$1–5/student/year = ~$0.08–0.42 PMPM | [ASSUMPTION — university budgets are tighter] |
| YNAB (consumer, for reference) | $9.08 PMPM | [DATA — published pricing] |
| Monarch Money (consumer, for reference) | $8.33 PMPM | [DATA — published pricing] |

**Working range for modeling:**
- Base case: $3 PMPM (university buyer, small contract)
- Upside: $6 PMPM (employer buyer, mid-market)
- Optimistic: $10 PMPM (employer buyer, premium positioning)

**Revision note (June 24, 2026):** The original base case was $6 PMPM, assuming the first institutional contract would come from a mid-market employer. Stress-testing against realistic first-year conditions — no buyer contacted yet, sales cycles running 6–18 months, first movers more likely to be universities or small employers — revised the base case down to $3 PMPM. Every table below uses $3 as the base case; $6 is retained as an upside scenario, not the working assumption, until a buyer confirms it.

**What is untested:** No institution has been approached. No buyer has named a price. These ranges are competitive inference, not a quote. Do not treat the base case as validated until one institution signs a contract.

---

## 2. Cost to Serve One Customer Per Month

Costs are separated by type. Fixed costs are then allocated per user across different user base sizes.

---

### A. Direct variable costs (per user, per month)

**Bank data aggregation — Plaid**
Plaid charges per connected account. Exact pricing is not publicly disclosed and varies by contract, but industry references and startup discussions consistently cite the range below.
- Estimated: $0.30–0.60/user/month [ASSUMPTION — directionally accurate, not an official quote]
- Used in model: **$0.45/user/month**
- This cost applies to every connected user — free and institutional. It is unavoidable if the product connects to bank accounts.

**AI / LLM infrastructure**
Generating a plain-language weekly spending summary for one user requires approximately 800 input tokens + 400 output tokens per summary, four summaries per month.
- At current API pricing for a capable model: ~$0.002–0.009 per summary [DATA — based on published API token pricing]
- Per month (4 summaries): ~$0.01–0.04/user/month
- Used in model: **$0.03/user/month**
- This is genuinely cheap. It is not a meaningful cost driver at early scale.

**Hosting and infrastructure (AWS or equivalent)**
Database storage, API calls, server compute per active user.
- Early stage (under 1,000 users): ~$0.15–0.50/user/month [ASSUMPTION — based on typical SaaS infrastructure costs at small scale]
- Used in model: **$0.25/user/month**
- Drops meaningfully at scale with reserved pricing.

**Payment processing (institutional invoices)**
Institutional contracts are typically invoiced via ACH, not credit card. ACH transaction fees are low and charged per invoice, not per user.
- ACH: ~$0.20–1.00/transaction [DATA — published ACH pricing ranges]
- At 200 users per contract billed monthly: ~$0.003–0.005/user/month
- Used in model: **$0.00/user/month** — negligible, rounds to zero at per-user level.

**Storage, shipping, physical handling**
Not applicable. This is a digital SaaS product. No physical components. [DATA]

**Total direct variable cost per user:**

| Cost item | Monthly cost per user | Basis |
|---|---|---|
| Plaid (bank aggregation) | $0.45 | [ASSUMPTION] |
| AI / LLM API | $0.03 | [DATA — token pricing] |
| Hosting / infrastructure | $0.25 | [ASSUMPTION] |
| Email delivery (weekly summaries) | $0.01 | [DATA — SendGrid transactional pricing] |
| Customer support time | $0.15 | [ASSUMPTION — 3% monthly contact rate, 20 min/contact, $15/hr] |
| Payment processing | ~$0.00 | [DATA — negligible] |
| **Total variable** | **$0.89/user/month** | |

**Revision note:** The original total of $0.73/user/month omitted email delivery and customer support time. Both were added after a full cost-category audit. All calculations below use $0.89/user/month.

---

### B. Your time (valued at $15/hr)

Founder time is real cost even when unpaid. At early stage it is often the largest cost in the model.

Estimated weekly time allocation at early stage:

| Activity | Hours/week | Hours/month | Monthly cost at $15/hr |
|---|---|---|---|
| Product development and maintenance | 15 | 60 | $900 |
| Institutional sales and outreach | 10 | 40 | $600 |
| Compliance and legal coordination | 5 | 20 | $300 |
| Customer success (institutional) | 5 | 20 | $300 |
| Content / free user acquisition | 5 | 20 | $300 |
| **Total** | **40** | **160** | **$2,400/month** |

[ASSUMPTION — hours are estimated. Track actual hours for two weeks and revise.]

**Founder time allocated per user:**

| User base | Monthly founder cost | Cost per user/month |
|---|---|---|
| 100 users | $2,400 | $24.00 |
| 500 users | $2,400 | $4.80 |
| 1,000 users | $2,400 | $2.40 |
| 5,000 users | $2,400 | $0.48 |

Founder time is the largest variable at small scale and drops fast as users grow. This is the most important reason to get to 1,000+ users before the math looks reasonable.

---

### C. Customer acquisition cost (CAC)

**Free users (consumer acquisition)**
If relying on organic content (social media, referrals, no paid ads):
- Content creation time: ~5 hrs/week = 20 hrs/month = $300/month in founder time
- If 50 new free users/month from content: CAC = $6.00/free user [ASSUMPTION]
- If 200 new free users/month: CAC = $1.50/free user [ASSUMPTION]
- Free users generate $0 revenue. Their CAC is a sunk cost until an institution picks them up or they convert.

**Institutional customers (B2B sales)**
One institutional contract covers 50–500 users. The CAC is for the contract, then allocated across users.
- Estimated founder time per institutional sale: 40–100 hours [ASSUMPTION — based on typical SMB/mid-market SaaS sales cycles]
- At $15/hr: $600–$1,500 in founder time per contract [ASSUMPTION]
- Plus any travel, conference attendance, or materials: $0–$500 [ASSUMPTION]
- Total institutional CAC: ~$800–$2,000 per contract [ASSUMPTION]
- Allocated across 200 users per contract: $4–$10 per user (one-time)
- Amortized over 12-month contract: $0.33–$0.83/user/month

---

### D. Fixed costs per month (shared across all users)

These costs exist regardless of how many users you have. They do not scale with users — but they must be covered by revenue from users.

| Fixed cost | Monthly estimate | Basis |
|---|---|---|
| SOC 2 Type II certification (amortized) | $1,250–$3,333 | [ASSUMPTION — $15,000–$40,000/year; required to sell to institutions] |
| Cyber liability insurance | $167–$500 | [ASSUMPTION — $2,000–$6,000/year for fintech with financial data] |
| Data privacy legal / attorney retainer | $500–$1,500 | [ASSUMPTION — required ongoing, especially at launch] |
| Minimum infrastructure (baseline, 0 users) | $100–$200 | [ASSUMPTION] |
| Plaid minimum access fee (if applicable) | $0–$500 | [ASSUMPTION — depends on Plaid tier; startup programs may waive] |
| E&O / professional liability insurance | $42–$167 | [ASSUMPTION — required for a product offering financial guidance; added in cost audit] |
| Software tools (GitHub, Figma, project management) | ~$100 | [ASSUMPTION — added in cost audit] |
| Accounting / bookkeeping | ~$150 | [ASSUMPTION — required once institutional invoices exist; added in cost audit] |
| Email service base fee, backup/data retention, business banking | ~$60 | [ASSUMPTION — added in cost audit] |
| **Total fixed costs** | **$2,369–$6,510/month** | |

**Working fixed cost estimate: $3,980/month** [ASSUMPTION — revised after cost audit, up from the original $3,500 midpoint]

---

## 3. Gross Margin Per Customer

### Free user

| Item | Amount |
|---|---|
| Revenue | $0.00 |
| Variable cost | ($0.89) |
| Gross margin | **($0.89)/month** |

Every free user costs $0.89/month in direct variable costs before founder time or fixed cost allocation. This is the drag the free tier creates. It is manageable at small scale; it becomes a real problem if the free tier grows large and institutional revenue does not follow.

### Institutional user — variable cost margin only

| Scenario | Revenue (PMPM) | Variable cost | Gross margin | Gross margin % |
|---|---|---|---|---|
| Base case ($3) | $3.00 | $0.89 | $2.11 | 70% |
| Upside ($6) | $6.00 | $0.89 | $5.11 | 85% |
| Optimistic ($10) | $10.00 | $0.89 | $9.11 | 91% |

Variable-cost gross margin is strong. This is normal for SaaS — the per-unit direct costs are low once the infrastructure exists. The problem is not the margin per user. It is reaching enough institutional users to cover fixed costs and founder time before cash runs out.

### Institutional user — fully-loaded margin (including founder time and fixed costs)

At 1,000 institutional users, $3,980/month fixed costs, $2,598/month founder time = $6,578/month overhead allocated at $6.58/user/month:

| Scenario | Revenue | Variable cost | Overhead allocation | Fully-loaded margin | Margin % |
|---|---|---|---|---|---|
| Base case ($3) | $3.00 | $0.89 | $6.58 | **($4.47)** | Negative |
| Upside ($6) | $6.00 | $0.89 | $6.58 | **($1.47)** | Negative |
| Optimistic ($10) | $10.00 | $0.89 | $6.58 | **$2.53** | 25% |

At 1,000 institutional users, the model is only profitable at the optimistic pricing tier, and only marginally. Even the upside ($6) tier is still underwater at this scale. At the base case, you are losing more per user than revenue brings in. This is why user volume matters more than margin rate.

At 3,000 institutional users, overhead drops to $2.19/user/month:

| Scenario | Revenue | Variable cost | Overhead allocation | Fully-loaded margin | Margin % |
|---|---|---|---|---|---|
| Base case ($3) | $3.00 | $0.89 | $2.19 | **($0.08)** | Negative (essentially break-even) |
| Upside ($6) | $6.00 | $0.89 | $2.19 | **$2.92** | 49% |
| Optimistic ($10) | $10.00 | $0.89 | $2.19 | **$6.92** | 69% |

3,000 institutional users is roughly 15 contracts of 200 users each. That is a meaningful milestone.

---

## 4. Break-Even on Fixed Costs

**Fixed costs to cover each month: ~$6,578** ($3,980 fixed + $2,598 founder time)

This is the number that has to be exceeded by contribution margin (revenue minus variable costs) to break even.

Contribution margin per institutional user = Revenue PMPM − $0.89 variable cost

| PMPM rate | Contribution margin/user | Users to break even |
|---|---|---|
| $3 (base case) | $2.11 | **3,118 users** |
| $6 (upside) | $5.11 | **1,288 users** |
| $10 (optimistic) | $9.11 | **722 users** |

**Translated into institutional contracts** (assuming 200 users per contract):

| PMPM rate | Users needed | Contracts needed | Monthly revenue at break-even |
|---|---|---|---|
| $3 (base case) | 3,118 | ~16 contracts | $9,354 |
| $6 (upside) | 1,288 | ~7 contracts | $7,728 |
| $10 (optimistic) | 722 | ~4 contracts | $7,220 |

The base case requires 16 signed institutional contracts covering ~200 users each before you stop losing money on monthly operations. This does not include recovering CAC, building cash reserves, or paying yourself a market-rate salary.

**How long does it take to reach 16 contracts?**
At a realistic pace of one contract signed per quarter — already optimistic relative to the 6–18 month institutional sales cycle norm — 16 contracts takes 48 months (4 years) from first outreach. With 20% annual churn on signed contracts factored in, the timeline extends to roughly 60 months (5 years). [ASSUMPTION — based on typical institutional SaaS sales cycles; see the stress test in `financial-model.xlsx`]

This is the central cash flow problem in the model. It does not mean the model fails. It means it requires either outside capital, a faster institutional sales cycle than industry norms, or a higher realized PMPM than the $3 base case to survive on a reasonable timeline. At $6 PMPM (the upside tier, not yet validated by any buyer), the same math produces 7 contracts and a 21-month timeline — which of those two numbers turns out to be real is the single biggest lever in this model.

---

## 5. The Free User Drag — Quantified

Before institutional revenue arrives, you are likely running a free consumer tier to build a user base and prove engagement. Every free user costs $0.73/month in direct variable costs plus their share of fixed overhead.

| Free users | Direct variable cost/month | Fixed overhead/month | Total monthly burn from free tier |
|---|---|---|---|
| 100 | $89 | $6,578 | $6,667 |
| 500 | $445 | $6,578 | $7,023 |
| 1,000 | $890 | $6,578 | $7,468 |

The free user direct cost is not the killer — fixed costs are. But the free tier adds burn without revenue, which extends the runway you need before the first institutional check.

---

## 6. Payback Period on One Institutional Contract

If CAC per contract is $1,500 (midpoint of estimate) and the contract covers 200 users:

| PMPM rate | Monthly contract revenue | Monthly variable cost (200 users) | Monthly contribution | Months to recover $1,500 CAC |
|---|---|---|---|---|
| $3 (base case) | $600 | $178 | $422 | 3.6 months |
| $6 (upside) | $1,200 | $178 | $1,022 | 1.5 months |
| $10 (optimistic) | $2,000 | $178 | $1,822 | 0.8 months |

Payback on CAC is fast once the contract is signed. The problem is not the payback period — it is the 6–18 months of sales time before the contract closes.

---

## 7. What This Means in Plain Language

The unit economics of this model are structurally sound at the per-user level. High gross margin on variable costs is normal for SaaS. The model does not fail because users are unprofitable — they are profitable at almost any institutional price point.

The model fails if:
1. **Institutional sales take too long.** At 18+ months per cycle, you burn runway before revenue arrives.
2. **Contracts are too small.** A university offering free access to 50 graduating seniors at $3 PMPM is $150/month — not enough to matter.
3. **The free tier grows faster than institutional revenue.** If you acquire 5,000 free users and sign zero institutional contracts, you are spending ~$4,450/month on direct costs with zero return.
4. **Pricing lands in the university tier, not the employer tier.** This is already the base case, not a downside scenario — at $3 PMPM you need 16 contracts to break even. At $6 PMPM (unvalidated) you'd need 7. The difference between those two numbers is the single biggest swing factor in the model.

---

## 8. What Still Needs to Be Validated Before Trusting These Numbers

| Number | Status | How to validate |
|---|---|---|
| Institutional PMPM rate | [ASSUMPTION] — competitive estimate only | Speak with one HR benefits buyer and one financial aid director. Ask what they currently pay per user for comparable programs. |
| Plaid cost per user | [ASSUMPTION] — ~$0.45/month approximate | Request a Plaid pricing call. Their startup program (Plaid Layer) may have different terms. |
| Users per institutional contract | [ASSUMPTION] — 200 is a guess | Depends on employer size or university cohort. Could be 50 (small) or 1,000 (large). Changes break-even substantially. |
| Institutional sales cycle length | [ASSUMPTION] — 6–18 months from industry norms | One conversation with a comparable SaaS founder who has sold to HR or university buyers. |
| SOC 2 cost | [ASSUMPTION] — $15,000–$40,000/year | Request a quote from a SOC 2 audit firm (Vanta, Drata, or a traditional auditor). This is easy to get. |
| Founder hours per week | [ASSUMPTION] — 40 hrs/week estimated | Track actual hours for two weeks. Reallocate the model. |
| Free-to-institutional conversion | Not modeled — entirely unknown | What percentage of free users eventually fall under an institutional contract? No data exists. |

---

## Summary Table

| Metric | Base Case | Upside | Optimistic |
|---|---|---|---|
| Institutional PMPM rate | $3 | $6 | $10 |
| Variable cost per user | $0.89 | $0.89 | $0.89 |
| Gross margin per user (variable only) | $2.11 (70%) | $5.11 (85%) | $9.11 (91%) |
| Monthly overhead (fixed + founder) | $6,578 | $6,578 | $6,578 |
| Institutional users to break even | 3,118 | 1,288 | 722 |
| Contracts needed (at 200 users/contract) | ~16 | ~7 | ~4 |
| Months to break even (at 1 contract/quarter) | 48 months | 21 months | 12 months |
| CAC payback (per contract) | 3.6 months | 1.5 months | 0.8 months |

[All numbers except published competitor pricing and AI token pricing are assumptions until validated by institutional conversations.]
