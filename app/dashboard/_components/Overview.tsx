import React from 'react'

const ACTIONS = [
  {
    title: 'DOH Permit Renewal',
    due: 'Jun 30',
    days: '18 days',
    borderColor: 'border-red-400',
    bg: 'bg-red-50',
    textColor: 'text-red-500',
  },
  {
    title: 'FDNY Inspection Prep',
    due: 'Jul 15',
    days: '33 days',
    borderColor: 'border-amber-400',
    bg: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
]

const AGENCIES = [
  { name: 'DOHMH', status: 'Compliant', badgeClass: 'bg-green/10 text-green', borderClass: 'border-bureau-border' },
  { name: 'FDNY', status: 'Action Needed', badgeClass: 'bg-amber-100 text-amber-700', borderClass: 'border-amber-200 bg-amber-50' },
  { name: 'DOB', status: 'Compliant', badgeClass: 'bg-green/10 text-green', borderClass: 'border-bureau-border' },
  { name: 'DCWP', status: 'Compliant', badgeClass: 'bg-green/10 text-green', borderClass: 'border-bureau-border' },
  { name: 'SLA', status: 'Not applicable', badgeClass: 'bg-gray-100 text-bureau-muted', borderClass: 'border-bureau-border' },
]

const DEADLINES = [
  { req: 'Food Service Permit Renewal', agency: 'DOHMH', due: 'Jun 30', status: 'Urgent', statusClass: 'bg-amber-100 text-amber-700' },
  { req: 'Annual Fire Inspection', agency: 'FDNY', due: 'Jul 15', status: 'Prep needed', statusClass: 'bg-amber-100 text-amber-700' },
  { req: 'Business License Renewal', agency: 'DCWP', due: 'Aug 1', status: 'On track', statusClass: 'bg-gray-100 text-bureau-muted' },
]

export default function Overview() {
  const score = 94
  const r = 30
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - score / 100)

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Top 3 cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Score */}
        <div className="bg-white border border-bureau-border rounded-lg p-5 flex flex-col items-center gap-3">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 72 72" className="w-20 h-20 -rotate-90">
              <circle cx="36" cy="36" r={r} fill="none" stroke="#dde0d8" strokeWidth="7" />
              <circle
                cx="36" cy="36" r={r} fill="none"
                stroke="#3a7a5c" strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-navy">
              {score}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-navy text-sm">Compliance Score</div>
            <div className="text-green text-xs mt-0.5">↑ 2 pts this month</div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="bg-[#f8f8f6] rounded p-2 text-center">
              <div className="font-bold text-amber-600 text-sm">3</div>
              <div className="text-[10px] text-bureau-muted">Due Soon</div>
            </div>
            <div className="bg-[#f8f8f6] rounded p-2 text-center">
              <div className="font-bold text-navy text-sm">0</div>
              <div className="text-[10px] text-bureau-muted">Violations</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border border-bureau-border rounded-lg p-4 flex flex-col gap-2">
          <div className="font-semibold text-navy text-sm mb-1">Action Required</div>
          {ACTIONS.map(({ title, due, days, borderColor, bg, textColor }) => (
            <div key={title} className={`border-l-[3px] ${borderColor} ${bg} px-3 py-2 rounded-r`}>
              <div className="font-semibold text-navy text-xs">{title}</div>
              <div className={`text-[10px] mt-0.5 ${textColor}`}>Due {due} · {days}</div>
            </div>
          ))}
          <div className="border-l-[3px] border-bureau-border bg-[#f9f9f7] px-3 py-2 rounded-r text-bureau-muted text-[10px]">
            + 2 more deadlines this quarter →
          </div>
        </div>

        {/* Agency status */}
        <div className="bg-white border border-bureau-border rounded-lg p-4 flex flex-col gap-1.5">
          <div className="font-semibold text-navy text-sm mb-1">NYC Agency Status</div>
          {AGENCIES.map(({ name, status, badgeClass, borderClass }) => (
            <div key={name} className={`flex justify-between items-center px-3 py-1.5 border rounded ${borderClass}`}>
              <span className="font-semibold text-navy text-[10px]">{name}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${badgeClass}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deadlines table */}
      <div className="bg-white border border-bureau-border rounded-lg overflow-hidden flex-1 min-h-0">
        <div className="px-4 py-2.5 border-b border-bureau-border flex items-center justify-between">
          <span className="font-semibold text-navy text-sm">Upcoming Deadlines</span>
          <span className="text-[10px] text-green cursor-pointer">View all →</span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '1fr 100px 80px 120px' }}>
          {['Requirement', 'Agency', 'Due', 'Status'].map(h => (
            <div key={h} className="px-4 py-2 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider border-b border-bureau-border bg-[#f8f8f6]">
              {h}
            </div>
          ))}
          {DEADLINES.map(({ req, agency, due, status, statusClass }) => (
            <React.Fragment key={req}>
              <div className="px-4 py-2.5 text-xs text-navy border-b border-[#f0f0ec]">{req}</div>
              <div className="px-4 py-2.5 text-xs text-bureau-muted border-b border-[#f0f0ec]">{agency}</div>
              <div className="px-4 py-2.5 text-xs text-amber-600 font-medium border-b border-[#f0f0ec]">{due}</div>
              <div className="px-4 py-2.5 border-b border-[#f0f0ec]">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusClass}`}>{status}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
