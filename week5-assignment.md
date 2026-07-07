# Revenue Model and Financial Analysis
**Course:** Venture Creation
**Venture:** AI-Connected Personal Finance Tool for Recent Graduates
**Period covered:** Year 1 operating snapshot (Month 12 steady-state)
**Date:** June 2026

> **Source note:** A separate `revenue-model-analysis.md` file was not found in the project directory. This report draws from `week5-progress.md` (revenue model stress test), `unit-economics.md` (cost model and audit), `pricing-test.md` (validation plan), and `financial-model.xlsx` (three-scenario model). For detailed line-item tables, see the Excel file.

> **Notation:** Every figure is labeled [DATA] if grounded in a published source, stated price, or observed fact, or [ASSUMPTION] if estimated, inferred from competitive research, or not yet validated by a customer or buyer conversation.

---

## 1. Revenue Model Selection

### Models Evaluated and Eliminated

**B2C Subscription** was the first model assessed and the first eliminated. Competitors YNAB (~$109/year [DATA]) and Monarch Money (~$100/year [DATA]) establish that a $9/month price point exists in the market. The problem is not the price — it is who is being asked to pay it and when. The target customer, represented by Noor (24), currently pays $0 for any financial management tool [DATA — interview]. She did not describe wanting a product at any point in her interview. Asking for a monthly subscription requires trust, payment, and sustained engagement to occur simultaneously from someone who has not yet decided she needs the product. Tally, which raised significant capital on a compelling fintech subscription premise, could not retain subscribers at scale and shut down [DATA — public record]. The B2C subscription model fails at acquisition before it reaches economics.

**One-time purchase** was eliminated immediately. Bank data aggregation, AI inference, and compliance infrastructure all carry recurring costs. A product that requires a permanent live connection to a user's bank account cannot be funded by a single payment. No competitive precedent exists for this structure in personal finance software [DATA — competitive research].

**Transaction fee** was not applicable. The product does not facilitate payments or transfers. There is no transaction to attach a fee to.

**Referral and affiliate revenue** — the Credit Karma model — was considered and set aside on two grounds. First, it requires enough user volume to generate meaningful revenue; at early-stage scale the dollar amounts are negligible. Second, and more important, the product's stated purpose is improving the financial health of users who are already carrying student loan debt and credit card balances. Recommending financial products to those users — the mechanism by which affiliate revenue is earned — creates a direct conflict between how the business makes money and what the business is supposed to do for its users. That misalignment is disqualifying given the venture's stated positioning.

**Freemium alone** was recognized as a valid acquisition strategy but not a revenue model. Two competitors — EveryDollar and Rocket Money — use it [DATA — competitive research]. User complaints about both products consistently cite upgrade pressure and upgrade prompts as friction [DATA — competitive review aggregators]. The free tier resolves the acquisition problem — it gets Noor in without requiring upfront payment — but it does not resolve the revenue problem. Plaid charges per connected account regardless of whether that user is paying [ASSUMPTION — industry pricing estimates; no official Plaid quote obtained]. A free tier is a cost center, not a business model.

### Chosen Model: Freemium → B2B2C

The selected structure combines a free consumer tier with institutional revenue. The consumer tier exists to build a user base and generate engagement data. Revenue comes not from the user but from the employer or university that pays to provide the product as a benefit, at a per-member-per-month (PMPM) rate. The user receives the product at no cost. The institutional buyer has an established budget line for employee or student financial wellness.

This model was chosen not because the data confirms it but because it is the path most consistent with what the data shows: a target customer who has not asked for a product, has never paid for one, and whose adoption barrier is activation energy rather than price. It also addresses the unit economics correctly — the institutional PMPM rate produces margins high enough to sustain the business, while B2C subscription from a low-commitment user likely does not.

### How Money Moves

The flow has two phases that are sequential, not parallel. In the first phase, the free consumer tier operates at a loss. Users connect their bank accounts, receive weekly spending summaries, and generate engagement data. Every free user costs approximately $0.89/month in direct variable costs [ASSUMPTION] with $0 return. The founder absorbs this cost while building a user base that institutional buyers will eventually pay to access.

In the second phase, an HR director or university financial aid administrator — not Noor — signs a contract. The institution pays a PMPM rate that covers the cost of serving every user under that contract plus a contribution toward overhead. The user never sees a bill. The institution pays once per month via invoice; Plaid costs, AI costs, and hosting costs are covered by that payment. The institutional contract is the only moment in this model when money changes hands.

