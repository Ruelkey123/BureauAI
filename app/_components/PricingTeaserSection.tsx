import { Check } from './Icons'

const PLANS = [
  {
    label: 'Essentials',
    price: '$99',
    per: 'per month',
    who: 'Single location, low complexity',
    lead: false,
    features: [
      'Monitoring across every agency you answer to',
      'Renewal calendar with deadline alerts',
      'Violation detection and guidance',
      'One business location',
    ],
  },
  {
    label: 'Full-Service',
    price: '$299',
    per: 'per month',
    who: 'Restaurants and retail with active filings',
    lead: true,
    features: [
      'Everything in Essentials',
      'Permit filing and licence renewals, handled by us',
      'Violation response and agency correspondence',
      'Inspector-ready documents prepared for you',
      'One business location',
    ],
  },
  {
    label: 'Enterprise',
    price: '$599+',
    per: 'per month',
    who: 'Multi-location and complex histories',
    lead: false,
    features: [
      'Everything in Full-Service',
      'Multiple locations under one department',
      'Complex case and violation history handling',
      'A named compliance agent',
    ],
  },
]

export default function PricingTeaserSection() {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-hair px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-sheet">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-balance text-head uppercase text-ink lg:col-span-7">
            Planned pricing.
            <br />
            Not yet open.
          </h2>
          <p className="measure text-base font-light leading-relaxed text-ink-2 lg:col-span-5">
            These tiers model what a NYC business already pays consultants to do
            the same work. Nothing is for sale today — early access opens to the
            waitlist first, and these numbers may move before it does.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-hair lg:grid-cols-3">
          {PLANS.map(({ label, price, per, who, lead, features }) => (
            <div
              key={label}
              className={`flex flex-col p-6 sm:p-8 ${lead ? 'bg-panel-hi' : 'bg-void'}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={`font-mono text-micro uppercase ${lead ? 'text-signal' : 'text-ink-3'}`}
                >
                  {label}
                </span>
                {lead && (
                  <span className="tag border-signal text-signal">Most relevant</span>
                )}
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="display text-figure text-ink" data-figure>
                  {price}
                </span>
                <span className="font-mono text-2xs uppercase tracking-[0.08em] text-ink-3">
                  {per}
                </span>
              </div>
              <p className="mt-2 text-xs font-light leading-snug text-ink-2">{who}</p>

              <ul className="mt-7 flex-1 space-y-3.5">
                {features.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={14}
                      className={`mt-1 shrink-0 ${lead ? 'text-signal' : 'text-ink-3'}`}
                    />
                    <span className="text-sm font-light leading-snug text-ink-2">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`mt-8 inline-flex items-center justify-center border px-5 py-3 font-mono text-2xs uppercase tracking-[0.1em] transition-colors ${
                  lead
                    ? 'border-signal bg-signal text-void hover:bg-transparent hover:text-signal'
                    : 'border-hair-bright text-ink hover:border-ink hover:bg-panel'
                }`}
              >
                Join the waitlist
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-2xs uppercase tracking-[0.08em] text-ink-3">
          Multiple locations or a larger operation?{' '}
          <a href="#waitlist" className="text-signal underline">
            Tell us on the form
          </a>
        </p>
      </div>
    </section>
  )
}
