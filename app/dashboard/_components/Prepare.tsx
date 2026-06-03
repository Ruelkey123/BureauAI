'use client'

import { useState } from 'react'
import { DEADLINES, PREP_GUIDES } from '../_data/deadlines'

const BG = '#0d1520'
const TEXT = '#e8e8e0'
const MUTED = 'rgba(232,232,224,0.55)'
const DIM = 'rgba(232,232,224,0.3)'
const GREEN = '#4dba80'
const AMBER = '#f59e0b'

export default function Prepare() {
  const [selected, setSelected] = useState(DEADLINES[0].id)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [mode, setMode] = useState<'checklist' | 'guide'>('checklist')

  const deadline = DEADLINES.find(d => d.id === selected)!
  const guide = PREP_GUIDES[selected]

  function toggleCheck(text: string) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(text) ? next.delete(text) : next.add(text)
      return next
    })
  }

  const criticalItems = guide.checklist.filter(c => c.critical)
  const checkedCritical = criticalItems.filter(c => checked.has(c.text)).length
  const readiness = Math.round((checkedCritical / criticalItems.length) * 100)

  return (
    <div style={{ background: BG, minHeight: '100%', padding: '20px', display: 'flex', gap: '16px' }}>

      {/* Left: deadline selector */}
      <div style={{ width: '224px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: DIM, marginBottom: '4px' }}>Upcoming items</div>
        {DEADLINES.map(({ id, req, agency, due, days }) => {
          const isActive = selected === id
          const urgent = days <= 33
          return (
            <button
              key={id}
              onClick={() => { setSelected(id); setChecked(new Set()); setMode('checklist') }}
              style={{
                textAlign: 'left', padding: '10px 12px',
                background: isActive ? 'rgba(77,186,128,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? 'rgba(77,186,128,0.25)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '8px', transition: 'all 0.15s', cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: '600', marginBottom: '2px', color: isActive ? GREEN : TEXT }}>{req}</div>
              <div style={{ fontSize: '9px', color: MUTED }}>{agency} · {due}</div>
              {urgent && (
                <div style={{ fontSize: '8px', marginTop: '4px', fontWeight: '600', color: AMBER }}>⚠ {days} days</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Right: content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: TEXT }}>{deadline.req}</div>
            <div style={{ fontSize: '11px', marginTop: '2px', color: MUTED }}>{deadline.agency} · Due {deadline.due} · {deadline.fee} fee</div>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['checklist', 'guide'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                style={{
                  fontSize: '10px', padding: '6px 12px', fontWeight: '500', transition: 'all 0.15s', cursor: 'pointer',
                  background: mode === m ? 'rgba(77,186,128,0.12)' : 'transparent',
                  border: `1px solid ${mode === m ? 'rgba(77,186,128,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  color: mode === m ? GREEN : 'rgba(232,232,224,0.45)',
                  borderRadius: '6px',
                }}
              >
                {m === 'checklist' ? 'Prep checklist' : 'How-to guide'}
              </button>
            ))}
          </div>
        </div>

        {/* Checklist mode */}
        {mode === 'checklist' && (
          <>
            {/* Readiness bar */}
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Critical items ready</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: readiness === 100 ? GREEN : readiness > 50 ? AMBER : '#ff7c4d' }}>{readiness}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
                <div style={{ width: `${readiness}%`, height: '100%', borderRadius: '2px', background: readiness === 100 ? GREEN : readiness > 50 ? AMBER : '#ff7c4d', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Critical items */}
            <div style={{ borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,100,80,0.06)' }}>
                <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#f87171' }}>Critical — must pass inspection</span>
              </div>
              {guide.checklist.filter(c => c.critical).map(({ text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => toggleCheck(text)}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                    background: checked.has(text) ? GREEN : 'transparent',
                    border: `1px solid ${checked.has(text) ? GREEN : 'rgba(255,255,255,0.15)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}>
                    {checked.has(text) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#06090e" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  </div>
                  <span style={{ fontSize: '12px', color: checked.has(text) ? MUTED : TEXT, textDecoration: checked.has(text) ? 'line-through' : 'none' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Non-critical items */}
            {guide.checklist.some(c => !c.critical) && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: DIM }}>Recommended</span>
                </div>
                {guide.checklist.filter(c => !c.critical).map(({ text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onClick={() => toggleCheck(text)}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                      background: checked.has(text) ? GREEN : 'transparent',
                      border: `1px solid ${checked.has(text) ? GREEN : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}>
                      {checked.has(text) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#06090e" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </div>
                    <span style={{ fontSize: '12px', color: checked.has(text) ? 'rgba(232,232,224,0.3)' : MUTED, textDecoration: checked.has(text) ? 'line-through' : 'none' }}>{text}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Guide mode */}
        {mode === 'guide' && (
          <>
            {/* Steps */}
            <div style={{ borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: DIM }}>Step-by-step</span>
              </div>
              {guide.steps.map(({ step, detail, timeframe }, i) => (
                <div key={step} style={{ padding: '16px', display: 'flex', gap: '16px', borderBottom: i < guide.steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(77,186,128,0.12)', border: '1px solid rgba(77,186,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: GREEN }}>{i + 1}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: TEXT }}>{step}</span>
                      <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', color: DIM }}>{timeframe}</span>
                    </div>
                    <p style={{ fontSize: '12px', lineHeight: '1.6', color: MUTED }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div style={{ borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: DIM }}>Pro tips</span>
              </div>
              {guide.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderBottom: i < guide.tips.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ color: GREEN, flexShrink: 0, marginTop: '1px' }}>→</span>
                  <p style={{ fontSize: '12px', lineHeight: '1.6', color: MUTED }}>{tip}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
