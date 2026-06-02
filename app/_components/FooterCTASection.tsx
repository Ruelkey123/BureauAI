'use client'

import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function FooterCTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref = useReveal()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'landing' }),
    }).catch(() => {})
  }

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="waitlist" className="py-24 px-6 bg-navy">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="reveal font-serif text-4xl md:text-5xl text-cream mb-4">
          Stop navigating alone.
        </h2>
        <p className="reveal reveal-delay-1 text-cream/65 mb-10">
          Be among the first NYC business owners to get access.
        </p>

        {submitted ? (
          <p className="text-green-light text-lg font-medium">
            You're on the list. We'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@restaurant.com"
              className="flex-1 px-4 py-3 text-sm outline-none border border-cream/20 focus:border-cream/50 transition-colors bg-navy-mid text-cream placeholder:text-cream/40"
            />
            <button
              type="submit"
              className="btn-glow bg-green text-cream px-6 py-3 font-medium text-sm hover:bg-green-light transition-colors whitespace-nowrap"
            >
              Get early access
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
