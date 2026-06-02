'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const nav = document.querySelector('nav')
    if (nav) navRef.current = nav

    function onScroll() {
      if (!navRef.current) return
      if (window.scrollY > 20) {
        navRef.current.classList.add('nav-scrolled')
      } else {
        navRef.current.classList.remove('nav-scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-16 overflow-hidden">

      {/* Floating gradient orbs */}
      <div className="orb orb-navy" style={{ top: '5%', left: '-10%' }} />
      <div className="orb orb-green" style={{ bottom: '10%', right: '-8%' }} />
      <div className="orb orb-navy" style={{ top: '40%', right: '5%', width: '300px', height: '300px' }} />

      {/* Badge */}
      <div className="animate-fade-up delay-100 inline-flex items-center gap-2 border border-bureau-border bg-white/60 rounded-full px-4 py-2 text-sm text-bureau-muted mb-10 backdrop-blur-sm">
        <span className="text-green font-semibold">+</span>
        Now live for NYC businesses
      </div>

      {/* Headline */}
      <h1 className="animate-fade-up delay-200 font-serif text-5xl md:text-7xl text-navy max-w-3xl leading-tight mb-6">
        Compliance that{' '}
        <span className="text-green">reads the rules</span>
        {' '}for you.
      </h1>

      {/* Subtext */}
      <p className="animate-fade-up delay-300 text-bureau-muted text-lg max-w-xl mb-10 leading-relaxed">
        BureauAI turns thousands of pages of NYC health, fire, building, and licensing
        regulations into a living checklist for your business — with AI audits, deadline alerts,
        and inspector-ready paperwork.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3 mb-6">
        <a
          href="/audit"
          className="btn-glow bg-navy text-cream px-6 py-3 font-medium text-sm hover:bg-navy-mid transition-colors"
        >
          Start a free audit →
        </a>
        <a
          href="/dashboard"
          className="border border-navy text-navy px-6 py-3 font-medium text-sm hover:bg-navy/5 transition-colors"
        >
          See a demo →
        </a>
      </div>

      {/* Trust line */}
      <p className="animate-fade-up delay-500 text-bureau-muted text-sm">
        Free to try · No account needed · NYC businesses
      </p>

    </section>
  )
}
