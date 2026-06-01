# BureauAI Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static demo dashboard at `/dashboard` with 5 tabs (Overview, Deadlines, Documents, AI Audit, Incentives) using hardcoded data for "Joe's Deli, Midtown Manhattan."

**Architecture:** Single `'use client'` page at `app/dashboard/page.tsx` manages tab state with `useState`. Each tab is a separate component in `app/dashboard/_components/`. No auth, no API calls, no database — all demo data. Root layout has no Nav so dashboard renders clean.

**Tech Stack:** Next.js 16 App Router, React, Tailwind CSS 3 with existing BureauAI tokens (navy, green, cream, bureau-border, bureau-muted, bureau-text, font-serif)

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `app/dashboard/page.tsx` | Tab state, layout shell |
| Create | `app/dashboard/_components/Sidebar.tsx` | Icon nav sidebar |
| Create | `app/dashboard/_components/Overview.tsx` | Overview tab: score + actions + agencies + deadlines table |
| Create | `app/dashboard/_components/Deadlines.tsx` | Deadlines tab: full sortable table |
| Create | `app/dashboard/_components/Documents.tsx` | Documents tab: card grid |
| Create | `app/dashboard/_components/Audit.tsx` | AI Audit tab: 3 panels + run button |
| Create | `app/dashboard/_components/Incentives.tsx` | Incentives tab: credit cards |

---

## Task 1: Dashboard shell and Sidebar

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `app/dashboard/_components/Sidebar.tsx`

- [ ] **Step 1: Create `app/dashboard/_components/Sidebar.tsx`**

```tsx
'use client'

type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives'

interface SidebarProps {
  tab: Tab
  setTab: (tab: Tab) => void
}

const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
        <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'deadlines',
    label: 'Deadlines',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 2h5.5L12 4.5V14H4V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'audit',
    label: 'AI Audit',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 8l1.5 1.5L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'incentives',
    label: 'Incentives',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2l1.5 3.5H13l-2.8 2 1 3.5L8 9l-3.2 2 1-3.5L3 5.5h3.5L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Sidebar({ tab, setTab }: SidebarProps) {
  return (
    <aside className="w-14 bg-navy flex flex-col items-center py-4 gap-1 flex-shrink-0">
      <div className="w-7 h-7 bg-green rounded-md flex items-center justify-center mb-3">
        <div className="w-3 h-3 border-2 border-cream rounded-sm" />
      </div>
      {navItems.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          title={label}
          className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors text-cream ${
            tab === id
              ? 'bg-white/10 border border-white/20'
              : 'opacity-40 hover:opacity-70'
          }`}
        >
          {icon}
        </button>
      ))}
      <div className="mt-auto w-7 h-7 rounded-full bg-green/30 flex items-center justify-center text-cream text-[10px] font-bold">
        JD
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Create `app/dashboard/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Overview from './_components/Overview'
import Deadlines from './_components/Deadlines'
import Documents from './_components/Documents'
import Audit from './_components/Audit'
import Incentives from './_components/Incentives'

type Tab = 'overview' | 'deadlines' | 'documents' | 'audit' | 'incentives'

const PAGE_TITLES: Record<Tab, string> = {
  overview: 'Overview',
  deadlines: 'Deadlines',
  documents: 'Documents',
  audit: 'AI Audit',
  incentives: 'Incentives & Tax Credits',
}

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f6]">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-bureau-border px-6 h-11 flex items-center justify-between flex-shrink-0">
          <span className="font-semibold text-navy text-sm">{PAGE_TITLES[tab]}</span>
          <div className="flex items-center gap-3">
            <span className="text-bureau-muted text-xs">Joe's Deli · Midtown, Manhattan</span>
            <span className="bg-green/10 text-green text-[10px] font-semibold px-3 py-1 rounded-full">
              Good Standing
            </span>
          </div>
        </div>
        {/* Page content */}
        <div className="flex-1 overflow-auto">
          {tab === 'overview' && <Overview />}
          {tab === 'deadlines' && <Deadlines />}
          {tab === 'documents' && <Documents />}
          {tab === 'audit' && <Audit />}
          {tab === 'incentives' && <Incentives />}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify the shell loads**

Start dev server if not running: `cd ~/BureauAI && npm run dev`
Open `http://localhost:3000/dashboard` — should see navy sidebar with 5 icons and empty white content area. No errors in terminal.

