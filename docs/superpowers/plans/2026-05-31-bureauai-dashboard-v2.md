# BureauAI Dashboard V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve all 4 existing dashboard tabs and add a new Financials tab with compliance cost calendar and tax credit pipeline.

**Architecture:** All changes are in `app/dashboard/_components/`. The Financials tab requires a new component and a new sidebar icon + route entry in `page.tsx`. All data stays hardcoded demo data.

**Tech Stack:** Next.js 16, React, Tailwind CSS with existing BureauAI tokens (navy, green, bureau-border, bureau-muted, bureau-text)

---

## File Map

| Action | File | Change |
|---|---|---|
| Modify | `app/dashboard/_components/Overview.tsx` | Add 90-day visual timeline bar |
| Modify | `app/dashboard/_components/Deadlines.tsx` | Add "Mark complete" per row with useState |
| Modify | `app/dashboard/_components/Documents.tsx` | Add status badge to each doc card |
| Modify | `app/dashboard/_components/Audit.tsx` | Add "Previous audits" history section |
| Create | `app/dashboard/_components/Financials.tsx` | Cost calendar + tax credit pipeline |
| Modify | `app/dashboard/page.tsx` | Add financials tab to PAGE_TITLES |
| Modify | `app/dashboard/_components/Sidebar.tsx` | Add financials icon to navItems |

---

## Task 1: Overview — 90-day timeline bar

**Files:**
- Modify: `app/dashboard/_components/Overview.tsx`

- [ ] **Step 1: Add timeline bar below the 3 top cards, above the deadlines table**

Add this data constant at the top of the file (after existing constants):

```tsx
const TIMELINE = [
  { label: 'Jun 30', agency: 'DOHMH', color: 'bg-red-400', offset: 0 },
  { label: 'Jul 15', agency: 'FDNY', color: 'bg-amber-400', offset: 21 },
  { label: 'Aug 1', agency: 'DCWP', offset: 37, color: 'bg-gray-300' },
  { label: 'Aug 20', agency: 'DOB', offset: 56, color: 'bg-gray-300' },
  { label: 'Sep 1', agency: 'DCWP', offset: 68, color: 'bg-gray-300' },
]
```

Add this JSX between the top 3 cards grid and the deadlines table:

```tsx
{/* 90-day timeline */}
<div className="bg-white border border-bureau-border rounded-lg p-4">
  <div className="flex items-center justify-between mb-3">
    <span className="font-semibold text-navy text-sm">Next 90 Days</span>
    <div className="flex gap-3 text-[9px] text-bureau-muted">
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Urgent</span>
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Due soon</span>
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />On track</span>
    </div>
  </div>
  <div className="relative h-8">
    {/* Track */}
    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-bureau-border -translate-y-1/2" />
    {/* Month labels */}
    <div className="absolute inset-0 flex justify-between text-[9px] text-bureau-muted" style={{ paddingTop: '20px' }}>
      {['Jun', 'Jul', 'Aug', 'Sep'].map(m => <span key={m}>{m}</span>)}
    </div>
    {/* Deadline dots */}
    {TIMELINE.map(({ label, agency, color, offset }) => (
      <div
        key={label}
        className="absolute top-1/2 -translate-y-1/2 group"
        style={{ left: `${offset}%` }}
      >
        <div className={`w-3 h-3 rounded-full ${color} border-2 border-white shadow-sm cursor-pointer`} />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-navy text-cream text-[9px] px-2 py-1 rounded whitespace-nowrap z-10">
          {agency} · {label}
        </div>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/ruelkey/BureauAI && git add app/dashboard/_components/Overview.tsx && git commit -m "feat: add 90-day timeline bar to overview tab"
```

---

## Task 2: Deadlines — Mark complete

**Files:**
- Modify: `app/dashboard/_components/Deadlines.tsx`

- [ ] **Step 1: Add useState for completed rows, add complete button per row**

Replace the entire file:

