# BureauAI — AI-Native Service Company Pivot

**Date:** 2026-06-09  
**Status:** Approved  
**Inspired by:** YC / Gustaf Alströmer thesis on AI-native service companies (compliance management explicitly called out as a target vertical)

---

## 1. Strategic Framing

### The Shift

BureauAI moves from a **compliance tool** (informs business owners what to do) to a **compliance service** (does it for them — AI replaces the human expeditor, consultant, and attorney).

| Before | After |
|---|---|
| "Reads regulations so you don't have to" | "We handle your NYC compliance" |
| Business owner = actor | BureauAI = actor |
| SaaS dashboard | AI compliance department |
| Informs | Executes |

### YC Thesis Alignment

- Total spend on compliance services >> compliance software
- Services already outsourced → structurally easier to replace than software
- Compliance is one of YC's four explicitly named target verticals
- Positioning: replace a service, not improve it

### Who We Replace

NYC compliance expeditors, permit consultants, and compliance attorneys — who charge $50K+ for complex cases and retainers for ongoing management. BureauAI undercuts on price, outperforms on speed and coverage.

---

## 2. Business Model

**Tiered monthly retainer** — mirrors what businesses already pay consultants, creates predictable MRR.

| Tier | Price | Who |
|---|---|---|
| Essentials | $99/mo | Single location, low complexity, monitoring + alerts |
| Full-Service | $299/mo | Restaurants, retail — active filing, renewals, violation handling |
| Enterprise | $599+/mo | Multi-location, complex history, dedicated compliance agent |

---

## 3. Voice & Tone Throughout the Product

Every surface shifts from second-person imperative ("you need to file X") to first-person service ("we're handling X for you").

| Before | After |
|---|---|
| "Here's what you need to do" | "Here's what we're doing for you" |
| "Your to-do list" | "What we're handling" |
| "Your deadlines" | "Deadlines we're managing" |
| "Run an audit" | "Your latest audit report" |
| "Upload documents" | "Documents we've filed & are tracking" |

---

## 4. Landing Page Changes

### Hero Section (`HeroSection.tsx`)

- **Badge:** "Now live for NYC businesses" → "AI compliance department for NYC businesses"
- **H1:** "NYC compliance. Finally simple." → "Your NYC compliance team. Fully automated."
- **Subheadline:** "BureauAI reads every NYC regulation so you don't have to — AI audits, deadline alerts, violation guidance." → "BureauAI handles your permits, renewals, and violations across every NYC agency — so you never have to think about compliance again."
- **Primary CTA:** "Start free audit →" → "Meet your compliance team →"
- **Secondary CTA:** "See demo →" → keep
- **Tag line:** "Free to try · No account needed · NYC businesses" → keep

### Problem Section (`ProblemSection.tsx`)

