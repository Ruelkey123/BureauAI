import Nav from './Nav'
import Footer from './Footer'

export type Section = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: Section[]
}) {
  return (
    <>
      <Nav />
      <main className="px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-hair pb-8">
            <h1 className="display text-balance text-head uppercase text-ink">{title}</h1>
            <p className="mt-4 font-mono text-micro uppercase text-ink-3">
              Last updated {updated}
            </p>
            <p className="mt-6 text-base font-light leading-relaxed text-ink-2">
              {intro}
            </p>
          </header>

          <div className="mt-12 space-y-11">
            {sections.map(({ heading, paragraphs, bullets }) => (
              <section key={heading}>
                <h2 className="display text-lg uppercase text-ink">{heading}</h2>
                {paragraphs?.map(p => (
                  <p
                    key={p.slice(0, 40)}
                    className="mt-4 text-base font-light leading-relaxed text-ink-2"
                  >
                    {p}
                  </p>
                ))}
                {bullets && (
                  <ul className="mt-4">
                    {bullets.map(b => (
                      <li
                        key={b.slice(0, 40)}
                        className="rule-row py-3 text-sm font-light leading-relaxed text-ink-2"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-hair pt-6 font-mono text-2xs leading-relaxed text-ink-3">
            Questions about this page?{' '}
            <a href="mailto:hello@bureauai.com" className="text-signal underline">
              hello@bureauai.com
            </a>
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
