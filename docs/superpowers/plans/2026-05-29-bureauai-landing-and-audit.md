# BureauAI Landing Page + Audit Demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the BureauAI landing page (9 sections) and an `/audit` demo flow that streams a personalized NYC compliance snapshot from Claude.

**Architecture:** Next.js 16 App Router, all landing sections are Server Components colocated in `app/_components/`. The Footer CTA email form and the `/audit` multi-step form are Client Components (`'use client'`). Streaming from Claude uses the Anthropic SDK's `.messages.stream()` piped into a `ReadableStream` in a Route Handler at `app/api/audit/route.ts`.

**Tech Stack:** Next.js 16.2.6 (App Router), Tailwind CSS 3, `next/font/google` (DM_Serif_Display + Inter), `@anthropic-ai/sdk` 0.100+, TypeScript

---

## File Structure

```
app/
  layout.tsx                        MODIFY — switch to next/font/google CSS vars
  globals.css                       MODIFY — remove @import url(...)
  page.tsx                          MODIFY — assemble all landing sections
  _components/
    Nav.tsx                         CREATE — sticky transparent nav, logo + CTA
    HeroSection.tsx                 CREATE — approved hero design from mockup
    ProblemSection.tsx              CREATE — stat cards + problem framing
    HowItWorksSection.tsx           CREATE — 3-step numbered process
    CoverageSection.tsx             CREATE — 3-column agency coverage grid
    SocialProofSection.tsx          CREATE — 3 testimonial cards
    PricingTeaserSection.tsx        CREATE — single plan card + pricing anchor
    FooterCTASection.tsx            CREATE — 'use client', email capture form
    Footer.tsx                      CREATE — links + copyright
  audit/
    page.tsx                        CREATE — 'use client', 4-step compliance form
  api/
    audit/
      route.ts                      CREATE — POST, streams Claude response
tailwind.config.ts                  MODIFY — fontFamily to use CSS variables
```

---

## Task 1: Fix Font Setup

Switch from `@import url(...)` in CSS (which causes FOUT and fires an extra network request) to `next/font/google` CSS variables wired into Tailwind.

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update `tailwind.config.ts` to use CSS variable font families**

Replace the `fontFamily` block:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f0f0e8',
        green: {
          DEFAULT: '#3a7a5c',
          light: '#4a9a72',
          bg: '#e8f0ea',
        },
        navy: {
          DEFAULT: '#0f1e2e',
          mid: '#1a3044',
        },
        bureau: {
          text: '#1a2535',
          muted: '#6b7a8d',
          border: '#dde0d8',
        },
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update `app/layout.tsx` to load fonts via next/font/google**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSerif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: 'BureauAI',
  description: 'AI compliance tool for NYC small businesses',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Remove `@import url(...)` from `app/globals.css`**

Delete only the first line. The rest of the file stays identical:

```css
/* app/globals.css — remove this line: */
/* @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap'); */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #f0f0e8;
    color: #1a2535;
    font-family: 'Inter', -apple-system, sans-serif;
  }
}

@layer utilities {
  .graph-paper {
    background-color: #f0f0e8;
    background-image:
      linear-gradient(rgba(100,120,100,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100,120,100,0.07) 1px, transparent 1px);
    background-size: 44px 44px;
  }
}

@keyframes scan {
  0%   { top: 0px;   opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { top: 320px; opacity: 0; }
}

@keyframes scrollUp {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

@keyframes slideIn {
  to { opacity: 1; transform: translateX(0); }
}
```

- [ ] **Step 4: Verify fonts load**

```bash
cd ~/BureauAI && npm run dev
```

Open http://localhost:3000. The page should show the cream graph-paper background with no console errors. Open DevTools → Network — confirm no `fonts.googleapis.com` request fires.

- [ ] **Step 5: Check TypeScript**

```bash
cd ~/BureauAI && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
cd ~/BureauAI && git add app/layout.tsx app/globals.css tailwind.config.ts && git commit -m "feat: switch to next/font/google for DM Serif Display and Inter"
```

---

## Task 2: Nav Component

**Files:**
- Create: `app/_components/Nav.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/Nav.tsx`**