The structural problem with this flow is timing: phase one must be substantially complete before phase two begins, because institutional buyers will not sign contracts without engagement data to evaluate. The gap between the end of phase one and the arrival of the first institutional check — roughly 18 to 36 months at realistic sales cycle speeds [ASSUMPTION — industry B2B SaaS norms] — is the primary financial risk in the model.

### Evidence For and Against

The case for this model rests on market structure, not customer validation. Employer financial wellness is an established category with real vendors — LearnLux, Financial Finesse, SmartDollar — which confirms that HR buyers have budget lines for this type of product [DATA — public company information]. Universities already purchase student financial wellness tools from EVERFI and iGrad [DATA — public vendor information]. The institutional buyer exists; the question is whether this specific product can reach them.

The case against is the absence of any institutional validation whatsoever. No employer has been approached. No university has been contacted. No buyer has named a price. The $3–$6 PMPM working range in the financial model is competitive inference, not a quote [ASSUMPTION]. The model also requires a consumer free tier to prove engagement before institutional sales are possible, which means two separate problems — consumer adoption and institutional sales — must both be solved sequentially before the business generates revenue.

---

## 2. Unit Economics Analysis

### Revenue Per Institutional User

The revenue side of this model is simple and entirely dependent on one unvalidated number. An institutional user generates between $3 and $10 per month, depending on the buyer type and contract terms [ASSUMPTION — competitive market estimates]. The conservative figure of $3/month reflects what university buyers appear to pay for comparable student financial wellness tools, based on public information about vendors like iGrad and EVERFI. The $6/month base case reflects mid-market employer pricing based on comparable programs. The $10/month optimistic figure reflects premium employer positioning. None of these numbers comes from a buyer conversation. The base case was revised from $6 to $3 during stress-testing to reflect the realistic likelihood that the first institutional contracts in Year 1 will come from universities or smaller employers, not premium mid-market accounts. A free consumer user generates $0 in direct revenue by design. For detailed per-scenario revenue figures, see `financial-model.xlsx`, Section 2, Revenue block.

### Variable Costs and Why They Are What They Are

Variable costs are the costs that scale directly with connected users, paid or free. The dominant cost is Plaid, the bank data aggregation service that makes automatic spending categorization possible. Plaid charges per connected account per month [DATA — Plaid pricing model, publicly documented]. The estimated rate of $0.45/user/month in the base case [ASSUMPTION — derived from industry startup discussions; no official quote] is the single most important variable cost assumption in the model because it applies to every connected user regardless of whether they pay. A free user costs as much to aggregate as an institutional user. At scale, this cost drops through volume negotiated rates, but at early stage it is fixed per user.

The remaining variable costs are genuinely small and collectively manageable. AI and LLM inference — generating the weekly plain-language spending summary that is the product's core output — costs approximately $0.03/user/month [DATA — calculated from published API token pricing at approximately 800 input tokens + 400 output tokens × 4 summaries/month]. This is not a meaningful cost driver and will not be even at 10,000 users. Hosting and infrastructure costs approximately $0.25/user/month at early stage [ASSUMPTION], with meaningful downward movement as reserved-instance pricing becomes available above 1,000 users. Email delivery for the weekly summary adds approximately $0.01/user/month [DATA — derived from published SendGrid transactional pricing]. Customer support time — founder hours spent fielding user questions — is estimated at $0.15/user/month in the base case [ASSUMPTION — 3% monthly contact rate, 20 minutes per contact, $15/hour founder rate]. Total variable cost per user in the base case is $0.89/month. In the pessimistic scenario, where the Plaid rate is higher and support volume is worse, it rises to $1.32/month. In the optimistic scenario, with negotiated rates and lower contact rates, it drops to $0.66/month. For the full per-item breakdown, see `financial-model.xlsx`, Section 1, Variable Cost Assumptions.

### Fixed Costs and Why They Are What They Are

Fixed costs exist regardless of user count and are the more dangerous part of the cost structure at early stage, because they accrue before any revenue arrives and do not respond to user growth. The largest fixed cost is SOC 2 Type II certification, amortized at $2,083/month in the base case [ASSUMPTION — $25,000/year midpoint of $15,000–$40,000 range; no vendor quote obtained]. SOC 2 is not optional if the goal is institutional sales: no HR director will sign a contract to give bank-linked financial data to a vendor that cannot demonstrate a security audit. The second-largest fixed cost is data privacy legal counsel, estimated at $1,000/month in the base case [ASSUMPTION] to cover the ongoing requirements of handling financial data under state and federal privacy law. Cyber liability insurance adds $333/month [ASSUMPTION]; this is required for any fintech product and was confirmed as a real cost category by competitive research, though no actual quote was obtained.

