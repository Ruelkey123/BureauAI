// app/_components/SocialProofSection.tsx
const testimonials = [
  {
    quote:
      'I was paying $18,000 to an expeditor and still didn\'t know what was happening with my DOB permits. BureauAI showed me exactly where I was and what was next.',
    name: 'Marco R.',
    role: 'Owner, Trattoria Napoli · Jackson Heights, Queens',
  },
  {
    quote:
      'The health inspection checklist alone was worth it. We passed on the first try. Our inspector was surprised by how prepared we were.',
    name: 'Ji-Young K.',
    role: 'Owner, Seoul Bowl · Williamsburg, Brooklyn',
  },
  {
    quote:
      'I didn\'t know about the WOTC tax credit until BureauAI flagged it. That was $14,000 back in our pocket.',
    name: 'Ahmed S.',
    role: 'Owner, Sahara Grill · Astoria, Queens',
  },
]

export default function SocialProofSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'rgba(58,122,92,0.05)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-navy text-center mb-16">
          What operators are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role }) => (
            <div key={name} className="bg-cream border border-bureau-border p-6 flex flex-col justify-between">
              <p className="text-bureau-text text-sm leading-relaxed mb-6">"{quote}"</p>
              <div>
                <div className="font-semibold text-navy text-sm">{name}</div>
                <div className="text-bureau-muted text-xs mt-0.5">{role}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-bureau-muted text-xs mt-8">
          Early access customers · Results may vary
        </p>
      </div>
    </section>
  )
}
