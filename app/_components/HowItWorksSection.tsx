const steps = [
  { n: '01', title: 'Tell us about your business', body: 'Address, business type, and where you are — opening, operating, or responding to a violation.' },
  { n: '02', title: 'We read the regulations', body: 'AI maps every requirement, deadline, and filing for your specific situation across every NYC agency.' },
  { n: '03', title: 'You get a living checklist', body: 'Organised by urgency, updated when rules change, with inspector-ready documents attached.' },
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