```tsx
// app/_components/Nav.tsx
export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-navy flex items-center justify-center rounded-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="13" width="14" height="2" fill="white" />
            <rect x="1" y="6" width="14" height="1.5" fill="white" />
            <rect x="2" y="7.5" width="1.5" height="5.5" fill="white" />
            <rect x="7.25" y="7.5" width="1.5" height="5.5" fill="white" />
            <rect x="12.5" y="7.5" width="1.5" height="5.5" fill="white" />
            <polygon points="8,1 1,6 15,6" fill="white" />
          </svg>
        </div>
        <span className="font-serif text-base text-navy tracking-tight">BureauAI</span>
      </div>
      <a
        href="#waitlist"
        className="bg-navy text-cream text-sm font-medium px-4 py-2 rounded-sm hover:bg-navy-mid transition-colors"
      >
        Book a demo →
      </a>
    </nav>
  )
}
```

- [ ] **Step 2: Update `app/page.tsx` to render Nav**

```tsx
// app/page.tsx
import Nav from './_components/Nav'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
    </main>
  )
}
```

- [ ] **Step 3: Verify Nav renders**

Run `npm run dev`, open http://localhost:3000. Confirm the nav bar shows "BureauAI" with the column icon on the left and "Book a demo →" on the right. Nav should be fixed at the top.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/Nav.tsx app/page.tsx && git commit -m "feat: add Nav component"
```

---

## Task 3: Hero Section

**Files:**
- Create: `app/_components/HeroSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/HeroSection.tsx`**

```tsx
// app/_components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-16">
      <div className="inline-flex items-center gap-2 border border-bureau-border bg-white/60 rounded-full px-4 py-2 text-sm text-bureau-muted mb-10">
        <span className="text-green font-semibold">+</span>
        Now ingesting NYC, LA &amp; London health + building codes
      </div>

      <h1 className="font-serif text-5xl md:text-7xl text-navy max-w-3xl leading-tight mb-6">
        Compliance that{' '}
        <span className="text-green">reads the rules</span>
        {' '}for you.
      </h1>

      <p className="text-bureau-muted text-lg max-w-xl mb-10 leading-relaxed">
        BureauAI turns thousands of pages of food safety, fire, and building
        regulations into a living checklist for every location you operate — with AI
        audits, smart alerts, and inspector-ready paperwork.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <a
          href="/audit"
          className="bg-navy text-cream px-6 py-3 font-medium text-sm hover:bg-navy-mid transition-colors"
        >
          Start a free audit →
        </a>
        <button className="border border-navy text-navy px-6 py-3 font-medium text-sm hover:bg-navy/5 transition-colors">
          Watch 90-sec demo
        </button>
      </div>

      <p className="text-bureau-muted text-sm">
        No credit card · SOC 2 Type II · Trusted by 1,200+ operators
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Add HeroSection to `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify Hero renders**

Open http://localhost:3000. Confirm: announcement badge at top, large serif headline with green emphasis on "reads the rules", two CTA buttons, trust line at bottom. The section should fill the viewport.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/HeroSection.tsx app/page.tsx && git commit -m "feat: add HeroSection matching approved mockup"
```

---

## Task 4: Problem Section

**Files:**
- Create: `app/_components/ProblemSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/ProblemSection.tsx`**

```tsx
// app/_components/ProblemSection.tsx
const stats = [
  {
    stat: '8–12',
    label: 'government agencies',
    sub: 'DOH, DOB, SLA, DCWP, FDNY, and more',
  },
  {
    stat: '3–18 mo',
    label: 'average timeline',
    sub: 'from lease signing to first service',
  },
  {
    stat: '$50K+',
    label: 'in professional fees',
    sub: 'expeditors, attorneys, consultants',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">
          8 agencies. 18 months. $50,000.
        </h2>
        <p className="text-bureau-muted text-lg max-w-2xl mx-auto mb-14">
          Opening a restaurant in NYC means navigating one of the most complex regulatory
          environments in the country. Most owners spend their savings and months of their
          lives on permits before serving a single meal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map(({ stat, label, sub }) => (
            <div key={stat} className="border border-bureau-border p-6 text-left">
              <div className="font-serif text-5xl text-navy mb-1">{stat}</div>
              <div className="font-medium text-navy text-sm mb-1">{label}</div>
              <div className="text-bureau-muted text-sm">{sub}</div>
            </div>
          ))}
        </div>

        <p className="text-navy font-medium text-lg">
          We replace the expeditors, the lawyers, and the spreadsheets.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Scroll down from hero. Three stat cards render with large serif numbers, followed by the one-liner.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/ProblemSection.tsx app/page.tsx && git commit -m "feat: add ProblemSection with stat cards"
```

