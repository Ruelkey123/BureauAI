// app/_components/PricingTeaserSection.tsx
const features = [
  'Full compliance dashboard',
  'AI audit for your location',
  'Deadline calendar & alerts',
  'Inspector-ready document templates',
  'Violation response guidance',
  'Incentive & tax credit screening',
]

export default function PricingTeaserSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">
          Straightforward pricing
        </h2>
        <p className="text-bureau-muted text-lg mb-14">
          Compare to $50,000 in professional fees. The math is obvious.
        </p>

        <div className="border border-bureau-border p-10 mb-6">
          <div className="text-bureau-muted text-xs uppercase tracking-widest mb-3">
            Restaurant plan
          </div>
          <div className="font-serif text-6xl text-navy mb-1">$299</div>
          <div className="text-bureau-muted text-sm mb-10">per month · cancel anytime</div>

          <ul className="text-sm text-bureau-text space-y-3 text-left max-w-xs mx-auto mb-10">
            {features.map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-green shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            className="inline-block bg-navy text-cream px-8 py-3 font-medium text-sm hover:bg-navy-mid transition-colors"
          >
            Talk to us about your restaurant →
          </a>
        </div>

        <p className="text-bureau-muted text-sm">
          Multiple locations?{' '}
          <a href="#waitlist" className="text-navy underline underline-offset-2">
            Get in touch.
          </a>
        </p>
      </div>
    </section>
  )
}