```tsx
'use client'

import React, { useState } from 'react'

const ROWS = [
  { req: 'Food Service Permit Renewal', agency: 'DOHMH', due: 'Jun 30', days: 18, status: 'Urgent', statusClass: 'bg-amber-100 text-amber-700' },
  { req: 'Annual Fire Inspection', agency: 'FDNY', due: 'Jul 15', days: 33, status: 'Prep needed', statusClass: 'bg-amber-100 text-amber-700' },
  { req: 'Business License Renewal', agency: 'DCWP', due: 'Aug 1', days: 50, status: 'On track', statusClass: 'bg-gray-100 text-bureau-muted' },
  { req: 'DOB Certificate of Occupancy Review', agency: 'DOB', due: 'Aug 20', days: 69, status: 'Compliant', statusClass: 'bg-green/10 text-green' },
  { req: 'Sidewalk Café Permit Renewal', agency: 'DCWP', due: 'Sep 1', days: 82, status: 'Compliant', statusClass: 'bg-green/10 text-green' },
]

export default function Deadlines() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  function toggle(req: string) {
    setCompleted(prev => {
      const next = new Set(prev)
      next.has(req) ? next.delete(req) : next.add(req)
      return next
    })
  }

  return (
    <div className="p-4">
      <div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '2fr 100px 90px 80px 110px 100px' }}>
          {['Requirement', 'Agency', 'Due Date', 'Days Left', 'Status', ''].map(h => (
            <div key={h || 'action'} className="px-4 py-3 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider bg-[#f8f8f6] border-b border-bureau-border">
              {h}
            </div>
          ))}
          {ROWS.map(({ req, agency, due, days, status, statusClass }, i) => {
            const done = completed.has(req)
            const border = i < ROWS.length - 1 ? 'border-b border-[#f0f0ec]' : ''
            const dueColor = days <= 33 && !done ? 'text-amber-600 font-medium' : 'text-bureau-muted'
            return (
              <React.Fragment key={req}>
                <div className={`px-4 py-3 text-xs font-medium ${border} ${done ? 'line-through text-bureau-muted' : 'text-navy'}`}>{req}</div>
                <div className={`px-4 py-3 text-xs text-bureau-muted ${border}`}>{agency}</div>
                <div className={`px-4 py-3 text-xs ${dueColor} ${border}`}>{due}</div>
                <div className={`px-4 py-3 text-xs ${dueColor} ${border}`}>{days}d</div>
                <div className={`px-4 py-3 ${border}`}>
                  {done
                    ? <span className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-green/10 text-green">Done</span>
                    : <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusClass}`}>{status}</span>
                  }
                </div>
                <div className={`px-4 py-3 ${border}`}>
                  <button
                    onClick={() => toggle(req)}
                    className={`text-[9px] font-medium px-2 py-1 rounded transition-colors ${
                      done
                        ? 'text-bureau-muted hover:text-navy'
                        : 'text-green hover:text-green-light'
                    }`}
                  >
                    {done ? 'Undo' : '✓ Complete'}
                  </button>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/ruelkey/BureauAI && git add app/dashboard/_components/Deadlines.tsx && git commit -m "feat: add mark complete to deadlines tab"
```

---

## Task 3: Documents — Status badges

**Files:**
- Modify: `app/dashboard/_components/Documents.tsx`

- [ ] **Step 1: Add status to each doc card**

Replace the entire file:

```tsx
const DOCS = [
  {
    title: 'DOH Permit Renewal Form',
    description: 'Pre-filled with your business info. Submit directly to DOHMH.',
    status: 'Action needed',
    statusClass: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'FDNY Inspection Checklist',
    description: 'Inspector-ready checklist for your location type and borough.',
    status: 'In progress',
    statusClass: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'DCWP License Application',
    description: 'Business license renewal, pre-filled for Manhattan.',
    status: 'Not started',
    statusClass: 'bg-gray-100 text-bureau-muted',
  },
]

export default function Documents() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {DOCS.map(({ title, description, status, statusClass }) => (
          <div key={title} className="bg-white border border-bureau-border rounded-lg p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="text-[9px] text-bureau-muted uppercase tracking-widest">Ready to use</div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusClass}`}>{status}</span>
            </div>
            <div>
              <div className="font-semibold text-navy text-sm mb-1.5">{title}</div>
              <div className="text-xs text-bureau-muted leading-relaxed">{description}</div>
            </div>
            <button className="text-[10px] text-green font-semibold text-left mt-auto">
              Download PDF →
            </button>
          </div>
        ))}
        <div className="bg-[#f8f8f6] border border-dashed border-bureau-border rounded-lg p-5 flex flex-col items-center justify-center gap-2">
          <div className="text-xs text-bureau-muted text-center">Need a different document?</div>
          <button className="text-xs text-navy font-semibold">Request a template →</button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/ruelkey/BureauAI && git add app/dashboard/_components/Documents.tsx && git commit -m "feat: add status badges to documents tab"
