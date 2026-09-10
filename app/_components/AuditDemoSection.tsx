import Link from 'next/link'
import { Arrow, Clock, Flag, Filing } from './Icons'

const INPUTS = [
  { label: 'Business type', value: 'Restaurant' },
  { label: 'Borough', value: 'Brooklyn' },
  { label: 'Stage', value: 'Opening a new business' },
  { label: 'Situation', value: 'Getting ready for inspection' },
]

const IMMEDIATE = [
  {
    Icon: Flag,
    agency: 'DOHMH',
    title: 'Food service establishment permit',
    body: 'File at the eFoodservice portal now — processing runs 3–4 weeks and you cannot legally operate without it.',
  },
  {
    Icon: Clock,
    agency: 'FDNY',
    title: 'Place of assembly or fire inspection',
    body: 'Required above 74 occupants. Brooklyn inspectors are booking 2–3 weeks out.',
  },
  {
    Icon: Filing,
    agency: 'DCWP',
    title: 'Business license',
    body: 'Runs concurrently with the DOHMH application. Two to six weeks.',
  },
]

export default function AuditDemoSection() {
  return (
    <section id="audit" className="scroll-mt-20 border-t border-hair px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-sheet">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-balance text-head uppercase text-ink lg:col-span-7">
            Don't take our word for it.
            <br />
            Make it do the work.
          </h2>
          <p className="measure text-base font-light leading-relaxed text-ink-2 lg:col-span-5">
            The audit is live on this site right now. Four questions in, a
            specific reading of your obligations out — agency by agency, with
            timings and fees. This is a real run, shown in full.
          </p>
        </div>

        {/* The instrument */}
        <div className="panel mt-12 shadow-lift-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair px-5 py-3 sm:px-6">
            <span className="font-mono text-micro uppercase text-ink-3">
              Compliance audit · sample run
            </span>
            <span className="flex items-center gap-2 font-mono text-micro uppercase text-signal">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
              Complete
            </span>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Inputs */}
            <div className="border-b border-hair p-5 sm:p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              <h3 className="font-mono text-micro uppercase text-ink-3">What it was told</h3>
              <dl className="mt-5">
                {INPUTS.map(({ label, value }) => (
                  <div key={label} className="rule-row py-3">
                    <dt className="font-mono text-micro uppercase tracking-[0.1em] text-ink-3">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs font-light leading-relaxed text-ink-3">
                No name, no address, no documents. The audit works from these
                four answers alone.
              </p>
            </div>

            {/* Output */}
            <div className="p-5 sm:p-6 lg:col-span-8">
              <h3 className="font-mono text-micro uppercase text-ink-3">
                What came back — immediate actions, next 30 days
              </h3>

              <ol className="mt-5 space-y-px">
                {IMMEDIATE.map(({ Icon, agency, title, body }, i) => (
                  <li key={title} className="flex gap-4 border-t border-hair py-4">
                    <span className="flex w-6 shrink-0 justify-center pt-0.5">
                      <Icon size={17} className="text-signal" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-micro uppercase tracking-[0.1em] text-ink-3">
                          {String(i + 1).padStart(2, '0')} · {agency}
                        </span>
                        <h4 className="text-base text-ink">{title}</h4>
                      </div>
                      <p className="mt-1.5 text-sm font-light leading-relaxed text-ink-2">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hair pt-4 font-mono text-2xs uppercase tracking-[0.08em] text-ink-3">
                <span>+ 4 tracked deadlines</span>
                <span>+ first-year fee estimate</span>
                <span>+ expeditor cost if unhandled</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hair px-5 py-4 sm:px-6">
            <p className="font-mono text-micro leading-relaxed text-ink-3">
              Sample run against a synthetic business. Yours will differ.
            </p>
            <Link
              href="/audit"
              className="group inline-flex items-center gap-2.5 border border-signal bg-signal px-5 py-3 font-mono text-2xs uppercase tracking-[0.1em] text-void transition-colors hover:bg-transparent hover:text-signal"
            >
              Run it on your business
              <Arrow size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
