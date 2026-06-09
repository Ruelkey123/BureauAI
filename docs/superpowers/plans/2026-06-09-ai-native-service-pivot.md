# AI-Native Service Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition BureauAI from a compliance tool to an AI-native compliance service company — replacing human expeditors/consultants — by rewriting copy across the entire product.

**Architecture:** Pure copy/messaging changes only. No new components, no new files, no structural changes. Every surface shifts from second-person imperative ("you need to do X") to first-person service ("we're handling X for you"). Visual design, data, and component structure are untouched.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS

---

## File Map

| File | Change |
|---|---|
| `app/_components/HeroSection.tsx` | Badge, H1, subheadline, primary CTA |
| `app/_components/ProblemSection.tsx` | H2, subheadline |
| `app/_components/HowItWorksSection.tsx` | All 3 step titles and bodies |
| `app/_components/PricingTeaserSection.tsx` | Plans array, H2 |
| `app/dashboard/_components/Sidebar.tsx` | 4 tab labels |
| `app/dashboard/_components/Overview.tsx` | Status header, 4 stat tiles, section headings, agency status |
| `app/dashboard/_components/Audit.tsx` | Action items header, action text (×2), history summaries, "previous audits" label |
| `app/dashboard/_components/Documents.tsx` | Card label, doc descriptions, missing-doc prompt |
| `app/dashboard/_components/Deadlines.tsx` | Section intro label |
| `app/dashboard/_components/Prepare.tsx` | Left panel header label |
| `app/audit/page.tsx` | Loading text, results heading, upsell heading + body, CTA button |

> **Note on testing:** These are all copy changes with no behavioral logic. No unit tests are required. Manual visual verification is the appropriate test: run `npm run dev`, open each page, and confirm the new text renders correctly.

---

## Task 1: Hero Section

**File:** `app/_components/HeroSection.tsx`

- [ ] **Step 1: Update badge text**

  Find:
  ```tsx
  Now live for NYC businesses
  ```
  Replace with:
  ```tsx
  AI compliance department for NYC businesses
  ```

- [ ] **Step 2: Update H1**

  Find:
  ```tsx
          NYC compliance.<br />
          <span style={{
  ```
  Replace with:
  ```tsx
          Your NYC compliance team.<br />
          <span style={{
  ```

  Find the gradient span text:
  ```tsx
            Finally simple.
  ```
  Replace with:
  ```tsx
            Fully automated.
  ```

- [ ] **Step 3: Update subheadline**

  Find:
  ```tsx
          BureauAI reads every NYC health, fire, building, and licensing regulation
          so you don't have to — AI audits, deadline alerts, violation guidance.
  ```
  Replace with:
  ```tsx
          BureauAI handles your permits, renewals, and violations across every NYC agency — so you never have to think about compliance again.
  ```

- [ ] **Step 4: Update primary CTA**

  Find:
  ```tsx
            Start free audit →
  ```
  Replace with:
  ```tsx
            Meet your compliance team →
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add app/_components/HeroSection.tsx
  git commit -m "copy: hero — service framing, AI compliance team positioning"
  ```

---

## Task 2: Problem Section

**File:** `app/_components/ProblemSection.tsx`

- [ ] **Step 1: Update H2**

  Find:
  ```tsx
            The complexity is real.
  ```
  Replace with:
  ```tsx
            This used to cost $50K+. We do it for $99/mo.
  ```

- [ ] **Step 2: Update subheadline**

  Find:
  ```tsx
              Running a business in NYC means navigating one of the most complex regulatory environments in the country — across agencies, deadlines, and filings most owners have never heard of.
  ```
  Replace with:
  ```tsx
              Until now, navigating NYC's DOH, FDNY, DOB, DCWP, and SLA required hiring expeditors, attorneys, and consultants. BureauAI replaces them all.
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add app/_components/ProblemSection.tsx
  git commit -m "copy: problem section — position vs. human consultants"
  ```

---

## Task 3: How It Works Section

**File:** `app/_components/HowItWorksSection.tsx`

