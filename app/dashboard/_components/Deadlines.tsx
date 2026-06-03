'use client'

import React, { useState } from 'react'
import { DEADLINES } from '../_data/deadlines'

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
    <div className="p-4">
      <div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '2fr 100px 90px 80px 110px 100px' }}>
          {['Requirement', 'Agency', 'Due Date', 'Days Left', 'Status', ''].map(h => (
            <div key={h || 'action'} className="px-4 py-3 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider bg-[#f8f8f6] border-b border-bureau-border">
              {h}
            </div>
          ))}
          {DEADLINES.map(({ id, req, agency, due, days, status }, i) => {
            const done = completed.has(id)
            const border = i < DEADLINES.length - 1 ? 'border-b border-[#f0f0ec]' : ''
            const dueColor = days <= 33 && !done ? 'text-amber-600 font-medium' : 'text-bureau-muted'
            return (
              <React.Fragment key={id}>
                <div className={`px-4 py-3 text-xs font-medium ${border} ${done ? 'line-through text-bureau-muted' : 'text-navy'}`}>{req}</div>
                <div className={`px-4 py-3 text-xs text-bureau-muted ${border}`}>{agency}</div>
                <div className={`px-4 py-3 text-xs ${dueColor} ${border}`}>{due}</div>
                <div className={`px-4 py-3 text-xs ${dueColor} ${border}`}>{days}d</div>
                <div className={`px-4 py-3 ${border}`}>
                  {done
                    ? <span className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-green/10 text-green">Done</span>
                    : <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: days <= 33 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)', color: days <= 33 ? '#f59e0b' : 'rgba(232,232,224,0.5)' }}>{status}</span>
                  }
                </div>
                <div className={`px-4 py-3 ${border}`}>
                  <button onClick={() => toggle(id)} className={`text-[9px] font-medium px-2 py-1 rounded transition-colors ${done ? 'text-bureau-muted hover:text-navy' : 'text-green hover:text-green-light'}`}>
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
