'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mark } from './Icons'

const LINKS = [
  { href: '/#handled', label: 'Coverage' },
  { href: '/#audit', label: 'Audit' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/dashboard', label: 'Demo' },
]

export default function Nav() {
  // The masthead owns its own scroll state rather than having another
  // component reach in and mutate its style.
  const [ruled, setRuled] = useState(false)

  useEffect(() => {
    const onScroll = () => setRuled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        ruled ? 'border-hair bg-void/90 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-sheet items-center justify-between gap-6 px-5 py-3.5 sm:px-8"
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="BureauAI home">
          <Mark size={24} className="text-ink transition-colors group-hover:text-signal" />
          <span className="display text-md uppercase text-ink">
            Bureau<span className="text-signal">AI</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-2 transition-colors hover:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="/#waitlist"
          className="shrink-0 border border-signal bg-signal px-4 py-2 font-mono text-2xs uppercase tracking-[0.1em] text-void transition-colors hover:bg-transparent hover:text-signal"
        >
          Request access
        </a>
      </nav>
    </header>
  )
}
