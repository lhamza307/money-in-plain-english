# Unit Economics: Direct-to-Consumer Subscription Model

**Built:** June 2026. **Revised:** July 2026 (Freemium → B2B2C base case, $6→$3 PMPM). **Revised again:** July 2026 — pivot to direct-to-consumer paid subscription following a founder-led product-scoping conversation that defined the v1 build (Sunday Summary, self-calibrating budget, multi-account bank linking, transaction correction/learning, and an AI chatbot). This is a founder decision, not new interview evidence — see `VENTURE.md`'s Revenue Model section for the full reasoning. B2B2C is not deleted from the project's history; it is retained in `business-model-canvas.md` as a deprioritized future option. Every table below models the subscription structure. If a number here ever diverges from `VENTURE.md`, `business-model-canvas.md`, or `financial-model.xlsx`, trust those first.
**Evidence base:** 5 interviews (3 confirmed target customers with direct pricing reactions: Tamara $5–8/mo, Dooney $15–20/mo, Emily ~$10/mo), competitive landscape research, public vendor pricing. None of the three interviewees reacted to the specific bundled concept (chatbot included) this model now prices.
**Every number is labeled: [DATA] = grounded in evidence, [ASSUMPTION] = estimated, flag before using**

---

## First: Define the "Customer" Unit

This model now has one customer type moving through two phases, rather than two permanently separate customer types.

