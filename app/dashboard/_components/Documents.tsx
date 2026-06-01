const DOCS = [
  {
    title: 'DOH Permit Renewal Form',
    description: 'Pre-filled with your business info. Submit directly to DOHMH.',
  },
  {
    title: 'FDNY Inspection Checklist',
    description: 'Inspector-ready checklist for your location type and borough.',
  },
  {
    title: 'DCWP License Application',
    description: 'Business license renewal, pre-filled for Manhattan.',
  },
]

export default function Documents() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {DOCS.map(({ title, description }) => (
          <div key={title} className="bg-white border border-bureau-border rounded-lg p-5 flex flex-col gap-3">
            <div>
              <div className="text-[9px] text-bureau-muted uppercase tracking-widest mb-2">Ready to use</div>
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
