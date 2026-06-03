import React from 'react'
import { DEADLINES } from '../_data/deadlines'

// Design tokens — uniform, high-contrast
const BG = '#0d1520'           // lighter section background
const CARD = 'rgba(255,255,255,0.055)'
const BORDER = 'rgba(255,255,255,0.1)'
const TEXT = '#e8e8e0'         // primary — everything readable
const MUTED = 'rgba(232,232,224,0.55)'  // secondary
const DIM = 'rgba(232,232,224,0.3)'     // tertiary / labels
const GREEN = '#4dba80'
const AMBER = '#f59e0b'
const RED = '#f87171'

const card: React.CSSProperties = {
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: '10px',
}

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
    <div style={{ background: BG, minHeight: '100%', padding: '24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* ── Row 1: Score + stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '12px' }}>

          {/* Score */}
          <div style={{ ...card, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '76px', height: '76px' }}>
              <svg viewBox="0 0 72 72" style={{ width: '76px', height: '76px', transform: 'rotate(-90deg)' }}>
                <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                <circle cx="36" cy="36" r={r} fill="none" stroke={GREEN} strokeWidth="7"
                  strokeDasharray={circumference} strokeDashoffset={svgOffset} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '22px', color: TEXT, fontFamily: 'Georgia, serif' }}>
                {score}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: TEXT }}>Compliance Score</div>
              <div style={{ fontSize: '11px', color: GREEN, marginTop: '2px' }}>↑ 2 pts this month</div>
            </div>
          </div>

          {/* 4 stat tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { value: String(urgentDeadlines.length), label: 'Urgent deadlines', accent: AMBER },
              { value: '0', label: 'Open violations', accent: GREEN },
              { value: '$14,200', label: 'Credits identified', accent: GREEN },
              { value: '4 / 6', label: 'Docs uploaded', accent: TEXT },
            ].map(({ value, label, accent }) => (
              <div key={label} style={{ ...card, padding: '18px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '90px' }}>
                <div style={{ fontSize: '26px', fontWeight: '700', color: accent, fontFamily: 'Georgia, serif', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '11px', color: MUTED, lineHeight: '1.35', marginTop: '8px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2: Actions + Agencies ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '12px' }}>

          {/* Actions */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Action Required</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {urgentDeadlines.map(({ id, req, agency, due, days }) => (
                <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', background: 'rgba(245,158,11,0.06)', border: `1px solid rgba(245,158,11,0.14)` }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: TEXT }}>{req}</div>
                    <div style={{ fontSize: '11px', color: MUTED, marginTop: '2px' }}>{agency}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: AMBER }}>Due {due}</div>
                    <div style={{ fontSize: '11px', color: MUTED, marginTop: '2px' }}>{days} days</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.07)`, fontSize: '12px', color: DIM }}>
                {DEADLINES.length - urgentDeadlines.length} more deadlines on track this quarter
              </div>
            </div>
          </div>

          {/* Agency status */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Agency Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AGENCIES.map(({ name, status, ok }) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: TEXT }}>{name}</span>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: ok === true ? GREEN : ok === false ? AMBER : DIM }}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Deadlines ── */}
        <div style={{ ...card, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Upcoming Deadlines</div>
            <span style={{ fontSize: '11px', color: GREEN, cursor: 'pointer' }}>View all →</span>
          </div>
          {DEADLINES.map(({ id, req, agency, due, days, status }, i) => (
            <div key={id} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 80px 110px', padding: '13px 20px', borderBottom: i < DEADLINES.length - 1 ? `1px solid rgba(255,255,255,0.05)` : 'none', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', color: TEXT, fontWeight: '500' }}>{req}</div>
              <div style={{ fontSize: '12px', color: MUTED }}>{agency}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: days <= 33 ? AMBER : MUTED }}>{due}</div>
              <div>
                <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '20px', fontWeight: '500',
                  background: days <= 33 ? 'rgba(245,158,11,0.12)' : days <= 60 ? 'rgba(255,255,255,0.05)' : 'rgba(77,186,128,0.1)',
                  color: days <= 33 ? AMBER : days <= 60 ? MUTED : GREEN }}>
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Row 4: Financials + Docs + Readiness ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>

          {/* Financials */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Financials</div>
            {[
              { label: 'Fees due next 90 days', value: '$1,185' },
              { label: 'Credits identified', value: '$14,200', highlight: GREEN },
              { label: 'Credits received', value: '$4,800', highlight: GREEN },
            ].map(({ label, value, highlight }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', marginBottom: '10px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                <span style={{ fontSize: '12px', color: MUTED }}>{label}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: highlight || TEXT, fontFamily: 'Georgia, serif' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Documents</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{ fontSize: '34px', fontWeight: '700', color: TEXT, fontFamily: 'Georgia, serif', lineHeight: 1 }}>4<span style={{ fontSize: '18px', color: DIM }}>/6</span></div>
              <div>
                <div style={{ fontSize: '11px', color: MUTED, marginBottom: '6px' }}>documents uploaded</div>
                <div style={{ height: '4px', width: '90px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
                  <div style={{ width: '66%', height: '100%', borderRadius: '2px', background: GREEN }} />
                </div>
              </div>
            </div>
            {DOCS_MISSING.map(name => (
              <div key={name} style={{ fontSize: '11px', color: AMBER, display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
                <span>⚠</span>{name} missing
              </div>
            ))}
          </div>

          {/* Readiness */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Inspection Readiness</div>
            {[
              { label: 'DOH Permit Renewal', pct: 60, color: AMBER },
              { label: 'FDNY Inspection', pct: 30, color: RED },
              { label: 'DCWP License', pct: 90, color: GREEN },
            ].map(({ label, pct, color }) => (
              <div key={label} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', color: MUTED }}>{label}</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color }}>{pct}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
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
