'use client'

import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    n: '01',
    title: 'Tell us about your business',
    body: 'Address, business type, and where you are — opening, operating, or responding to a violation.',
  },
  {
    n: '02',
    title: 'We read the regulations',
    body: 'AI maps every requirement, deadline, and filing for your specific situation across every NYC agency.',
  },
  {
    n: '03',
    title: 'You get a living checklist',
    body: 'Organised by urgency, updated when rules change, with inspector-ready documents attached.',
  },
]

export default function HowItWorksSection() {
  const ref = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 px-6" style={{ backgroundColor: 'rgba(15,30,46,0.04)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 data-reveal data-delay="0" className="opacity-0 translate-y-6 transition-all duration-700 ease-out font-serif text-4xl md:text-5xl text-navy text-center mb-16">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map(({ n, title, body }, i) => (
            <div key={n} data-reveal data-delay={String((i + 1) * 120)} className="opacity-0 translate-y-6 transition-all duration-700 ease-out">
              <div className="font-serif text-6xl text-green mb-4">{n}</div>
              <h3 className="font-semibold text-navy mb-2">{title}</h3>
              <p className="text-bureau-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
