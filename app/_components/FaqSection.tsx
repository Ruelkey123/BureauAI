import { Plus } from './Icons'

const FAQS = [
  {
    q: 'Can BureauAI actually file with the city on my behalf today?',
    a: 'Not yet, and we will not pretend otherwise. Direct filing integrations with NYC agencies are not built. What runs today is the audit, the obligation mapping and the department demo. Filing is the next thing we build, and early access customers get it first.',
  },
  {
    q: 'Is BureauAI a law firm?',
    a: 'No. We are not attorneys and nothing here is legal advice. For matters that genuinely need counsel — a contested OATH hearing, a licence revocation — we tell you so and help you arrive prepared rather than billing you to sit in the room.',
  },
  {
    q: 'How is this different from hiring an expeditor?',
    a: 'An expeditor is engaged per job and disappears between them, which is why lapses happen in the gaps. BureauAI is continuous: it holds the whole calendar across every agency at once, for a monthly retainer rather than a per-filing fee.',
  },
  {
    q: 'I already have an open violation. Is it too late?',
    a: 'No. Open violations are the most common reason owners come to us. The audit reads what you are facing, what the correction path is, and what it is likely to cost — including whether a hearing is worth contesting.',
  },
  {
    q: 'Which businesses is this built for?',
    a: 'Small NYC businesses with a physical location across all five boroughs — restaurants, bars, cafés, food trucks and retail. Those carry the densest permit load. If you are outside that set, run the audit anyway and tell us what it missed.',
  },
  {
    q: 'What do you need from me?',
    a: 'To run the audit: business type, borough, stage and your current situation. That is all. No account, no card, no documents. Anything beyond that we ask for only when a specific filing requires it.',
  },
  {
    q: 'When does it open, and what does it cost?',
    a: 'Early access opens to the waitlist first. Planned pricing runs from $99 to $599+ per month depending on how much of the work you hand over — see the tiers above. Those numbers may move before launch.',
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-hair px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-sheet">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="display text-balance text-head uppercase text-ink">
              Straight answers.
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed text-ink-2">
              Including the ones that are not flattering. If something you need
              to know is missing, ask on the form below and we will answer it
              here.
            </p>
          </div>

          <div className="lg:col-span-8">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group border-t border-hair last:border-b">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-base text-ink transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus
                    size={16}
                    className="mt-1 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="measure pb-6 pr-10 text-sm font-light leading-relaxed text-ink-2">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
