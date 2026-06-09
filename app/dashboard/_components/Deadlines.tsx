'use client'

import React, { useState } from 'react'
import { DEADLINES } from '../_data/deadlines'

const BG = '#0d1520'
const CARD = 'rgba(255,255,255,0.055)'
const BORDER = 'rgba(255,255,255,0.1)'
const TEXT = '#e8e8e0'
const MUTED = 'rgba(232,232,224,0.55)'
const DIM = 'rgba(232,232,224,0.3)'
const GREEN = '#4dba80'
const AMBER = '#f59e0b'

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
      <div style={{ fontSize: '12px', color: 'rgba(77,186,128,0.8)', letterSpacing: '0.04em', marginBottom: '12px' }}>
        ● We're managing all of these on your behalf
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
        <div className="grid" style={{ gridTemplateColumns: '2fr 100px 90px 80px 110px 100px' }}>
          {['Requirement', 'Agency', 'Due Date', 'Days Left', 'Status', ''].map(h => (
            <div
              key={h || 'action'}
              style={{
                padding: '10px 16px',
                fontSize: '9px',
                fontWeight: '600',
                color: DIM,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.02)',
                borderBottom: `1px solid rgba(255,255,255,0.08)`,
              }}
            >
              {h}
            </div>
          ))}
          {DEADLINES.map(({ id, req, agency, due, days, status }, i) => {
            const done = completed.has(id)
            const rowBorder = i < DEADLINES.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}
            const dueStyle = days <= 33 && !done ? { color: AMBER, fontWeight: '500' } : { color: MUTED }
            return (
              <React.Fragment key={id}>
                <div style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '500', color: done ? MUTED : TEXT, textDecoration: done ? 'line-through' : 'none', ...rowBorder }}>{req}</div>
                <div style={{ padding: '10px 16px', fontSize: '12px', color: MUTED, ...rowBorder }}>{agency}</div>
                <div style={{ padding: '10px 16px', fontSize: '12px', ...dueStyle, ...rowBorder }}>{due}</div>
                <div style={{ padding: '10px 16px', fontSize: '12px', ...dueStyle, ...rowBorder }}>{days}d</div>
                <div style={{ padding: '10px 16px', ...rowBorder }}>
                  {done
                    ? <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '999px', fontWeight: '500', background: 'rgba(77,186,128,0.12)', color: GREEN }}>Done</span>
                    : <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '999px', fontWeight: '500', background: days <= 33 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)', color: days <= 33 ? AMBER : MUTED }}>{status}</span>
                  }
                </div>
                <div style={{ padding: '10px 16px', ...rowBorder }}>
                  <button
                    onClick={() => toggle(id)}
                    style={{ fontSize: '9px', fontWeight: '500', padding: '3px 8px', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: done ? MUTED : GREEN }}
                  >
                    {done ? 'Undo' : '✓ Complete'}
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
