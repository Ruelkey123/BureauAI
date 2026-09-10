import Link from 'next/link'
import { Mark } from './Icons'

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { href: '/audit', label: 'Compliance audit' },
      { href: '/dashboard', label: 'Department demo' },
      { href: '/#handled', label: 'What we cover' },
      { href: '/#pricing', label: 'Pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/#faq', label: 'Questions' },
      { href: '/#waitlist', label: 'Request access' },
      { href: 'mailto:hello@bureauai.com', label: 'hello@bureauai.com' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-hair px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-sheet">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5" aria-label="BureauAI home">
              <Mark size={24} className="text-ink" />
              <span className="display text-md uppercase text-ink">
                Bureau<span className="text-signal">AI</span>
              </span>
            </Link>
            <p className="measure mt-5 text-sm font-light leading-relaxed text-ink-2">
              The compliance department for New York City businesses. Pre-revenue
              and pre-integration — see exactly where the build stands above.
            </p>
          </div>

          {COLUMNS.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading} className="lg:col-span-2">
              <h2 className="font-mono text-micro uppercase text-ink-3">{heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm font-light text-ink-2 transition-colors hover:text-signal"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-hair pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
            © {new Date().getFullYear()} BureauAI
          </p>
          <p className="font-mono text-micro leading-relaxed text-ink-3">
            Not a law firm. Nothing here is legal advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
