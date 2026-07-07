from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white, red
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

OUTPUT = "/mnt/c/Users/layla/OneDrive - Rollins College/Venture Creation/customer-discovery-synthesis.pdf"

# ── Colour palette ──────────────────────────────────────────────────────────
NAVY   = HexColor("#1B2A4A")
SLATE  = HexColor("#4A5568")
LIGHT  = HexColor("#F7F9FC")
BORDER = HexColor("#CBD5E0")
RED_BG = HexColor("#FFF5F5")
RED_TX = HexColor("#C53030")
GREEN_BG = HexColor("#F0FFF4")
GREEN_TX = HexColor("#276749")
AMBER_BG = HexColor("#FFFBEB")
AMBER_TX = HexColor("#92400E")
ACCENT = HexColor("#2B6CB0")

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    leftMargin=0.85*inch, rightMargin=0.85*inch,
    topMargin=0.9*inch,   bottomMargin=0.9*inch,
)

base = getSampleStyleSheet()

def style(name, parent="Normal", **kw):
    s = ParagraphStyle(name, parent=base[parent], **kw)
    return s

S = {
    "title":    style("title",    fontName="Helvetica-Bold",   fontSize=20, textColor=NAVY,  spaceAfter=4,  leading=24),
    "subtitle": style("subtitle", fontName="Helvetica",        fontSize=11, textColor=SLATE, spaceAfter=2,  leading=14),
    "meta":     style("meta",     fontName="Helvetica",        fontSize=9,  textColor=SLATE, spaceAfter=12, leading=12),
    "h1":       style("h1",       fontName="Helvetica-Bold",   fontSize=13, textColor=NAVY,  spaceBefore=16, spaceAfter=5,  leading=16),
    "h2":       style("h2",       fontName="Helvetica-Bold",   fontSize=11, textColor=ACCENT,spaceBefore=10, spaceAfter=4,  leading=14),
    "h3":       style("h3",       fontName="Helvetica-Bold",   fontSize=9.5,textColor=SLATE, spaceBefore=7,  spaceAfter=3,  leading=13),
    "body":     style("body",     fontName="Helvetica",        fontSize=9,  textColor=black, spaceAfter=5,  leading=13, alignment=TA_JUSTIFY),
    "body_l":   style("body_l",   fontName="Helvetica",        fontSize=9,  textColor=black, spaceAfter=4,  leading=13),
    "quote":    style("quote",    fontName="Helvetica-Oblique",fontSize=9,  textColor=ACCENT,spaceAfter=3,  leading=13,
                      leftIndent=14, rightIndent=8),
    "label":    style("label",    fontName="Helvetica-Bold",   fontSize=8.5,textColor=SLATE, spaceAfter=2,  leading=12),
    "red_note": style("red_note", fontName="Helvetica",        fontSize=7.5,textColor=RED_TX,spaceAfter=0,  leading=11),
    "cell":     style("cell",     fontName="Helvetica",        fontSize=8,  textColor=black, leading=11),
    "cell_b":   style("cell_b",   fontName="Helvetica-Bold",   fontSize=8,  textColor=NAVY,  leading=11),
    "cell_sm":  style("cell_sm",  fontName="Helvetica",        fontSize=7.5,textColor=black, leading=11),
}

story = []

# ── Helper functions ─────────────────────────────────────────────────────────
def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8, spaceBefore=4)

def spacer(h=6):
    return Spacer(1, h)

def p(text, sty="body"):
    return Paragraph(text, S[sty])

def bullet(items, sty="body_l"):
    return [Paragraph(f"<bullet>&bull;</bullet> {t}", ParagraphStyle(
        "bl", parent=S[sty], leftIndent=14, bulletIndent=4, spaceAfter=3)) for t in items]

def section_header(text):
    return [
        Spacer(1, 6),
        Table([[Paragraph(text, S["h1"])]],
              colWidths=["100%"],
              style=TableStyle([
                  ("BACKGROUND", (0,0), (-1,-1), LIGHT),
                  ("LEFTPADDING", (0,0), (-1,-1), 8),
                  ("RIGHTPADDING", (0,0), (-1,-1), 8),
                  ("TOPPADDING", (0,0), (-1,-1), 5),
                  ("BOTTOMPADDING", (0,0), (-1,-1), 5),
                  ("LINEBELOW", (0,0), (-1,-1), 1.5, NAVY),
              ])),
        Spacer(1, 4),
    ]

