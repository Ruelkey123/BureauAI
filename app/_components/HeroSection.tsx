import Link from 'next/link'
import { Arrow, Check, Health, Building, Flame, Seal, Filing } from './Icons'

/**
 * The grade plate is BureauAI's own device, not a reproduction of any agency's
 * record. The findings are illustrative of the work and labelled as such —
 * there is no customer data on this page.
 */
const FINDINGS = [
  { Icon: Health, agency: 'DOHMH', instrument: 'Food service permit', note: 'Renewal filed 30 days out' },
  { Icon: Flame, agency: 'FDNY', instrument: 'Place of assembly', note: 'Annual inspection booked' },
  { Icon: Building, agency: 'DOB', instrument: 'Certificate of occupancy', note: 'Amendment tracked in DOB NOW' },
  { Icon: Seal, agency: 'DCWP', instrument: 'Business license', note: 'Biannual renewal scheduled' },
  { Icon: Filing, agency: 'SLA', instrument: 'On-premises liquor', note: 'Renewal window monitored' },
]

/** Milled fixing at each plate corner. */
function Fixing({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-1.5 w-1.5 rounded-full bg-void ring-1 ring-hair-bright ${className}`}
    />
  )
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-sheet items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── The plate ──
            DOM order puts the plate first so it holds the first viewport on
            mobile too; it is the thesis, not an illustration of one. */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[25rem] animate-strike lg:mx-0">
            <div className="panel-hi relative shadow-lift-3">
              <Fixing className="left-2.5 top-2.5" />
              <Fixing className="right-2.5 top-2.5" />
              <Fixing className="bottom-2.5 left-2.5" />
              <Fixing className="bottom-2.5 right-2.5" />

              {/* Header band */}
              <div className="flex items-center justify-between border-b border-hair px-5 py-2.5">
                <span className="font-mono text-micro uppercase text-ink-3">
                  Compliance grade
                </span>
                <span className="font-mono text-micro uppercase text-ink-3" data-figure>
                  Rev. daily
                </span>
              </div>

              {/* Engraved letter */}
              <div className="relative px-5 py-3 text-center">
                <span
                  className="display block text-plate text-ink"
                  data-figure
                  style={{ textShadow: '0 1px 0 rgba(255,255,255,0.07), 0 -1px 0 rgba(0,0,0,0.5)' }}
                >
                  A
                </span>
              </div>

              {/* Status band — the live edge, the only signal on the plate */}
              <div className="flex items-center justify-between gap-3 border-t border-hair px-5 py-3">
                <span className="text-xs leading-snug text-ink-2">
                  All agencies current
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-signal">
                  <Check size={14} />
                  <span className="font-mono text-micro uppercase">No open violations</span>
                </span>
              </div>

              <div aria-hidden="true" className="h-px w-full bg-signal-hair" />
            </div>

            <p className="mt-3 text-center font-mono text-micro leading-relaxed text-ink-3 lg:text-left">
              Illustrative. BureauAI issues its own grade — not a government record.
            </p>
          </div>
        </div>

        {/* ── The report ── */}
        <div className="lg:col-span-7">
          <h1 className="display animate-ink-in text-balance text-lede uppercase text-ink">
            Every agency
            <br />
            in New York.
            <br />
            <span className="text-signal">One grade to keep.</span>
          </h1>

          <p className="measure mt-7 text-pretty text-md font-light leading-relaxed text-ink-2">
            A NYC business answers to eight or more agencies, each with its own
            portal, calendar and penalty. BureauAI takes the whole of it —
            permits, renewals, inspections, violations — and runs it as your
            compliance department.
          </p>

          {/* Findings — ruled rows, not cards. They settle in sequence beneath
              the struck plate: one arrival, not five separate effects. */}
          <ul className="mt-9">
            {FINDINGS.map(({ Icon, agency, instrument, note }, i) => (
              <li
                key={agency}
                className="rule-row flex animate-settle items-center gap-4 py-2.5 sm:gap-5"
                style={{ animationDelay: `${0.42 + i * 0.07}s` }}
              >
                <Icon size={16} className="shrink-0 text-ink-3" />
                <span className="w-[3.7rem] shrink-0 font-mono text-micro uppercase tracking-[0.1em] text-ink-3">
                  {agency}
                </span>
                <span className="flex-1 text-sm text-ink">{instrument}</span>
                <span className="hidden text-xs font-light text-ink-2 sm:block">
                  {note}
                </span>
                <Check size={14} className="shrink-0 text-signal" />
              </li>
            ))}
          </ul>

          {/* The machined edge */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/audit"
              className="group inline-flex items-center justify-center gap-2.5 border border-signal bg-signal px-6 py-3.5 font-mono text-2xs uppercase tracking-[0.1em] text-void transition-colors hover:bg-transparent hover:text-signal"
            >
              Run a free audit
              <Arrow size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2.5 border border-hair-bright px-6 py-3.5 font-mono text-2xs uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink hover:bg-panel"
            >
              See the department
            </Link>
          </div>

          <p className="mt-4 font-mono text-2xs uppercase tracking-[0.08em] text-ink-3">
            No account · No card · Four questions
          </p>
        </div>
      </div>
    </section>
  )
}