---

## Task 5: How It Works Section

**Files:**
- Create: `app/_components/HowItWorksSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/HowItWorksSection.tsx`**

```tsx
// app/_components/HowItWorksSection.tsx
const steps = [
  {
    n: '01',
    title: 'Tell us about your business',
    body: 'Address, business type, and where you are — opening, operating, or responding to a violation.',
  },
  {
    n: '02',
    title: 'We read the regulations',
    body: 'AI maps every requirement, deadline, and filing for your specific situation across every NYC agency.',
  },
  {
    n: '03',
    title: 'You get a living checklist',
    body: 'Organized by urgency, updated when rules change, with inspector-ready documents attached.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'rgba(15,30,46,0.04)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-navy text-center mb-16">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map(({ n, title, body }) => (
            <div key={n}>
              <div className="font-serif text-6xl text-green mb-4">{n}</div>
              <h3 className="font-semibold text-navy mb-2">{title}</h3>
              <p className="text-bureau-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowItWorksSection from './_components/HowItWorksSection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Three numbered steps with large green serif numbers render side by side on desktop.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/HowItWorksSection.tsx app/page.tsx && git commit -m "feat: add HowItWorksSection"
```

---

## Task 6: Coverage Section

**Files:**
- Create: `app/_components/CoverageSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/CoverageSection.tsx`**

```tsx
// app/_components/CoverageSection.tsx
const areas = [
  {
    title: 'Health & Safety',
    items: [
      'DOH food service permit',
      'Food protection certificate',
      'Health inspection preparation',
      'Violation response & correction',
      'Allergen labeling compliance',
    ],
  },
  {
    title: 'Building & Fire',
    items: [
      'DOB permits & CO amendments',
      'FDNY place of assembly permit',
      'Fire suppression certificate',
      'DOB NOW navigation',
      'Work Without Permit resolution',
    ],
  },
  {
    title: 'Business Licensing',
    items: [
      'DCWP business license',
      'SLA liquor license guidance',
      'Sidewalk café permit',
      'M/WBE certification',
      'Annual license renewals',
    ],
  },
]

export default function CoverageSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-navy text-center mb-4">
          What BureauAI covers
        </h2>
        <p className="text-bureau-muted text-center mb-16 max-w-xl mx-auto text-lg">
          Everything a NYC restaurant needs to open, operate, and stay compliant — in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map(({ title, items }) => (
            <div key={title} className="border border-bureau-border p-8">
              <h3 className="font-semibold text-navy mb-5">{title}</h3>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item} className="text-bureau-muted text-sm flex items-start gap-2">
                    <span className="text-green mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowItWorksSection from './_components/HowItWorksSection'
import CoverageSection from './_components/CoverageSection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <CoverageSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Three bordered cards with agency coverage lists render correctly.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/CoverageSection.tsx app/page.tsx && git commit -m "feat: add CoverageSection"
```

---

## Task 7: Social Proof Section

**Files:**
- Create: `app/_components/SocialProofSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/SocialProofSection.tsx`**