Several costs were missing from the original model and added after a cost audit: errors and omissions (E&O) professional liability insurance, which is required for a product offering financial guidance ($104/month in the base case [ASSUMPTION]); software tools including GitHub, Figma, and project management ($100/month [ASSUMPTION]); accounting and bookkeeping, which becomes non-optional once institutional invoices exist ($150/month [ASSUMPTION]); email service base fees, backup and data retention, and business banking fees, which together add approximately $60/month [ASSUMPTION]. None of these items are individually large. Collectively they represent costs that are often omitted from early-stage models and that add up to real money. Base case fixed costs total $3,980/month after the audit, up from the original estimate of $3,500/month.

### Margins at $0/hr and $15/hr

The difference between these two calculations is whether founder time is treated as a real cost. At $0/hour, the model assumes founder labor is free — a common implicit assumption in early-stage financial models that obscures the true break-even point. At $15/hour, the model includes founder opportunity cost at 40 hours/week in the base case (50 hours/week in the pessimistic scenario, where problems are harder and take longer to solve). At $15/hour, founder time costs $2,598/month in the base and optimistic scenarios.

At $0/hour, the base case at Month 12 produces a monthly loss of $4,003, which annualizes to approximately $48,036. This represents the pure cash burn — money that must actually leave an account each month to keep the business operating. At $15/hour, the monthly loss rises to $6,601, annualizing to $79,212. The $2,598 difference is not cash in the traditional sense — it is runway, and it represents the founder's time that could be deployed elsewhere. The optimistic scenario is the only scenario that produces a positive result at Month 12: +$4,203/month at $0/hour and +$1,605/month at $15/hour. In the pessimistic scenario, losses at $15/hour reach $9,408/month — the largest component of which is not fixed costs or variable costs but founder time at 50 hours/week. For full scenario detail, see `financial-model.xlsx`.

### What the Cost Audit Revealed

The audit of the original unit economics model produced one finding with significant structural implications and several smaller corrections. The significant finding was app store fees: if the product is a mobile application and consumers purchase upgrades through Apple's or Google's in-app purchase system, the platforms take 30% of every transaction [DATA — Apple and Google published developer terms]. On a $6/month consumer subscription, Apple takes $1.80, leaving $4.20 net — a fee larger than the entire variable cost stack combined. This does not affect institutional contract revenue, which is invoiced directly outside app stores, but it would affect any consumer upgrade revenue and must be resolved architecturally before a consumer payment flow is designed. The mitigation is routing consumer payments through a web checkout (Stripe charges approximately 2.9% + $0.30 per transaction [DATA — Stripe published pricing]) rather than in-app purchase. This decision must be made before building, not after.

The smaller corrections — E&O insurance, software tools, accounting, email base fees, backup, business banking — are individually minor but represent a category of costs that commonly disappear from early-stage models because they feel administrative. They are real and recurring. They moved the fixed cost estimate from $3,500 to $3,980/month and the total monthly overhead from $5,900 to $6,578.

---

## 3. Financial Model Summary

The table below summarizes the three scenarios at a Month 12 monthly snapshot. "Items" is the PMPM rate — the price of each institutional user slot. "Sell-through" is the institutional user count — how many of those slots are actually occupied and generating revenue at Month 12. "Storage" is the free user drag — the monthly cost of carrying users who generate no revenue, analogous to the carrying cost of unsold inventory. "Net at $15/hr" and "Net at $0/hr" are the monthly bottom-line results with and without founder time valued. All figures marked [A] are assumptions; [D] are data.

| | Pessimistic | Base | Optimistic |
|---|---|---|---|
| **Items** (PMPM rate) | $3 [A] | $3 [A] | $10 [A] |
| **Sell-through** (institutional users, Month 12) | 100 [A] | 200 [A] | 800 [A] |
| **Storage** (free user drag cost/month) | $198 [A] | $445 [A] | $792 [A] |
| Monthly revenue | $300 | $600 | $8,000 |
| Total variable costs | $330 | $623 | $1,320 |
| Total fixed costs | $6,130 [A] | $3,980 [A] | $2,477 [A] |
| **Net at $0/hr** (cash costs only) | **-$6,160** | **-$4,003** | **+$4,203** |
| **Net at $15/hr** (founder time included) | **-$9,408** | **-$6,601** | **+$1,605** |
| Gross margin on inst. variable costs | 56% | 70% | 93% |
| Contribution margin per user | $1.68 | $2.11 | $9.34 |
| Institutional users to break even | 5,582 | 3,118 | 544 |
| Contracts to break even | 56 | 16 | 3 |
| Months to break even (1 contract/quarter) | 168 | 48 | 9 |

