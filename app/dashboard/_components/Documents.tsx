const BG = 'var(--panel)'
const CARD = 'var(--panel-hi)'
const BORDER = 'var(--hair)'
const TEXT = 'var(--ink)'
const MUTED = 'var(--ink-2)'
const DIM = 'var(--ink-3)'
const GREEN = 'var(--signal)'
const AMBER = 'var(--warn)'

const DOCS = [
  {
    title: 'DOH Permit Renewal Form',
    description: 'Prepared and submitted to DOHMH on your behalf. Download a copy anytime.',
    status: 'Needed from you',
  },
  {
    title: 'FDNY Inspection Checklist',
    description: 'We prepared this inspector-ready checklist for your location and borough.',
    status: 'In progress',
  },
  {
    title: 'DCWP License Application',
    description: 'Business license renewal filed for your Manhattan location.',
    status: 'Not started',
  },
]

function statusStyle(status: string) {
  if (status === 'Action needed') return { background: 'var(--panel-hi)', color: AMBER }
  if (status === 'In progress') return { background: 'var(--panel-hi)', color: 'var(--ink-2)' }
  return { background: 'var(--hair)', color: MUTED }
}

export default function Documents() {
  return (
    <div style={{ background: BG, minHeight: '100%', padding: '20px' }}>
      <div className="grid grid-cols-3 gap-3">
        {DOCS.map(({ title, description, status }) => (
          <div key={title} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ fontSize: 'var(--text-micro)', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: '600' }}>Filed & managed</div>
              <span style={{ fontSize: 'var(--text-micro)', padding: '2px 8px', borderRadius: '0', fontWeight: '500', flexShrink: 0, ...statusStyle(status) }}>{status}</span>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: TEXT, fontSize: 'var(--text-sm)', marginBottom: '6px' }}>{title}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: MUTED, lineHeight: '1.6' }}>{description}</div>
            </div>
            <button style={{ fontSize: 'var(--text-micro)', color: GREEN, fontWeight: '600', textAlign: 'left', marginTop: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Download PDF →
            </button>
          </div>
        ))}
        <div style={{ background: 'var(--panel)', border: `1px dashed ${BORDER}`, borderRadius: '0', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: MUTED, textAlign: 'center' }}>Need us to prepare something?</div>
          <button style={{ fontSize: 'var(--text-xs)', color: TEXT, fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Ask your compliance team →</button>
        </div>
      </div>
    </div>
  )
}
