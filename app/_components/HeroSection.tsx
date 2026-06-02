'use client'

import { useEffect } from 'react'

export default function HeroSection() {
  useEffect(() => {
    const nav = document.querySelector('nav')
    if (!nav) return
    function onScroll() {
      if (window.scrollY > 20) {
        nav!.style.cssText = 'background:rgba(240,240,232,0.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(58,122,92,0.12);transition:all 0.3s ease'
      } else {
        nav!.style.cssText = 'transition:all 0.3s ease'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-16 overflow-hidden">

      {/* Floating gradient orbs */}
      <div
        className="absolute pointer-events-none animate-float-a"
        style={{
          top: '-5%', left: '-15%',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,30,46,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none animate-float-b"
        style={{
          bottom: '0%', right: '-10%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,122,92,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Badge */}
      <div className="animate-fade-up-1 opacity-0 inline-flex items-center gap-2 border border-bureau-border bg-white/60 rounded-full px-4 py-2 text-sm text-bureau-muted mb-10 backdrop-blur-sm relative z-10">
        <span className="text-green font-semibold">+</span>
        Now live for NYC businesses
      </div>

      {/* Headline */}
      <h1 className="animate-fade-up-2 opacity-0 font-serif text-5xl md:text-7xl text-navy max-w-3xl leading-tight mb-6 relative z-10">
        Compliance that{' '}
        <span className="text-green">reads the rules</span>
        {' '}for you.
      </h1>

      {/* Subtext */}
      <p className="animate-fade-up-3 opacity-0 text-bureau-muted text-lg max-w-xl mb-10 leading-relaxed relative z-10">
        BureauAI turns thousands of pages of NYC health, fire, building, and licensing
        regulations into a living checklist for your business — with AI audits, deadline alerts,
        and inspector-ready paperwork.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up-4 opacity-0 flex flex-col sm:flex-row gap-3 mb-6 relative z-10">
        <a
          href="/audit"
          className="bg-navy text-cream px-6 py-3 font-medium text-sm hover:bg-navy-mid transition-all duration-200 hover:shadow-lg hover:shadow-navy/20"
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
      <p className="animate-fade-up-5 opacity-0 text-bureau-muted text-sm relative z-10">
        Free to try · No account needed · NYC businesses
      </p>

    </section>
  )
}
