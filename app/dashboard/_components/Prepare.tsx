'use client'

import { useState } from 'react'
import { DEADLINES, PREP_GUIDES } from '../_data/deadlines'

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
    <div className="p-4 flex gap-4 h-full">

      {/* Left: deadline selector */}
      <div className="w-56 flex-shrink-0 flex flex-col gap-2">
        <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(232,232,224,0.3)' }}>Upcoming items</div>
        {DEADLINES.map(({ id, req, agency, due, days }) => {
          const isActive = selected === id
          const urgent = days <= 33
          return (
            <button
              key={id}
              onClick={() => { setSelected(id); setChecked(new Set()); setMode('checklist') }}
              style={{
                textAlign: 'left', padding: '10px 12px',
                background: isActive ? 'rgba(77,186,128,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? 'rgba(77,186,128,0.3)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '8px', transition: 'all 0.15s', cursor: 'pointer',
              }}
            >
              <div className="text-[10px] font-semibold mb-0.5" style={{ color: isActive ? '#4dba80' : '#e8e8e0' }}>{req}</div>
              <div className="text-[9px]" style={{ color: 'rgba(232,232,224,0.35)' }}>{agency} · {due}</div>
              {urgent && (
                <div className="text-[8px] mt-1 font-semibold" style={{ color: '#f59e0b' }}>⚠ {days} days</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm" style={{ color: '#e8e8e0' }}>{deadline.req}</div>
            <div className="text-[10px] mt-0.5" style={{ color: 'rgba(232,232,224,0.4)' }}>{deadline.agency} · Due {deadline.due} · {deadline.fee} fee</div>
          </div>
          <div className="flex gap-1">
            {(['checklist', 'guide'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className="text-[10px] px-3 py-1.5 capitalize font-medium transition-all"
                style={{
                  background: mode === m ? 'rgba(77,186,128,0.12)' : 'transparent',
                  border: `1px solid ${mode === m ? 'rgba(77,186,128,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  color: mode === m ? '#4dba80' : 'rgba(232,232,224,0.45)',
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
            <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-semibold" style={{ color: 'rgba(232,232,224,0.5)' }}>CRITICAL ITEMS READY</span>
                <span className="text-sm font-bold" style={{ color: readiness === 100 ? '#4dba80' : readiness > 50 ? '#f59e0b' : '#ff7c4d' }}>{readiness}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
                <div style={{ width: `${readiness}%`, height: '100%', borderRadius: '2px', background: readiness === 100 ? '#4dba80' : readiness > 50 ? '#f59e0b' : '#ff7c4d', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Critical items */}
            <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,100,80,0.05)' }}>
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#ff7c4d' }}>Critical — must pass inspection</span>
              </div>
              {guide.checklist.filter(c => c.critical).map(({ text }) => (
                <div key={text} className="flex items-center gap-3 px-4 py-3 cursor-pointer" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onClick={() => toggleCheck(text)}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                    background: checked.has(text) ? '#4dba80' : 'transparent',
                    border: `1px solid ${checked.has(text) ? '#4dba80' : 'rgba(255,255,255,0.15)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}>
                    {checked.has(text) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#06090e" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  </div>
                  <span className="text-xs" style={{ color: checked.has(text) ? 'rgba(232,232,224,0.35)' : '#e8e8e0', textDecoration: checked.has(text) ? 'line-through' : 'none' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Non-critical items */}
            {guide.checklist.some(c => !c.critical) && (
              <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(232,232,224,0.35)' }}>Recommended</span>
                </div>
                {guide.checklist.filter(c => !c.critical).map(({ text }) => (
                  <div key={text} className="flex items-center gap-3 px-4 py-3 cursor-pointer" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onClick={() => toggleCheck(text)}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                      background: checked.has(text) ? '#4dba80' : 'transparent',
                      border: `1px solid ${checked.has(text) ? '#4dba80' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}>
                      {checked.has(text) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#06090e" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </div>
                    <span className="text-xs" style={{ color: checked.has(text) ? 'rgba(232,232,224,0.3)' : 'rgba(232,232,224,0.55)', textDecoration: checked.has(text) ? 'line-through' : 'none' }}>{text}</span>
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
            <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(232,232,224,0.35)' }}>Step-by-step</span>
              </div>
              {guide.steps.map(({ step, detail, timeframe }, i) => (
                <div key={step} className="px-4 py-4 flex gap-4" style={{ borderBottom: i < guide.steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(77,186,128,0.12)', border: '1px solid rgba(77,186,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="text-[10px] font-bold" style={{ color: '#4dba80' }}>{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold" style={{ color: '#e8e8e0' }}>{step}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(232,232,224,0.4)' }}>{timeframe}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,232,224,0.5)' }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(232,232,224,0.35)' }}>Pro tips</span>
              </div>
              {guide.tips.map((tip, i) => (
                <div key={i} className="flex gap-3 px-4 py-3" style={{ borderBottom: i < guide.tips.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ color: '#4dba80', flexShrink: 0, marginTop: '1px' }}>→</span>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,232,224,0.5)' }}>{tip}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
