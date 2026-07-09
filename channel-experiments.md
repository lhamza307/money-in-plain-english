# Channel Experiments

Testing specific acquisition channels for the target customer, following the channel map in the project's channel-mapping exercise (TikTok/Instagram, Rollins alumni/class groups, r/Adulting were the top 3 identified). Each channel gets its own entry: design, honest expected outcome, a specific success number, and an explicit dead-end criterion — same discipline as `pricing-test.md`'s yes/no signals.

---

## Channel 1: TikTok / Instagram — Short-Form Content (#FinTok)

**Status:** Designed, not yet posted.

### Why this channel
Highest combined reach, access, and fit of the channels mapped: no gatekeeper/ban risk (unlike Reddit's self-promo rules), and the #FinTok content genre already matches the exact problem space — payday-spending confessionals, "no one taught me this" content, loud budgeting. Doubles as message-testing: whether a described concept gets an unprompted-feeling reaction is the same open question Tamara's interview partially answered.

### Who I'm reaching — two lanes, not one
The interviews split into two different profiles, so this channel runs two content lanes in parallel rather than one blended message:

- **Tamara-lane:** 24, first full-time job, no anxiety about overspending, never budgeted, mom manages money for her. Entry point is *permission*, not shame — she hasn't started, doesn't need to be taught she's doing it wrong.
- **Noor-lane:** 24, already double-thinks purchases, knows exactly when she's overspent, resolves to do better, doesn't. Entry point is *recognition* — she needs to see herself in the content, not be introduced to a new idea.

Running both lanes and comparing performance is also a cheap way to get real evidence on Open Question #5 in `VENTURE.md` (is the target customer one profile or two, or genuinely two sub-segments).

### What problem they're talking about there
Grounded in the interviews, not generic finance-content tropes:
- **"No one taught me this"** — Tamara's profile exactly; also the founder's own story in `WHYME.docx`, which gives standing a generic finance account doesn't have.
- **The payday-then-relapse cycle** — Noor's exact words ("I would try and be more careful... then it happens again").
- **"I have a job and still don't know where my money goes"** — income doesn't equal control, distinct from poverty-finance content.
- **Student loan repayment anxiety** — named by both interviewees, reliably high-engagement for this age cohort.

### Post format (matches observed platform pattern)
- **Title:** numbered, concrete, low-commitment — "3 signs you have no idea where your paycheck went," not "How to budget."
- **Hook (first 1–2 sec):** callout naming a hyper-specific behavior, delivered as self-implicating recognition, not accusation. The creator has to be inside the joke, not above it — this is the calibration point against `brand-guide.md`'s "no lecturing, no judgment" rule. The observed platform pattern ("i heard you only have $2 because of food and Amazon orders") works when it reads as "I've done this too," not "you did this wrong."
- **Body:** fast, numbered, text-on-screen beats — scannable, no slow build.
- **Tone:** Clear. Calm. Human. — no urgency, no alarm, self-implicating over superior.

### One-sentence message
**"You don't need a budget to see where your money's going — you just need to actually look."**

Every post should reinforce this underneath whatever specific hook is used. It's the core positioning (the step before budgeting, no setup required) stated as a claim that contradicts most FinTok finance advice (build a budget, track every category) — which is what makes it stand out rather than blend in.

### CTA
- **Primary:** "Link in bio — see what your money's actually doing this month." Routes to `index.html`, already wired to Web3Forms, logs to `submissions.md`.
- **Secondary (engagement/signal, free):** "comment if this is you" — gives a rough read on which lane/hook lands before investing more time.

### Example posts

**Tamara-lane:**
> Title: "2 things your bank account is trying to tell you"
> Hook: "you have $47 left and genuinely no idea why"
> Body: "it's not that you spent badly. it's that nobody ever showed you where it went." → "your mom's been doing this for you your whole life. that's not a personality flaw, it's just... nobody taught you."
> CTA: "link in bio"

**Noor-lane:**
> Title: "3 things that happen every payday if you're like me"
> Hook: "you get paid → you're SO careful for like 3 days → then Amazon happens"
> Body: "you already know you did it. you don't need someone to point it out. you need something to catch you before the 3-day mark runs out."
> CTA: "comment if this is you" → "link in bio"

### Honest expected outcome

**Most likely result:** low hundreds of views, a handful of likes, maybe zero to a few comments, zero to a couple of bio clicks. This is the default outcome for any zero-follower account regardless of content quality — the algorithm test-batches new posts against a small initial audience before deciding whether to push further. One post is not a verdict.

There's also a trust gap specific to this situation: clicking through from an account with zero followers and zero post history to a personal-finance product is a bigger ask than usual — the same trust barrier Tamara named directly (verification, reviews, a recognizable source), compressed into a single unproven account.

**What makes someone click vs. scroll past:** hook lands in 1–2 seconds, readable with sound off, a real face on screen (builds more trust per second than production polish for an unknown account), reads as recognition not lecture. Scroll-past triggers: any wind-up before the hook, generic phrasing any finance account could post, anything that reads as promotional before relatable.

**Deletion/suppression risk:** outright deletion is unlikely — this is a common, allowed content format. The real risk is silent algorithmic suppression: a video that's structurally just bait-to-link with thin in-video value gets capped at the initial small test batch with no explanation. Avoid scam-adjacent language ("guaranteed," urgency) — the brand voice already avoids this by default, which is a genuine advantage here.

**Success — specific number:** at least **1 real email signup, traceable to this post, within 7 days.** That's a meaningful bar in a trust-sensitive category from a stranger with no social proof to go on. Leading indicator to watch before signups trickle in: **1,000+ views** — a zero-follower account clearing that means the post escaped the algorithm's initial test batch.

**Judge on a batch, not one post.** Cold-start variance is high enough that a good hook can flop once and a mediocre one can spike once. Evaluate after **8–10 posts over 2–3 weeks**, not after post one.

**What means this channel is a dead end — two different failure patterns:**
1. **Views stay flat/low (never clearing ~500) and engagement stays near zero across 8–10 posts.** Message isn't resonating — real dead end for this channel, since FinTok-style content is one of the highest-performing organic categories on the platform when the hook works.
2. **Views/engagement are fine but clicks-to-bio and signups stay at zero across the same batch.** This is *not* a channel dead end — it's evidence the content works but the trust bridge to the landing page doesn't. Points to fixing `index.html`'s credibility signals (reviews, verification, recognizable source) before concluding TikTok/Instagram don't work.

These two outcomes look identical from the outside ("it didn't work") but require opposite fixes — don't collapse them into one conclusion.
