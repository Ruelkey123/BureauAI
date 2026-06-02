const stats = [
  { stat: '8–12', label: 'government agencies', sub: 'DOH, DOB, SLA, DCWP, FDNY, and more' },
  { stat: '3–18 mo', label: 'typical timeline range', sub: 'from application to opening, varies by business type' },
  { stat: '$50K+', label: 'in potential professional fees', sub: 'expeditors, attorneys, consultants — for complex cases' },
]

export default function ProblemSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: '#e8e8e0' }}>
          The complexity is real.
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-14 leading-relaxed" style={{ color: 'rgba(232,232,224,0.45)' }}>
          Running a business in NYC means navigating one of the most complex regulatory environments in the country.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map(({ stat, label, sub }) => (
            <div key={stat} className="glass glass-hover p-6 text-left transition-all duration-300">
              <div className="font-serif text-5xl mb-1 gradient-text">{stat}</div>
              <div className="font-medium text-sm mb-1" style={{ color: '#e8e8e0' }}>{label}</div>
              <div className="text-sm" style={{ color: 'rgba(232,232,224,0.4)' }}>{sub}</div>
            </div>
          ))}
        </div>
        <p className="font-medium text-lg" style={{ color: 'rgba(232,232,224,0.6)' }}>
          We help you understand what you're dealing with — so you can make informed decisions.
        </p>
      </div>
    </section>
  )
}
