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
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-bureau-muted">2 programs identified for your business</div>
        <div className="text-sm font-semibold text-green">$14,200 total identified</div>
      </div>

      {CREDITS.map(({ title, description, amount, sub }) => (
        <div key={title} className="bg-white border border-bureau-border rounded-lg p-5 flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="font-semibold text-navy text-sm mb-2">{title}</div>
            <div className="text-xs text-bureau-muted leading-relaxed max-w-lg">{description}</div>
          </div>
          <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
            <div>
              <div className="font-bold text-green text-xl">{amount}</div>
              <div className="text-[10px] text-bureau-muted mt-0.5">{sub}</div>
            </div>
            <button className="bg-green text-cream text-xs font-medium px-3 py-1.5 rounded hover:bg-green-light transition-colors">
              Learn more →
            </button>
          </div>
        </div>
      ))}

      <div className="bg-[#f8f8f6] border border-bureau-border rounded-lg p-4 text-center text-xs text-bureau-muted">
        BureauAI scans 40+ NYC and federal incentive programs monthly. Credits update automatically.
      </div>
    </div>
  )
}