- [ ] **Step 1: Update all 3 steps**

  Find the entire `steps` array:
  ```tsx
  const steps = [
    { n: '01', title: 'Tell us about your business', body: 'Address, business type, and where you are — opening, operating, or responding to a violation.' },
    { n: '02', title: 'We read the regulations', body: 'AI maps every requirement, deadline, and filing for your specific situation across every NYC agency.' },
    { n: '03', title: 'You get a living checklist', body: 'Organised by urgency, updated when rules change, with inspector-ready documents attached.' },
  ]
  ```
  Replace with:
  ```tsx
  const steps = [
    { n: '01', title: 'Tell us about your business', body: 'Share your business type, borough, and current situation. That\'s all we need to get started.' },
    { n: '02', title: 'We take over your compliance', body: 'BureauAI maps every permit, license, and filing requirement for your business — then begins managing them on your behalf across all NYC agencies.' },
    { n: '03', title: 'You get a compliance team', body: 'Real-time status of everything we\'re handling — filings submitted, violations defended, renewals managed. Zero action required from you.' },
  ]
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add app/_components/HowItWorksSection.tsx
  git commit -m "copy: how it works — service delivery steps, not self-service"
  ```

---

## Task 4: Pricing Section

**File:** `app/_components/PricingTeaserSection.tsx`

- [ ] **Step 1: Replace the plans array**

  Find the entire `plans` array (from `const plans = [` through its closing `]`):
  ```tsx
  const plans = [
    {
      label: 'Beta Access',
      ...
    },
    ...
  ]
  ```
  Replace with:
  ```tsx
  const plans = [
    {
      label: 'Essentials',
      price: '$99',
      sub: 'per month · cancel anytime',
      highlight: false,
      features: [
        'Compliance monitoring across all NYC agencies',
        'Deadline management & alerts',
        'Violation detection & guidance',
        '1 business location',
      ],
      cta: 'Get started',
      href: '#waitlist',
    },
    {
      label: 'Full-Service',
      price: '$299',
      sub: 'per month · cancel anytime',
      highlight: true,
      features: [
        'Everything in Essentials',
        'Permit filing & license renewals — we handle it',
        'Violation response & agency communication',
        'Inspector-ready documents prepared for you',
        '1 business location',
      ],
      cta: 'Get started',
      href: '#waitlist',
    },
    {
      label: 'Enterprise',
      price: '$599+',
      sub: 'per month · contact us',
      highlight: false,
      features: [
        'Everything in Full-Service',
        'Multiple locations',
        'Complex case & violation history handling',
        'Dedicated compliance agent',
      ],
      cta: 'Contact us',
      href: '#waitlist',
    },
  ]
  ```

- [ ] **Step 2: Update the section H2**

  Find:
  ```tsx
          Straightforward pricing
  ```
  Replace with:
  ```tsx
          Replace your compliance consultant
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add app/_components/PricingTeaserSection.tsx
  git commit -m "copy: pricing — 3-tier retainer replacing consultant framing"
  ```

---

## Task 5: Dashboard Sidebar Labels

**File:** `app/dashboard/_components/Sidebar.tsx`

- [ ] **Step 1: Update tab labels**

  Find:
  ```tsx
    { id: 'deadlines', label: 'Deadlines',
  ```
  Replace with:
  ```tsx
    { id: 'deadlines', label: "We're Managing",
  ```

  Find:
  ```tsx
    { id: 'documents', label: 'Documents',
  ```
  Replace with:
  ```tsx
    { id: 'documents', label: 'Filed & Tracked',
  ```

  Find:
  ```tsx
    { id: 'audit', label: 'AI Audit',
  ```
  Replace with:
  ```tsx
    { id: 'audit', label: 'Our Latest Audit',
  ```

  Find:
  ```tsx
    { id: 'incentives', label: 'Incentives',
  ```
  Replace with:
  ```tsx
    { id: 'incentives', label: 'Your Credits',
  ```

  Find:
  ```tsx
    { id: 'prepare', label: 'Prepare',
  ```
  Replace with:
  ```tsx
    { id: 'prepare', label: 'Action Items',
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add app/dashboard/_components/Sidebar.tsx
  git commit -m "copy: dashboard sidebar — service-framed tab labels"
  ```

