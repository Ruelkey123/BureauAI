'use client'

import { useState } from 'react'
import { Arrow, Check } from './Icons'

type State = 'idle' | 'sending' | 'done' | 'error'

export default function FooterCTASection() {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, note, source: 'landing' }),
      })
      // Only claim success once the server actually confirms it.
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <section
      id="waitlist"
      className="scroll-mt-20 border-t border-hair bg-panel/40 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-sheet gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="display text-balance text-head uppercase text-ink">
            Stop carrying
            <br />
            it alone.
          </h2>
          <p className="measure mt-5 text-base font-light leading-relaxed text-ink-2">
            Early access opens to this list first. Tell us what you are dealing
            with and we will start with that.
          </p>
        </div>

        <div className="lg:col-span-7">
          {state === 'done' ? (
            <div className="panel flex items-start gap-4 p-6 sm:p-8">
              <Check size={20} className="mt-0.5 shrink-0 text-signal" />
              <div>
                <p className="text-md text-ink">You're on the list.</p>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink-2">
                  We read every one of these. If you described a live problem,
                  that is where we will start when we reach you.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="panel p-6 sm:p-8" noValidate={false}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="wl-email"
                    className="block font-mono text-micro uppercase text-ink-3"
                  >
                    Email
                  </label>
                  <input
                    id="wl-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={state === 'sending'}
                    aria-invalid={state === 'error' || undefined}
                    placeholder="you@yourbusiness.com"
                    className="mt-2.5 w-full border border-hair-bright bg-void px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-signal disabled:opacity-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="wl-note"
                    className="block font-mono text-micro uppercase text-ink-3"
                  >
                    What are you dealing with?{' '}
                    <span className="normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="wl-note"
                    rows={3}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    disabled={state === 'sending'}
                    placeholder="Opening in Bushwick, waiting on the DOHMH permit and an FDNY inspection."
                    className="mt-2.5 w-full resize-y border border-hair-bright bg-void px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-signal disabled:opacity-50"
                  />
                </div>
              </div>

              {state === 'error' && (
                <p role="alert" className="mt-5 border border-flag-hair bg-flag-wash px-4 py-3 text-sm text-flag">
                  We couldn't save that — the signup service didn't respond. Try
                  again, or email{' '}
                  <a href="mailto:hello@bureauai.com" className="underline">
                    hello@bureauai.com
                  </a>{' '}
                  directly.
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="group inline-flex items-center gap-2.5 border border-signal bg-signal px-6 py-3.5 font-mono text-2xs uppercase tracking-[0.1em] text-void transition-colors hover:bg-transparent hover:text-signal disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-signal disabled:hover:text-void"
                >
                  {state === 'sending' ? 'Sending…' : state === 'error' ? 'Try again' : 'Request access'}
                  {state !== 'sending' && (
                    <Arrow size={15} className="transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
                <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
                  No card · Unsubscribe anytime
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
