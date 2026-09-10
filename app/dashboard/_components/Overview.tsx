import React from 'react'
import { DEADLINES } from '../_data/deadlines'

// Design tokens — uniform, high-contrast
const BG = 'var(--panel)'           // lighter section background
const CARD = 'var(--panel-hi)'
const BORDER = 'var(--hair)'
const TEXT = 'var(--ink)'         // primary — everything readable
const MUTED = 'var(--ink-2)'  // secondary
const DIM = 'var(--ink-3)'     // tertiary / labels
const GREEN = 'var(--signal)'
const AMBER = 'var(--warn)'
const RED = 'var(--flag)'

const card: React.CSSProperties = {
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: '0',
}

const AGENCIES = [
  { name: 'DOHMH', status: 'Compliant', ok: true },
  { name: 'FDNY', status: 'In progress', ok: false },
  { name: 'DOB', status: 'Compliant', ok: true },
  { name: 'DCWP', status: 'Compliant', ok: true },
  { name: 'SLA', status: 'N/A', ok: null },
]

const DOCS_MISSING = ['Certificate of Occupancy', 'Lease Agreement']

export default function Overview() {
  const score = 94
  const urgentDeadlines = DEADLINES.filter(d => d.days <= 33)

  return (
    <div style={{ background: BG, minHeight: '100%', padding: '24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Team status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--signal)', letterSpacing: '0.04em' }}>
          <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--signal)', flexShrink: 0 }} />
          Your compliance team is active — last updated today
        </div>

        {/* ── Row 1: the grade plate and its readout ──
            The plate carries the grade the way the landing page does; the
            counts read as ruled register rows, not as a tile row of big
            numbers. Both refused devices (progress ring, hero-metric tiles)
            are gone. */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px' }}>

          {/* Grade plate */}
          <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', borderBottom: `1px solid ${BORDER}`, fontSize: 'var(--text-micro)', letterSpacing: '0.1em', textTransform: 'uppercase', color: DIM, fontFamily: 'var(--font-geist-mono), monospace' }}>
              <span>Grade</span>
              <span>+2 / mo</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 0' }}>
              <span
                data-figure
                style={{
                  fontFamily: 'var(--font-archivo), sans-serif',
                  // Display one-off: the dashboard's grade plate sits between
                  // the ramp's --text-figure and the landing plate's scale.
                  // Deliberately literal rather than inventing a token used once.
                  fontWeight: 600, fontSize: '68px', lineHeight: 0.72,
                  letterSpacing: '-0.055em', color: TEXT,
                  textShadow: '0 1px 0 rgba(255,255,255,0.07), 0 -1px 0 rgba(0,0,0,0.5)',
                }}
              >
                {score}
              </span>
            </div>
            <div style={{ padding: '9px 14px', borderTop: `1px solid ${BORDER}`, fontSize: 'var(--text-micro)', letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, fontFamily: 'var(--font-geist-mono), monospace' }}>
              Compliance score
            </div>
            <div style={{ height: '1px', background: 'var(--signal-hair)' }} />
          </div>

          {/* Readout — ruled rows */}
          <div style={{ ...card, padding: '4px 18px 10px' }}>
            {[
              { value: String(urgentDeadlines.length), label: "We're handling soon" },
              { value: '0', label: "Violations we're managing" },
              { value: '$14,200', label: "Credits we've found" },
              { value: '4 / 6', label: 'Docs filed' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  gap: '16px', padding: '11px 0', borderBottom: `1px solid ${BORDER}`,
                }}
              >
                <span style={{ fontSize: 'var(--text-xs)', color: MUTED }}>{label}</span>
                <span
                  data-figure
                  style={{ fontSize: 'var(--text-base)', color: TEXT, fontFamily: 'var(--font-geist-mono), monospace' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2: Actions + Agencies ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '12px' }}>

          {/* Actions */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Action Required</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {urgentDeadlines.map(({ id, req, agency, due, days }) => (
                <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '0', background: 'var(--panel)', border: `1px solid var(--hair)` }}>
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: TEXT }}>{req}</div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: MUTED, marginTop: '2px' }}>{agency}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '20px' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: '700', color: AMBER }}>Due {due}</div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: MUTED, marginTop: '2px' }}>{days} days</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 16px', borderRadius: '0', background: 'var(--panel)', border: `1px solid var(--hair)`, fontSize: 'var(--text-xs)', color: DIM }}>
                {DEADLINES.length - urgentDeadlines.length} more deadlines on track this quarter
              </div>
            </div>
          </div>

          {/* Agency status */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Agency Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AGENCIES.map(({ name, status, ok }) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: '500', color: TEXT }}>{name}</span>
                  <span style={{ fontSize: 'var(--text-2xs)', fontWeight: '500', color: ok === true ? GREEN : ok === false ? AMBER : DIM }}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Deadlines ── */}
        <div style={{ ...card, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Upcoming Deadlines</div>
            <span style={{ fontSize: 'var(--text-2xs)', color: GREEN, cursor: 'pointer' }}>View all →</span>
          </div>
          {DEADLINES.map(({ id, req, agency, due, days, status }, i) => (
            <div key={id} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 80px 110px', padding: '13px 20px', borderBottom: i < DEADLINES.length - 1 ? `1px solid var(--panel-hi)` : 'none', alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: TEXT, fontWeight: '500' }}>{req}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: MUTED }}>{agency}</div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: days <= 33 ? AMBER : MUTED }}>{due}</div>
              <div>
                <span style={{ fontSize: 'var(--text-micro)', padding: '3px 10px', borderRadius: '0', fontWeight: '500',
                  background: 'var(--panel-hi)',
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
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Financials</div>
            {[
              { label: 'Fees due next 90 days', value: '$1,185' },
              { label: 'Credits identified', value: '$14,200', highlight: GREEN },
              { label: 'Credits received', value: '$4,800', highlight: GREEN },
            ].map(({ label, value, highlight }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', marginBottom: '10px', borderBottom: `1px solid var(--hair)` }}>
                <span style={{ fontSize: 'var(--text-xs)', color: MUTED }}>{label}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: '700', color: highlight || TEXT, fontFamily: 'var(--font-archivo), sans-serif' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Documents</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{ fontSize: 'var(--text-figure)', fontWeight: '700', color: TEXT, fontFamily: 'var(--font-archivo), sans-serif', lineHeight: 1 }}>4<span style={{ fontSize: 'var(--text-md)', color: DIM }}>/6</span></div>
              <div>
                <div style={{ fontSize: 'var(--text-2xs)', color: MUTED, marginBottom: '6px' }}>documents uploaded</div>
                <div style={{ height: '4px', width: '90px', borderRadius: '0', background: 'var(--hair)' }}>
                  <div style={{ width: '66%', height: '100%', borderRadius: '0', background: GREEN }} />
                </div>
              </div>
            </div>
            {DOCS_MISSING.map(name => (
              <div key={name} style={{ fontSize: 'var(--text-2xs)', color: AMBER, display: 'flex', gap: '7px', alignItems: 'center', marginBottom: '4px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M12 3 1.5 21h21L12 3Z" />
                  <path d="M12 10v4.5M12 17.5v.5" />
                </svg>
                {name} missing
              </div>
            ))}
          </div>

          {/* Readiness */}
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Inspection Readiness</div>
            {[
              { label: 'DOH Permit Renewal', pct: 60, color: AMBER },
              { label: 'FDNY Inspection', pct: 30, color: RED },
              { label: 'DCWP License', pct: 90, color: GREEN },
            ].map(({ label, pct, color }) => (
              <div key={label} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: 'var(--text-2xs)', color: MUTED }}>{label}</span>
                  <span style={{ fontSize: 'var(--text-2xs)', fontWeight: '700', color }}>{pct}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '0', background: 'var(--hair)' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: '0', background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
