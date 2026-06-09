import Link from 'next/link'

const BG = '#0d1520'
const CARD = 'rgba(255,255,255,0.055)'
const BORDER = 'rgba(255,255,255,0.1)'
const TEXT = '#e8e8e0'
const MUTED = 'rgba(232,232,224,0.55)'
const DIM = 'rgba(232,232,224,0.3)'
const GREEN = '#4dba80'

const HISTORY = [
  { date: 'May 31, 2026', score: 94, summary: 'We identified 2 urgent items. DOH renewal in progress.' },
  { date: 'Apr 30, 2026', score: 91, summary: 'FDNY inspection scheduled. Score improved +3.' },
  { date: 'Mar 31, 2026', score: 88, summary: 'DCWP license renewal filed. 3 items resolved.' },
]

const ACTIONS = [
  {
    n: '1',
    bg: '#ef4444',
    text: 'Renewing your DOHMH food service permit — due Jun 30. Filing online at the DOHMH eFoodservice portal. Processing takes 2–3 weeks — in progress.',
  },
  {
    n: '2',
    bg: '#f59e0b',
    text: 'Scheduling your FDNY annual inspection. Coordinating with FDNY Bureau of Fire Prevention — inspectors are typically booked 3–4 weeks out.',
  },
]

export default function Audit() {
  return (
    <div style={{ background: BG, minHeight: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Immediate Actions panel */}
      <div style={{ background: 'rgba(15,30,46,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '20px' }}>
        <div style={{ fontSize: '9px', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '16px' }}>
          What We're Handling · Next 30 days
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ACTIONS.map(({ n, bg, text }) => (
            <div key={n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '20px', height: '20px', background: bg, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: '700' }}>{n}</span>
              </div>
              <p style={{ fontSize: '13px', color: TEXT, lineHeight: '1.6' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines panel */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '20px' }}>
        <div style={{ fontSize: '9px', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '12px' }}>Upcoming Deadlines</div>
        <p style={{ fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>
          DOHMH permit renewal annually · FDNY inspection annually · DCWP business license every 2 years · DOB CO review every 5 years
        </p>
      </div>

      {/* Previous Audits */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '600', fontSize: '13px', color: TEXT }}>Our Audit History</span>
          <span style={{ fontSize: '9px', color: MUTED }}>Last 3 months</span>
        </div>
        {HISTORY.map(({ date, score, summary }, i) => (
          <div key={date} style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: i < HISTORY.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px', color: TEXT, flexShrink: 0 }}>
              {score}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: TEXT }}>{date}</div>
              <div style={{ fontSize: '10px', color: MUTED, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{summary}</div>
            </div>
            <button style={{ fontSize: '9px', color: DIM, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>View →</button>
          </div>
        ))}
      </div>

      {/* Run new audit bar */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '12px', color: MUTED }}>Last run: today, 9:14am · Run a fresh audit with updated info</div>
        <Link
          href="/audit"
          style={{ background: GREEN, color: '#06090e', fontSize: '12px', fontWeight: '600', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none' }}
        >
          Run new audit →
        </Link>
      </div>
    </div>
  )
}
