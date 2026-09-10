'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Arrow, Check, Mark } from '../_components/Icons'
import AuditReport from './_components/AuditReport'

type Step = 1 | 2 | 3 | 4
type EmailState = 'idle' | 'sending' | 'done' | 'error'

interface FormData {
  businessType: string
  borough: string
  stage: string
  situation: string
}

const BUSINESS_TYPES = ['Restaurant', 'Bar', 'Food truck', 'Retail', 'Café', 'Other']
const BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island']
const STAGES = [
  'Opening a new business',
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

const STEP_TITLES: Record<Step, string> = {
  1: 'What kind of business?',
  2: 'Where, and at what stage?',
  3: 'What are you dealing with?',
  4: 'Your compliance audit',
}

function Option({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full border px-4 py-3.5 text-left text-sm transition-colors ${
        selected
          ? 'border-signal bg-signal-wash text-signal'
          : 'border-hair-bright bg-panel text-ink hover:border-ink-3 hover:bg-panel-hi'
      }`}
    >
      {children}
    </button>
  )
}

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
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailState, setEmailState] = useState<EmailState>('idle')

  async function runAudit() {
    setStep(4)
    setLoading(true)
    setResult('')
    setError('')
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'The audit service did not respond.')
      }
      if (!response.body) throw new Error('The audit service returned nothing.')
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        setResult(prev => prev + decoder.decode(value, { stream: true }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The audit service did not respond.')
    } finally {
      setLoading(false)
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault()
    if (emailState === 'sending') return
    setEmailState('sending')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'audit',
          note: `${form.businessType} · ${form.borough} · ${form.stage}${
            form.situation ? ` — ${form.situation}` : ''
          }`,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setEmailState('done')
    } catch {
      setEmailState('error')
    }
  }

  const canContinue = Boolean(form.borough && form.stage)

  return (
    <main className="min-h-screen px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-2xl">
        {/* Masthead */}
        <div className="flex items-center justify-between gap-4 border-b border-hair pb-5">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Back to BureauAI home"
          >
            <Mark size={22} className="text-ink transition-colors group-hover:text-signal" />
            <span className="display text-base uppercase text-ink">
              Bureau<span className="text-signal">AI</span>
            </span>
          </Link>
          <span className="font-mono text-micro uppercase text-ink-3" data-figure>
            {step < 4 ? `Step ${String(step).padStart(2, '0')} / 03` : 'Report'}
          </span>
        </div>

        {/* Progress rule */}
        <div className="h-px w-full bg-hair" aria-hidden="true">
          <div
            className="h-px bg-signal transition-[width] duration-500 ease-out"
            style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
          />
        </div>

        <h1 className="display mt-9 text-balance text-head uppercase leading-tight text-ink">
          {STEP_TITLES[step]}
        </h1>

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div className="mt-8 grid grid-cols-2 gap-2">
            {BUSINESS_TYPES.map(type => (
              <Option
                key={type}
                selected={form.businessType === type}
                onClick={() => {
                  setForm(f => ({ ...f, businessType: type }))
                  setStep(2)
                }}
              >
                {type}
              </Option>
            ))}
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div className="mt-8">
            <h2 className="font-mono text-micro uppercase text-ink-3">Borough</h2>
            <div className="mt-3 space-y-2">
              {BOROUGHS.map(b => (
                <Option
                  key={b}
                  selected={form.borough === b}
                  onClick={() => setForm(f => ({ ...f, borough: b }))}
                >
                  {b}
                </Option>
              ))}
            </div>

            <h2 className="mt-9 font-mono text-micro uppercase text-ink-3">Stage</h2>
            <div className="mt-3 space-y-2">
              {STAGES.map(s => (
                <Option
                  key={s}
                  selected={form.stage === s}
                  onClick={() => setForm(f => ({ ...f, stage: s }))}
                >
                  {s}
                </Option>
              ))}
            </div>

            <div className="mt-9 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="border border-hair-bright px-5 py-3 font-mono text-2xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!canContinue}
                className="group inline-flex items-center gap-2.5 border border-signal bg-signal px-6 py-3 font-mono text-2xs uppercase tracking-[0.1em] text-void transition-colors hover:bg-transparent hover:text-signal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-signal disabled:hover:text-void"
              >
                Continue
                <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              {!canContinue && (
                <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
                  Pick a borough and a stage
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && (
          <div className="mt-4">
            <p className="text-sm font-light text-ink-2">
              Optional, but it makes the audit far more specific.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SITUATION_CHIPS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, situation: s }))}
                  aria-pressed={form.situation === s}
                  className={`border px-3.5 py-2 text-xs transition-colors ${
                    form.situation === s
                      ? 'border-signal bg-signal-wash text-signal'
                      : 'border-hair-bright text-ink-2 hover:border-ink-3 hover:text-ink'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <label htmlFor="situation" className="mt-7 block font-mono text-micro uppercase text-ink-3">
              Or describe it yourself
            </label>
            <textarea
              id="situation"
              value={form.situation}
              onChange={e => setForm(f => ({ ...f, situation: e.target.value }))}
              placeholder="Opening in Bushwick. DOHMH permit is in, waiting on FDNY."
              rows={4}
              className="mt-2.5 w-full resize-y border border-hair-bright bg-panel px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-signal"
            />

            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="border border-hair-bright px-5 py-3 font-mono text-2xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink"
              >
                Back
              </button>
              <button
                type="button"
                onClick={runAudit}
                className="group inline-flex items-center gap-2.5 border border-signal bg-signal px-6 py-3 font-mono text-2xs uppercase tracking-[0.1em] text-void transition-colors hover:bg-transparent hover:text-signal"
              >
                Run the audit
                <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: the report ── */}
        {step === 4 && (
          <div className="mt-5">
            <p className="font-mono text-2xs uppercase tracking-[0.08em] text-ink-3">
              {[form.businessType, form.borough, form.stage].filter(Boolean).join(' · ')}
            </p>

            {loading && !result && (
              <div className="panel mt-7 flex items-center gap-3.5 p-6">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-signal"
                />
                <p className="text-sm text-ink-2" role="status">
                  Reading your obligations across every agency…
                </p>
              </div>
            )}

            {error && (
              <div className="mt-7 border border-flag-hair bg-flag-wash p-6" role="alert">
                <p className="text-base text-ink">The audit didn't run</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink-2">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={runAudit}
                  className="mt-5 border border-signal px-5 py-2.5 font-mono text-2xs uppercase tracking-[0.1em] text-signal transition-colors hover:bg-signal hover:text-void"
                >
                  Try again
                </button>
              </div>
            )}

            {result && (
              <div className="panel mt-7 p-6 sm:p-8">
                <AuditReport markdown={result} />
                {loading && (
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-4 w-2 animate-pulse bg-signal align-middle"
                  />
                )}
              </div>
            )}

            {!loading && result && (
              <div className="panel mt-6 p-6 sm:p-8">
                <h2 className="display text-lg uppercase text-ink">
                  Want us to handle all of it?
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-2">
                  This is the reading. The service that acts on it opens to the
                  waitlist first — planned from $99/month. Nothing is for sale yet.
                </p>

                {emailState === 'done' ? (
                  <p className="mt-5 flex items-center gap-2.5 text-sm text-signal">
                    <Check size={16} />
                    You're on the list — we have your audit answers too.
                  </p>
                ) : (
                  <form onSubmit={submitEmail} className="mt-5">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <label htmlFor="audit-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="audit-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={emailState === 'sending'}
                        placeholder="you@yourbusiness.com"
                        className="flex-1 border border-hair-bright bg-void px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-signal disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={emailState === 'sending'}
                        className="whitespace-nowrap border border-signal bg-signal px-5 py-3 font-mono text-2xs uppercase tracking-[0.1em] text-void transition-colors hover:bg-transparent hover:text-signal disabled:opacity-60"
                      >
                        {emailState === 'sending' ? 'Sending…' : 'Request access'}
                      </button>
                    </div>
                    {emailState === 'error' && (
                      <p role="alert" className="mt-3 text-xs text-flag">
                        That didn't save. Try again, or email hello@bureauai.com.
                      </p>
                    )}
                  </form>
                )}
              </div>
            )}

            {!loading && (result || error) && (
              <button
                type="button"
                onClick={() => {
                  setStep(1)
                  setResult('')
                  setError('')
                  setForm({ businessType: '', borough: '', stage: '', situation: '' })
                }}
                className="mt-6 font-mono text-2xs uppercase tracking-[0.1em] text-ink-3 underline transition-colors hover:text-ink"
              >
                Run another audit
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
