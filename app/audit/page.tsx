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

const TEXT = { color: '#e8e8e0' }
const MUTED = { color: 'rgba(232,232,224,0.45)' }
const CARD_BASE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#e8e8e0',
  padding: '16px 20px',
  textAlign: 'left' as const,
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.15s ease',
  width: '100%',
  display: 'block',
  cursor: 'pointer',
}
const CARD_ACTIVE: React.CSSProperties = {
  ...CARD_BASE,
  background: 'rgba(77,186,128,0.1)',
  border: '1px solid rgba(77,186,128,0.35)',
  color: '#4dba80',
}

export default function AuditPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>({ businessType: '', borough: '', stage: '', situation: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

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
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      if (!response.body) throw new Error('No response body')
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setResult(prev => prev + decoder.decode(value, { stream: true }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen dark-grid flex items-start justify-center px-6 py-24">
      <div className="w-full max-w-xl">

        <Link href="/" style={{ ...MUTED, fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '48px', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8e8e0' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,232,224,0.45)' }}
        >
          ← BureauAI
        </Link>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <p style={{ ...MUTED, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Step 1 of 3</p>
            <h1 className="font-serif" style={{ fontSize: '2rem', ...TEXT, marginBottom: '32px', lineHeight: 1.2 }}>What type of business?</h1>
            <div className="grid grid-cols-2 gap-2">
              {BUSINESS_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => { setForm(f => ({ ...f, businessType: type })); setStep(2) }}
                  style={CARD_BASE}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <p style={{ ...MUTED, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Step 2 of 3</p>
            <h1 className="font-serif" style={{ fontSize: '2rem', ...TEXT, marginBottom: '24px', lineHeight: 1.2 }}>Where in NYC?</h1>
            <div className="space-y-2 mb-8">
              {BOROUGHS.map(b => (
                <button key={b} onClick={() => setForm(f => ({ ...f, borough: b }))}
                  style={form.borough === b ? CARD_ACTIVE : CARD_BASE}
                  onMouseEnter={e => { if (form.borough !== b) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}}
                  onMouseLeave={e => { if (form.borough !== b) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}}
                >
                  {b}
                </button>
              ))}
            </div>

            <p style={{ ...MUTED, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>What stage?</p>
            <div className="space-y-2 mb-8">
              {STAGES.map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, stage: s }))}
                  style={form.stage === s ? CARD_ACTIVE : CARD_BASE}
                  onMouseEnter={e => { if (form.stage !== s) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}}
                  onMouseLeave={e => { if (form.stage !== s) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}}
                >
                  {s}
                </button>
              ))}
            </div>

            <button onClick={() => setStep(3)} disabled={!form.borough || !form.stage}
              style={{ background: '#4dba80', color: '#06090e', padding: '13px 28px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.04em', boxShadow: '0 0 30px rgba(77,186,128,0.25)', opacity: (!form.borough || !form.stage) ? 0.4 : 1, cursor: (!form.borough || !form.stage) ? 'not-allowed' : 'pointer', border: 'none' }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <p style={{ ...MUTED, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Step 3 of 3</p>
            <h1 className="font-serif" style={{ fontSize: '2rem', ...TEXT, marginBottom: '8px', lineHeight: 1.2 }}>Describe your situation</h1>
            <p style={{ ...MUTED, fontSize: '13px', marginBottom: '24px' }}>Optional — helps us tailor your audit.</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {SITUATION_CHIPS.map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, situation: s }))}
                  style={{
                    fontSize: '12px', padding: '6px 14px',
                    border: `1px solid ${form.situation === s ? 'rgba(77,186,128,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    background: form.situation === s ? 'rgba(77,186,128,0.1)' : 'transparent',
                    color: form.situation === s ? '#4dba80' : 'rgba(232,232,224,0.5)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
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
              style={{
                width: '100%', padding: '14px 16px', fontSize: '14px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)',
                color: '#e8e8e0', outline: 'none', resize: 'none', marginBottom: '24px',
                boxSizing: 'border-box',
              }}
            />

            <button onClick={runAudit}
              style={{ background: '#4dba80', color: '#06090e', padding: '13px 28px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.04em', boxShadow: '0 0 30px rgba(77,186,128,0.25)', border: 'none', cursor: 'pointer' }}
            >
              Get my free audit →
            </button>
          </div>
        )}

        {/* Step 4 — Results */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 className="font-serif" style={{ fontSize: '2rem', ...TEXT, marginBottom: '6px', lineHeight: 1.2 }}>Your compliance audit</h1>
              <p style={{ ...MUTED, fontSize: '13px' }}>{form.businessType} · {form.borough} · {form.stage}</p>
            </div>

            {loading && !result && (
              <p style={{ ...MUTED, fontSize: '13px', animation: 'pulse 2s infinite' }}>
                Our team is auditing your business…
              </p>
            )}

            {error && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', padding: '20px', marginBottom: '24px' }}>
                <p style={{ color: '#e8e8e0', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>Audit unavailable right now</p>
                <p style={{ ...MUTED, fontSize: '13px', marginBottom: '16px' }}>{error}</p>
                <button onClick={runAudit}
                  style={{ background: '#4dba80', color: '#06090e', padding: '10px 20px', fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                >
                  Try again →
                </button>
              </div>
            )}

            {result && (
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)',
                padding: '24px', fontSize: '14px', color: 'rgba(232,232,224,0.85)',
                lineHeight: '1.75', whiteSpace: 'pre-wrap', marginBottom: '32px',
              }}>
                {result}
              </div>
            )}

            {!loading && result && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }}>
                <h2 className="font-serif" style={{ fontSize: '1.4rem', ...TEXT, marginBottom: '8px' }}>Let us handle everything</h2>
                <p style={{ ...MUTED, fontSize: '13px', marginBottom: '20px' }}>Get a compliance team that files, manages, and defends your business — starting at $99/mo.</p>
                {emailSubmitted ? (
                  <p style={{ color: '#4dba80', fontSize: '14px', fontWeight: '500' }}>You're on the list. We'll be in touch.</p>
                ) : (
                  <form onSubmit={e => {
                    e.preventDefault()
                    setEmailSubmitted(true)
                    fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'audit' }) }).catch(() => {})
                  }} style={{ display: 'flex', gap: '8px' }}>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8e8e0', fontSize: '14px', outline: 'none' }}
                    />
                    <button type="submit"
                      style={{ background: '#4dba80', color: '#06090e', padding: '12px 20px', fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
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
