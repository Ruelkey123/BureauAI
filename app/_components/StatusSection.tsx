const STATUS = [
  {
    state: 'Live',
    tone: 'signal' as const,
    note: 'Working on this site today',
    items: [
      'The compliance audit, running on Gemini',
      'Obligation mapping across DOHMH, DOB, FDNY, DCWP, SLA',
      'The department demo — deadlines, filings, incentives, rights',
      'Published fee and cadence data for every instrument we cover',
    ],
  },
  {
    state: 'In build',
    tone: 'warn' as const,
    note: 'Being built now',
    items: [
      'Continuous monitoring against agency records',
      'Renewal calendar with owner alerts',
      'Violation intake and response drafting',
      'Document vault for filed instruments',
    ],
  },
  {
    state: 'Not yet',
    tone: 'muted' as const,
    note: 'Honest about what does not exist',
    items: [
      'Direct filing integrations with NYC agencies',
      'Accounts, authentication and billing',
      'Email and SMS notifications',
      'Any paying customer',
    ],
  },
]

const TONE = {
  signal: { text: 'text-signal', rule: 'bg-signal-hair', dot: 'bg-signal' },
  warn: { text: 'text-warn', rule: 'bg-warn-hair', dot: 'bg-warn' },
  muted: { text: 'text-ink-3', rule: 'bg-hair-bright', dot: 'bg-ink-3' },
}

export default function StatusSection() {
  return (
    <section className="border-t border-hair bg-panel/40 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-sheet">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-balance text-head uppercase text-ink lg:col-span-7">
            Where the build
            <br />
            actually stands.
          </h2>
          <p className="measure text-base font-light leading-relaxed text-ink-2 lg:col-span-5">
            BureauAI is pre-revenue and pre-integration. We would rather show you
            the real line between what runs today and what does not than let a
            marketing page blur it.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-hair lg:grid-cols-3">
          {STATUS.map(({ state, tone, note, items }) => {
            const t = TONE[tone]
            return (
              <div key={state} className="bg-void p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                  <span className={`font-mono text-micro uppercase ${t.text}`}>{state}</span>
                  <span className={`h-px flex-1 ${t.rule}`} />
                </div>
                <p className="mt-4 font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
                  {note}
                </p>

                <ul className="mt-5">
                  {items.map(item => (
                    <li
                      key={item}
                      className="rule-row py-3 text-sm font-light leading-snug text-ink-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