def quote_block(q, attr):
    return KeepTogether([
        Paragraph(f'"{q}"', S["quote"]),
        Paragraph(f"— {attr}", ParagraphStyle("attr", parent=S["meta"],
                  leftIndent=14, fontSize=8, spaceAfter=5)),
    ])

# ═══════════════════════════════════════════════════════════════════════════
# TITLE PAGE
# ═══════════════════════════════════════════════════════════════════════════
story += [
    Spacer(1, 0.4*inch),
    Paragraph("Customer Discovery Synthesis", S["title"]),
    Paragraph("and Business Model Canvas", S["title"]),
    Spacer(1, 6),
    hr(),
    Spacer(1, 4),
    Paragraph("Laila Hamza", S["subtitle"]),
    Paragraph("BUS395 – Venture Creation with AI", S["meta"]),
    Paragraph("June 2026", S["meta"]),
    Spacer(1, 10),
    p("This report synthesises two customer discovery interviews, a competitive landscape "
      "analysis, and a venture direction decision into a single reference document. "
      "Evidence is cited by interview and source throughout. Where evidence is absent "
      "or weak, that is stated explicitly rather than papered over.",
      "body"),
    Spacer(1, 4),
    hr(),
]

# ═══════════════════════════════════════════════════════════════════════════
# SECTION 1 — INTERVIEW INSIGHTS REPORT
# ═══════════════════════════════════════════════════════════════════════════
story += section_header("Section 1  |  Interview Insights Report")

story.append(p(
    "Two interviews were conducted. <b>Interview 1 — Ben (age 36)</b> was explicitly "
    "flagged as outside the target customer. <b>Interview 2 — Noor (age 24)</b> is the "
    "only target-customer interview on record. The analysis below reflects that "
    "sample size honestly: confirmed patterns require three or more independent "
    "sources, and none can be confirmed at this stage.",
    "body"))

# ── 1a. Pattern Map ─────────────────────────────────────────────────────────
story += [Spacer(1, 4), p("1a.  Pattern Map", "h2")]

story.append(p("<b>Confirmed Patterns</b>", "h3"))
story.append(p(
    "None. The threshold for confirmation is three or more interviewees stating "
    "the same thing independently. With one target-customer interview, every "
    "pattern identified below is a hypothesis, not a finding.",
    "body"))
story.append(spacer(4))

story.append(p("<b>Contradictions</b>", "h3"))

contradictions = [
    ("The venture assumed the primary problem is a lack of spending awareness. "
     "The target customer contradicts this.",
     "Noor consciously monitors her spending and can articulate her overspending "
     "pattern precisely. She says she is 'careful' and 'double thinks purchases.' "
     "Yet she also reports that surprise overspending 'happens many times.' "
     "Her awareness is present; the sustained behavior change is not. The original "
     "hypothesis — that visibility is the gap — is under pressure from the only "
     "target customer interviewed."),
    ("Noor's self-description and her actual behavior do not match.",
     "She describes herself as careful and deliberate. She also describes a "
     "recurring pattern of post-payday impulse buying: 'items I had previously "
     "wanted but did not need.' These two accounts cannot both be fully true. "
     "The self-image and the transaction history are misaligned."),
    ("Both interviewees described their magic fix in behavioral terms, not as a "
     "request for a product.",
     "Ben wanted 'automated saving or allotment toward goals.' Noor wanted 'to "
     "shop smarter' and 'appreciate what I already have.' Neither person named a "
     "tool, an app, or a feature they wished existed. This is a challenge to the "
     "assumption that the solution is a technology product."),
]

for title, detail in contradictions:
    story.append(KeepTogether([
        Paragraph(f"<bullet>&bull;</bullet> <b>{title}</b>",
                  ParagraphStyle("cb", parent=S["body_l"], leftIndent=14, bulletIndent=4,
                                 spaceAfter=2)),
        Paragraph(detail,
                  ParagraphStyle("cd", parent=S["body"], leftIndent=28, spaceAfter=6)),
    ]))

story.append(spacer(4))
story.append(p("<b>Surprises</b>", "h3"))

