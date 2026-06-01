const plans = [
  {
    label: 'Beta Access',
    price: 'Free',
    sub: 'limited spots · no credit card',
    highlight: true,
    features: [
      'Full AI compliance audit',
      'Personalized to your business & borough',
      'Early access to the full dashboard',
      'Direct feedback line to the BureauAI team',
    ],
    cta: 'Apply for beta access',
    href: '#waitlist',
  },
  {
    label: 'Solo Operator',
    price: '$149',
    sub: 'per month · cancel anytime',
    highlight: false,
    features: [
      'AI compliance audit',
      'Deadline calendar & alerts',
      'Inspector-ready document templates',
      'Violation response guidance',
      '1 business location',
    ],
    cta: 'Join the waitlist',
    href: '#waitlist',
  },
  {
    label: 'Business',
    price: '$299',
    sub: 'per month · cancel anytime',
    highlight: false,
    features: [
      'Everything in Solo Operator',
      'Up to 3 business locations',
      'Incentive & tax credit screening',
      'Priority support',
    ],
    cta: 'Join the waitlist',
    href: '#waitlist',
  },
]

export default function PricingTeaserSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-navy text-center mb-4">
          Straightforward pricing
        </h2>
        <p className="text-bureau-muted text-lg mb-14 text-center max-w-xl mx-auto">
          A fraction of what professional services cost — with no surprises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map(({ label, price, sub, highlight, features, cta, href }) => (
            <div
              key={label}
              className={`border p-8 flex flex-col ${
                highlight
                  ? 'border-navy bg-navy text-cream'
                  : 'border-bureau-border'
              }`}
            >
              <div className={`text-xs uppercase tracking-widest mb-4 ${highlight ? 'text-cream/60' : 'text-bureau-muted'}`}>
                {label}
              </div>
              <div className={`font-serif text-5xl mb-1 ${highlight ? 'text-cream' : 'text-navy'}`}>
                {price}
              </div>
              <div className={`text-sm mb-8 ${highlight ? 'text-cream/60' : 'text-bureau-muted'}`}>
                {sub}
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {features.map(item => (
                  <li key={item} className={`text-sm flex items-start gap-2 ${highlight ? 'text-cream/80' : 'text-bureau-text'}`}>
                    <span className={`shrink-0 mt-0.5 ${highlight ? 'text-green-light' : 'text-green'}`}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={href}
                className={`text-center px-6 py-3 font-medium text-sm transition-colors ${
                  highlight
                    ? 'bg-green text-cream hover:bg-green-light'
                    : 'border border-navy text-navy hover:bg-navy/5'
                }`}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-bureau-muted text-sm">
          Multiple locations or a larger operation?{' '}
          <a href="#waitlist" className="text-navy underline underline-offset-2">
            Get in touch.
          </a>
        </p>
      </div>
    </section>
  )
}