- [ ] **Step 4: Commit**

```bash
git add app/dashboard/page.tsx app/dashboard/_components/Sidebar.tsx
git commit -m "feat: add dashboard shell with sidebar and tab routing"
```

---

## Task 2: Overview tab

**Files:**
- Create: `app/dashboard/_components/Overview.tsx`

- [ ] **Step 1: Create `app/dashboard/_components/Overview.tsx`**

```tsx
const ACTIONS = [
  {
    title: 'DOH Permit Renewal',
    due: 'Jun 30',
    days: '18 days',
    color: 'border-red-400 bg-red-50',
    textColor: 'text-red-500',
  },
  {
    title: 'FDNY Inspection Prep',
    due: 'Jul 15',
    days: '33 days',
    color: 'border-amber-400 bg-amber-50',
    textColor: 'text-amber-500',
  },
]

const AGENCIES = [
  { name: 'DOHMH', status: 'Compliant', style: 'bg-green/10 text-green border-bureau-border' },
  { name: 'FDNY', status: 'Action Needed', style: 'bg-amber-50 text-amber-600 border-amber-200' },
  { name: 'DOB', status: 'Compliant', style: 'bg-green/10 text-green border-bureau-border' },
  { name: 'DCWP', status: 'Compliant', style: 'bg-green/10 text-green border-bureau-border' },
  { name: 'SLA', status: 'Not applicable', style: 'bg-gray-50 text-bureau-muted border-bureau-border' },
]

const DEADLINES = [
  { req: 'Food Service Permit Renewal', agency: 'DOHMH', due: 'Jun 30', status: 'Urgent', statusStyle: 'bg-amber-100 text-amber-700' },
  { req: 'Annual Fire Inspection', agency: 'FDNY', due: 'Jul 15', status: 'Prep needed', statusStyle: 'bg-amber-100 text-amber-700' },
  { req: 'Business License Renewal', agency: 'DCWP', due: 'Aug 1', status: 'On track', statusStyle: 'bg-gray-100 text-bureau-muted' },
]

export default function Overview() {
  const circumference = 2 * Math.PI * 30
  const score = 94
  const offset = circumference * (1 - score / 100)

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Top 3 cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Score */}
        <div className="bg-white border border-bureau-border rounded-lg p-5 flex flex-col items-center gap-3">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 72 72" className="w-20 h-20 -rotate-90">
              <circle cx="36" cy="36" r="30" fill="none" stroke="#e5e5e0" strokeWidth="7" />
              <circle
                cx="36" cy="36" r="30" fill="none"
                stroke="#3a7a5c" strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-navy">
              {score}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-navy text-sm">Compliance Score</div>
            <div className="text-green text-xs mt-0.5">↑ 2 pts this month</div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="bg-[#f8f8f6] rounded p-2 text-center">
              <div className="font-bold text-amber-600 text-sm">3</div>
              <div className="text-[10px] text-bureau-muted">Due Soon</div>
            </div>
            <div className="bg-[#f8f8f6] rounded p-2 text-center">
              <div className="font-bold text-navy text-sm">0</div>
              <div className="text-[10px] text-bureau-muted">Violations</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border border-bureau-border rounded-lg p-4 flex flex-col gap-2">
          <div className="font-semibold text-navy text-sm mb-1">Action Required</div>
          {ACTIONS.map(({ title, due, days, color, textColor }) => (
            <div key={title} className={`border-l-[3px] ${color} px-3 py-2 rounded-r`}>
              <div className="font-semibold text-navy text-xs">{title}</div>
              <div className={`text-[10px] mt-0.5 ${textColor}`}>Due {due} · {days}</div>
            </div>
          ))}
          <div className="border-l-[3px] border-bureau-border bg-[#f9f9f7] px-3 py-2 rounded-r text-bureau-muted text-[10px]">
            + 2 more deadlines this quarter →
          </div>
        </div>

        {/* Agencies */}
        <div className="bg-white border border-bureau-border rounded-lg p-4 flex flex-col gap-1.5">
          <div className="font-semibold text-navy text-sm mb-1">NYC Agency Status</div>
          {AGENCIES.map(({ name, status, style }) => (
            <div key={name} className={`flex justify-between items-center px-3 py-1.5 border rounded ${style}`}>
              <span className="font-semibold text-navy text-[10px]">{name}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${style}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deadlines table */}
      <div className="bg-white border border-bureau-border rounded-lg overflow-hidden flex-1">
        <div className="px-4 py-2.5 border-b border-bureau-border flex items-center justify-between">
          <span className="font-semibold text-navy text-sm">Upcoming Deadlines</span>
          <span className="text-[10px] text-green cursor-pointer">View all →</span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '1fr 100px 80px 120px' }}>
          {['Requirement', 'Agency', 'Due', 'Status'].map(h => (
            <div key={h} className="px-4 py-2 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider border-b border-bureau-border bg-[#f8f8f6]">
              {h}
            </div>
          ))}
          {DEADLINES.map(({ req, agency, due, status, statusStyle }) => (
            <>
              <div key={req} className="px-4 py-2.5 text-xs text-navy border-b border-[#f0f0ec]">{req}</div>
              <div className="px-4 py-2.5 text-xs text-bureau-muted border-b border-[#f0f0ec]">{agency}</div>
              <div className="px-4 py-2.5 text-xs text-amber-600 font-medium border-b border-[#f0f0ec]">{due}</div>
              <div className="px-4 py-2.5 border-b border-[#f0f0ec]">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusStyle}`}>{status}</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify Overview tab**

