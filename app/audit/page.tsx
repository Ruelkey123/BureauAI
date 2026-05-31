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
