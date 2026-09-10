const BG = 'var(--panel)'
const CARD = 'var(--panel-hi)'
const BORDER = 'var(--hair)'
const TEXT = 'var(--ink)'
const MUTED = 'var(--ink-2)'
const DIM = 'var(--ink-3)'
const GREEN = 'var(--signal)'

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
        <div style={{ fontSize: 'var(--text-xs)', color: MUTED }}>2 programs identified for your business</div>
        <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: GREEN }}>$14,200 total identified</div>
      </div>

      {CREDITS.map(({ title, description, amount, sub }) => (
        <div key={title} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', padding: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', color: TEXT, fontSize: 'var(--text-xs)', marginBottom: '8px' }}>{title}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: MUTED, lineHeight: '1.6', maxWidth: '480px' }}>{description}</div>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div>
              <div style={{ fontWeight: '700', color: GREEN, fontSize: 'var(--text-lg)' }}>{amount}</div>
              <div style={{ fontSize: 'var(--text-micro)', color: MUTED, marginTop: '2px' }}>{sub}</div>
            </div>
            <button style={{ background: GREEN, color: 'var(--void)', fontSize: 'var(--text-xs)', fontWeight: '600', padding: '6px 12px', borderRadius: '0', border: 'none', cursor: 'pointer' }}>
              Learn more →
            </button>
          </div>
        </div>
      ))}

      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', padding: '16px', textAlign: 'center', fontSize: 'var(--text-2xs)', color: DIM }}>
        BureauAI scans 40+ NYC and federal incentive programs monthly. Credits update automatically.
      </div>
    </div>
  )
}
