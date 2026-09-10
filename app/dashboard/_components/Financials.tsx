const BG = 'var(--panel)'
const CARD = 'var(--panel-hi)'
const BORDER = 'var(--hair)'
const TEXT = 'var(--ink)'
const MUTED = 'var(--ink-2)'
const DIM = 'var(--ink-3)'
const GREEN = 'var(--signal)'
const AMBER = 'var(--warn)'

const CALENDAR = [
  {
    month: 'Jun 2026',
    items: [
      { name: 'DOHMH Food Service Permit Renewal', fee: '$280', due: 'Jun 30', urgent: true },
    ],
  },
  {
    month: 'Jul 2026',
    items: [
      { name: 'FDNY Inspection Filing Fee', fee: '$150', due: 'Jul 15', urgent: false },
    ],
  },
  {
    month: 'Aug 2026',
    items: [
      { name: 'DCWP Business License Renewal', fee: '$110', due: 'Aug 1', urgent: false },
      { name: 'DOB CO Review Fee', fee: '$200', due: 'Aug 20', urgent: false },
    ],
  },
  {
    month: 'Sep 2026',
    items: [
      { name: 'Sidewalk Café Permit Renewal', fee: '$445', due: 'Sep 1', urgent: false },
    ],
  },
]

const CREDITS = [
  {
    title: 'Work Opportunity Tax Credit (WOTC)',
    amount: '$9,600',
    status: 'Not applied',
    statusStyle: { background: 'var(--hair)', color: MUTED },
    description: 'Federal tax credit for eligible hires.',
    cta: 'Start application →',
  },
  {
    title: 'NYC Energy Efficiency Program',
    amount: '$4,600',
    status: 'Applied',
    statusStyle: { background: 'var(--panel-hi)', color: 'var(--ink-2)' },
    description: 'Rebates for HVAC, refrigeration, and lighting.',
    cta: 'View details →',
  },
  {
    title: 'NYC Small Business Tax Credit',
    amount: '$1,500',
    status: 'Pending',
    statusStyle: { background: 'var(--panel-hi)', color: AMBER },
    description: 'City tax credit for businesses under 50 employees.',
    cta: 'View details →',
  },
  {
    title: 'WOTC Veteran Hiring Bonus',
    amount: '$4,800',
    status: 'Received',
    statusStyle: { background: 'var(--signal-wash)', color: GREEN },
    description: 'Awarded for hiring a qualifying veteran last quarter.',
    cta: 'View details →',
  },
]

const totalFees = CALENDAR.flatMap(m => m.items).reduce(
  (sum, item) => sum + parseInt(item.fee.replace(/\D/g, '')),
  0
)

export default function Financials() {
  return (
    <div style={{ background: BG, minHeight: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Compliance Cost Calendar */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontWeight: '600', color: TEXT, fontSize: 'var(--text-xs)', margin: 0 }}>Compliance Cost Calendar</h2>
          <span style={{ fontSize: 'var(--text-xs)', color: MUTED }}>
            ${totalFees.toLocaleString()} in fees next 90 days
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CALENDAR.map(({ month, items }) => {
            const monthTotal = items.reduce((sum, i) => sum + parseInt(i.fee.replace(/\D/g, '')), 0)
            return (
              <div key={month} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', overflow: 'hidden' }}>
                <div style={{ padding: '8px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--panel)' }}>
                  <span style={{ fontSize: 'var(--text-2xs)', fontWeight: '600', color: TEXT }}>{month}</span>
                  <span style={{ fontSize: 'var(--text-micro)', color: MUTED }}>${monthTotal}</span>
                </div>
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(({ name, fee, due, urgent }) => (
                    <div key={name} style={{ padding: '10px', borderRadius: '0', border: `1px solid ${BORDER}`, background: urgent ? 'var(--panel-hi)' : 'transparent' }}>
                      <div style={{ fontSize: 'var(--text-micro)', fontWeight: '500', color: TEXT, lineHeight: '1.4', marginBottom: '4px' }}>{name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 'var(--text-micro)', color: urgent ? AMBER : MUTED }}>{due}</span>
                        <span style={{ fontSize: 'var(--text-micro)', fontWeight: '700', color: TEXT }}>{fee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tax Credit Pipeline */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontWeight: '600', color: TEXT, fontSize: 'var(--text-xs)', margin: 0 }}>Tax Credit Pipeline</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: 'var(--text-micro)', color: MUTED }}>
            {['Not applied', 'Applied', 'Pending', 'Received'].map(s => (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: BORDER, display: 'inline-block' }} />{s}
              </span>
            ))}
          </div>
        </div>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '0', overflow: 'hidden' }}>
          <div className="grid" style={{ gridTemplateColumns: '2fr 120px 100px 140px' }}>
            {['Program', 'Potential value', 'Status', ''].map((h, i) => (
              <div key={i} style={{ padding: '10px 16px', fontSize: 'var(--text-micro)', fontWeight: '600', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--panel)', borderBottom: 'var(--hair) 1px solid' }}>
                {h}
              </div>
            ))}
            {CREDITS.map(({ title, amount, status, statusStyle, description, cta }, i) => {
              const rowBorder = i < CREDITS.length - 1 ? { borderBottom: '1px solid var(--panel-hi)' } : {}
              return (
                <>
                  <div key={title} style={{ padding: '12px 16px', ...rowBorder }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: '500', color: TEXT }}>{title}</div>
                    <div style={{ fontSize: 'var(--text-micro)', color: MUTED, marginTop: '2px' }}>{description}</div>
                  </div>
                  <div style={{ padding: '12px 16px', fontSize: 'var(--text-xs)', fontWeight: '600', color: TEXT, ...rowBorder }}>{amount}</div>
                  <div style={{ padding: '12px 16px', ...rowBorder }}>
                    <span style={{ fontSize: 'var(--text-micro)', padding: '2px 8px', borderRadius: '0', fontWeight: '500', ...statusStyle }}>{status}</span>
                  </div>
                  <div style={{ padding: '12px 16px', ...rowBorder }}>
                    <button style={{ fontSize: 'var(--text-micro)', color: GREEN, fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>{cta}</button>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}
