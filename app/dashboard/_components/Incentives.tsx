const BG = '#0d1520'
const CARD = 'rgba(255,255,255,0.055)'
const BORDER = 'rgba(255,255,255,0.1)'
const TEXT = '#e8e8e0'
const MUTED = 'rgba(232,232,224,0.55)'
const DIM = 'rgba(232,232,224,0.3)'
const GREEN = '#4dba80'

const CREDITS = [
  {
    title: 'Work Opportunity Tax Credit (WOTC)',
    description:
      'Federal tax credit for hiring from certain target groups. Up to $9,600 per eligible employee. You likely qualify based on your borough and business type.',
    amount: '$9,600',
    sub: 'per employee',
  },
  {
    title: 'NYC Small Business Energy Efficiency Program',
    description:
      'Rebates for energy-efficient equipment upgrades. HVAC, refrigeration, and lighting qualify. Available to Manhattan businesses under 50 employees.',
    amount: '$4,600',
    sub: 'estimated rebate',
  },
]

export default function Incentives() {
  return (
    <div style={{ background: BG, minHeight: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div style={{ fontSize: '12px', color: MUTED }}>2 programs identified for your business</div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: GREEN }}>$14,200 total identified</div>
      </div>

      {CREDITS.map(({ title, description, amount, sub }) => (
        <div key={title} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', color: TEXT, fontSize: '13px', marginBottom: '8px' }}>{title}</div>
            <div style={{ fontSize: '12px', color: MUTED, lineHeight: '1.6', maxWidth: '480px' }}>{description}</div>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div>
              <div style={{ fontWeight: '700', color: GREEN, fontSize: '20px' }}>{amount}</div>
              <div style={{ fontSize: '10px', color: MUTED, marginTop: '2px' }}>{sub}</div>
            </div>
            <button style={{ background: GREEN, color: '#06090e', fontSize: '12px', fontWeight: '600', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
              Learn more →
            </button>
          </div>
        </div>
      ))}

      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px', textAlign: 'center', fontSize: '11px', color: DIM }}>
        BureauAI scans 40+ NYC and federal incentive programs monthly. Credits update automatically.
      </div>
    </div>
  )
}