```

---

## Task 4: AI Audit — Previous audits history

**Files:**
- Modify: `app/dashboard/_components/Audit.tsx`

- [ ] **Step 1: Add previous audits section at the bottom**

Read the current file, then add the HISTORY constant and section. The current file ends with the "Run new audit" bar. Add between the Upcoming Deadlines panel and the run bar:

First add this constant near the top of the file:

```tsx
const HISTORY = [
  { date: 'May 31, 2026', score: 94, summary: '2 urgent actions identified. DOH renewal flagged.' },
  { date: 'Apr 30, 2026', score: 91, summary: 'FDNY inspection prep added. Score improved +3.' },
  { date: 'Mar 31, 2026', score: 88, summary: 'DCWP license renewal flagged. 3 actions resolved.' },
]
```

Then add this JSX block between the Upcoming Deadlines panel and the run-new-audit bar:

```tsx
<div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
  <div className="px-5 py-3 border-b border-bureau-border flex items-center justify-between">
    <span className="font-semibold text-navy text-sm">Previous Audits</span>
    <span className="text-[9px] text-bureau-muted">Last 3 months</span>
  </div>
  {HISTORY.map(({ date, score, summary }, i) => (
    <div key={date} className={`px-5 py-3 flex items-center gap-4 ${i < HISTORY.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-[#f8f8f6] border border-bureau-border flex items-center justify-center font-bold text-xs text-navy flex-shrink-0">
        {score}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold text-navy">{date}</div>
        <div className="text-[10px] text-bureau-muted mt-0.5 truncate">{summary}</div>
      </div>
      <button className="text-[9px] text-bureau-muted hover:text-navy transition-colors flex-shrink-0">
        View →
      </button>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/ruelkey/BureauAI && git add app/dashboard/_components/Audit.tsx && git commit -m "feat: add previous audits history to audit tab"
```

---

## Task 5: New Financials tab

**Files:**
- Create: `app/dashboard/_components/Financials.tsx`
- Modify: `app/dashboard/page.tsx`
- Modify: `app/dashboard/_components/Sidebar.tsx`

- [ ] **Step 1: Create `app/dashboard/_components/Financials.tsx`**

```tsx
const CALENDAR = [
  { month: 'Jun 2026', items: [
    { name: 'DOHMH Food Service Permit Renewal', fee: '$280', due: 'Jun 30', urgent: true },
  ]},
  { month: 'Jul 2026', items: [
    { name: 'FDNY Inspection Filing Fee', fee: '$150', due: 'Jul 15', urgent: false },
  ]},
  { month: 'Aug 2026', items: [
    { name: 'DCWP Business License Renewal', fee: '$110', due: 'Aug 1', urgent: false },
    { name: 'DOB CO Review Fee', fee: '$200', due: 'Aug 20', urgent: false },
  ]},
  { month: 'Sep 2026', items: [
    { name: 'Sidewalk Café Permit Renewal', fee: '$445', due: 'Sep 1', urgent: false },
  ]},
]

const CREDITS = [
  {
    title: 'Work Opportunity Tax Credit (WOTC)',
    amount: '$9,600',
    status: 'Not applied',
    statusClass: 'bg-gray-100 text-bureau-muted',
    description: 'Federal tax credit for eligible hires.',
  },
  {
    title: 'NYC Energy Efficiency Program',
    amount: '$4,600',
    status: 'Applied',
    statusClass: 'bg-blue-50 text-blue-600',
    description: 'Rebates for HVAC, refrigeration, and lighting.',
  },
  {
    title: 'NYC Small Business Tax Credit',
    amount: '$1,500',
    status: 'Pending',
    statusClass: 'bg-amber-100 text-amber-700',
    description: 'City tax credit for businesses under 50 employees.',
  },
  {
    title: 'WOTC Veteran Hiring Bonus',
    amount: '$4,800',
    status: 'Received',
    statusClass: 'bg-green/10 text-green',
    description: 'Awarded for hiring a qualifying veteran last quarter.',
  },
]

const totalFees = CALENDAR.flatMap(m => m.items).reduce((sum, item) => sum + parseInt(item.fee.replace(/\D/g, '')), 0)

export default function Financials() {
  return (
    <div className="p-4 flex flex-col gap-4">

      {/* Compliance Cost Calendar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy text-sm">Compliance Cost Calendar</h2>
          <span className="text-xs text-bureau-muted">
            ${totalFees.toLocaleString()} in fees next 90 days
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CALENDAR.map(({ month, items }) => {
            const monthTotal = items.reduce((sum, i) => sum + parseInt(i.fee.replace(/\D/g, '')), 0)
            return (
              <div key={month} className="bg-white border border-bureau-border rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 border-b border-bureau-border flex items-center justify-between bg-[#f8f8f6]">
                  <span className="text-[10px] font-semibold text-navy">{month}</span>
                  <span className="text-[10px] font-semibold text-bureau-muted">${monthTotal}</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  {items.map(({ name, fee, due, urgent }) => (
                    <div key={name} className={`p-2.5 rounded border ${urgent ? 'border-amber-200 bg-amber-50' : 'border-bureau-border'}`}>
                      <div className="text-[10px] font-medium text-navy leading-snug mb-1">{name}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] ${urgent ? 'text-amber-600' : 'text-bureau-muted'}`}>{due}</span>
                        <span className="text-[10px] font-bold text-navy">{fee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tax Credit Pipeline */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy text-sm">Tax Credit Pipeline</h2>
          <div className="flex items-center gap-3 text-[9px] text-bureau-muted">
            {['Not applied', 'Applied', 'Pending', 'Received'].map(s => (
              <span key={s} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-bureau-border inline-block" />{s}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: '2fr 120px 100px 120px' }}>
            {['Program', 'Potential value', 'Status', ''].map(h => (
              <div key={h || 'action'} className="px-4 py-3 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider bg-[#f8f8f6] border-b border-bureau-border">
                {h}
              </div>
            ))}
            {CREDITS.map(({ title, amount, status, statusClass, description }, i) => (
              <>
                <div key={title} className={`px-4 py-3 ${i < CREDITS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>
                  <div className="text-xs font-medium text-navy">{title}</div>
                  <div className="text-[10px] text-bureau-muted mt-0.5">{description}</div>
                </div>
                <div className={`px-4 py-3 text-xs font-semibold text-navy ${i < CREDITS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>{amount}</div>
                <div className={`px-4 py-3 ${i < CREDITS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusClass}`}>{status}</span>
                </div>
                <div className={`px-4 py-3 ${i < CREDITS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>
                  <button className="text-[9px] text-green font-medium hover:text-green-light transition-colors">
                    {status === 'Not applied' ? 'Start application →' : 'View details →'}
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
```

- [ ] **Step 2: Add financials to Sidebar.tsx**

In `app/dashboard/_components/Sidebar.tsx`, add this item to the `navItems` array after the `incentives` entry:

```tsx
{
  id: 'financials' as Tab,
  label: 'Financials',
  icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="10" width="2.5" height="4" rx="0.5" fill="currentColor" />
      <rect x="6.5" y="7" width="2.5" height="7" rx="0.5" fill="currentColor" />
      <rect x="11" y="4" width="2.5" height="10" rx="0.5" fill="currentColor" />
      <path d="M3 6l3.5-3 3 2.5L13 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
},
```

Also update the `Tab` type at the top of `Sidebar.tsx` to include `'financials'`:
```tsx
type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives' | 'financials'
```

- [ ] **Step 3: Add financials to page.tsx**

In `app/dashboard/page.tsx`:

Update the `Tab` type:
```tsx
type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives' | 'financials'
```

Add to `PAGE_TITLES`:
```tsx
financials: 'Financials',
```

Add the import at the top:
```tsx
import Financials from './_components/Financials'
```

Add the render condition in the content area:
```tsx
{tab === 'financials' && <Financials />}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/ruelkey/BureauAI && git add app/dashboard/_components/Financials.tsx app/dashboard/_components/Sidebar.tsx app/dashboard/page.tsx && git commit -m "feat: add financials tab with cost calendar and tax credit pipeline"
```

---

## Task 6: Deploy to Vercel production

- [ ] **Step 1: Deploy**

```bash
cd /Users/ruelkey/BureauAI && vercel --prod 2>&1
```

Wait for "Aliased: https://bureauai.vercel.app"

- [ ] **Step 2: Smoke test**

Open `https://bureauai.vercel.app/dashboard` — click through all 6 tabs and confirm everything renders.