*Full line-item detail — including all variable cost components, each fixed cost line, and the full break-even derivation — is in `financial-model.xlsx`.*

### What These Numbers Mean

The gross margin figures (56–93%) look strong, and in isolation they are. SaaS businesses typically target 70–80% gross margins on variable costs, and the optimistic and base case both achieve that or better. But gross margin on variable costs is the wrong number to watch in this model. The real constraint is the fixed cost base, which is large relative to revenue because the number of institutional users in Year 1 is small. In the base case, $600 in monthly revenue sits against $6,578 in fixed overhead and founder time. The per-user economics work; the scale does not.

The pessimistic scenario deserves particular attention. A break-even requirement of 56 contracts, at one contract per quarter, implies 168 months — 14 years — to operational self-sufficiency. That is not a projection; it is a signal that the pessimistic scenario describes a business that cannot exist without outside capital or a structural change. The pessimistic scenario differs from the base case in three compounding ways: higher variable costs per user because Plaid rates are assumed higher and support load is worse; higher fixed costs because compliance and legal costs are at their upper range; and more founder hours per week, which means more founder time cost. None of those three differences is large individually. Together they produce a model that is materially different from the base case.

The optimistic scenario is the only one that reaches positive cash flow at Month 12, and only at $10 PMPM — a price that has not been confirmed by any buyer. At $10 PMPM with 800 institutional users across four signed contracts, the monthly net at $15/hour is $1,605. That is not a thriving business, but it is a solvent one. The significant difference between the optimistic and base case is not primarily the price — it is the combination of price, volume, and lower fixed costs. The optimistic scenario assumes compliance costs are at their low end (startup audit programs, lower insurance premiums) and that institutional sales close faster than average.

### What Would Need to Change for Break-Even

Three variables move the base case break-even more than anything else, in descending order of impact. The first is contract size — how many users are covered per contract. The model assumes 200 users per contract. If the first institutional buyer covers 500 employees rather than 200, the contracts-to-break-even figure in the base case drops from 16 to approximately 7. This is why the most important question in any buyer conversation is not only "what do you pay?" but "how many employees or students would be covered?" The second variable is PMPM rate. The difference between $3 and $6 per user cuts break-even contracts in half — from 16 to 7 in the base case. That single number, which is currently an assumption, is the one that most directly determines whether the model is viable in four years or in two. The third variable is how fast institutional contracts close. The break-even calculations above assume one contract per quarter, which is already optimistic relative to the 6–18 month sales cycle norm for institutional SaaS [ASSUMPTION — industry B2B norms]. A first contract that closes in month 6 rather than month 12 changes the full-year cash picture meaningfully.

The stress test appended to `financial-model.xlsx` — one contract, 200 users, 20% annual churn — shows what happens when all three variables move against the base case simultaneously: monthly loss reaches $6,685, break-even contracts rise to 20, and break-even timeline extends to 60 months. That scenario is not catastrophic because unit economics are wrong. It is catastrophic because fixed overhead is constant while revenue is constrained by sales cycle speed.

---

## 4. Pricing Test Plan

### Hypothesis

**Primary (institutional):** An HR benefits decision-maker at a mid-size employer will confirm a budget line for employee financial wellness programs and will describe a price per employee per month that overlaps with the $3–$6 PMPM range that the financial model requires. Evidence: employer financial wellness is an established vendor category (LearnLux, SmartDollar, Financial Finesse exist and have customers [DATA — public company records]). Counter-evidence: no employer has been approached, no buyer has named a price, and the entire PMPM range in the model is competitive inference [ASSUMPTION].

**Secondary (consumer):** A target customer shown a $4.99/month price for automatic, no-setup spending awareness will react with a follow-up product question — not a price objection — indicating that the price is not the primary adoption barrier. Evidence: the primary adoption barrier identified in interviews is activation energy and trust, not price sensitivity per se. Counter-evidence: Noor currently pays $0 for anything in this category [DATA — interview] and did not ask for a product at any point in her interview.

### Test Method