surprises = [
    ("Ben solved the problem himself, for free, using a native bank app.",
     "His two-account system — one for household expenses, one for personal "
     "spending — works. He reports zero difficulty tracking any category and "
     "rates himself 'very confident.' He used no dedicated budgeting product. "
     "This raises the question of what distinguishes people who self-solve from "
     "people who cannot."),
    ("Noor's magic fix was a mindset shift, not a feature request.",
     "'To shop smarter. I definitely need to re-evaluate purchases and "
     "appreciate what I already have.' This is a psychological and values-based "
     "response, not an information request. It more closely resembles what Noom "
     "addresses in weight loss than what any financial app in the competitive "
     "landscape delivers."),
    ("After discovering she overspent, Noor took no structured action.",
     "'I would try and be more careful with my money following that realization.' "
     "She did not open an app, review transactions, or create a budget. Her "
     "response was an unstructured intention. The moment a product could intervene "
     "is not the discovery of the problem — it is catching her at the decision "
     "to change and making that decision concrete."),
]

for title, detail in surprises:
    story.append(KeepTogether([
        Paragraph(f"<bullet>&bull;</bullet> <b>{title}</b>",
                  ParagraphStyle("sb", parent=S["body_l"], leftIndent=14, bulletIndent=4,
                                 spaceAfter=2)),
        Paragraph(detail,
                  ParagraphStyle("sd", parent=S["body"], leftIndent=28, spaceAfter=6)),
    ]))

# ── 1b. Key Quotes ──────────────────────────────────────────────────────────
story += [spacer(6), p("1b.  Key Quotes", "h2")]

quotes = [
    (
        "I am careful with my spending, and I double think purchases over, whether they're necessary or not.",
        "Noor, Interview 2",
        "Her self-image is of a careful spender — yet she immediately follows this with accounts of recurring overspending. The gap between self-perception and behavior is the core product opportunity."
    ),
    (
        "Yes, there have been many moments. I would say this happens after I get paid and purchase items I had previously wanted but did not need.",
        "Noor, Interview 2",
        "Confirms the spending-surprise moment the venture is built around, and identifies the specific trigger: post-payday impulse buying. This is more precise than the original problem statement anticipated."
    ),
    (
        "I would try and be more careful with my money following that realization.",
        "Noor, Interview 2",
        "Challenges the venture. Her response to a concrete financial problem is vague intention with no system attached. This is the moment a product should catch her — but she did not turn to any tool."
    ),
    (
        "To shop smarter. I definitely need to re-evaluate purchases and appreciate what I already have, in terms of food, cosmetics, clothes, etc.",
        "Noor, Interview 2",
        "Her stated magic fix is a mindset shift, not a technology request. She is describing a change in values, not a need for better data. This challenges whether an awareness tool addresses her actual problem."
    ),
    (
        "Very confident. Don't really struggle tracking any categories at all.",
        "Ben, Interview 1",
        "Ben is outside the target segment, but his self-built system works. This raises the question of what separates people who figure this out on their own from people who cannot — and whether the difference is teachable or requires a product."
    ),
    (
        "Automated saving or allotment toward goals anytime spending is below budget.",
        "Ben, Interview 1",
        "When someone already has financial control, what they want next is automated action toward goals — not more visibility. This may describe where the target customer wants to arrive, not where they need to start."
    ),
    (
        "I don't like talking to my wife about setting the budget.",
        "Ben, Interview 1",
        "Financial friction can be relational, not informational. Ben's only pain point is a coordination problem with another person. This was not anticipated in the problem statement and may surface in future interviews."
    ),
]