---

## Task 6: Dashboard Overview Tab

**File:** `app/dashboard/_components/Overview.tsx`

- [ ] **Step 1: Add compliance team status header**

  Find the opening of the main content wrapper (the first `<div>` after the outer wrapper with `padding: '24px'`):
  ```tsx
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ── Row 1: Score + stats ── */}
  ```
  Replace with:
  ```tsx
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Team status bar */}
          <div style={{ fontSize: '12px', color: 'rgba(77,186,128,0.8)', letterSpacing: '0.04em' }}>
            ● Your compliance team is active — last updated today
          </div>

          {/* ── Row 1: Score + stats ── */}
  ```

- [ ] **Step 2: Update the 4 stat tile labels**

  Find the stats array inside the `map`:
  ```tsx
              { value: String(urgentDeadlines.length), label: 'Urgent deadlines', accent: AMBER },
              { value: '0', label: 'Open violations', accent: GREEN },
              { value: '$14,200', label: 'Credits identified', accent: GREEN },
              { value: '4 / 6', label: 'Docs uploaded', accent: TEXT },
  ```
  Replace with:
  ```tsx
              { value: String(urgentDeadlines.length), label: "We're handling soon", accent: AMBER },
              { value: '0', label: "Violations we're managing", accent: GREEN },
              { value: '$14,200', label: "Credits we've found", accent: GREEN },
              { value: '4 / 6', label: 'Docs filed', accent: TEXT },
  ```

- [ ] **Step 3: Update agency "Action needed" status**

  Find:
  ```tsx
    { name: 'FDNY', status: 'Action needed', ok: false },
  ```
  Replace with:
  ```tsx
    { name: 'FDNY', status: 'In progress', ok: false },
  ```

- [ ] **Step 4: Find and update "Priority actions" section heading in Overview**

  Search for the string `'Priority actions'` or `"Priority actions"` in `Overview.tsx` and replace with `"What we're doing now"`. If that exact string isn't present, look for a label above the actions list and update it to match.

- [ ] **Step 5: Commit**

  ```bash
  git add app/dashboard/_components/Overview.tsx
  git commit -m "copy: dashboard overview — service framing, team status header"
  ```

---

## Task 7: Dashboard Audit Tab

**File:** `app/dashboard/_components/Audit.tsx`

- [ ] **Step 1: Update the immediate actions header label**

  Find:
  ```tsx
          Immediate Actions · Next 30 days
  ```
  Replace with:
  ```tsx
          What We're Handling · Next 30 days
  ```

- [ ] **Step 2: Rewrite action item text to active service voice**

  Find the `ACTIONS` array:
  ```tsx
  const ACTIONS = [
    {
      n: '1',
      bg: '#ef4444',
      text: 'Renew your DOHMH food service permit before Jun 30. File online at the DOHMH eFoodservice portal. Processing takes 2–3 weeks — start now.',
    },
    {
      n: '2',
      bg: '#f59e0b',
      text: 'Schedule your FDNY annual inspection. Contact FDNY Bureau of Fire Prevention to book — inspectors are typically booked 3–4 weeks out.',
    },
  ]
  ```
  Replace with:
  ```tsx
  const ACTIONS = [
    {
      n: '1',
      bg: '#ef4444',
      text: 'Renewing your DOHMH food service permit — due Jun 30. Filing online at the DOHMH eFoodservice portal. Processing takes 2–3 weeks — in progress.',
    },
    {
      n: '2',
      bg: '#f59e0b',
      text: 'Scheduling your FDNY annual inspection. Coordinating with FDNY Bureau of Fire Prevention — inspectors are typically booked 3–4 weeks out.',
    },
  ]
  ```

- [ ] **Step 3: Update "Previous Audits" label to "Our Audit History"**

  Find:
  ```tsx
            <span style={{ fontWeight: '600', fontSize: '13px', color: TEXT }}>Previous Audits</span>
  ```
  Replace with:
  ```tsx
            <span style={{ fontWeight: '600', fontSize: '13px', color: TEXT }}>Our Audit History</span>
  ```