```tsx
// app/_components/SocialProofSection.tsx
const testimonials = [
  {
    quote:
      'I was paying $18,000 to an expeditor and still didn\'t know what was happening with my DOB permits. BureauAI showed me exactly where I was and what was next.',
    name: 'Marco R.',
    role: 'Owner, Trattoria Napoli · Jackson Heights, Queens',
  },
  {
    quote:
      'The health inspection checklist alone was worth it. We passed on the first try. Our inspector was surprised by how prepared we were.',
    name: 'Ji-Young K.',
    role: 'Owner, Seoul Bowl · Williamsburg, Brooklyn',
  },
  {
    quote:
      'I didn\'t know about the WOTC tax credit until BureauAI flagged it. That was $14,000 back in our pocket.',
    name: 'Ahmed S.',
    role: 'Owner, Sahara Grill · Astoria, Queens',
  },
]

export default function SocialProofSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'rgba(58,122,92,0.05)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-navy text-center mb-16">
          What operators are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role }) => (
            <div key={name} className="bg-cream border border-bureau-border p-6 flex flex-col justify-between">
              <p className="text-bureau-text text-sm leading-relaxed mb-6">"{quote}"</p>
              <div>
                <div className="font-semibold text-navy text-sm">{name}</div>
                <div className="text-bureau-muted text-xs mt-0.5">{role}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-bureau-muted text-xs mt-8">
          Early access customers · Results may vary
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowItWorksSection from './_components/HowItWorksSection'
import CoverageSection from './_components/CoverageSection'
import SocialProofSection from './_components/SocialProofSection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <CoverageSection />
      <SocialProofSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Three testimonial cards on green-tinted background render correctly.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/SocialProofSection.tsx app/page.tsx && git commit -m "feat: add SocialProofSection"
```

---

## Task 8: Pricing Teaser Section

**Files:**
- Create: `app/_components/PricingTeaserSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/PricingTeaserSection.tsx`**

```tsx
// app/_components/PricingTeaserSection.tsx
const features = [
  'Full compliance dashboard',
  'AI audit for your location',
  'Deadline calendar & alerts',
  'Inspector-ready document templates',
  'Violation response guidance',
  'Incentive & tax credit screening',
]

export default function PricingTeaserSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">
          Straightforward pricing
        </h2>
        <p className="text-bureau-muted text-lg mb-14">
          Compare to $50,000 in professional fees. The math is obvious.
        </p>

        <div className="border border-bureau-border p-10 mb-6">
          <div className="text-bureau-muted text-xs uppercase tracking-widest mb-3">
            Restaurant plan
          </div>
          <div className="font-serif text-6xl text-navy mb-1">$299</div>
          <div className="text-bureau-muted text-sm mb-10">per month · cancel anytime</div>

          <ul className="text-sm text-bureau-text space-y-3 text-left max-w-xs mx-auto mb-10">
            {features.map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-green shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            className="inline-block bg-navy text-cream px-8 py-3 font-medium text-sm hover:bg-navy-mid transition-colors"
          >
            Talk to us about your restaurant →
          </a>
        </div>

        <p className="text-bureau-muted text-sm">
          Multiple locations?{' '}
          <a href="#waitlist" className="text-navy underline underline-offset-2">
            Get in touch.
          </a>
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowItWorksSection from './_components/HowItWorksSection'
import CoverageSection from './_components/CoverageSection'
import SocialProofSection from './_components/SocialProofSection'
import PricingTeaserSection from './_components/PricingTeaserSection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <CoverageSection />
      <SocialProofSection />
      <PricingTeaserSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Centered pricing card with $299, feature list, and CTA renders correctly.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/PricingTeaserSection.tsx app/page.tsx && git commit -m "feat: add PricingTeaserSection"
```

---

## Task 9: Footer CTA (Email Capture)

This is a Client Component because it has form state.

**Files:**
- Create: `app/_components/FooterCTASection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/FooterCTASection.tsx`**

