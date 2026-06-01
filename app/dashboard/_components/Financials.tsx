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
    statusClass: 'bg-gray-100 text-bureau-muted',
    description: 'Federal tax credit for eligible hires.',
    cta: 'Start application →',
  },
  {
    title: 'NYC Energy Efficiency Program',
    amount: '$4,600',
    status: 'Applied',
    statusClass: 'bg-blue-50 text-blue-600',
    description: 'Rebates for HVAC, refrigeration, and lighting.',
    cta: 'View details →',
  },
  {
    title: 'NYC Small Business Tax Credit',
    amount: '$1,500',
    status: 'Pending',
    statusClass: 'bg-amber-100 text-amber-700',
    description: 'City tax credit for businesses under 50 employees.',
    cta: 'View details →',
  },
  {
    title: 'WOTC Veteran Hiring Bonus',
    amount: '$4,800',
    status: 'Received',
    statusClass: 'bg-green/10 text-green',
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
    <div className="p-4 flex flex-col gap-4">

      {/* Compliance Cost Calendar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy text-sm">Compliance Cost Calendar</h2>
          <span className="text-xs text-bureau-muted">
            ${totalFees.toLocaleString()} in fees next 90 days
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CALENDAR.map(({ month, items }) => {
            const monthTotal = items.reduce((sum, i) => sum + parseInt(i.fee.replace(/\D/g, '')), 0)
            return (
              <div key={month} className="bg-white border border-bureau-border rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 border-b border-bureau-border flex items-center justify-between bg-[#f8f8f6]">
                  <span className="text-[10px] font-semibold text-navy">{month}</span>
                  <span className="text-[10px] font-semibold text-bureau-muted">${monthTotal}</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  {items.map(({ name, fee, due, urgent }) => (
                    <div key={name} className={`p-2.5 rounded border ${urgent ? 'border-amber-200 bg-amber-50' : 'border-bureau-border'}`}>
                      <div className="text-[10px] font-medium text-navy leading-snug mb-1">{name}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] ${urgent ? 'text-amber-600' : 'text-bureau-muted'}`}>{due}</span>
                        <span className="text-[10px] font-bold text-navy">{fee}</span>
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
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-navy text-sm">Tax Credit Pipeline</h2>
          <div className="flex items-center gap-3 text-[9px] text-bureau-muted">
            {['Not applied', 'Applied', 'Pending', 'Received'].map(s => (
              <span key={s} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-bureau-border inline-block" />{s}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: '2fr 120px 100px 140px' }}>
            {['Program', 'Potential value', 'Status', ''].map((h, i) => (
              <div key={i} className="px-4 py-3 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider bg-[#f8f8f6] border-b border-bureau-border">
                {h}
              </div>
            ))}
            {CREDITS.map(({ title, amount, status, statusClass, description, cta }, i) => {
              const border = i < CREDITS.length - 1 ? 'border-b border-[#f0f0ec]' : ''
              return (
                <>
                  <div key={title} className={`px-4 py-3 ${border}`}>
                    <div className="text-xs font-medium text-navy">{title}</div>
                    <div className="text-[10px] text-bureau-muted mt-0.5">{description}</div>
                  </div>
                  <div className={`px-4 py-3 text-xs font-semibold text-navy ${border}`}>{amount}</div>
                  <div className={`px-4 py-3 ${border}`}>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusClass}`}>{status}</span>
                  </div>
                  <div className={`px-4 py-3 ${border}`}>
                    <button className="text-[9px] text-green font-medium hover:text-green-light transition-colors">{cta}</button>
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