- [ ] **Step 4: Update audit history summaries**

  Find the `HISTORY` array:
  ```tsx
  const HISTORY = [
    { date: 'May 31, 2026', score: 94, summary: '2 urgent actions identified. DOH renewal flagged.' },
    { date: 'Apr 30, 2026', score: 91, summary: 'FDNY inspection prep added. Score improved +3.' },
    { date: 'Mar 31, 2026', score: 88, summary: 'DCWP license renewal flagged. 3 actions resolved.' },
  ]
  ```
  Replace with:
  ```tsx
  const HISTORY = [
    { date: 'May 31, 2026', score: 94, summary: 'We identified 2 urgent items. DOH renewal in progress.' },
    { date: 'Apr 30, 2026', score: 91, summary: 'FDNY inspection scheduled. Score improved +3.' },
    { date: 'Mar 31, 2026', score: 88, summary: 'DCWP license renewal filed. 3 items resolved.' },
  ]
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add app/dashboard/_components/Audit.tsx
  git commit -m "copy: audit tab — we're doing this, not telling you to"
  ```

---

## Task 8: Dashboard Documents Tab

**File:** `app/dashboard/_components/Documents.tsx`

- [ ] **Step 1: Update card label "Ready to use" → "Filed & managed"**

  Find:
  ```tsx
              <div style={{ fontSize: '9px', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: '600' }}>Ready to use</div>
  ```
  Replace with:
  ```tsx
              <div style={{ fontSize: '9px', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: '600' }}>Filed & managed</div>
  ```

- [ ] **Step 2: Update doc descriptions to service voice**

  Find the `DOCS` array:
  ```tsx
  const DOCS = [
    {
      title: 'DOH Permit Renewal Form',
      description: 'Pre-filled with your business info. Submit directly to DOHMH.',
      status: 'Action needed',
    },
    {
      title: 'FDNY Inspection Checklist',
      description: 'Inspector-ready checklist for your location type and borough.',
      status: 'In progress',
    },
    {
      title: 'DCWP License Application',
      description: 'Business license renewal, pre-filled for Manhattan.',
      status: 'Not started',
    },
  ]
  ```
  Replace with:
  ```tsx
  const DOCS = [
    {
      title: 'DOH Permit Renewal Form',
      description: 'Prepared and submitted to DOHMH on your behalf. Download a copy anytime.',
      status: 'Needed from you',
    },
    {
      title: 'FDNY Inspection Checklist',
      description: 'We prepared this inspector-ready checklist for your location and borough.',
      status: 'In progress',
    },
    {
      title: 'DCWP License Application',
      description: 'Business license renewal filed for your Manhattan location.',
      status: 'Not started',
    },
  ]
  ```

- [ ] **Step 3: Update the missing-doc prompt**

  Find:
  ```tsx
          <div style={{ fontSize: '12px', color: MUTED, textAlign: 'center' }}>Need a different document?</div>
          <button style={{ fontSize: '12px', color: TEXT, fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Request a template →</button>
  ```
  Replace with:
  ```tsx
          <div style={{ fontSize: '12px', color: MUTED, textAlign: 'center' }}>Need us to prepare something?</div>
          <button style={{ fontSize: '12px', color: TEXT, fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Ask your compliance team →</button>
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add app/dashboard/_components/Documents.tsx
  git commit -m "copy: documents tab — filed & managed framing"
  ```

---

## Task 9: Dashboard Deadlines Tab

**File:** `app/dashboard/_components/Deadlines.tsx`

- [ ] **Step 1: Add a section intro above the table**

  Find the opening `<div>` inside the return:
  ```tsx
      <div style={{ background: BG, minHeight: '100%', padding: '20px' }}>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
  ```
  Replace with:
  ```tsx
      <div style={{ background: BG, minHeight: '100%', padding: '20px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(77,186,128,0.8)', letterSpacing: '0.04em', marginBottom: '12px' }}>
          ● We're managing all of these on your behalf
        </div>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add app/dashboard/_components/Deadlines.tsx
  git commit -m "copy: deadlines tab — we're managing these for you"
  ```