Open `http://localhost:3000/dashboard` — click the grid icon (first sidebar item). Should see 3 cards across the top and a deadlines table below. Score ring should show 94 in a green arc.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/_components/Overview.tsx
git commit -m "feat: add dashboard overview tab"
```

---

## Task 3: Deadlines tab

**Files:**
- Create: `app/dashboard/_components/Deadlines.tsx`

- [ ] **Step 1: Create `app/dashboard/_components/Deadlines.tsx`**

```tsx
const ROWS = [
  { req: 'Food Service Permit Renewal', agency: 'DOHMH', due: 'Jun 30', days: 18, status: 'Urgent', statusStyle: 'bg-amber-100 text-amber-700' },
  { req: 'Annual Fire Inspection', agency: 'FDNY', due: 'Jul 15', days: 33, status: 'Prep needed', statusStyle: 'bg-amber-100 text-amber-700' },
  { req: 'Business License Renewal', agency: 'DCWP', due: 'Aug 1', days: 50, status: 'On track', statusStyle: 'bg-gray-100 text-bureau-muted' },
  { req: 'DOB Certificate of Occupancy Review', agency: 'DOB', due: 'Aug 20', days: 69, status: 'Compliant', statusStyle: 'bg-green/10 text-green' },
  { req: 'Sidewalk Café Permit Renewal', agency: 'DCWP', due: 'Sep 1', days: 82, status: 'Compliant', statusStyle: 'bg-green/10 text-green' },
]

