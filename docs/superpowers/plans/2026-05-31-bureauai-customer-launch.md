# BureauAI Customer Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire email capture to Resend (save contacts + notify Alex), then deploy to Vercel production so BureauAI is live and shareable with NYC restaurant owners.

**Architecture:** New `/api/waitlist` route calls Resend to add the signup to an audience (permanent contact list) and send an instant notification email to Alex. Both existing email forms (landing page + audit page) POST to this route. Frontend always shows success regardless of API response — no scary error states for a waitlist form.

**Tech Stack:** Next.js 16 App Router, Resend SDK (`resend`), Vercel CLI

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `app/api/waitlist/route.ts` | Accepts POST, calls Resend to save contact + send notification |
| Modify | `app/_components/FooterCTASection.tsx` | Wire form to POST /api/waitlist |
| Modify | `app/audit/page.tsx` | Wire email form to POST /api/waitlist |
| Modify | `.env.local` | Add RESEND_API_KEY and RESEND_AUDIENCE_ID |

---

## Task 1: Create Resend account and get credentials

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: Sign up and get API key**

Go to resend.com, create a free account. In the dashboard go to **API Keys → Create API Key**. Name it `bureauai-dev`. Copy the key.

- [ ] **Step 2: Create an Audience**

In Resend dashboard go to **Audiences → Create Audience**. Name it `BureauAI Waitlist`. Copy the Audience ID (looks like `78261eea-...`).

- [ ] **Step 3: Add credentials to .env.local**

Open `~/BureauAI/.env.local` and add these two lines:

```bash
RESEND_API_KEY="re_xxxxxxxxxx"
RESEND_AUDIENCE_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Replace with your actual values from the Resend dashboard.

- [ ] **Step 4: Add credentials to Vercel**

```bash
cd ~/BureauAI
vercel env add RESEND_API_KEY
# paste your key when prompted, select Production + Preview + Development
vercel env add RESEND_AUDIENCE_ID
# paste your audience ID when prompted, select Production + Preview + Development
```

---

## Task 2: Install Resend SDK

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install**

```bash
cd ~/BureauAI
npm install resend
```

Expected output: `added 1 package`

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add resend sdk"
```

---

## Task 3: Create /api/waitlist route

**Files:**
- Create: `app/api/waitlist/route.ts`

- [ ] **Step 1: Create the file**

Create `app/api/waitlist/route.ts` with this exact content:

```typescript
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { email, source } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    await Promise.all([
      resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
        unsubscribed: false,
      }),
      resend.emails.send({
        from: 'BureauAI <onboarding@resend.dev>',
        to: 'arulke01@gmail.com',
        subject: `New BureauAI signup: ${email} (from ${source})`,
        text: `New waitlist signup!\n\nEmail: ${email}\nSource: ${source}\n\nView all contacts: https://resend.com/audiences`,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to save signup' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Restart dev server to pick up new env vars**

```bash
pkill -f "next dev"
cd ~/BureauAI && npm run dev
```

Wait for `✓ Ready` in the output.

- [ ] **Step 3: Test the route with curl**

```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@restaurant.com","source":"landing"}' | cat
```

Expected output: `{"success":true}`

Also check your Gmail inbox at arulke01@gmail.com — you should have a notification email within 10 seconds.

- [ ] **Step 4: Commit**

```bash
git add app/api/waitlist/route.ts
git commit -m "feat: add /api/waitlist route with Resend contact save + notification"
```

---

## Task 4: Wire landing page email form

**Files:**
- Modify: `app/_components/FooterCTASection.tsx`

- [ ] **Step 1: Replace the component**

Replace the entire contents of `app/_components/FooterCTASection.tsx` with:

```typescript
'use client'

import { useState } from 'react'

export default function FooterCTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'landing' }),
    }).catch(() => {})
  }

  return (
    <section id="waitlist" className="py-24 px-6 bg-navy">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          Stop navigating alone.
        </h2>
        <p className="text-cream/65 mb-10">
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
              className="flex-1 px-4 py-3 text-sm outline-none border border-cream/20 focus:border-cream/50 transition-colors bg-navy-mid text-cream placeholder:text-cream/40"
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

- [ ] **Step 2: Test in browser**

Open `http://localhost:3000` and scroll to the bottom waitlist form. Enter a test email and submit. The form should show "You're on the list. We'll be in touch soon." immediately. Check Gmail and Resend dashboard to confirm the signup was saved.

- [ ] **Step 3: Commit**

```bash
git add app/_components/FooterCTASection.tsx
git commit -m "feat: wire landing page waitlist form to /api/waitlist"
```

---

## Task 5: Wire audit page email form

**Files:**
- Modify: `app/audit/page.tsx`

- [ ] **Step 1: Replace the onSubmit handler on the audit page email form**

In `app/audit/page.tsx`, find the form's `onSubmit` (around line 236). Replace this block:

```typescript
onSubmit={e => {
  e.preventDefault()
  setEmailSubmitted(true)
}}
```

With:

```typescript
onSubmit={e => {
  e.preventDefault()
  setEmailSubmitted(true)
  fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'audit' }),
  }).catch(() => {})
}}
```

- [ ] **Step 2: Test in browser**

Open `http://localhost:3000/audit`, go through the 3-step form, wait for the Gemini result to stream, then enter a test email and click "Join waitlist". The "You're on the list." message should appear. Check Gmail and Resend dashboard.

- [ ] **Step 3: Commit**

```bash
git add app/audit/page.tsx
git commit -m "feat: wire audit page waitlist form to /api/waitlist"
```

---

## Task 6: Deploy to Vercel production

**Files:** None — deployment only

- [ ] **Step 1: Confirm env vars are in Vercel**

```bash
cd ~/BureauAI
vercel env ls
```

Confirm `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, and `GEMINI_API_KEY` all appear in the list.

- [ ] **Step 2: Deploy to production**

```bash
vercel --prod
```

Wait for the deployment to complete. Copy the production URL from the output (e.g. `https://bureauai.vercel.app`).

- [ ] **Step 3: Smoke test the live URL**

```bash
curl -s -o /dev/null -w "%{http_code}" https://YOUR-PRODUCTION-URL.vercel.app/
```

Expected: `200`

```bash
curl -s -X POST https://YOUR-PRODUCTION-URL.vercel.app/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"livetest@restaurant.com","source":"landing"}' | cat
```

Expected: `{"success":true}`

- [ ] **Step 4: Test /audit end-to-end in browser**

Open the production URL in your browser. Go through the full audit flow. Confirm Gemini streams a response (if quota is exhausted, upgrade the Gemini API key billing in Google AI Studio). Submit the email capture form at the end.

- [ ] **Step 5: Commit production URL to memory**

No code change needed — just note the live URL for sharing with restaurant owners.

---

## Success Checklist

- [ ] `https://your-url.vercel.app` loads the landing page
- [ ] Landing page waitlist form saves to Resend + emails Alex
- [ ] Audit form email capture saves to Resend + emails Alex
- [ ] `/audit` Gemini streaming works in production
- [ ] Resend dashboard shows all test signups under Audiences
