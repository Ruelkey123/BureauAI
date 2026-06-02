'use client'

import { useReveal } from '../hooks/useReveal'

const stats = [
  {
    stat: '8–12',
    label: 'government agencies',
    sub: 'DOH, DOB, SLA, DCWP, FDNY, and more — depending on your business type',
  },
  {
    stat: '3–18 mo',
    label: 'typical timeline range',
    sub: 'from application to opening, varies by business type and complexity',
  },
  {
    stat: '$50K+',
    label: 'in potential professional fees',
    sub: 'expeditors, attorneys, consultants — for complex cases',
  },
]

export default function ProblemSection() {
  const ref = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 data-reveal data-delay="0" className="opacity-0 translate-y-6 transition-all duration-700 ease-out font-serif text-4xl md:text-5xl text-navy mb-4">
          The complexity is real.
        </h2>
        <p data-reveal data-delay="100" className="opacity-0 translate-y-6 transition-all duration-700 ease-out text-bureau-muted text-lg max-w-2xl mx-auto mb-14">
          Running a business in NYC means navigating one of the most complex regulatory
          environments in the country. Most owners spend their savings and months of their
          lives on permits, inspections, and filings before they can focus on actually running their business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map(({ stat, label, sub }, i) => (
            <div
              key={stat}
              data-reveal
              data-delay={String((i + 1) * 100)}
              className="opacity-0 translate-y-6 transition-all duration-700 ease-out border border-bureau-border p-6 text-left hover:border-navy/30 hover:shadow-sm transition-shadow"
            >
              <div className="font-serif text-5xl text-navy mb-1">{stat}</div>
              <div className="font-medium text-navy text-sm mb-1">{label}</div>
              <div className="text-bureau-muted text-sm">{sub}</div>
            </div>
          ))}
        </div>

        <p data-reveal data-delay="400" className="opacity-0 translate-y-6 transition-all duration-700 ease-out text-navy font-medium text-lg">
          We help you understand what you're dealing with — so you can make informed decisions.
        </p>
      </div>
    </section>
  )
}