export default function Deadlines() {
  return (
    <div className="p-4">
      <div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '2fr 100px 90px 80px 110px' }}>
          {['Requirement', 'Agency', 'Due Date', 'Days Left', 'Status'].map(h => (
            <div key={h} className="px-4 py-3 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider bg-[#f8f8f6] border-b border-bureau-border">
              {h}
            </div>
          ))}
          {ROWS.map(({ req, agency, due, days, status, statusStyle }, i) => (
            <>
              <div key={req} className={`px-4 py-3 text-xs text-navy font-medium ${i < ROWS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>{req}</div>
              <div className={`px-4 py-3 text-xs text-bureau-muted ${i < ROWS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>{agency}</div>
              <div className={`px-4 py-3 text-xs font-medium ${days <= 30 ? 'text-amber-600' : 'text-bureau-muted'} ${i < ROWS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>{due}</div>
              <div className={`px-4 py-3 text-xs font-medium ${days <= 30 ? 'text-amber-600' : 'text-bureau-muted'} ${i < ROWS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>{days}d</div>
              <div className={`px-4 py-3 ${i < ROWS.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusStyle}`}>{status}</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify Deadlines tab**

Click the calendar icon in the sidebar. Should see a table with 5 rows, colour-coded days and statuses.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/_components/Deadlines.tsx
git commit -m "feat: add dashboard deadlines tab"
```

---

## Task 4: Documents tab

**Files:**
- Create: `app/dashboard/_components/Documents.tsx`

- [ ] **Step 1: Create `app/dashboard/_components/Documents.tsx`**

```tsx
const DOCS = [
  {
    title: 'DOH Permit Renewal Form',
    description: 'Pre-filled with your business info. Submit directly to DOHMH.',
  },
  {
    title: 'FDNY Inspection Checklist',
    description: 'Inspector-ready checklist for your location type and borough.',
  },
  {
    title: 'DCWP License Application',
    description: 'Business license renewal, pre-filled for Manhattan.',
  },
]

export default function Documents() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {DOCS.map(({ title, description }) => (
          <div key={title} className="bg-white border border-bureau-border rounded-lg p-5 flex flex-col gap-3">
            <div>
              <div className="text-[9px] text-bureau-muted uppercase tracking-widest mb-2">Ready to use</div>
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

- [ ] **Step 2: Verify Documents tab**

Click the file icon. Should see 3 document cards + 1 dashed request card in a 4-column grid.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/_components/Documents.tsx
git commit -m "feat: add dashboard documents tab"
```

---

## Task 5: AI Audit tab

**Files:**
- Create: `app/dashboard/_components/Audit.tsx`

- [ ] **Step 1: Create `app/dashboard/_components/Audit.tsx`**

```tsx
import Link from 'next/link'

const ACTIONS = [
  {
    n: '1',
    color: 'bg-red-500',
    text: 'Renew your DOHMH food service permit before Jun 30. File online at the DOHMH eFoodservice portal. Processing takes 2–3 weeks — start now.',
  },
  {
    n: '2',
    color: 'bg-amber-500',
    text: 'Schedule your FDNY annual inspection. Contact FDNY Bureau of Fire Prevention to book — inspectors are typically booked 3–4 weeks out.',
  },
]

export default function Audit() {
  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Dark panel */}
      <div className="bg-navy rounded-lg p-5">
        <div className="text-[9px] text-white/50 uppercase tracking-widest mb-4">
          Immediate Actions · Next 30 days
        </div>
        <div className="flex flex-col gap-3">
          {ACTIONS.map(({ n, color, text }) => (
            <div key={n} className="flex gap-3 items-start">
              <div className={`w-5 h-5 ${color} rounded flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5`}>
                {n}
              </div>
              <p className="text-white/80 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deadlines */}
      <div className="bg-white border border-bureau-border rounded-lg p-5">
        <div className="text-[9px] text-bureau-muted uppercase tracking-widest mb-3">Upcoming Deadlines</div>
        <p className="text-xs text-bureau-text leading-relaxed">
          DOHMH permit renewal annually · FDNY inspection annually · DCWP business license every 2 years · DOB CO review every 5 years
        </p>
      </div>

      {/* Costs */}
      <div className="bg-white border border-bureau-border rounded-lg p-5">
        <div className="text-[9px] text-bureau-muted uppercase tracking-widest mb-3">What This Costs Without BureauAI</div>
        <p className="text-xs text-bureau-text leading-relaxed">
          Expeditor: $3,000–$8,000 · Attorney (violations): $5,000–$15,000 · Compliance consultant: $2,000–$5,000/year.{' '}
          <span className="text-green font-semibold">BureauAI: $149/month.</span>
        </p>
      </div>

      {/* Run new audit */}
      <div className="bg-[#f8f8f6] border border-bureau-border rounded-lg p-4 flex items-center justify-between">
        <div className="text-xs text-bureau-muted">Last run: today, 9:14am · Run a fresh audit with updated info</div>
        <Link
          href="/audit"
          className="bg-navy text-cream text-xs font-medium px-4 py-2 rounded hover:bg-navy-mid transition-colors"
        >
          Run new audit →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify AI Audit tab**

Click the checkmark circle icon. Should see dark navy panel with numbered actions, two white panels, and a "Run new audit →" button that links to `/audit`.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/_components/Audit.tsx
git commit -m "feat: add dashboard AI audit tab"
```

---

## Task 6: Incentives tab

**Files:**
- Create: `app/dashboard/_components/Incentives.tsx`

- [ ] **Step 1: Create `app/dashboard/_components/Incentives.tsx`**

```tsx
const CREDITS = [
  {
    title: 'Work Opportunity Tax Credit (WOTC)',
    description:
      'Federal tax credit for hiring from certain target groups. Up to $9,600 per eligible employee. You likely qualify based on your borough and business type.',
    amount: '$9,600',
    sub: 'per employee',
  },
  {
    title: 'NYC Small Business Energy Efficiency Program',
    description:
      'Rebates for energy-efficient equipment upgrades. HVAC, refrigeration, and lighting qualify. Available to Manhattan businesses under 50 employees.',
    amount: '$4,600',
    sub: 'estimated rebate',
  },
]

export default function Incentives() {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-bureau-muted">2 programs identified for your business</div>
        <div className="text-sm font-semibold text-green">$14,200 total identified</div>
      </div>

      {CREDITS.map(({ title, description, amount, sub }) => (
        <div key={title} className="bg-white border border-bureau-border rounded-lg p-5 flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="font-semibold text-navy text-sm mb-2">{title}</div>
            <div className="text-xs text-bureau-muted leading-relaxed max-w-lg">{description}</div>
          </div>
          <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
            <div>
              <div className="font-bold text-green text-xl">{amount}</div>
              <div className="text-[10px] text-bureau-muted mt-0.5">{sub}</div>
            </div>
            <button className="bg-green text-cream text-xs font-medium px-3 py-1.5 rounded hover:bg-green-light transition-colors">
              Learn more →
            </button>
          </div>
        </div>
      ))}

      <div className="bg-[#f8f8f6] border border-bureau-border rounded-lg p-4 text-center text-xs text-bureau-muted">
        BureauAI scans 40+ NYC and federal incentive programs monthly. Credits update automatically.
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify Incentives tab**

Click the star icon. Should see "$14,200 total identified" header, two credit cards with green amounts and "Learn more →" buttons, and a footer note.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/_components/Incentives.tsx
git commit -m "feat: add dashboard incentives tab"
```

---

## Task 7: Deploy to Vercel production

**Files:** None — deployment only

- [ ] **Step 1: Full walkthrough check**

Open `http://localhost:3000/dashboard`. Click through all 5 sidebar tabs. Confirm:
- Sidebar highlights active tab
- Top bar shows correct page title per tab
- All 5 tabs render without errors
- "Run new audit →" on the Audit tab navigates to `/audit`
- Console shows no errors

- [ ] **Step 2: Deploy**

```bash
cd ~/BureauAI && vercel --prod 2>&1
```

Wait for "Aliased: https://bureauai.vercel.app"

- [ ] **Step 3: Smoke test live URL**

Open `https://bureauai.vercel.app/dashboard` in browser. Click through all 5 tabs. Confirm everything renders correctly in production.
