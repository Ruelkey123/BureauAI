'use client'

import React, { useState } from 'react'
import { DEADLINES } from '../_data/deadlines'

const BG = 'var(--panel)'
const CARD = 'var(--panel-hi)'
const BORDER = 'var(--hair)'
const TEXT = 'var(--ink)'
const MUTED = 'var(--ink-2)'
const DIM = 'var(--ink-3)'
const GREEN = 'var(--signal)'
const AMBER = 'var(--warn)'

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
    <div style={{ background: BG, minHeight: '100%', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--signal)', letterSpacing: '0.04em', marginBottom: '12px' }}>
        <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--signal)', flexShrink: 0 }} />
        We&apos;re managing all of these on your behalf
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', overflow: 'hidden' }}>
        <div className="grid" style={{ gridTemplateColumns: '2fr 100px 90px 80px 110px 100px' }}>
          {['Requirement', 'Agency', 'Due Date', 'Days Left', 'Status', ''].map(h => (
            <div
              key={h || 'action'}
              style={{
                padding: '10px 16px',
                fontSize: 'var(--text-micro)',
                fontWeight: '600',
                color: DIM,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'var(--panel)',
                borderBottom: `1px solid var(--hair)`,
              }}
            >
              {h}
            </div>
          ))}
          {DEADLINES.map(({ id, req, agency, due, days, status }, i) => {
            const done = completed.has(id)
            const rowBorder = i < DEADLINES.length - 1 ? { borderBottom: '1px solid var(--panel-hi)' } : {}
            const dueStyle = days <= 33 && !done ? { color: AMBER, fontWeight: '500' } : { color: MUTED }
            return (
              <React.Fragment key={id}>
                <div style={{ padding: '10px 16px', fontSize: 'var(--text-xs)', fontWeight: '500', color: done ? MUTED : TEXT, textDecoration: done ? 'line-through' : 'none', ...rowBorder }}>{req}</div>
                <div style={{ padding: '10px 16px', fontSize: 'var(--text-xs)', color: MUTED, ...rowBorder }}>{agency}</div>
                <div style={{ padding: '10px 16px', fontSize: 'var(--text-xs)', ...dueStyle, ...rowBorder }}>{due}</div>
                <div style={{ padding: '10px 16px', fontSize: 'var(--text-xs)', ...dueStyle, ...rowBorder }}>{days}d</div>
                <div style={{ padding: '10px 16px', ...rowBorder }}>
                  {done
                    ? <span style={{ fontSize: 'var(--text-micro)', padding: '2px 8px', borderRadius: '0', fontWeight: '500', background: 'var(--signal-wash)', color: GREEN }}>Done</span>
                    : <span style={{ fontSize: 'var(--text-micro)', padding: '2px 8px', borderRadius: '0', fontWeight: '500', background: 'var(--panel-hi)', color: days <= 33 ? AMBER : MUTED }}>{status}</span>
                  }
                </div>
                <div style={{ padding: '10px 16px', ...rowBorder }}>
                  <button
                    onClick={() => toggle(id)}
                    style={{ fontSize: 'var(--text-micro)', fontWeight: '500', padding: '3px 8px', borderRadius: '0', background: 'transparent', border: 'none', cursor: 'pointer', color: done ? MUTED : GREEN, display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    {!done && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                        <path d="M4 12.5 9.5 18 20 6" />
                      </svg>
                    )}
                    {done ? 'Undo' : 'Complete'}
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
