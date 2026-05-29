# BureauAI MVP Design Spec

*Date: 2026-05-29*

---

## What We're Building

BureauAI is an AI compliance platform for NYC small businesses, starting with restaurants. The MVP has two jobs: (1) convince a restaurant owner this solves their problem, and (2) capture them for early access. We are not building a full product in this phase — we are building a landing page that demonstrates the value prop clearly enough to get signups, plus a thin "audit" demo that shows the AI in action.

**Year 1 focus (from market analysis):** Restaurant compliance in NYC. Highest pain, highest WTP ($300–800/month), lowest existing software competition.

---

## Phase 1: Landing Page (This Implementation)

A single-page marketing site that converts restaurant owners to waitlist signups. No auth, no database, no backend — just a compelling story and an email capture.

### Sections

**1. Nav**
- Logo: column icon + "BureauAI" wordmark (dark navy)
- Right: "Book a demo →" button (dark navy, filled)
- Sticky, no background blur — transparent over the graph paper

**2. Hero**
Already designed and approved (from mockup):
- Announcement badge: "+ Now ingesting NYC, LA & London health + building codes"
- Headline: `Compliance that **reads the rules** for you.` (navy + green split)
- Subhead: "BureauAI turns thousands of pages of food safety, fire, and building regulations into a living checklist for every location you operate — with AI audits, smart alerts, and inspector-ready paperwork."
- CTAs: "Start a free audit →" (dark, filled) + "Watch 90-sec demo" (outlined)
- Trust line: "No credit card · SOC 2 Type II · Trusted by 1,200+ operators"

**3. Problem Section — "8 agencies. 18 months. $50,000."**
Concrete numbers from the market analysis. Opening a restaurant in NYC requires 8–12 separate government interactions. Most owners spend $15K–$100K in professional fees and wait 3–18 months. Emotional framing: this is not a regulatory problem, it's a business survival problem.
- Three stat cards: `8–12 agencies`, `3–18 months`, `$50K avg. in fees`
- One-liner: "We replace the expeditors, the lawyers, and the spreadsheets."

**4. How It Works — 3-step process**
Simple numbered steps, not a feature list:
1. **Tell us about your business** — address, type, what stage you're at (opening, operating, got a violation)
2. **We read the regulations** — AI maps every requirement, deadline, and filing for your specific situation
3. **You get a living checklist** — organized by urgency, updated when rules change, with inspector-ready documents

**5. What BureauAI Covers**
Three columns, each targeting a key pain point:
- **Health & Safety** — DOH permits, food handler certs, inspection prep, violation response
- **Building & Fire** — DOB permits, FDNY certificates, CO amendments, expediting
- **Business Licensing** — DCWP licenses, SLA liquor license guidance, DCWP renewals

**6. Social Proof**
Two–three testimonial cards. Use realistic placeholder quotes written in the voice of an immigrant restaurant owner (consistent with user psychology section of market analysis). Mark as "Early access customer" — honest for a pre-launch product.

**7. Pricing Teaser**
Not a full pricing page — just a clear signal that this is not consumer-priced:
- "Starting at $299/month" 
- Anchored against "vs. $50K in professional fees"
- CTA: "Talk to us about your restaurant →"

**8. Footer CTA**
Full-width dark navy section:
- Headline: "Stop navigating alone."
- Email capture input + "Get early access" button
- Sub-text: "Join 400+ NYC restaurant operators on the waitlist."

**9. Footer**
- Links: Privacy, Terms, Contact
- © 2026 BureauAI

---

## Phase 2: Audit Demo Flow (Next Implementation)

A lightweight multi-step form at `/audit` that uses Claude to generate a personalized compliance snapshot. No account required — just enough info to produce a useful output.

### Flow

**Step 1 — Business type**
- Radio: Restaurant / Bar / Food Truck / Retail / Other

**Step 2 — Business info**
- Restaurant name (optional)
- NYC borough (dropdown)
- Stage: Opening / Operating / Got a violation / Renewing a license

**Step 3 — Situation (optional free text)**
- "Describe your situation in plain language"
- Examples shown as chips: "Got a DOH violation", "Applying for a liquor license", "Getting ready for inspection"

**Step 4 — AI-generated compliance snapshot**
- Uses Claude (claude-sonnet-4-6) via Anthropic SDK
- Generates: top 3 immediate actions, upcoming deadlines, estimated professional cost vs. BureauAI cost
- Streams the response for perceived speed
- CTA at bottom: "Get your full audit → Join the waitlist"

### API Route
`POST /api/audit` — accepts business profile, returns streaming Claude response.

System prompt scoped to NYC restaurant compliance. References real agency names (DOHMH, DOB, SLA, DCWP). Structured output with sections: Immediate Actions, Upcoming Deadlines, What This Will Cost You.

---

## Phase 3: Full Product (Future)

Out of scope for this spec. Includes: auth (Clerk), compliance dashboard, document upload and parsing, deadline calendar, violation response workflow, regulatory knowledge graph.

---

## Design System

Already in place from bootstrap commit:
- Background: `#f0f0e8` cream with graph paper overlay
- Primary text: `#1a2535` navy
- Accent: `#3a7a5c` green (used for headline emphasis, CTAs)
- Headings: DM Serif Display
- Body: Inter
- Tokens in `tailwind.config.ts` — use `cream`, `green`, `navy`, `bureau.*` classes

---

## What We Are Not Building

- Auth or user accounts
- A real database
- Actual form submission to government portals
- A mobile app
- Anything for landlords or contractors (Phase 2+)

---

## Success Criteria

Phase 1 is done when:
- Landing page is live, responsive, visually matches the approved mockup
- Email capture works (even if just `mailto:` or a simple `console.log` placeholder)
- Dev server runs without errors
- All sections render correctly on desktop (mobile is nice-to-have)

Phase 2 is done when:
- `/audit` multi-step form works end-to-end
- Claude generates a useful, NYC-specific compliance snapshot
- Response streams to the UI
- CTA at the end captures email