```tsx
// app/_components/FooterCTASection.tsx
'use client'

import { useState } from 'react'

export default function FooterCTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="py-24 px-6" style={{ backgroundColor: '#0f1e2e' }}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          Stop navigating alone.
        </h2>
        <p className="mb-10" style={{ color: 'rgba(240,240,232,0.65)' }}>
          Join 400+ NYC restaurant operators on the waitlist.
        </p>

        {submitted ? (
          <p className="text-green-light text-lg font-medium">
            You're on the list. We'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@restaurant.com"
              className="flex-1 px-4 py-3 text-sm outline-none border transition-colors"
              style={{
                backgroundColor: '#1a3044',
                color: '#f0f0e8',
                borderColor: 'rgba(240,240,232,0.2)',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(240,240,232,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(240,240,232,0.2)')}
            />
            <button
              type="submit"
              className="bg-green text-cream px-6 py-3 font-medium text-sm hover:bg-green-light transition-colors whitespace-nowrap"
            >
              Get early access
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowItWorksSection from './_components/HowItWorksSection'
import CoverageSection from './_components/CoverageSection'
import SocialProofSection from './_components/SocialProofSection'
import PricingTeaserSection from './_components/PricingTeaserSection'
import FooterCTASection from './_components/FooterCTASection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <CoverageSection />
      <SocialProofSection />
      <PricingTeaserSection />
      <FooterCTASection />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Dark navy section with email input and green "Get early access" button. Submit with a test email — confirm the success message appears.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/_components/FooterCTASection.tsx app/page.tsx && git commit -m "feat: add FooterCTASection with email capture"
```

---

## Task 10: Footer + Final Assembly

**Files:**
- Create: `app/_components/Footer.tsx`
- Modify: `app/page.tsx` (final assembly)

- [ ] **Step 1: Create `app/_components/Footer.tsx`**

```tsx
// app/_components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-bureau-border py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-sm text-navy">BureauAI</span>
        <div className="flex gap-6 text-sm text-bureau-muted">
          <a href="#" className="hover:text-navy transition-colors">Privacy</a>
          <a href="#" className="hover:text-navy transition-colors">Terms</a>
          <a href="mailto:hello@bureauai.com" className="hover:text-navy transition-colors">Contact</a>
        </div>
        <p className="text-bureau-muted text-xs">© 2026 BureauAI. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Final `app/page.tsx` — all sections assembled**

```tsx
// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowItWorksSection from './_components/HowItWorksSection'
import CoverageSection from './_components/CoverageSection'
import SocialProofSection from './_components/SocialProofSection'
import PricingTeaserSection from './_components/PricingTeaserSection'
import FooterCTASection from './_components/FooterCTASection'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <main className="graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <CoverageSection />
      <SocialProofSection />
      <PricingTeaserSection />
      <FooterCTASection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Full scroll verification**

Open http://localhost:3000. Scroll through the entire page and verify all 9 sections render correctly in sequence. Click "Book a demo →" — should scroll to `#waitlist`. Click "Start a free audit →" — should navigate to `/audit` (will 404 until Phase 2).

- [ ] **Step 4: TypeScript check**

```bash
cd ~/BureauAI && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd ~/BureauAI && git add app/_components/Footer.tsx app/page.tsx && git commit -m "feat: complete landing page — all 9 sections assembled"
```

---

## Task 11: Audit Form Page (Phase 2)

> **Prerequisite:** Set a real `ANTHROPIC_API_KEY` in `.env.local` before testing this step end-to-end. The current value is a placeholder.

**Files:**
- Create: `app/audit/page.tsx`

- [ ] **Step 1: Create `app/audit/page.tsx`**

