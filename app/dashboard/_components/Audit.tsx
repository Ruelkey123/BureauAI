import Link from 'next/link'

const ACTIONS = [
  {
    n: '1',
    color: 'bg-red-500',
    text: 'Renew your DOHMH food service permit before Jun 30. File online at the DOHMH eFoodservice portal. Processing takes 2–3 weeks — start now.',
  },
  {
    n: '2',
    color: 'bg-amber-500',
    text: 'Schedule your FDNY annual inspection. Contact FDNY Bureau of Fire Prevention to book — inspectors are typically booked 3–4 weeks out.',
  },
]

export default function Audit() {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="bg-navy rounded-lg p-5">
        <div className="text-[9px] text-white/50 uppercase tracking-widest mb-4">
          Immediate Actions · Next 30 days
        </div>
        <div className="flex flex-col gap-3">
          {ACTIONS.map(({ n, color, text }) => (
            <div key={n} className="flex gap-3 items-start">
              <div className={`w-5 h-5 ${color} rounded flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5`}>
                {n}
              </div>
              <p className="text-white/80 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-bureau-border rounded-lg p-5">
        <div className="text-[9px] text-bureau-muted uppercase tracking-widest mb-3">Upcoming Deadlines</div>
        <p className="text-xs text-bureau-text leading-relaxed">
          DOHMH permit renewal annually · FDNY inspection annually · DCWP business license every 2 years · DOB CO review every 5 years
        </p>
      </div>

      <div className="bg-white border border-bureau-border rounded-lg p-5">
        <div className="text-[9px] text-bureau-muted uppercase tracking-widest mb-3">What This Costs Without BureauAI</div>
        <p className="text-xs text-bureau-text leading-relaxed">
          Expeditor: $3,000–$8,000 · Attorney (violations): $5,000–$15,000 · Compliance consultant: $2,000–$5,000/year.{' '}
          <span className="text-green font-semibold">BureauAI: $149/month.</span>
        </p>
      </div>

      <div className="bg-[#f8f8f6] border border-bureau-border rounded-lg p-4 flex items-center justify-between">
        <div className="text-xs text-bureau-muted">Last run: today, 9:14am · Run a fresh audit with updated info</div>
        <Link
          href="/audit"
          className="bg-navy text-cream text-xs font-medium px-4 py-2 rounded hover:bg-navy-mid transition-colors"
        >
          Run new audit →
        </Link>
      </div>
    </div>
  )
}
