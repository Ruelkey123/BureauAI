const DOCS = [
  {
    title: 'DOH Permit Renewal Form',
    description: 'Pre-filled with your business info. Submit directly to DOHMH.',
    status: 'Action needed',
    statusClass: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'FDNY Inspection Checklist',
    description: 'Inspector-ready checklist for your location type and borough.',
    status: 'In progress',
    statusClass: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'DCWP License Application',
    description: 'Business license renewal, pre-filled for Manhattan.',
    status: 'Not started',
    statusClass: 'bg-gray-100 text-bureau-muted',
  },
]

export default function Documents() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {DOCS.map(({ title, description, status, statusClass }) => (
          <div key={title} className="bg-white border border-bureau-border rounded-lg p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="text-[9px] text-bureau-muted uppercase tracking-widest">Ready to use</div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusClass}`}>{status}</span>
            </div>
            <div>
              <div className="font-semibold text-navy text-sm mb-1.5">{title}</div>
              <div className="text-xs text-bureau-muted leading-relaxed">{description}</div>
            </div>
            <button className="text-[10px] text-green font-semibold text-left mt-auto">
              Download PDF →
            </button>
          </div>
        ))}
        <div className="bg-[#f8f8f6] border border-dashed border-bureau-border rounded-lg p-5 flex flex-col items-center justify-center gap-2">
          <div className="text-xs text-bureau-muted text-center">Need a different document?</div>
          <button className="text-xs text-navy font-semibold">Request a template →</button>
        </div>
      </div>
    </div>
  )
}
