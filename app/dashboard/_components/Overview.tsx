import React from 'react'
import { DEADLINES } from '../_data/deadlines'

const AGENCIES = [
  { name: 'DOHMH', status: 'Compliant', ok: true },
  { name: 'FDNY', status: 'Action needed', ok: false },
  { name: 'DOB', status: 'Compliant', ok: true },
  { name: 'DCWP', status: 'Compliant', ok: true },
  { name: 'SLA', status: 'N/A', ok: null },
]

const DOCS_MISSING = ['Certificate of Occupancy', 'Lease Agreement']

export default function Overview() {
  const score = 94
  const r = 30
  const circumference = 2 * Math.PI * r
  const svgOffset = circumference * (1 - score / 100)
  const urgentDeadlines = DEADLINES.filter(d => d.days <= 33)

  return (
    <div className="p-6 max-w-5xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── Row 1: Score + quick stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px' }}>

        {/* Score card */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            <svg viewBox="0 0 72 72" style={{ width: '80px', height: '80px', transform: 'rotate(-90deg)' }}>
              <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <circle cx="36" cy="36" r={r} fill="none" stroke="#4dba80" strokeWidth="7"
                strokeDasharray={circumference} strokeDashoffset={svgOffset} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '22px', color: '#e8e8e0', fontFamily: 'Georgia, serif' }}>
              {score}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0' }}>Compliance Score</div>
            <div style={{ fontSize: '11px', color: '#4dba80', marginTop: '3px' }}>↑ 2 pts this month</div>
          </div>
        </div>

        {/* Quick stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { value: urgentDeadlines.length.toString(), label: 'Urgent deadlines', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)' },
            { value: '0', label: 'Open violations', color: '#4dba80', bg: 'rgba(77,186,128,0.06)', border: 'rgba(77,186,128,0.12)' },
            { value: '$14,200', label: 'Credits identified', color: '#4d9eba', bg: 'rgba(77,158,186,0.06)', border: 'rgba(77,158,186,0.12)' },
            { value: '4/6', label: 'Docs uploaded', color: 'rgba(232,232,224,0.6)', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
          ].map(({ value, label, color, bg, border }) => (
            <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color, fontFamily: 'Georgia, serif', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '11px', color: 'rgba(232,232,224,0.45)', marginTop: '8px', lineHeight: '1.3' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 2: Actions + Agency status ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '16px' }}>

        {/* Actions */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0', marginBottom: '14px' }}>Action Required</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {urgentDeadlines.map(({ id, req, agency, due, days }) => (
              <div key={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '8px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0' }}>{req}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(232,232,224,0.45)', marginTop: '3px' }}>{agency}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#f59e0b' }}>Due {due}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(232,232,224,0.4)', marginTop: '2px' }}>{days} days</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '12px', color: 'rgba(232,232,224,0.3)' }}>
              {DEADLINES.length - urgentDeadlines.length} more deadlines on track this quarter
            </div>
          </div>
        </div>

        {/* Agency status */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0', marginBottom: '14px' }}>Agency Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {AGENCIES.map(({ name, status, ok }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#e8e8e0' }}>{name}</span>
                <span style={{ fontSize: '11px', color: ok === true ? '#4dba80' : ok === false ? '#f59e0b' : 'rgba(232,232,224,0.3)' }}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Deadlines table ── */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0' }}>Upcoming Deadlines</div>
          <span style={{ fontSize: '11px', color: '#4dba80', cursor: 'pointer' }}>View all →</span>
        </div>
        <div>
          {DEADLINES.map(({ id, req, agency, due, days, status }, i) => (
            <div key={id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 120px', padding: '12px 20px', borderBottom: i < DEADLINES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', color: '#e8e8e0', fontWeight: '500' }}>{req}</div>
              <div style={{ fontSize: '12px', color: 'rgba(232,232,224,0.4)' }}>{agency}</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: days <= 33 ? '#f59e0b' : 'rgba(232,232,224,0.4)' }}>{due}</div>
              <div>
                <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '20px', fontWeight: '500', background: days <= 33 ? 'rgba(245,158,11,0.12)' : days <= 60 ? 'rgba(255,255,255,0.05)' : 'rgba(77,186,128,0.1)', color: days <= 33 ? '#f59e0b' : days <= 60 ? 'rgba(232,232,224,0.45)' : '#4dba80' }}>
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 4: Financials + Documents + Prepare ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>

        {/* Financials */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0', marginBottom: '14px' }}>Financials</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Fees due next 90 days', value: '$1,185', color: '#e8e8e0' },
              { label: 'Tax credits identified', value: '$14,200', color: '#4dba80' },
              { label: 'Credits received', value: '$4,800', color: '#4d9eba' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '12px', color: 'rgba(232,232,224,0.5)' }}>{label}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color, fontFamily: 'Georgia, serif' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0', marginBottom: '14px' }}>Documents</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#e8e8e0', fontFamily: 'Georgia, serif', lineHeight: 1 }}>4<span style={{ fontSize: '16px', color: 'rgba(232,232,224,0.3)' }}>/6</span></div>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(232,232,224,0.5)', marginBottom: '5px' }}>documents uploaded</div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)', width: '100px' }}>
                <div style={{ width: '66%', height: '100%', borderRadius: '2px', background: '#4dba80' }} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {DOCS_MISSING.map(name => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(245,158,11,0.8)' }}>
                <span>⚠</span> {name} missing
              </div>
            ))}
          </div>
        </div>

        {/* Prepare readiness */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0', marginBottom: '14px' }}>Inspection Readiness</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'DOH Permit Renewal', pct: 60, color: '#f59e0b' },
              { label: 'FDNY Inspection', pct: 30, color: '#ef4444' },
              { label: 'DCWP License', pct: 90, color: '#4dba80' },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(232,232,224,0.55)' }}>{label}</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color }}>{pct}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: '2px', background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
