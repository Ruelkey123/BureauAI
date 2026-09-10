# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners and operators of small NYC businesses — restaurants, bars, cafés, food trucks, retail — across all five boroughs. They are non-experts in regulation, time-poor, and operating a physical location. Their job is to open and stay open without being blindsided by a permit lapse, a failed inspection, or a violation.

Secondary, and currently the site's most important audience: **investors and evaluators**. They arrive from the pitch deck or a referral and are judging whether BureauAI reads as a real company.

The user is not the person who enjoys compliance. They are the person for whom compliance is pure overhead standing between them and running their business.

## Product Purpose

BureauAI is an AI-native compliance service for NYC small businesses. It takes over permits, licenses, renewals, deadlines, and violation response across NYC agencies (DOHMH, DOB, FDNY, DCWP, SLA) so the owner does not have to learn or track any of it.

Success is the owner never thinking about compliance — no missed renewal, no surprise violation, no $50K expeditor bill.

## Positioning

BureauAI replaces a **service**, not software. The incumbent is not an app; it is the expeditor, the permit consultant, and the compliance attorney a NYC business hires at $50K+ for complex cases plus ongoing retainers.

The strategic bet (recorded in `docs/superpowers/specs/2026-06-09-ai-native-service-pivot-design.md`): total spend on compliance *services* vastly exceeds spend on compliance *software*, and work already outsourced to humans is structurally easier to absorb than work embedded in a customer's own tooling.

The consequence for every surface: BureauAI is the actor, the owner is not. Voice is first-person service — "we're handling X" — never second-person imperative — "you need to file X".

## Operating Context

NYC compliance is genuinely fragmented: 8–12 agencies, timelines from 3 to 18 months from application to opening, and rules that differ by business type and borough. Real artifacts in the domain include the DOHMH food service permit, FDNY Place of Assembly, DOB Certificate of Occupancy and DOB NOW filings, the DCWP business license, and the SLA liquor license.

Owners currently navigate this through some mix of agency web portals, paid expeditors, word of mouth, and hoping nothing lapses.

## Capabilities and Constraints

Built and working today:

- Marketing site (Next.js 16 App Router, React 19, Tailwind 3, deployed on Vercel)
- `/audit` — a 4-step intake (business type, borough, stage, situation) that streams an AI compliance snapshot via Gemini (`@google/genai`), with a seeded fallback response when the API is unavailable
- `/dashboard` — a demo dashboard with nine sections (Overview, Deadlines, Documents, Audit, Incentives, Financials, Prepare, Rights, Business Profile) running on static data
- Waitlist capture via Resend (`/api/waitlist`), adding contacts to an audience and notifying the founder

Explicitly NOT built, and must never be implied as live:

- Any real filing integration with any NYC agency
- Accounts, authentication, or billing
- Notifications (email/SMS alerts)
- Any paying customer relationship

**Commercial status: pre-revenue, waitlist only.** Nothing is for sale. The three tiers (Essentials $99/mo, Full-Service $299/mo, Enterprise $599+/mo) are *planned* pricing that models what businesses already pay consultants. No surface may present them as purchasable today, and no CTA may imply checkout.

## Brand Commitments

- Name: **BureauAI**, set as "Bureau" + "AI" with the "AI" carrying the accent color.
- Mark: a stylized neoclassical government frontage (pediment, entablature, three columns, stylobate) — the civic-institution reference is deliberate and durable.
- Voice: first-person service, plain English, specific, no hedging, no legal disclaimers, no filler. Name real agencies and real numbers rather than speaking in abstractions.
- The pitch deck at `public/pitch.html` is the current, deliberate expression of the brand — cream ground, editorial serif display, restrained green. Three commits in June 2026 moved it there specifically to shed a generic dark "AI product" aesthetic. That decision is binding on the rest of the brand.

## Evidence on Hand

**There is none, and none may be invented.** No customers, no pilot users, no testimonials, no case studies, no press, no waitlist count that can be cited as traction. Any surface that appears to carry social proof today (e.g. `SocialProofSection.tsx`) is a call-to-action, not evidence.

What *is* real and can carry credibility honestly:

- Named NYC agencies and their actual permit/license instruments
- Fee and timeline figures already used across the site and deck ($280 DOHMH food service, $4,352 SLA biannual, $110 DCWP, $150 FDNY, 8–12 agencies, 3–18 month timelines) — these are cited as domain facts, not as BureauAI results
- The working `/audit` tool, which demonstrates capability by doing something real in front of the visitor
- The `/dashboard` demo, provided it is labeled as a demo

## Product Principles

1. **BureauAI acts; the owner doesn't.** Every surface says what we handle, not what you must do.
2. **Specificity is the credibility.** Real agency names, real fees, real timelines — never "streamline your compliance workflow."
3. **Never claim what isn't built.** Pre-revenue and pre-integration. Ambition is stated as ambition.
4. **The institution is the reference, not the AI product.** BureauAI stands opposite the bureaucracy it absorbs; it should feel like a competent, permanent civic institution rather than a startup dashboard.
5. **Earn trust before asking for the email.** The visitor gives up an address only after seeing something real.

## Accessibility & Inclusion

No product-specific standard established with the user. Baseline obligations still apply: legible contrast on the cream ground, full keyboard operability of the audit flow and forms, respect for `prefers-reduced-motion`, and no meaning carried by color alone.
