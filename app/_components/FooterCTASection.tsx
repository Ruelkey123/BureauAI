'use client'

import { useState } from 'react'

export default function FooterCTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

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
    <section id="waitlist" className="py-24 px-6" style={{ background: '#06090e', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: '#e8e8e0' }}>
          Stop navigating alone.
        </h2>
        <p className="mb-10" style={{ color: 'rgba(232,232,224,0.45)' }}>
          Be among the first NYC business owners to get access.
        </p>

        {submitted ? (
          <p className="text-lg font-medium" style={{ color: '#4dba80' }}>
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
              className="flex-1 px-4 py-3 text-sm outline-none transition-colors placeholder:text-[rgba(232,232,224,0.3)] focus:border-[rgba(255,255,255,0.2)]"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8e8e0' }}
            />
            <button
              type="submit"
              className="glow-green font-medium text-sm px-6 py-3 transition-all whitespace-nowrap"
              style={{ background: '#4dba80', color: '#06090e' }}
            >
              Get early access
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
