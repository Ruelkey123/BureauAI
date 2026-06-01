import Link from 'next/link'

const HISTORY = [
  { date: 'May 31, 2026', score: 94, summary: '2 urgent actions identified. DOH renewal flagged.' },
  { date: 'Apr 30, 2026', score: 91, summary: 'FDNY inspection prep added. Score improved +3.' },
  { date: 'Mar 31, 2026', score: 88, summary: 'DCWP license renewal flagged. 3 actions resolved.' },
]

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

      <div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-bureau-border flex items-center justify-between">
          <span className="font-semibold text-navy text-sm">Previous Audits</span>
          <span className="text-[9px] text-bureau-muted">Last 3 months</span>
        </div>
        {HISTORY.map(({ date, score, summary }, i) => (
          <div key={date} className={`px-5 py-3 flex items-center gap-4 ${i < HISTORY.length - 1 ? 'border-b border-[#f0f0ec]' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-[#f8f8f6] border border-bureau-border flex items-center justify-center font-bold text-xs text-navy flex-shrink-0">
              {score}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-navy">{date}</div>
              <div className="text-[10px] text-bureau-muted mt-0.5 truncate">{summary}</div>
            </div>
            <button className="text-[9px] text-bureau-muted hover:text-navy transition-colors flex-shrink-0">View →</button>
          </div>
        ))}
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
