// app/_components/FooterCTASection.tsx
'use client'

import { useState } from 'react'

export default function FooterCTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="py-24 px-6" style={{ backgroundColor: '#0f1e2e' }}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          Stop navigating alone.
        </h2>
        <p className="mb-10" style={{ color: 'rgba(240,240,232,0.65)' }}>
          Join 400+ NYC restaurant operators on the waitlist.
        </p>

        {submitted ? (
          <p className="text-green-light text-lg font-medium">
            You're on the list. We'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@restaurant.com"
              className="flex-1 px-4 py-3 text-sm outline-none border transition-colors"
              style={{
                backgroundColor: '#1a3044',
                color: '#f0f0e8',
                borderColor: 'rgba(240,240,232,0.2)',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(240,240,232,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(240,240,232,0.2)')}
            />
            <button
              type="submit"
              className="bg-green text-cream px-6 py-3 font-medium text-sm hover:bg-green-light transition-colors whitespace-nowrap"
            >
              Get early access
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
