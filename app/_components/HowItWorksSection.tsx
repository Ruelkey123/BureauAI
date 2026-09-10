const STAGES = [
  {
    when: 'Day one',
    title: 'You describe the business once',
    body: 'Type, borough, stage, and whatever is currently on fire. Four questions, no account, no document upload.',
    you: 'Ten minutes',
  },
  {
    when: 'Week one',
    title: 'We map every obligation you have',
    body: 'Which agencies you answer to, which instruments you hold, what has lapsed, what is due, and what a past violation is still costing you.',
    you: 'Nothing',
  },
  {
    when: 'Ongoing',
    title: 'We hold the calendar and file the work',
    body: 'Renewals go in before the window closes. Inspections get prepared for. Notices get answered. You hear from us when a decision is genuinely yours to make.',
    you: 'Nothing',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="border-t border-hair px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-sheet">
        <h2 className="display max-w-3xl text-balance text-head uppercase text-ink">
          What the engagement actually looks like.
        </h2>

        <ol className="mt-12 grid gap-px bg-hair sm:grid-cols-3">
          {STAGES.map(({ when, title, body, you }) => (
            <li key={when} className="flex flex-col bg-void p-6 sm:p-7">
              {/* No label above the heading — the heading carries itself. The
                  stage and the effort read together as data underneath it. */}
              <span aria-hidden="true" className="h-px w-full bg-signal-hair" />

              <h3 className="display mt-6 text-lg uppercase leading-tight text-ink">
                {title}
              </h3>
              <p className="mt-3.5 flex-1 text-sm font-light leading-relaxed text-ink-2">
                {body}
              </p>

              <dl className="mt-7 border-t border-hair pt-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                    When
                  </dt>
                  <dd className="font-mono text-xs text-signal">{when}</dd>
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                    Your effort
                  </dt>
                  <dd className="font-mono text-xs text-ink">{you}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
