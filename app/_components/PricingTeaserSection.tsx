const plans = [
  {
    label: 'Essentials',
    price: '$99',
    sub: 'per month · cancel anytime',
    highlight: false,
    features: [
      'Compliance monitoring across all NYC agencies',
      'Deadline management & alerts',
      'Violation detection & guidance',
      '1 business location',
    ],
    cta: 'Get started',
    href: '#waitlist',
  },
  {
    label: 'Full-Service',
    price: '$299',
    sub: 'per month · cancel anytime',
    highlight: true,
    features: [
      'Everything in Essentials',
      'Permit filing & license renewals — we handle it',
      'Violation response & agency communication',
      'Inspector-ready documents prepared for you',
      '1 business location',
    ],
    cta: 'Get started',
    href: '#waitlist',
  },
  {
    label: 'Enterprise',
    price: '$599+',
    sub: 'per month · contact us',
    highlight: false,
    features: [
      'Everything in Full-Service',
      'Multiple locations',
      'Complex case & violation history handling',
      'Dedicated compliance agent',
    ],
    cta: 'Contact us',
    href: '#waitlist',
  },
]

export default function PricingTeaserSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4" style={{ color: '#e8e8e0' }}>
          Replace your compliance consultant
        </h2>
        <p className="text-lg mb-14 text-center max-w-xl mx-auto" style={{ color: 'rgba(232,232,224,0.45)' }}>
          A fraction of what professional services cost — with no surprises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map(({ label, price, sub, highlight, features, cta, href }) => (
            <div
              key={label}
              className="flex flex-col p-8"
              style={highlight
                ? { background: '#4dba80', border: '1px solid #4dba80' }
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }
              }
            >
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: highlight ? 'rgba(6,9,14,0.6)' : 'rgba(232,232,224,0.4)' }}>
                {label}
              </div>
              <div className="font-serif text-5xl mb-1" style={{ color: highlight ? '#06090e' : '#e8e8e0' }}>
                {price}
              </div>
              <div className="text-sm mb-8" style={{ color: highlight ? 'rgba(6,9,14,0.55)' : 'rgba(232,232,224,0.45)' }}>
                {sub}
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {features.map(item => (
                  <li key={item} className="text-sm flex items-start gap-2" style={{ color: highlight ? 'rgba(6,9,14,0.8)' : 'rgba(232,232,224,0.7)' }}>
                    <span className="shrink-0 mt-0.5" style={{ color: highlight ? '#06090e' : '#4dba80' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={href}
                className="text-center px-6 py-3 font-medium text-sm transition-all"
                style={highlight
                  ? { background: '#06090e', color: '#4dba80' }
                  : { border: '1px solid rgba(255,255,255,0.15)', color: '#e8e8e0' }
                }
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm" style={{ color: 'rgba(232,232,224,0.4)' }}>
          Multiple locations or a larger operation?{' '}
          <a href="#waitlist" style={{ color: '#4dba80' }}>
            Get in touch.
          </a>
        </p>
      </div>
    </section>
  )
}