```tsx
// app/audit/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Step = 1 | 2 | 3 | 4

interface FormData {
  businessType: string
  borough: string
  stage: string
  situation: string
}

const BUSINESS_TYPES = ['Restaurant', 'Bar', 'Food Truck', 'Retail', 'Café', 'Other']
const BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island']
const STAGES = [
  'Opening a new restaurant',
  'Operating (ongoing compliance)',
  'Got a violation or notice',
  'Renewing a license',
]
const SITUATION_CHIPS = [
  'Got a DOH violation',
  'Applying for a liquor license',
  'Getting ready for inspection',
  'Opening a new location',
  'Need a DOB permit',
]

export default function AuditPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>({
    businessType: '',
    borough: '',
    stage: '',
    situation: '',
  })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  async function runAudit() {
    setStep(4)
    setLoading(true)
    setResult('')

    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      setResult(prev => prev + decoder.decode(value, { stream: true }))
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen graph-paper flex items-start justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <Link href="/" className="text-bureau-muted text-sm hover:text-navy transition-colors mb-10 inline-block">
          ← BureauAI
        </Link>

        {step === 1 && (
          <div>
            <p className="text-bureau-muted text-sm mb-2">Step 1 of 3</p>
            <h1 className="font-serif text-3xl text-navy mb-8">What type of business?</h1>
            <div className="grid grid-cols-2 gap-3">
              {BUSINESS_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setForm(f => ({ ...f, businessType: type }))
                    setStep(2)
                  }}
                  className="border border-bureau-border p-4 text-left text-navy text-sm font-medium hover:border-navy transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-bureau-muted text-sm mb-2">Step 2 of 3</p>
            <h1 className="font-serif text-3xl text-navy mb-6">Where in NYC?</h1>
            <div className="space-y-2 mb-8">
              {BOROUGHS.map(b => (
                <button
                  key={b}
                  onClick={() => setForm(f => ({ ...f, borough: b }))}
                  className={`w-full border p-4 text-left text-sm transition-colors text-navy ${
                    form.borough === b
                      ? 'border-navy bg-navy/5'
                      : 'border-bureau-border hover:border-navy'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <h2 className="font-semibold text-navy text-sm mb-3">What stage are you at?</h2>
            <div className="space-y-2 mb-8">
              {STAGES.map(s => (
                <button
                  key={s}
                  onClick={() => setForm(f => ({ ...f, stage: s }))}
                  className={`w-full border p-3 text-left text-sm transition-colors text-navy ${
                    form.stage === s
                      ? 'border-navy bg-navy/5'
                      : 'border-bureau-border hover:border-navy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!form.borough || !form.stage}
              className="bg-navy text-cream px-6 py-3 font-medium text-sm disabled:opacity-40 hover:bg-navy-mid transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-bureau-muted text-sm mb-2">Step 3 of 3</p>
            <h1 className="font-serif text-3xl text-navy mb-3">Describe your situation</h1>
            <p className="text-bureau-muted text-sm mb-6">
              Optional — helps us tailor your audit.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {SITUATION_CHIPS.map(s => (
                <button
                  key={s}
                  onClick={() => setForm(f => ({ ...f, situation: s }))}
                  className={`border text-sm px-3 py-1.5 transition-colors ${
                    form.situation === s
                      ? 'border-navy bg-navy/5 text-navy'
                      : 'border-bureau-border text-bureau-muted hover:border-navy hover:text-navy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <textarea
              value={form.situation}
              onChange={e => setForm(f => ({ ...f, situation: e.target.value }))}
              placeholder="Or describe in your own words..."
              rows={4}
              className="w-full border border-bureau-border p-4 text-navy placeholder:text-bureau-muted text-sm outline-none focus:border-navy transition-colors mb-6 bg-transparent resize-none"
            />

            <button
              onClick={runAudit}
              className="bg-navy text-cream px-6 py-3 font-medium text-sm hover:bg-navy-mid transition-colors"
            >
              Generate my compliance audit →
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="mb-6">
              <h1 className="font-serif text-3xl text-navy mb-1">Your compliance snapshot</h1>
              <p className="text-bureau-muted text-sm">
                {form.businessType} · {form.borough} · {form.stage}
              </p>
            </div>

            {loading && !result && (
              <p className="text-bureau-muted text-sm animate-pulse">
                Analyzing NYC regulations for your situation…
              </p>
            )}

            {result && (
              <div className="border border-bureau-border p-6 bg-white/40 text-sm text-navy leading-relaxed whitespace-pre-wrap mb-8">
                {result}
              </div>
            )}

            {!loading && result && (
              <div className="border-t border-bureau-border pt-8">
                <h2 className="font-serif text-xl text-navy mb-2">Get your full audit</h2>
                <p className="text-bureau-muted text-sm mb-4">
                  Join the waitlist for your complete compliance dashboard.
                </p>
                {emailSubmitted ? (
                  <p className="text-green font-medium text-sm">
                    You're on the list. We'll be in touch.
                  </p>
                ) : (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      setEmailSubmitted(true)
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 border border-bureau-border px-4 py-2 text-navy outline-none focus:border-navy transition-colors bg-transparent text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-navy text-cream px-4 py-2 text-sm font-medium hover:bg-navy-mid transition-colors"
                    >
                      Join waitlist
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify form navigation (without API key)**

Open http://localhost:3000/audit. Step through Steps 1 → 2 → 3. On Step 3, click "Generate my compliance audit →". It will hit the API and fail (placeholder key) — that is expected. The form navigation itself should work correctly.

- [ ] **Step 3: Commit**

```bash
cd ~/BureauAI && git add app/audit/page.tsx && git commit -m "feat: add /audit multi-step compliance form"
```

---

## Task 12: Audit API Route (Claude Streaming)

> **Prerequisite:** Update `.env.local` with your real Anthropic API key:
> ```
> ANTHROPIC_API_KEY=sk-ant-...
> ```

**Files:**
- Create: `app/api/audit/route.ts`

- [ ] **Step 1: Create `app/api/audit/route.ts`**

```ts
// app/api/audit/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  const { businessType, borough, stage, situation } = await request.json()

  const userMessage = [
    `Business type: ${businessType}`,
    `NYC Borough: ${borough}`,
    `Stage: ${stage}`,
    situation ? `Situation: ${situation}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `You are a NYC restaurant compliance expert. Given a restaurant owner's profile, generate a concise compliance snapshot with three sections:

## Immediate Actions (next 30 days)
List the 2-3 most urgent compliance items they need to act on right now. Be specific to their situation and borough. Reference the exact NYC agency responsible.

## Upcoming Deadlines
List 3-4 key compliance deadlines they should track — annual DOH permit renewal, license renewals, DOB filings, etc. Include typical timing (e.g., "annual renewal due 30 days before expiration").

## What This Costs Without BureauAI
Give a realistic estimate of professional service costs for their situation — expeditor fees ($2K–$20K), attorney fees ($5K–$15K for SLA), consultant fees. Then state: BureauAI costs $299/month.

Be specific, actionable, and reference real NYC agencies (DOHMH, DOB, SLA, DCWP, FDNY). Write in plain English. No legal disclaimers. No hedging.`,
    messages: [{ role: 'user', content: userMessage }],
  })

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
```

- [ ] **Step 2: Test end-to-end with a real API key**

Make sure `.env.local` has a real `ANTHROPIC_API_KEY`. Restart the dev server:

```bash
cd ~/BureauAI && npm run dev
```

Navigate to http://localhost:3000/audit, complete all 3 steps (e.g., Restaurant → Brooklyn → Operating → "Getting ready for inspection"), and click generate. Confirm the response streams in progressively — you should see text appearing word by word.

Expected response structure:
```
## Immediate Actions (next 30 days)
1. ...
2. ...

## Upcoming Deadlines
...

## What This Costs Without BureauAI
...
```

- [ ] **Step 3: TypeScript check**

```bash
cd ~/BureauAI && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd ~/BureauAI && git add app/api/audit/route.ts && git commit -m "feat: add /api/audit route with Claude streaming"
```

---

## Task 13: Final Verification + Git Push

- [ ] **Step 1: Full landing page scroll**

Open http://localhost:3000. Scroll through all 9 sections. Verify:
- Nav is sticky and visible throughout
- "Book a demo →" scrolls to `#waitlist`
- "Start a free audit →" navigates to `/audit`
- Email capture in footer submits and shows success message

- [ ] **Step 2: Full audit flow**

Complete the audit form end-to-end. Verify streaming response appears, then submit the waitlist email at the end.

- [ ] **Step 3: TypeScript clean**

```bash
cd ~/BureauAI && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Push to GitHub**

```bash
cd ~/BureauAI && git push origin main
```

---

## Notes

- **ANTHROPIC_API_KEY:** The current `.env.local` has a placeholder value. Replace it with a real key from console.anthropic.com before testing Phase 2 (Tasks 11–12).
- **Email capture:** The waitlist form in FooterCTASection and the audit page are UI-only — no emails are actually stored. For production, wire to a service like Resend, Loops, or a Supabase table.
- **"Watch 90-sec demo" button:** Currently no-op. Attach a Loom embed or YouTube modal when the demo is recorded.
- **Mobile:** Components use responsive Tailwind breakpoints (`md:`). Verify on mobile viewport in DevTools.
