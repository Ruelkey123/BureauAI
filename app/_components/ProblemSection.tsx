import { Fragment } from 'react'

const LEDGER = [
  { role: 'Permit expeditor', scope: 'DOB filings, plan examination follow-up', cost: '$2,000 – 8,000', unit: 'per job' },
  { role: 'Compliance attorney', scope: 'Violation defence, OATH hearings', cost: '$350 – 650', unit: 'per hour' },
  { role: 'Liquor licence consultant', scope: 'SLA application, community board', cost: '$5,000 – 15,000', unit: 'one-off' },
  { role: 'Architect / engineer', scope: 'Drawings and filings for a build-out', cost: '$3,500 – 12,000', unit: 'per job' },
  { role: 'Ongoing consultant retainer', scope: 'Renewals, calendar, correspondence', cost: '$1,500 – 4,000', unit: 'per month' },
]

const SCALE = [
  { figure: '8–12', label: 'agencies a single storefront answers to' },
  { figure: '3–18', label: 'months from application to opening' },
  { figure: '$50K+', label: 'professional fees on a complex opening' },
]

export default function ProblemSection() {
  return (
    <section className="border-t border-hair bg-panel/40 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-sheet">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: the argument */}
          <div className="lg:col-span-5">
            <h2 className="display text-balance text-head uppercase text-ink">
              You are not buying software.
              <br />
              You are replacing an invoice.
            </h2>
            <p className="measure mt-6 text-base font-light leading-relaxed text-ink-2">
              Nobody sells NYC compliance as a product today, because it isn't
              one — it's a stack of people you hire, brief and chase. That is the
              spend BureauAI is built to absorb.
            </p>

            {/* One grid across all rows, not a grid per row: max-content
                resolved per row leaves the labels on a ragged left edge. The
                figure column is sized to its widest token ($50K+) and never
                wraps — a fixed cell narrower than the type collides. */}
            <dl className="mt-12 grid grid-cols-[minmax(6rem,max-content)_1fr] items-baseline gap-x-6 gap-y-7 sm:gap-x-8">
              {SCALE.map(({ figure, label }) => (
                <Fragment key={figure}>
                  <dt
                    className="display whitespace-nowrap text-figure text-signal"
                    data-figure
                  >
                    {figure}
                  </dt>
                  <dd className="text-sm font-light leading-snug text-ink-2">{label}</dd>
                </Fragment>
              ))}
            </dl>
          </div>

          {/* Right: the ledger */}
          <div className="lg:col-span-7">
            <div className="panel shadow-lift-2">
              <div className="flex items-baseline justify-between gap-4 border-b border-hair px-5 py-3.5 sm:px-6">
                <h3 className="display text-lg uppercase text-ink">
                  What it costs the ordinary way
                </h3>
                <span className="shrink-0 font-mono text-micro uppercase text-ink-3">
                  Typical NYC rates
                </span>
              </div>

              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Typical professional service costs for NYC business compliance
                </caption>
                <tbody>
                  {LEDGER.map(({ role, scope, cost, unit }) => (
                    <tr key={role} className="border-b border-hair">
                      <th scope="row" className="px-5 py-3.5 text-left font-normal sm:px-6">
                        <span className="block font-sans text-sm text-ink">{role}</span>
                        <span className="mt-1 block font-sans text-xs font-light leading-snug text-ink-3">
                          {scope}
                        </span>
                      </th>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right align-top sm:px-6">
                        <span className="block text-sm text-ink">{cost}</span>
                        <span className="mt-1 block font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
                          {unit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-baseline justify-between gap-4 border-b border-hair px-5 py-4 sm:px-6">
                <span className="font-mono text-micro uppercase text-ink-3">
                  Complex opening, first year
                </span>
                <span className="display text-xl text-flag" data-figure>
                  $50,000+
                </span>
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-2 bg-signal-wash px-5 py-4 sm:px-6">
                <span className="font-mono text-micro uppercase text-signal">
                  BureauAI, planned retainer
                </span>
                <span className="display text-xl text-signal" data-figure>
                  from $99 / month
                </span>
              </div>
            </div>

            <p className="mt-3 font-mono text-micro leading-relaxed text-ink-3">
              Ranges are typical market rates for NYC professional services — not
              quotes, and not BureauAI results. Our pricing is not yet open.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
