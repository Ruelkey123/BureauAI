# BureauAI Demo Dashboard Spec
**Date:** 2026-05-31  
**Goal:** Build a static demo/prototype dashboard at `/dashboard` that shows the full BureauAI product experience — no auth, no database, all hardcoded demo data for a fictional NYC business "Joe's Deli, Midtown Manhattan"

---

## Overview

A fully interactive demo dashboard that gives investors and potential customers a clear picture of what BureauAI looks like post-signup. Stripe/Resend aesthetic — clean white panels, subtle borders, dark navy sidebar, no AI-generated visual clichés. All data is hardcoded demo data. No login required — accessible directly at `/dashboard`.

---

## Layout

**Icon sidebar (52px wide, navy `#0f1e2e` background) + main content area.**

The sidebar contains:
- BureauAI logo mark (green square, top)
- 5 nav icons (see pages below) — active icon has white border highlight
- User avatar initials "JD" at the bottom

The main content area has:
- A top bar (white, 44px, business name + status badge)
- Page content below (light grey `#f8f8f6` background)

---

## Pages (5 sidebar tabs)

### 1. Overview (default)
Three equal-width cards across the top row:

**Card 1 — Compliance Score**
- SVG ring chart showing 94/100
- "Good Standing" label in green
- Two mini-stats below: "3 Due Soon" (amber) and "0 Violations" (navy)

**Card 2 — Action Required**
- "DOH Permit Renewal" — red left-border, due Jun 30, 18 days
- "FDNY Inspection Prep" — amber left-border, due Jul 15, 33 days
- "+2 more deadlines this quarter" footer

**Card 3 — NYC Agency Status**
- DOHMH → Compliant (green badge)
- FDNY → Action Needed (amber badge)
- DOB → Compliant (green badge)
- DCWP → Compliant (green badge)
- SLA → Not applicable (grey badge)

Full-width bottom row: **Upcoming Deadlines table**
Columns: Requirement · Agency · Due Date · Days Left · Status
3 rows: DOH (urgent/red), FDNY (prep needed/amber), DCWP (on track/grey)

---

### 2. Deadlines
Full-width table with 5 rows, columns: Requirement · Agency · Due Date · Days Left · Status

| Requirement | Agency | Due | Days | Status |
|---|---|---|---|---|
| Food Service Permit Renewal | DOHMH | Jun 30 | 18 | Urgent (red) |
| Annual Fire Inspection | FDNY | Jul 15 | 33 | Prep needed (amber) |
| Business License Renewal | DCWP | Aug 1 | 50 | On track (grey) |
| DOB Certificate of Occupancy Review | DOB | Aug 20 | 69 | Compliant (green) |
| Sidewalk Café Permit Renewal | DCWP | Sep 1 | 82 | Compliant (green) |

---

### 3. Documents
3-column grid of document cards, each with:
- "Ready to use" label (small caps)
- Document name (bold)
- 1-line description
- "Download PDF →" link (green)

Documents:
1. DOH Permit Renewal Form — Pre-filled with your business info. Submit directly to DOHMH.
2. FDNY Inspection Checklist — Inspector-ready checklist for your location type.
3. DCWP License Application — Business license renewal, pre-filled for your borough.
4. A dashed "Request a template →" card as the 4th slot.

---

### 4. AI Audit
Three stacked panels:

**Panel 1 (dark navy background)**
"Immediate Actions · Next 30 days" — numbered list on dark background
1. Renew DOHMH food service permit before Jun 30. File at DOHMH eFoodservice portal. Processing takes 2–3 weeks.
2. Schedule FDNY annual inspection. Contact FDNY Bureau of Fire Prevention — booking 3–4 weeks out.

**Panel 2 (white)**
"Upcoming Deadlines" — plain text list of recurring deadlines

**Panel 3 (white)**
"What This Costs Without BureauAI" — cost comparison (expeditor $3K–$8K, attorney $5K–$15K, consultant $2K–$5K/year) vs BureauAI $149/month

**Bottom bar**: "Run new audit →" button (links to `/audit`)

---

### 5. Incentives & Tax Credits
Header shows "$14,200 identified" in green.

Two incentive cards, each showing:
- Program name (bold)
- 2-line description
- Dollar amount (large, green)
- "Learn more →" green button

Incentives:
1. Work Opportunity Tax Credit (WOTC) — up to $9,600 per eligible employee
2. NYC Small Business Energy Efficiency Program — $4,600 estimated rebate

Footer note: "BureauAI scans 40+ NYC and federal incentive programs monthly."

---

## Design Tokens

Use the existing BureauAI Tailwind tokens — do not introduce new colours:
- `navy` (#0f1e2e), `navy-mid` (#1a3044)
- `green` (#3a7a5c), `green-light` (#4a9a72)
- `cream` (#f0f0e8)
- `bureau-border` (#dde0d8), `bureau-muted` (#6b7a8d), `bureau-text` (#1a2535)
- `bg-[#f8f8f6]` for content area background

---

## Route & Navigation

- Route: `app/dashboard/page.tsx` — new file, `'use client'`
- Uses `useState` to track active tab (overview | deadlines | documents | audit | incentives)
- No auth, no redirects — publicly accessible
- "Run new audit →" button links to `/audit`
- Nav `Nav.tsx` does NOT need to be updated — dashboard is a standalone page

---

## Out of Scope

- Real auth / login flow
- Database or API calls
- Real document downloads (PDFs)
- Real incentive eligibility checks
- Mobile responsiveness (desktop demo only)
