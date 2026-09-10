import { Check } from './Icons'

type Line = {
  instrument: string
  agency: string
  cadence: string
  fee: string
}

const SCHEDULE: { group: string; lines: Line[] }[] = [
  {
    group: 'Health & safety',
    lines: [
      { instrument: 'Food service establishment permit', agency: 'DOHMH', cadence: 'Annual', fee: '$280' },
      { instrument: 'Food protection certificate', agency: 'DOHMH', cadence: 'Per supervisor', fee: '$114' },
      { instrument: 'Inspection preparation & grade defence', agency: 'DOHMH', cadence: 'Ongoing', fee: '—' },
      { instrument: 'Violation response & correction filing', agency: 'DOHMH', cadence: 'On notice', fee: 'Varies' },
    ],
  },
  {
    group: 'Building & fire',
    lines: [
      { instrument: 'Certificate of occupancy amendment', agency: 'DOB', cadence: 'On change of use', fee: '$200–2,000' },
      { instrument: 'Permit filing through DOB NOW', agency: 'DOB', cadence: 'Per job', fee: 'Varies' },
      { instrument: 'Place of assembly permit', agency: 'FDNY', cadence: 'Annual', fee: '$150' },
      { instrument: 'Fire suppression certificate', agency: 'FDNY', cadence: 'Annual', fee: '$105' },
      { instrument: 'Work-without-permit resolution', agency: 'DOB', cadence: 'On violation', fee: 'Varies' },
    ],
  },
  {
    group: 'Licensing',
    lines: [
      { instrument: 'Business license', agency: 'DCWP', cadence: 'Biannual', fee: '$110' },
      { instrument: 'On-premises liquor licence', agency: 'SLA', cadence: 'Biannual', fee: '$4,352' },
      { instrument: 'Sidewalk café permit', agency: 'DOT', cadence: 'Annual', fee: 'Varies' },
      { instrument: 'M/WBE certification', agency: 'SBS', cadence: 'Every 5 years', fee: 'No fee' },
    ],
  },
]

export default function CoverageSection() {
  return (
    <section id="handled" className="scroll-mt-20 border-t border-hair px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-sheet">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-balance text-head uppercase text-ink lg:col-span-7">
            The schedule of work
            <br />
            we take off your desk.
          </h2>
          <p className="measure text-base font-light leading-relaxed text-ink-2 lg:col-span-5">
            Fees are the city's published amounts and move year to year. The
            column that matters is the last one — every line is work BureauAI is
            built to carry, not a checklist handed back to you.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          {SCHEDULE.map(({ group, lines }) => (
            <div key={group}>
              <div className="flex items-baseline gap-4">
                <h3 className="display text-lg uppercase text-ink">{group}</h3>
                <span className="h-px flex-1 bg-hair" />
                <span className="font-mono text-micro uppercase text-ink-3" data-figure>
                  {lines.length} lines
                </span>
              </div>

              <table className="mt-4 w-full border-collapse text-left">
                <caption className="sr-only">{group} — instruments BureauAI handles</caption>
                <thead>
                  <tr className="border-b border-hair font-mono text-micro uppercase text-ink-3">
                    <th scope="col" className="py-2.5 pr-4 font-normal">Instrument</th>
                    <th scope="col" className="hidden py-2.5 pr-4 font-normal sm:table-cell">Agency</th>
                    <th scope="col" className="py-2.5 pr-4 font-normal">Cadence</th>
                    <th scope="col" className="hidden py-2.5 pr-4 font-normal md:table-cell">City fee</th>
                    <th scope="col" className="py-2.5 text-right font-normal">Held</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map(({ instrument, agency, cadence, fee }) => (
                    <tr
                      key={instrument}
                      className="border-b border-hair align-top transition-colors hover:bg-panel"
                    >
                      <td className="py-3.5 pr-4 font-sans text-sm text-ink">
                        {instrument}
                        <span className="mt-1 block font-mono text-micro uppercase tracking-[0.1em] text-ink-3 sm:hidden">
                          {agency}
                        </span>
                      </td>
                      <td className="hidden py-3.5 pr-4 font-mono text-2xs uppercase tracking-[0.08em] text-ink-3 sm:table-cell">
                        {agency}
                      </td>
                      <td className="py-3.5 pr-4 font-sans text-xs font-light text-ink-2">
                        {cadence}
                      </td>
                      <td className="hidden py-3.5 pr-4 text-xs text-ink-2 md:table-cell">
                        {fee}
                      </td>
                      <td className="py-3.5 text-right">
                        <Check
                          size={15}
                          className="ml-auto text-signal"
                          title={`${instrument} handled by BureauAI`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
