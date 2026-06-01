import React from 'react'

const ROWS = [
  { req: 'Food Service Permit Renewal', agency: 'DOHMH', due: 'Jun 30', days: 18, status: 'Urgent', statusClass: 'bg-amber-100 text-amber-700' },
  { req: 'Annual Fire Inspection', agency: 'FDNY', due: 'Jul 15', days: 33, status: 'Prep needed', statusClass: 'bg-amber-100 text-amber-700' },
  { req: 'Business License Renewal', agency: 'DCWP', due: 'Aug 1', days: 50, status: 'On track', statusClass: 'bg-gray-100 text-bureau-muted' },
  { req: 'DOB Certificate of Occupancy Review', agency: 'DOB', due: 'Aug 20', days: 69, status: 'Compliant', statusClass: 'bg-green/10 text-green' },
  { req: 'Sidewalk Café Permit Renewal', agency: 'DCWP', due: 'Sep 1', days: 82, status: 'Compliant', statusClass: 'bg-green/10 text-green' },
]

export default function Deadlines() {
  return (
    <div className="p-4">
      <div className="bg-white border border-bureau-border rounded-lg overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '2fr 100px 90px 80px 110px' }}>
          {['Requirement', 'Agency', 'Due Date', 'Days Left', 'Status'].map(h => (
            <div key={h} className="px-4 py-3 text-[9px] font-semibold text-bureau-muted uppercase tracking-wider bg-[#f8f8f6] border-b border-bureau-border">
              {h}
            </div>
          ))}
          {ROWS.map(({ req, agency, due, days, status, statusClass }, i) => {
            const border = i < ROWS.length - 1 ? 'border-b border-[#f0f0ec]' : ''
            const dueColor = days <= 33 ? 'text-amber-600 font-medium' : 'text-bureau-muted'
            return (
              <React.Fragment key={req}>
                <div className={`px-4 py-3 text-xs text-navy font-medium ${border}`}>{req}</div>
                <div className={`px-4 py-3 text-xs text-bureau-muted ${border}`}>{agency}</div>
                <div className={`px-4 py-3 text-xs ${dueColor} ${border}`}>{due}</div>
                <div className={`px-4 py-3 text-xs ${dueColor} ${border}`}>{days}d</div>
                <div className={`px-4 py-3 ${border}`}>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusClass}`}>{status}</span>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