- **Free-trial user (weeks 1–4):** Costs money. Generates $0. Everyone starts here — the same person the trial converts (or doesn't) is the one who becomes a paying subscriber.
- **Paying subscriber (month 2 onward):** Generates $7.99/month. This is where the money is.

This is a structural change from the prior B2B2C model, where "free user" and "institutional user" were two different people entirely (a consumer who never paid, and an employee/student covered by a separate institutional contract). Under the subscription model there is no indefinite unmonetized tail — a trial user either converts within four weeks or stops costing money because they've left. The number that now matters most is **trial-to-paid conversion rate**, which has zero data behind it.

---

## 1. Revenue Per Customer

### Free-trial user (weeks 1–4)
**Revenue: $0/month** [DATA — by design]

Every trial user generates zero revenue for up to four weeks (four Sunday Summaries), timed to the self-calibrating budget feature so people see the product's core differentiator before being asked to pay.

### Paying subscriber

**Working price: $7.99/month** [ASSUMPTION — founder-set, informed by but not directly tested against this exact concept]

No interviewee reacted to the exact bundled concept now in scope (Sunday Summary + self-calibrating budget + multi-account merge + AI chatbot). The closest evidence is the pricing gradient from three different people reacting to three different, narrower concepts:

| Source | Concept reacted to | Price named | Reliability |
|---|---|---|---|
| Tamara (Interview 3) | Passive summary, zero setup, no suggestions | $5–8/month | [DATA — stated reaction to a hypothetical, one person] |
| Emily (Interview 5) | Light setup, overspend flags, margin-adjustment suggestions | ~$10/month, benchmarked to Spotify | [DATA — stated reaction, one person; strongest purchase intent in the project] |
| Dooney (Interview 4) | Full dashboard, pie charts, cut-back suggestions | $15–20/month | [DATA — stated reaction, one person; different concept, not directly comparable] |
| YNAB (consumer, for reference) | — | $9.08/month | [DATA — published pricing] |
| Monarch Money (consumer, for reference) | — | $8.33/month | [DATA — published pricing] |

**Working price for modeling: $7.99/month** — sits below the Tamara–Emily–Dooney gradient midpoint and below both YNAB and Monarch, on the reasoning that a new, unproven product should price slightly under established competitors even though this concept (with the chatbot) is arguably richer than anything those three interviewees actually saw.

**What is untested:** Whether $7.99 holds against the specific bundle now in scope. Whether the chatbot changes what someone will pay, versus the passive Sunday Summary alone — never asked. Whether people will pay before or only after experiencing the four-week trial.

---

## 2. Cost to Serve One Customer Per Month

Costs are separated by type, and now apply identically to trial users and paying subscribers — the product is fully functional during the trial, so the cost to serve someone doesn't change when they start paying.

---

### A. Direct variable costs (per user, per month)

**Bank data aggregation — Plaid**
- Used in model: **$0.45/user/month** [ASSUMPTION — unchanged from prior model; industry-referenced, not an official quote]
- Applies to every connected user, trial or paying. Unavoidable given the bank-linked architecture.

**AI / LLM infrastructure — Sunday Summary generation**
- ~800 input + 400 output tokens per summary, 4 summaries/month (weekly cadence).
- Used in model: **$0.03/user/month** [DATA — based on published API token pricing; unchanged from prior model]

**AI / LLM infrastructure — chatbot (NEW)**
The pivot to include an AI chatbot for open-ended money questions adds a cost category the prior model did not have. Chatbot usage is open-ended rather than fixed-cadence, so this is a rougher estimate than the Sunday Summary cost above.
- Assumption: ~15 chatbot exchanges/user/month, each requiring more context than a summary (categorized transactions + budget state) — roughly 2,000 input + 300 output tokens per exchange.
- Estimated: **$0.15–0.40/user/month** [ASSUMPTION — no real usage data exists yet; this is the least-grounded cost line in the model]
- Used in model: **$0.25/user/month**
- **This needs to be revised as soon as the pilot group generates real chatbot usage data** — it is the single biggest unknown in the cost stack, both in typical exchange volume and in whether a cheaper model can be used for simpler questions.

**Hosting and infrastructure (AWS or equivalent)**
- Used in model: **$0.25/user/month** [ASSUMPTION — unchanged from prior model]

**Email / push notification delivery**
- Used in model: **$0.01/user/month** [DATA — transactional pricing; unchanged from prior model]

**Customer support time**
- Used in model: **$0.15/user/month** [ASSUMPTION — 3% monthly contact rate, 20 min/contact, $15/hr; unchanged from prior model]

**Total direct variable cost per user:**

| Cost item | Monthly cost per user | Basis |
|---|---|---|
| Plaid (bank aggregation) | $0.45 | [ASSUMPTION] |
| AI / LLM — Sunday Summary | $0.03 | [DATA — token pricing] |
| AI / LLM — chatbot | $0.25 | [ASSUMPTION — no usage data yet] |
| Hosting / infrastructure | $0.25 | [ASSUMPTION] |
| Email / push delivery | $0.01 | [DATA] |
| Customer support time | $0.15 | [ASSUMPTION] |
| **Total variable** | **$1.14/user/month** | Up from $0.89 under the prior model, entirely due to the chatbot |

---

### B. Your time (valued at $15/hr)

Unchanged from the prior model — the founder-time estimate was never specific to the revenue model.

| Activity | Hours/week | Hours/month | Monthly cost at $15/hr |
|---|---|---|---|
| Product development and maintenance | 15 | 60 | $900 |
| Customer support / pilot feedback | 10 | 40 | $600 |
| Compliance and legal coordination | 5 | 20 | $300 |
| Content / acquisition | 10 | 40 | $600 |
| **Total** | **40** | **160** | **$2,400/month** |

[ASSUMPTION — hours are estimated. The "institutional sales and outreach" line from the prior model is replaced with consumer acquisition/content, since there's no institutional sales motion in the current plan.]

---

### C. Customer acquisition cost (CAC) — the new load-bearing unknown

Under B2B2C, CAC for the free consumer tier was a minor cost (organic content, ~$1.50–$6/free user) because the institution bore the cost of distributing to paying users. **Under direct-to-consumer subscription, the venture bears full acquisition cost for every paying subscriber — there is no institutional distribution to lean on.** This is a structurally different risk than the timing risk the B2B2C model had, and it has zero data behind it.

- Cost per free-trial signup: unknown — depends entirely on channel (the three channel experiments in `channel-experiments.md` are all designed around free organic reach, not paid acquisition)
- Trial-to-paid conversion rate: **unknown — zero data.** This is now the single most important number in the model, the same way institutional PMPM was the single most important number under the old model.
- True CAC per paying subscriber = (cost to acquire one trial signup) ÷ (trial-to-paid conversion rate). If conversion is low, CAC per paying subscriber could be very high even if signups themselves are cheap.

**What needs to be tested:** actual trial-to-paid conversion rate from the pilot group. Nothing else in this section can be estimated responsibly until that exists.

---

### D. Fixed costs per month (shared across all users)

Unchanged from the prior model — SOC 2, insurance, legal, infrastructure, tools, and accounting costs don't depend on the revenue model.

| Fixed cost | Monthly estimate | Basis |
|---|---|---|
| SOC 2 Type II certification (amortized) | $1,250–$3,333 | [ASSUMPTION] |
| Cyber liability insurance | $167–$500 | [ASSUMPTION] |
| Data privacy legal / attorney retainer | $500–$1,500 | [ASSUMPTION] |
| Minimum infrastructure (baseline, 0 users) | $100–$200 | [ASSUMPTION] |
| Plaid minimum access fee (if applicable) | $0–$500 | [ASSUMPTION] |
| E&O / professional liability insurance | $42–$167 | [ASSUMPTION] |
| Software tools (GitHub, Figma, project management) | ~$100 | [ASSUMPTION] |
| Accounting / bookkeeping | ~$150 | [ASSUMPTION] |
| Email service base fee, backup/data retention, business banking | ~$60 | [ASSUMPTION] |
| **Total fixed costs** | **$2,369–$6,510/month** | |

**Working fixed cost estimate: $3,980/month** [ASSUMPTION — unchanged]

**Founder time cost: $2,598/month** (40 hrs/week × 4.33 weeks/month × $15/hr — same rate and hours as the prior model, just reallocated across activities in section B above)

**Total monthly overhead (fixed + founder time): $6,578/month** — unchanged from the prior model, since neither fixed costs nor founder time depend on the revenue model.

---

## 3. Gross Margin Per Subscriber

### Free-trial user

| Item | Amount |
|---|---|
| Revenue | $0.00 |
| Variable cost | ($1.14) |
| Gross margin | **($1.14)/month, for up to 4 weeks** |

### Paying subscriber

| Item | Amount |
|---|---|
| Revenue | $7.99 |
| Variable cost | ($1.14) |
| **Gross margin (variable only)** | **$6.85 (85.7%)** |

This is a meaningfully higher variable-cost margin than any institutional PMPM tier in the prior model (70% at $3 PMPM, 91% at $10 PMPM optimistic) — direct consumer pricing captures more per user than an institutional per-member rate did, even after adding the chatbot's cost.

### Fully-loaded margin (including founder time and fixed costs)

At 1,000 paying subscribers, $6,578/month overhead allocated at $6.58/subscriber/month:

| | Revenue | Variable cost | Overhead allocation | Fully-loaded margin | Margin % |
|---|---|---|---|---|---|
| At 1,000 subscribers | $7.99 | $1.14 | $6.58 | **$0.27** | 3% |

Even at the working $7.99 price, 1,000 subscribers is barely profitable per-subscriber once overhead is allocated — the real question is reaching enough subscribers, not whether the per-subscriber economics work in isolation (they do, at 85.7% variable-cost margin).

---

## 4. Break-Even on Fixed Costs

**Fixed costs to cover each month: ~$6,578** (unchanged — this doesn't depend on the revenue model)

Contribution margin per paying subscriber = $7.99 − $1.14 = **$6.85**

**Paying subscribers needed to break even: $6,578 ÷ $6.85 ≈ 961 subscribers**

This is dramatically fewer than the institutional model required (3,118 institutional users at the $3 PMPM base case) — direct subscription revenue per user is worth roughly 2.7× the old base case's contribution margin per user. **This does not mean the venture is closer to break-even in practice** — it means the bottleneck has moved from "close institutional contracts" (a slow, known sales-cycle problem) to "acquire and convert 961 individual paying subscribers" (a consumer acquisition and retention problem with zero data behind it yet).

**What this number doesn't include:** customer acquisition cost, trial-period drag while a subscriber is still in their free four weeks, or subscription churn — all real costs that reduce the effective number of paying subscribers at any given time versus the cumulative number of people who ever signed up.

---

## 5. Free-Trial Drag and the Role of Conversion Rate

Under B2B2C, free users were a *permanent* cost center — the hope was that an institution would eventually pay for some of them, but many never would. Under the subscription model, every subscriber passes through a *temporary* four-week trial drag and then either converts (starts generating $6.85/month contribution margin) or leaves (stops costing anything). This is a more forgiving dynamic than the old model's indefinite free-tier drag, but it makes conversion rate — not institutional sales cycle length — the single biggest lever in the model.

| Trial users at any given time | Monthly variable cost | Notes |
|---|---|---|
| 25 | $28.50 | Roughly the guinea-pig pilot scale |
| 100 | $114 | |
| 500 | $570 | |

At any of these scales, the trial-period cost itself is small. The real cost is opportunity cost: time and acquisition spend on people who don't convert.

---

## 6. Payback Period on Acquisition Cost

Payback period can't be calculated responsibly yet — it depends on CAC per paying subscriber, which depends on trial-to-paid conversion rate, which has zero data. Once the pilot group produces a real conversion number, this section should be rebuilt using: (cost to acquire one trial signup) ÷ conversion rate = CAC per paying subscriber, then CAC ÷ $6.85 monthly contribution margin = months to payback.

---

## 7. What This Means in Plain Language

The pivot to direct-to-consumer subscription improves the per-subscriber economics substantially — 85.7% variable-cost gross margin and roughly 961 subscribers to cover fixed overhead, versus 3,118 institutional users under the old base case. That's the good news, and it's a real improvement, not just an optimistic reframing.

The bad news is that the model now depends on a number that has never been tested even once: **trial-to-paid conversion rate.** The old model's biggest risk (institutional sales cycle length) was at least bounded by industry norms (6–18 months). Consumer subscription conversion rates vary enormously by product and execution — there's no equivalent industry anchor cited anywhere in this project's competitive research. This is the next number to chase, the same way institutional PMPM was the number to chase under the old model.

The chatbot also introduces a cost the model has never had before, and it's the least-grounded number in this document ($0.25/user/month, estimated with no real usage data). If actual chatbot usage runs much higher than assumed — for example, if users treat it as a general-purpose AI assistant rather than a narrow money-questions tool — this cost line could grow well beyond what's currently modeled.

---

## 8. What Still Needs to Be Validated Before Trusting These Numbers

| Number | Status | How to validate |
|---|---|---|
| Trial-to-paid conversion rate | Not modeled — zero data | Track the guinea-pig pilot group through their 4-week trial and see how many convert. This is now the single most important number in the model. |
| $7.99 subscription price | [ASSUMPTION] — founder-set, informed by but not tested against this bundled concept | Ask the pilot group directly, after they've used the Sunday Summary + chatbot, what they'd actually pay. |
| Chatbot AI cost per user | [ASSUMPTION] — no usage data exists | Track real token usage from the pilot group's chatbot conversations. |
| Consumer CAC (cost per trial signup, and per converted subscriber) | Not modeled — zero data | Run the channel experiments in `channel-experiments.md` and track actual signups and conversions, not just clicks. |
| Plaid cost per user | [ASSUMPTION] — ~$0.45/month approximate | Request a Plaid pricing call, or check current Trial-plan/Production pricing directly with Plaid. |
| Subscription churn rate | Not modeled — zero data | Only measurable once there's a real subscriber base and enough months of history. |
| SOC 2 cost | [ASSUMPTION] — $15,000–$40,000/year | Request a quote from a SOC 2 audit firm (Vanta, Drata, or a traditional auditor). |
| Founder hours per week | [ASSUMPTION] — 40 hrs/week estimated | Track actual hours, especially once the pilot is live and support/feedback load is real. |

---

## Summary Table

| Metric | Value |
|---|---|
| Subscription price | $7.99/month [ASSUMPTION] |
| Free trial length | 4 weeks (4 Sunday Summaries) |
| Variable cost per user | $1.14/month (up from $0.89 under the prior model, due to the chatbot) |
| Gross margin per subscriber (variable only) | $6.85 (85.7%) |
| Monthly overhead (fixed + founder) | $6,578 (unchanged from the prior model) |
| Paying subscribers to break even | ~961 (down from ~3,118 institutional users under the old $3 PMPM base case) |
| Biggest unknown | Trial-to-paid conversion rate — zero data, the new equivalent of the old model's untested institutional PMPM rate |

[All numbers except published competitor pricing and AI token pricing are assumptions until validated by the pilot group's actual usage and conversion behavior.]
