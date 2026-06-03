const BG = '#0d1520'
const CARD = 'rgba(255,255,255,0.055)'
const BORDER = 'rgba(255,255,255,0.1)'
const TEXT = '#e8e8e0'
const MUTED = 'rgba(232,232,224,0.55)'
const DIM = 'rgba(232,232,224,0.3)'
const GREEN = '#4dba80'
const AMBER = '#f59e0b'

const DOCS = [
  {
    title: 'DOH Permit Renewal Form',
    description: 'Pre-filled with your business info. Submit directly to DOHMH.',
    status: 'Action needed',
  },
  {
    title: 'FDNY Inspection Checklist',
    description: 'Inspector-ready checklist for your location type and borough.',
    status: 'In progress',
  },
  {
    title: 'DCWP License Application',
    description: 'Business license renewal, pre-filled for Manhattan.',
    status: 'Not started',
  },
]

function statusStyle(status: string) {
  if (status === 'Action needed') return { background: 'rgba(245,158,11,0.12)', color: AMBER }
  if (status === 'In progress') return { background: 'rgba(77,158,186,0.12)', color: '#4d9eba' }
  return { background: 'rgba(255,255,255,0.06)', color: MUTED }
}

export default function Documents() {
  return (
    <div style={{ background: BG, minHeight: '100%', padding: '20px' }}>
      <div className="grid grid-cols-3 gap-3">
        {DOCS.map(({ title, description, status }) => (
          <div key={title} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ fontSize: '9px', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: '600' }}>Ready to use</div>
              <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '999px', fontWeight: '500', flexShrink: 0, ...statusStyle(status) }}>{status}</span>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: TEXT, fontSize: '14px', marginBottom: '6px' }}>{title}</div>
              <div style={{ fontSize: '12px', color: MUTED, lineHeight: '1.6' }}>{description}</div>
            </div>
            <button style={{ fontSize: '10px', color: GREEN, fontWeight: '600', textAlign: 'left', marginTop: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Download PDF →
            </button>
          </div>
        ))}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px dashed ${BORDER}`, borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <div style={{ fontSize: '12px', color: MUTED, textAlign: 'center' }}>Need a different document?</div>
          <button style={{ fontSize: '12px', color: TEXT, fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Request a template →</button>
        </div>
      </div>
    </div>
  )
}
