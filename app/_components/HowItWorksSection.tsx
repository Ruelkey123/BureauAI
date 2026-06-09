const steps = [
  { n: '01', title: 'Tell us about your business', body: 'Share your business type, borough, and current situation. That\'s all we need to get started.' },
  { n: '02', title: 'We take over your compliance', body: 'BureauAI maps every permit, license, and filing requirement for your business — then begins managing them on your behalf across all NYC agencies.' },
  { n: '03', title: 'You get a compliance team', body: 'Real-time status of everything we\'re handling — filings submitted, violations defended, renewals managed. Zero action required from you.' },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16" style={{ color: '#e8e8e0' }}>
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map(({ n, title, body }) => (
            <div key={n}>
              <div className="font-serif text-6xl mb-4" style={{ color: '#4dba80' }}>{n}</div>
              <h3 className="font-semibold mb-2" style={{ color: '#e8e8e0' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,232,224,0.45)' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
