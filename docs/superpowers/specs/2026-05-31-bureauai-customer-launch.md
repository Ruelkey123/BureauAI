# BureauAI Customer Launch Spec
**Date:** 2026-05-31  
**Goal:** Get a shareable live URL in front of NYC restaurant owners this week

---

## Overview

Phase 1 (landing page + /audit Gemini streaming) is complete. This spec covers the three things needed to go live with real customers: wiring the email capture to a real backend, deploying to Vercel production, and verifying the Gemini audit works in production.

---

## 1. Email Capture Backend

**New API route:** `POST /api/waitlist`

**Request body:**
```json
{ "email": "owner@restaurant.com", "source": "landing" | "audit" }
```

**Behavior:**
1. Adds the email to the Resend Contacts audience (permanent signup list)
2. Sends an instant notification email to `arulke01@gmail.com` with subject: `New BureauAI signup: {email} (from {source})`
3. Returns `{ success: true }` on success, `{ error: "..." }` on failure

**Error handling:**
- If Resend fails, API returns 500 but frontend still shows the success confirmation — no scary error messages for what's just a waitlist form
- Duplicate emails: Resend handles gracefully, no duplicate contacts created
- Invalid email: blocked at the form level (`type="email"` + `required`), never reaches the API

**New env var:** `RESEND_API_KEY` — added to Vercel (production + development) and `~/BureauAI/.env.local`

---

## 2. Frontend Wiring

Two existing forms get wired to `/api/waitlist`:

**Landing page** (`app/_components/FooterCTASection.tsx`)
- Currently: `handleSubmit` just sets `submitted = true`
- After: POSTs `{ email, source: "landing" }` to `/api/waitlist`, then sets `submitted = true`

**Audit page** (`app/audit/page.tsx`)
- Currently: `onSubmit` just sets `emailSubmitted = true`
- After: POSTs `{ email, source: "audit" }` to `/api/waitlist`, then sets `emailSubmitted = true`

Both forms keep their existing success UI unchanged.

---

## 3. Vercel Production Deployment

- Run `vercel --prod` to deploy to production
- Add `RESEND_API_KEY` to Vercel environment variables before deploying
- Verify `GEMINI_API_KEY` in Vercel production has billing enabled (free tier quota exhausted locally — production key may be on paid tier)
- Confirm live URL loads, audit flow streams, and email capture saves a test signup

---

## Success Criteria

- [ ] Live URL is shareable (Vercel production deployment)
- [ ] Submitting the waitlist form saves the email to Resend Contacts
- [ ] Alex receives an instant notification email on every signup
- [ ] The /audit Gemini streaming works end-to-end in production
- [ ] Both email capture forms (landing + audit) are wired up

---

## Out of Scope

- Email sequences / drip campaigns (Phase 2)
- Restaurant name or phone number capture
- Analytics / tracking
- Custom domain
