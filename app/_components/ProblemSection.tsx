// app/_components/ProblemSection.tsx
const stats = [
  {
    stat: '8–12',
    label: 'government agencies',
    sub: 'DOH, DOB, SLA, DCWP, FDNY, and more',
  },
  {
    stat: '3–18 mo',
    label: 'average timeline',
    sub: 'from lease signing to first service',
  },
  {
    stat: '$50K+',
    label: 'in professional fees',
    sub: 'expeditors, attorneys, consultants',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">
          8 agencies. 18 months. $50,000.
        </h2>
        <p className="text-bureau-muted text-lg max-w-2xl mx-auto mb-14">
          Opening a restaurant in NYC means navigating one of the most complex regulatory
          environments in the country. Most owners spend their savings and months of their
          lives on permits before serving a single meal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map(({ stat, label, sub }) => (
            <div key={stat} className="border border-bureau-border p-6 text-left">
              <div className="font-serif text-5xl text-navy mb-1">{stat}</div>
              <div className="font-medium text-navy text-sm mb-1">{label}</div>
              <div className="text-bureau-muted text-sm">{sub}</div>
            </div>
          ))}
        </div>

        <p className="text-navy font-medium text-lg">
          We replace the expeditors, the lawyers, and the spreadsheets.
        </p>
      </div>
    </section>
  )
}