col_w = [doc.width * 0.58, doc.width * 0.42]
for q, attr, why in quotes:
    data = [
        [Paragraph(f'"{q}"', S["quote"]),
         Paragraph(f"<b>Why it matters:</b> {why}", S["cell_sm"])],
        [Paragraph(f"— {attr}", ParagraphStyle("qa", parent=S["meta"],
                   fontSize=7.5, leftIndent=14, spaceAfter=0)), ""],
    ]
    t = Table(data, colWidths=col_w, style=TableStyle([
        ("VALIGN",       (0,0), (-1,-1), "TOP"),
        ("SPAN",         (1,0), (1,1)),
        ("BACKGROUND",   (0,0), (-1,-1), LIGHT),
        ("LINEBELOW",    (0,0), (-1,-1), 0.5, BORDER),
        ("TOPPADDING",   (0,0), (-1,-1), 5),
        ("BOTTOMPADDING",(0,0), (-1,-1), 5),
        ("LEFTPADDING",  (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("LINEBEFORE",   (1,0), (1,-1), 0.5, BORDER),
    ]))
    story.append(KeepTogether([t, spacer(3)]))

# ── 1c. Assumption Scorecard ─────────────────────────────────────────────────
story += [spacer(6), p("1c.  Assumption Scorecard", "h2")]

VERDICT_STYLE = {
    "Inconclusive":        (AMBER_BG,  AMBER_TX),
    "Partially confirmed": (GREEN_BG,  GREEN_TX),
    "Untested":            (RED_BG,    RED_TX),
    "Partially contradicted": (RED_BG, RED_TX),
}

headers = ["Assumption", "Evidence For", "Evidence Against", "Verdict", "What Changes"]
scorecard_data = [
    (
        "Traditional budgeting feels overwhelming or restrictive",
        "Noor has no formal system. She manages on intention alone, suggesting avoidance of structured methods.",
        "Neither interviewee said budgeting felt overwhelming. Noor never described trying it. Ben's budget-like system works fine for him.",
        "Inconclusive",
        "Ask directly: 'Have you ever tried to create a budget or use a budgeting app? What happened?'"
    ),
    (
        "People need awareness before they can change financial behavior",
        "Noor's resolve follows her spending-surprise moments — awareness does trigger intention to change.",
        "Noor already has awareness and still cycles. She monitors purchases consciously yet overspends repeatedly.",
        "Partially confirmed",
        "Test whether awareness alone produces action. Ask: 'If you saw exactly where your money went this month, what would you do with that?'"
    ),
    (
        "An AI-based experience would feel easier than a traditional budgeting app",
        "None. No interviewee mentioned AI or expressed interest in it.",
        "Neither interviewee referenced AI at any point, prompted or unprompted.",
        "Untested",
        "Describe the concept explicitly in next interviews and ask for a direct reaction."
    ),
    (
        "The target customer lacks spending awareness (primary gap is not knowing where money goes)",
        "Noor is surprised by overspending after payday, suggesting real-time awareness is absent in the moment.",
        "Noor consciously monitors spending, double-thinks purchases, and can articulate her overspending pattern. Awareness is present; sustained behavior change is not.",
        "Partially contradicted",
        "Ask 3–5 more target customers. Determine whether Noor's awareness level is typical or whether she is further along than most."
    ),
    (
        "Target customers will share bank account access with a new product",
        "None. This was never asked.",
        "Noor described her problem as a personal discipline issue, not a data access problem. Neither interviewee asked for a connected financial tool.",
        "Untested",
        "Ask directly: 'Would you connect your bank account to a new app? What would make you comfortable or uncomfortable with that?'"
    ),
]

verdict_colors = {
    "Inconclusive":           (AMBER_BG,  AMBER_TX),
    "Partially confirmed":    (GREEN_BG,  GREEN_TX),
    "Untested":               (RED_BG,    RED_TX),
    "Partially contradicted": (RED_BG,    RED_TX),
}

sc_col_w = [
    doc.width * 0.21,
    doc.width * 0.20,
    doc.width * 0.22,
    doc.width * 0.14,
    doc.width * 0.23,
]

header_row = [Paragraph(h, ParagraphStyle("sh", parent=S["cell_b"],
              textColor=white, fontSize=8, leading=11)) for h in headers]
rows = [header_row]
row_verdicts = []

for assumption, ev_for, ev_against, verdict, what_changes in scorecard_data:
    rows.append([
        Paragraph(assumption,    S["cell_sm"]),
        Paragraph(ev_for,        S["cell_sm"]),
        Paragraph(ev_against,    S["cell_sm"]),
        Paragraph(f"<b>{verdict}</b>", ParagraphStyle("vd", parent=S["cell_sm"],
                  textColor=verdict_colors[verdict][1], leading=11)),
        Paragraph(what_changes,  S["cell_sm"]),
    ])
    row_verdicts.append(verdict)

sc_style = TableStyle([
    ("BACKGROUND",   (0,0), (-1,0),  NAVY),
    ("TEXTCOLOR",    (0,0), (-1,0),  white),
    ("VALIGN",       (0,0), (-1,-1), "TOP"),
    ("GRID",         (0,0), (-1,-1), 0.4, BORDER),
    ("TOPPADDING",   (0,0), (-1,-1), 5),
    ("BOTTOMPADDING",(0,0), (-1,-1), 5),
    ("LEFTPADDING",  (0,0), (-1,-1), 6),
    ("RIGHTPADDING", (0,0), (-1,-1), 6),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [white, LIGHT]),
])
for i, verdict in enumerate(row_verdicts):
    row_i = i + 1
    bg, _ = verdict_colors[verdict]
    sc_style.add("BACKGROUND", (3, row_i), (3, row_i), bg)

sc_table = Table(rows, colWidths=sc_col_w, repeatRows=1)
sc_table.setStyle(sc_style)
story.append(sc_table)

# ═══════════════════════════════════════════════════════════════════════════
# SECTION 2 — VENTURE DIRECTION DECISION
# ═══════════════════════════════════════════════════════════════════════════
story += [spacer(10)] + section_header("Section 2  |  Venture Direction Decision")

story.append(p(
    "This section states the current venture direction as of the second week of "
    "customer discovery. Every element is grounded in interview evidence or "
    "competitive research. Where evidence is thin, that is noted.",
    "body"))

fields = [
    ("Refined Problem Statement",
     "Recent college graduates who are newly financially independent cycle between "
     "spending-surprise moments and vague intentions to do better, without a "
     "structured system to make that intention concrete or sustain it over time."),
    ("Refined Target Customer",
     "Noor: 24 years old, recent master's graduate, started her first professional "
     "job within the past year, preparing to move out independently, managing student "
     "loan debt and credit card expenses simultaneously. She has no formal money "
     "management system and operates on intention and self-monitoring. She is aware "
     "of her overspending patterns but cannot sustain behavior change after moments "
     "of financial clarity. She is the only target customer interviewed to date."),
    ("Chosen Direction and Why",
     "An AI-connected tool that automatically categorizes a user's spending and "
     "delivers plain-language summaries on a recurring cadence — requiring no setup, "
     "no budget creation — and arriving proactively rather than waiting to be opened. "
     "The direction is grounded in two findings: (1) the competitive gap — no existing "
     "tool addresses financial clarity before budgeting; (2) Noor's specific failure "
     "point — after a moment of resolve, there is nothing concrete to return to. "
     "The AI delivery mechanism and the bank-connection model are not yet validated "
     "and must be tested in the next interview round."),
    ("What Changed from Week 1 and Why",
     "Week 1 framed the problem broadly: people make irresponsible financial decisions "
     "due to a lack of money knowledge. The interviews narrowed this to a specific "
     "moment and a specific customer type. Noor revealed that the gap is not knowledge "
     "— she knows what she should do. The gap is the structure that should follow a "
     "moment of financial clarity. The competitive analysis confirmed no existing tool "
     "occupies this position. The problem statement was refined accordingly, while "
     "holding the awareness hypothesis as primary rather than abandoning it based on "
     "one interview."),
    ("Biggest Remaining Risk and Validation Plan",
     "Whether target customers will connect their bank account to a new product before "
     "experiencing any value from it. This is the structural premise of the entire model "
     "and has never been tested. No interviewee was asked this question. The next round "
     "of interviews must ask directly: 'Would you connect your bank account to a new "
     "app you had just discovered? What would make you comfortable or uncomfortable "
     "with that?' A second critical risk: whether the target customer wants a product "
     "at all. Neither interviewee asked for one. Future interviews should present the "
     "concept explicitly and capture their unfiltered reaction."),
]

for label, text in fields:
    story.append(KeepTogether([
        p(label, "h2"),
        p(text, "body"),
        spacer(4),
    ]))

# ═══════════════════════════════════════════════════════════════════════════
# SECTION 3 — BUSINESS MODEL CANVAS
# ═══════════════════════════════════════════════════════════════════════════
story += [PageBreak()] + section_header("Section 3  |  Business Model Canvas")

story.append(p(
    "All nine blocks are included. Blocks with weak or absent interview evidence "
    "are flagged in <font color='#C53030'><b>red</b></font>. "
    "Blocks with at least partial interview grounding are unflagged. "
    "No block is fully validated — the canvas represents the current hypothesis, "
    "not a confirmed model.",
    "body"))
story.append(spacer(6))

WEAK_COLOR = RED_BG
WEAK_LABEL = "<font color='#C53030'><b>⚠ Weak evidence</b></font>"
OK_LABEL   = "<font color='#276749'><b>Partial evidence</b></font>"

blocks = [
    # (title, evidence_note, content, is_weak)
    (
        "Customer Segments",
        OK_LABEL + " — 1 target customer interview (Noor, 24)",
        "Recent college graduates who are newly financially independent with no formal "
        "money management system. Two candidate filters remain open: (A) never built "
        "a tracking system; (B) knows what to do but cannot consistently follow through. "
        "Noor fits both. Employment and simultaneous financial obligations are the trigger, "
        "not graduation date.",
        False,
    ),
    (
        "Value Propositions",
        OK_LABEL + " — competitive gap confirmed; AI mechanism untested",
        "Automatic spending awareness delivered before the user is asked to budget. "
        "No setup required. Plain-language summaries pushed on a recurring cadence — "
        "a concrete reference point at the moment of resolve. Competitive gap: no "
        "existing tool (YNAB, Monarch, EveryDollar) addresses the step before budgeting. "
        "AI mechanism and behavior-change impact are unvalidated.",
        False,
    ),
    (
        "Channels",
        WEAK_LABEL + " — inferred from life-stage profile; no interview data",
        "Target customer is not in solution-seeking mode. Channels must intercept at "
        "the life-stage trigger: university career centers (graduation), employer "
        "onboarding (first job), student loan servicers (repayment start). Short-form "
        "financial content (TikTok/Instagram) as organic reach. Discovery behavior "
        "was never asked in either interview.",
        True,
    ),
    (
        "Customer Relationships",
        WEAK_LABEL + " — inferred from Noor's behavioral cycle; never asked directly",
        "Proactive and recurring — summaries pushed to the user rather than waiting "
        "to be opened. Low-accountability to start; trust earned incrementally. "
        "Self-serve model will not interrupt Noor's cycle (nothing to return to). "
        "Whether users engage with proactive delivery rather than ignore it is untested.",
        True,
    ),
    (
        "Revenue Streams",
        WEAK_LABEL + " — competitive benchmarks only; zero interview evidence on willingness to pay",
        "Model options: B2C subscription (~$80–100/yr, below YNAB/Monarch); freemium "
        "(free awareness tier, paid coaching/goals); B2B2C via employers or universities "
        "(institution pays, user free); affiliate (free to user, referral revenue). "
        "No interviewee was asked about payment history, willingness to pay, or value "
        "threshold. Revenue model is unvalidated.",
        True,
    ),
    (
        "Key Resources",
        WEAK_LABEL + " — structural requirements; user trust untested",
        "Bank data access (via Plaid or equivalent — unavoidable if product connects "
        "to accounts). AI/LLM capability for categorization and summaries. Proprietary "
        "categorization logic (differentiates summaries from bank statements). "
        "User trust — willingness to share bank data — is the hardest resource to "
        "acquire and the most critical untested assumption in the model. "
        "Founder credibility: lived the problem firsthand.",
        True,
    ),
    (
        "Key Activities",
        WEAK_LABEL + " — follow from unvalidated product design",
        "Building and maintaining bank connections (ongoing, not one-time). "
        "Categorization and plain-language summary generation. Push delivery on cadence. "
        "Customer or institutional acquisition (B2C vs. B2B2C requires different "
        "activities entirely). Compliance maintenance (SOC 2, data privacy). "
        "Which activities are most critical depends on revenue model — also unvalidated.",
        True,
    ),
    (
        "Key Partnerships",
        WEAK_LABEL + " — follow from revenue model; no interview evidence",
        "Bank data aggregator (Plaid or similar) — structural dependency regardless "
        "of other choices; must be established before product can function. "
        "If B2B2C: employer HR/benefits platforms, university financial aid offices, "
        "student loan servicers. If affiliate: financial product providers. "
        "Partnership needs are downstream of revenue model selection.",
        True,
    ),
    (
        "Cost Structure",
        OK_LABEL + " — structurally derived; not evidence-dependent",
        "Bank data aggregation: per-connected-account cost (scales with users, "
        "unavoidable). AI/LLM infrastructure: per-token cost, scales with usage. "
        "Engineering for bank connection maintenance: ongoing, not one-time. "
        "Compliance: SOC 2, data privacy — fixed costs that arrive before revenue. "
        "Unit economics cannot be modeled until revenue per user is tested.",
        False,
    ),
]

bmc_col_w = [doc.width * 0.24, doc.width * 0.76]

for title, evidence_note, content, is_weak in blocks:
    bg = WEAK_COLOR if is_weak else white
    row = [[
        Paragraph(title, ParagraphStyle("bt", parent=S["cell_b"], fontSize=8.5,
                  textColor=NAVY if not is_weak else RED_TX)),
        Table([
            [Paragraph(evidence_note, ParagraphStyle("en", parent=S["cell_sm"],
                       fontSize=7.5, leading=10, spaceAfter=3))],
            [Paragraph(content, S["cell_sm"])],
        ], colWidths=[doc.width * 0.76 - 14],
        style=TableStyle([
            ("TOPPADDING",    (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 0),
            ("LEFTPADDING",   (0,0), (-1,-1), 0),
            ("RIGHTPADDING",  (0,0), (-1,-1), 0),
            ("LINEBELOW",     (0,0), (-1,0), 0.5, BORDER),
        ])),
    ]]
    t = Table(row, colWidths=bmc_col_w, style=TableStyle([
        ("BACKGROUND",    (0,0), (0,0),   LIGHT if not is_weak else RED_BG),
        ("BACKGROUND",    (1,0), (1,0),   white),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
        ("GRID",          (0,0), (-1,-1), 0.5, BORDER),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 7),
        ("RIGHTPADDING",  (0,0), (-1,-1), 7),
    ]))
    story.append(t)
    story.append(spacer(2))

# ── Interview To-Do List ─────────────────────────────────────────────────────
story += [spacer(8)] + section_header("Next Steps  |  Interview To-Do List")
story.append(p(
    "Every red-flagged block above represents an open assumption. The questions "
    "below are ordered by the risk they carry: the first two, if answered "
    "negatively across multiple interviews, require the product concept to be "
    "reconsidered before anything is built.",
    "body"))
story.append(spacer(4))

todos = [
    ("Structural — must answer before building",
     [
         "'Would you connect your bank account to a new app you had just discovered? "
          "What would make you comfortable or uncomfortable with that?' "
          "(Tests bank-connection willingness — the structural premise of the model.)",
         "'What financial tools or services do you currently pay for, if any? "
          "What would a product have to do for you to consider paying for it?' "
          "(Tests willingness to pay — zero interview evidence exists.)",
     ]),
    ("Product design — answer before choosing between concepts",
     [
         "'If you found out today you spent $400 on food when you thought you "
          "spent $200 — what would you do with that information?' "
          "(Tests whether awareness produces action.)",
         "'Walk me through the last time you tried to change a money habit. "
          "What did you try? What happened?' "
          "(Tests Filter A vs. Filter B: no system vs. knows but cannot follow through.)",
         "Describe the concept explicitly and ask for a reaction: 'An app that "
          "connects to your bank, categorizes spending automatically, and sends "
          "you a plain-language weekly summary — no setup required. Would you use "
          "that? Why or why not?' (Tests product appeal — never done.)",
     ]),
    ("Channel and relationship — answer before choosing go-to-market",
     [
         "'If something sent you a weekly summary of your spending, would you "
          "read it? What would make you open it or ignore it?' "
          "(Tests proactive delivery model.)",
         "'Where do you go when you have a money question — or do you go anywhere "
          "at all?' (Tests channel logic — no interview data on discovery behavior.)",
         "'How did you find the last app you actually kept using?' "
          "(Reveals real discovery behavior vs. stated preference.)",
     ]),
]

for group_title, questions in todos:
    story.append(p(group_title, "h3"))
    story += bullet(questions)
    story.append(spacer(4))

doc.build(story)
print("PDF written to:", OUTPUT)