---

## Task 10: Dashboard Prepare Tab

**File:** `app/dashboard/_components/Prepare.tsx`

- [ ] **Step 1: Update left panel header label**

  Find:
  ```tsx
        <div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: DIM, marginBottom: '4px' }}>Upcoming items</div>
  ```
  Replace with:
  ```tsx
        <div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: DIM, marginBottom: '4px' }}>What we're preparing</div>
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add app/dashboard/_components/Prepare.tsx
  git commit -m "copy: prepare tab — what we're preparing framing"
  ```

---

## Task 11: Audit Page (`/audit`)

**File:** `app/audit/page.tsx`

- [ ] **Step 1: Update the loading/analyzing text**

  Find:
  ```tsx
              Analyzing NYC regulations for your situation…
  ```
  Replace with:
  ```tsx
              Our team is auditing your business…
  ```

- [ ] **Step 2: Update the main CTA button**

  Find:
  ```tsx
              Generate my compliance audit →
  ```
  Replace with:
  ```tsx
              Get my free audit →
  ```

- [ ] **Step 3: Update the results heading**

  Find:
  ```tsx
              <h1 className="font-serif" style={{ fontSize: '2rem', ...TEXT, marginBottom: '6px', lineHeight: 1.2 }}>Your compliance snapshot</h1>
  ```
  Replace with:
  ```tsx
              <h1 className="font-serif" style={{ fontSize: '2rem', ...TEXT, marginBottom: '6px', lineHeight: 1.2 }}>Your compliance audit</h1>
  ```

- [ ] **Step 4: Update the upsell section**

  Find:
  ```tsx
                <h2 className="font-serif" style={{ fontSize: '1.4rem', ...TEXT, marginBottom: '8px' }}>Get your full dashboard</h2>
                <p style={{ ...MUTED, fontSize: '13px', marginBottom: '20px' }}>Join the waitlist for your complete compliance dashboard.</p>
  ```
  Replace with:
  ```tsx
                <h2 className="font-serif" style={{ fontSize: '1.4rem', ...TEXT, marginBottom: '8px' }}>Let us handle everything</h2>
                <p style={{ ...MUTED, fontSize: '13px', marginBottom: '20px' }}>Get a compliance team that files, manages, and defends your business — starting at $99/mo.</p>
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add app/audit/page.tsx
  git commit -m "copy: audit page — service framing, team language, upsell to service tiers"
  ```

---

## Task 12: Visual QA

- [ ] **Step 1: Run dev server**

  ```bash
  npm run dev
  ```

- [ ] **Step 2: Check landing page** — open `http://localhost:3000`
  - Hero: "Your NYC compliance team. Fully automated."
  - Problem: "This used to cost $50K+. We do it for $99/mo."
  - How it works: "We take over your compliance" / "You get a compliance team"
  - Pricing: "Replace your compliance consultant" · Essentials $99 / Full-Service $299 / Enterprise $599+

- [ ] **Step 3: Check dashboard** — open `http://localhost:3000/dashboard`
  - Sidebar labels: "We're Managing", "Filed & Tracked", "Our Latest Audit", "Your Credits", "Action Items"
  - Overview: green status bar, updated stat tile labels, "What we're doing now"
  - Audit tab: "What We're Handling", action text in active voice, "Our Audit History"
  - Documents tab: "Filed & managed" label, updated descriptions
  - Deadlines tab: green "We're managing" banner at top
  - Prepare tab: "What we're preparing" left panel header

- [ ] **Step 4: Check audit page** — open `http://localhost:3000/audit`
  - CTA button: "Get my free audit →"
  - After submitting: loading text "Our team is auditing your business…"
  - Results: "Your compliance audit" heading
  - Upsell: "Let us handle everything" / "$99/mo" mention

- [ ] **Step 5: Final commit if any fixes needed**

  ```bash
  git add -p
  git commit -m "fix: QA pass — service pivot copy corrections"
  ```