- **H2:** "The complexity is real." → "This used to cost $50K+. We do it for $99/mo."
- **Subheadline:** reframe from describing the problem to describing what we replace — "Until now, navigating NYC's DOH, FDNY, DOB, DCWP, and SLA required hiring expeditors, attorneys, and consultants. BureauAI replaces them all."
- Stats stay (powerful as-is, reinforce the problem we're solving)

### How It Works Section (`HowItWorksSection.tsx`)

Replace the 3 steps to reflect service delivery, not self-service:

| Step | Before | After |
|---|---|---|
| 01 | "Tell us about your business" | "Tell us about your business" (keep) |
| 02 | "We read the regulations" | "We take over your compliance" — BureauAI maps every requirement and begins managing filings, renewals, and deadlines on your behalf |
| 03 | "You get a living checklist" | "You get a compliance team" — real-time status of everything we're doing, with zero action required from you |

### Pricing Section (`PricingTeaserSection.tsx`)

Replace current plans (Beta Access / Solo Operator / Business) with the 3 service tiers:

| Tier | Price | Key features |
|---|---|---|
| Essentials | $99/mo | Compliance monitoring, deadline management, violation alerts, 1 location |
| Full-Service | $299/mo | Everything in Essentials + permit filing, license renewals, violation response, agency communication, 1 location |
| Enterprise | $599+/mo | Everything in Full-Service + multi-location, dedicated compliance agent, complex case handling |

- H2: "Straightforward pricing" → "Replace your compliance consultant"
- Subheadline: "A fraction of what professional services cost — with no surprises." → keep (it's perfect)
- Remove "Beta Access" free tier; replace highlight card with Full-Service (most relevant tier)
- Bottom link: "Multiple locations?" → keep

---

## 5. Dashboard Tab Renames & Reframes

### Sidebar Tab Labels

| Current | New | Rationale |
|---|---|---|
| Overview | Overview | Keep — reframe content inside |
| Deadlines | We're Managing | Signals BureauAI owns these |
| Documents | Filed & Tracked | We filed or are tracking these |
| AI Audit | Our Latest Audit | We ran this for you |
| Incentives | Your Credits | Slightly more possessive/service feel |
| Financials | Financials | Keep |
| Prepare | Action Items | Reframe as our checklist, not yours |
| Rights | Your Rights | Keep |

### Overview Tab (`Overview.tsx`)

- Add a "BureauAI Status" header line: "Your compliance team is active — last updated today"
- Stat tile: "4 / 6 Docs uploaded" → "4 / 6 Docs filed" (we filed them)
- Stat tile: "Open violations" → "Violations we're managing" (0 = great, nonzero = we're on it)
- Stat tile: "Credits identified" → "Credits we've found"
- Urgent deadlines tile: "Urgent deadlines" → "We're handling soon"
- Agency status column: "Action needed" → "In progress" (BureauAI is handling it)
- Actions section heading: "Priority actions" → "What we're doing now"

### Actions / In Progress Tab

- Section heading: "Priority actions" → "Currently in progress"
- Each action item: rewrite from imperative ("Renew your food handler permit") to service active voice ("Renewing your food handler permit — due in 14 days")
- Add a status badge per action: `In Progress` / `Awaiting your info` / `Complete`

### Documents Tab (`Documents.tsx`)

- Tab label: "Documents" → "Filed & Tracked"
- Section heading: reframe to "Documents we've filed or are managing on your behalf"
- Missing docs: "Missing" → "Needed from you" (only thing owner needs to do)

### Deadlines Tab (`Deadlines.tsx`)

- Tab label: "Deadlines" → "We're Managing"
- Section heading: "Upcoming deadlines" → "Deadlines we're managing for you"
- Each row: owner column shows "BureauAI" not blank

### Audit Tab (`Audit.tsx`)

- Tab label: "AI Audit" → "Our Latest Audit"
- Section heading: "AI Audit Report" → "BureauAI Audit — [Date]"
- Intro text: "BureauAI analyzed your business..." → "We audited your business across all NYC agencies. Here's what we found."

### Prepare Tab (`Prepare.tsx`)

- Tab label: "Prepare" → "Action Items"
- Intro: reframe checklist as things BureauAI needs from the owner (not things the owner needs to do themselves)
- Each item: "You need to provide X" not "Do X"

---

## 6. Audit Page (`/audit`)

- Headline: "Run a free AI audit" → "Get your free compliance audit"
- Subheadline: reframe from "we'll analyze" to "our team will audit your business"
- Results framing: "Here's what you need to do" → "Here's what we found — and what we'll handle for you"
- CTA after audit: "Upgrade to get the full service" → links to Full-Service tier

---

## 7. What Does NOT Change

- Visual design, color system, component structure — no redesign
- Underlying data (deadlines, agencies, rights, incentives) — no changes
- Navigation structure — tabs stay, labels change
- Tech stack — no changes

---

## 8. Out of Scope (future work)

- Actual backend service execution (filing integrations with NYC agencies)
- Account/auth system
- Real customer onboarding flow
- Notification system (email/SMS alerts)

This spec covers positioning and copy only — the product looks and functions the same, but the story it tells is fundamentally different.