Both tests use a direct-ask structure. A landing page or pre-sale would require product mockups and infrastructure that do not yet exist. A Wizard of Oz test would require a customer who has decided they want the thing, and no customer has. Direct conversation reaches the right respondents this week with no setup cost and produces the most candid answers — especially for institutional buyers, who respond to a founder doing research and asking for their expertise, not to a landing page.

### Steps

**Tuesday:** Identify five people in the network who work in or adjacent to HR benefits, total rewards, or people operations. Sources: LinkedIn first-degree connections, family contacts, Rollins alumni network, entrepreneurship faculty introductions. Draft the outreach message: *"I'm a student at Rollins College designing a financial wellness tool for early-career employees. I'm not pitching — I want to understand how employers think about this benefit category and what they typically pay for it. Would you have 15 minutes this week?"* Send to all five by end of day.

**Wednesday:** Send any remaining outreach messages. Contact Rollins' own financial aid office directly — they are a university buyer and the easiest first door to open. Confirm at least two conversations for Thursday. Schedule one consumer interview with someone who fits the Noor profile: 22–27, first real job, student loans, no formal financial system.

**Thursday:** Conduct two institutional buyer conversations (15 minutes each). Questions in order: (1) What financial wellness programs does your company currently offer? (2) Do you have a sense of what employers pay per employee per month for programs like that? (3) Is there a gap for employees in their first one to two years? (4) If a tool connecting to employee bank accounts and delivering weekly spending summaries cost around $6 per employee per month, would that be in range? Do not defend the product. Write down the first words of every answer verbatim. Conduct one consumer interview. After 10–15 minutes of discovery, say: *"If an app connected to your bank, automatically sorted your spending, and sent you a weekly summary — no setup required — and it cost $4.99 a month, what's your reaction?"* Then stop talking. Record the first reaction, not the considered one.

**Friday:** Document six specific data points from each institutional conversation: does a budget line exist, what price did they name, what product are they currently using, what was their reaction to the $6 PMPM figure, what gap (if any) did they identify, and how many employees would a typical program cover. Update the PMPM assumption in `financial-model.xlsx`, Section 1, cell D8, with whatever range the conversations produced. If no conversations were completed by Friday, call LearnLux or SmartDollar posing as someone evaluating tools for a small employer — a sales rep will quote a price, and that price is real market data.

### Yes and No Criteria

A **yes signal** on the institutional test is any buyer who confirms a budget line for financial wellness programs exists and names a price in the $3–$10 PMPM range, or asks a follow-up question about the product, the integration process, or contract minimums. These responses validate that the market exists and that the working price range is plausible. A buyer who says "that price sounds reasonable" without being prompted is the strongest signal.

A **no signal** on the institutional test is a buyer who says no budget exists for this category, who names a price below $2/PMPM, or who says the decision process takes more than 18 months and requires security certifications that are not yet in place. Each of these responses changes a different part of the model: no budget changes the channel, not the product; $2/PMPM changes the break-even math materially; a longer-than-expected sales cycle changes the capital requirement.

A **yes signal** on the consumer test is the interviewee asking a follow-up product question before commenting on the price, or anchoring the price to something they already pay (Netflix, Spotify, coffee). A **no signal** is "I'd use the free version," which does not invalidate the B2B2C model — it confirms the freemium acquisition logic — but should be followed with: "If your employer offered this as a benefit, would you use it?" A yes to that question is a data point for the institutional pitch, not a consumer failure.

### If the Test Fails

If institutional buyers describe prices far below the $3 PMPM floor, the base case PMPM must be revised downward and every break-even figure in the model gets worse. The response is not to abandon the model but to recalibrate it: understand what a $1–$2/PMPM buyer covers in user count (a large employer at $1/PMPM covering 1,000 employees is more valuable than a small one at $6/PMPM covering 50), and determine whether university buyers with longer-term relationships could compensate for lower per-user rates.

If no institutional conversations are completed by end of week, the fallback is competitive pricing research: request a sales demo from SmartDollar or LearnLux as a prospective customer evaluating options for a small employer. Their sales rep will quote a price. That quote is real market data — better than any estimate currently in the model — and the call takes 20 minutes.

If the consumer test produces a strong negative reaction to any price, the correct response is to document whether the objection is to price specifically or to the product concept entirely. "I wouldn't pay $5 for that" is different from "I don't think I'd use that even for free." The former confirms freemium as the right consumer entry and B2B2C as the right revenue structure. The latter is a product validity signal that requires a different response.
