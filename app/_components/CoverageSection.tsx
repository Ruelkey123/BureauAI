// app/_components/CoverageSection.tsx
const areas = [
  {
    title: 'Health & Safety',
    items: [
      'DOH food service permit',
      'Food protection certificate',
      'Health inspection preparation',
      'Violation response & correction',
      'Allergen labeling compliance',
    ],
  },
  {
    title: 'Building & Fire',
    items: [
      'DOB permits & CO amendments',
      'FDNY place of assembly permit',
      'Fire suppression certificate',
      'DOB NOW navigation',
      'Work Without Permit resolution',
    ],
  },
  {
    title: 'Business Licensing',
    items: [
      'DCWP business license',
      'SLA liquor license guidance',
      'Sidewalk café permit',
      'M/WBE certification',
      'Annual license renewals',
    ],
  },
]

export default function CoverageSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-navy text-center mb-4">
          What BureauAI covers
        </h2>
        <p className="text-bureau-muted text-center mb-16 max-w-xl mx-auto text-lg">
          Everything a NYC restaurant needs to open, operate, and stay compliant — in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map(({ title, items }) => (
            <div key={title} className="border border-bureau-border p-8">
              <h3 className="font-semibold text-navy mb-5">{title}</h3>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item} className="text-bureau-muted text-sm flex items-start gap-2">
                    <span className="text-green mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
