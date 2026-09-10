import Link from 'next/link'

const BG = 'var(--panel)'
const CARD = 'var(--panel-hi)'
const BORDER = 'var(--hair)'
const TEXT = 'var(--ink)'
const MUTED = 'var(--ink-2)'
const DIM = 'var(--ink-3)'
const GREEN = 'var(--signal)'

const HISTORY = [
  { date: 'May 31, 2026', score: 94, summary: 'We identified 2 urgent items. DOH renewal in progress.' },
  { date: 'Apr 30, 2026', score: 91, summary: 'FDNY inspection scheduled. Score improved +3.' },
  { date: 'Mar 31, 2026', score: 88, summary: 'DCWP license renewal filed. 3 items resolved.' },
]

const ACTIONS = [
  {
    n: '1',
    bg: 'var(--flag)',
    text: 'Renewing your DOHMH food service permit — due Jun 30. Filing online at the DOHMH eFoodservice portal. Processing takes 2–3 weeks — in progress.',
  },
  {
    n: '2',
    bg: 'var(--warn)',
    text: 'Scheduling your FDNY annual inspection. Coordinating with FDNY Bureau of Fire Prevention — inspectors are typically booked 3–4 weeks out.',
  },
]

export default function Audit() {
  return (
    <div style={{ background: BG, minHeight: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Immediate Actions panel */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: '0', padding: '20px' }}>
        <div style={{ fontSize: 'var(--text-micro)', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '16px' }}>
          What We're Handling · Next 30 days
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ACTIONS.map(({ n, bg, text }) => (
            <div key={n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '20px', height: '20px', background: bg, borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <span style={{ color: 'var(--void)', fontSize: 'var(--text-micro)', fontWeight: '700' }}>{n}</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: TEXT, lineHeight: '1.6' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines panel */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', padding: '20px' }}>
        <div style={{ fontSize: 'var(--text-micro)', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '12px' }}>Upcoming Deadlines</div>
        <p style={{ fontSize: 'var(--text-xs)', color: MUTED, lineHeight: '1.6' }}>
          DOHMH permit renewal annually · FDNY inspection annually · DCWP business license every 2 years · DOB CO review every 5 years
        </p>
      </div>

      {/* Previous Audits */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '600', fontSize: 'var(--text-xs)', color: TEXT }}>Our Audit History</span>
          <span style={{ fontSize: 'var(--text-micro)', color: MUTED }}>Last 3 months</span>
        </div>
        {HISTORY.map(({ date, score, summary }, i) => (
          <div key={date} style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: i < HISTORY.length - 1 ? '1px solid var(--panel-hi)' : 'none' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--panel-hi)', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: 'var(--text-xs)', color: TEXT, flexShrink: 0 }}>
              {score}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-2xs)', fontWeight: '600', color: TEXT }}>{date}</div>
              <div style={{ fontSize: 'var(--text-micro)', color: MUTED, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{summary}</div>
            </div>
            <button style={{ fontSize: 'var(--text-micro)', color: DIM, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>View →</button>
          </div>
        ))}
      </div>

      {/* Run new audit bar */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 'var(--text-xs)', color: MUTED }}>Last run: today, 9:14am · Run a fresh audit with updated info</div>
        <Link
          href="/audit"
          style={{ background: GREEN, color: 'var(--void)', fontSize: 'var(--text-xs)', fontWeight: '600', padding: '8px 16px', borderRadius: '0', textDecoration: 'none' }}
        >
          Run new audit →
        </Link>
      </div>
    </div>
  )
}
