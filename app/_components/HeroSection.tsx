'use client'

import { useEffect } from 'react'

export default function HeroSection() {
  useEffect(() => {
    const nav = document.querySelector('nav')
    if (!nav) return
    function onScroll() {
      if (window.scrollY > 20) {
        nav!.style.background = 'rgba(6,9,14,0.85)'
        nav!.style.backdropFilter = 'blur(16px)'
      } else {
        nav!.style.background = 'transparent'
        nav!.style.backdropFilter = 'none'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-16 overflow-hidden">

      {/* Orbs */}
      <div className="absolute pointer-events-none" style={{
        top: '-10%', left: '-15%', width: '700px', height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58,122,92,0.12) 0%, transparent 65%)',
        filter: 'blur(40px)',
        animation: 'floatA 16s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '-5%', right: '-10%', width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77,186,128,0.08) 0%, transparent 65%)',
        filter: 'blur(40px)',
        animation: 'floatB 20s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none" style={{
        top: '30%', right: '10%', width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,30,46,0.4) 0%, transparent 70%)',
        filter: 'blur(30px)',
        animation: 'floatA 22s ease-in-out infinite reverse',
      }} />

      {/* Badge */}
      <div
        className="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm mb-10"
        style={{ background: 'rgba(77,186,128,0.08)', border: '1px solid rgba(77,186,128,0.2)', color: 'rgba(232,232,224,0.7)', animation: 'fadeUp 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <span style={{ color: '#4dba80' }}>◆</span>
        Now live for NYC businesses
      </div>

      {/* Headline */}
      <h1
        className="relative z-10 font-serif text-5xl md:text-7xl max-w-3xl leading-tight mb-6"
        style={{ color: '#e8e8e0', animation: 'fadeUp 0.65s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        Compliance that{' '}
        <span className="gradient-text">reads the rules</span>
        {' '}for you.
      </h1>

      {/* Subtext */}
      <p
        className="relative z-10 text-lg max-w-xl mb-10 leading-relaxed"
        style={{ color: 'rgba(232,232,224,0.5)', animation: 'fadeUp 0.65s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        BureauAI turns thousands of pages of NYC health, fire, building, and licensing
        regulations into a living checklist for your business — with AI audits, deadline alerts,
        and inspector-ready paperwork.
      </p>

      {/* CTAs */}
      <div
        className="relative z-10 flex flex-col sm:flex-row gap-3 mb-6"
        style={{ animation: 'fadeUp 0.65s 0.4s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <a
          href="/audit"
          className="glow-green font-medium text-sm px-6 py-3 transition-all"
          style={{ background: '#4dba80', color: '#06090e' }}
        >
          Start a free audit →
        </a>
        <a
          href="/dashboard"
          className="font-medium text-sm px-6 py-3 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#e8e8e0', background: 'rgba(255,255,255,0.03)' }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
        >
          See a demo →
        </a>
      </div>

      {/* Trust */}
      <p
        className="relative z-10 text-sm"
        style={{ color: 'rgba(232,232,224,0.3)', animation: 'fadeUp 0.65s 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        Free to try · No account needed · NYC businesses
      </p>
    </section>
  )
}
