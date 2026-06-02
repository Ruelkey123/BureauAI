'use client'

import { useEffect } from 'react'

const BADGES = [
  { label: 'DOH', sub: 'Health', color: '#4dba80', glow: 'rgba(77,186,128,0.5)', style: { top: '-80px', left: '-180px' }, dur: '6s', delay: '0s' },
  { label: 'FDNY', sub: 'Fire', color: '#ff7c4d', glow: 'rgba(255,124,77,0.5)', style: { top: '-60px', right: '-160px' }, dur: '7s', delay: '0.8s' },
  { label: 'DOB', sub: 'Buildings', color: '#4d9eba', glow: 'rgba(77,158,186,0.5)', style: { bottom: '-70px', left: '-140px' }, dur: '8s', delay: '1.6s' },
  { label: 'DCWP', sub: 'Licenses', color: '#a78bfa', glow: 'rgba(167,139,250,0.5)', style: { bottom: '-60px', right: '-130px' }, dur: '9s', delay: '0.4s' },
  { label: 'SLA', sub: 'Liquor', color: '#f59e0b', glow: 'rgba(245,158,11,0.5)', style: { top: '-110px', left: '50%', transform: 'translateX(-50%)' }, dur: '7.5s', delay: '1.2s' },
]

export default function HeroSection() {
  useEffect(() => {
    const nav = document.querySelector('nav')
    if (!nav) return
    const onScroll = () => {
      nav!.style.background = window.scrollY > 20 ? 'rgba(6,9,14,0.9)' : 'transparent'
      nav!.style.backdropFilter = window.scrollY > 20 ? 'blur(16px)' : 'none'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-16 overflow-hidden">

      {/* Background depth planes */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '70%', height: '80%',
          background: 'linear-gradient(135deg, rgba(58,122,92,0.07) 0%, transparent 60%)',
          transform: 'perspective(1200px) rotateY(25deg) rotateX(15deg)',
          border: '1px solid rgba(77,186,128,0.05)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '65%', height: '75%',
          background: 'linear-gradient(225deg, rgba(77,158,186,0.05) 0%, transparent 60%)',
          transform: 'perspective(1200px) rotateY(-20deg) rotateX(-10deg)',
          border: '1px solid rgba(77,158,186,0.04)',
        }} />
        {/* Central glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(58,122,92,0.07) 0%, transparent 65%)',
        }} />
      </div>

      {/* Main content with orbital badges around it */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm mb-8"
          style={{
            background: 'rgba(77,186,128,0.08)',
            border: '1px solid rgba(77,186,128,0.2)',
            color: 'rgba(232,232,224,0.7)',
            animation: 'fadeUp 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          <span style={{ color: '#4dba80' }}>◆</span>
          Now live for NYC businesses
        </div>

        {/* Headline with agency badges orbiting around it */}
        <div className="relative inline-block" style={{ animation: 'fadeUp 0.65s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}>

          {/* Agency badges — positioned around the headline */}
          {BADGES.map(({ label, sub, color, glow, style, dur, delay }) => (
            <div
              key={label}
              className="absolute pointer-events-none"
              style={{
                ...style,
                animation: `floatBadge ${dur} ${delay} ease-in-out infinite`,
                zIndex: 20,
              }}
            >
              <div style={{
                width: '72px', height: '72px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${color}25, ${color}08)`,
                border: `1px solid ${color}45`,
                boxShadow: `0 0 24px ${glow}, 0 0 8px ${color}20`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color, letterSpacing: '0.05em' }}>{label}</div>
                <div style={{ fontSize: '8px', color: 'rgba(232,232,224,0.35)', marginTop: '2px', letterSpacing: '0.05em' }}>{sub.toUpperCase()}</div>
              </div>
            </div>
          ))}

          {/* Small floating spheres around the headline */}
          {[
            { size: 8, style: { top: '-30px', left: '-60px' }, color: '#4dba80', delay: '1s', dur: '5s' },
            { size: 6, style: { top: '-20px', right: '-50px' }, color: '#a78bfa', delay: '2.5s', dur: '6s' },
            { size: 7, style: { bottom: '-20px', left: '20%' }, color: '#4d9eba', delay: '0.5s', dur: '7s' },
            { size: 5, style: { bottom: '-15px', right: '25%' }, color: '#f59e0b', delay: '3s', dur: '5.5s' },
          ].map((s, i) => (
            <div key={i} className="absolute pointer-events-none" style={{
              ...s.style,
              width: s.size, height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${s.color}, ${s.color}60)`,
              boxShadow: `0 0 10px ${s.color}70`,
              animation: `floatBadge ${s.dur} ${s.delay} ease-in-out infinite`,
            }} />
          ))}

          {/* Floating compliance card — right side */}
          <div className="absolute pointer-events-none hidden lg:block" style={{
            top: '0', right: '-280px',
            animation: 'floatCard 8s ease-in-out infinite',
            transform: 'perspective(800px) rotateY(-10deg) rotateX(4deg)',
          }}>
            <div style={{
              width: '190px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '12px',
              padding: '14px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(77,186,128,0.06)',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '8px', color: 'rgba(232,232,224,0.35)', letterSpacing: '0.1em', marginBottom: '8px' }}>COMPLIANCE SCORE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ fontSize: '26px', fontWeight: '700', color: '#e8e8e0', fontFamily: 'Georgia, serif' }}>94</div>
                <div style={{ fontSize: '9px', background: 'rgba(77,186,128,0.15)', color: '#4dba80', padding: '2px 7px', borderRadius: '20px', border: '1px solid rgba(77,186,128,0.25)' }}>Good Standing</div>
              </div>
              {[
                { agency: 'DOHMH', status: 'Compliant', color: '#4dba80' },
                { agency: 'FDNY', status: 'Action needed', color: '#f59e0b' },
                { agency: 'DCWP', status: 'Compliant', color: '#4dba80' },
              ].map(({ agency, status, color }) => (
                <div key={agency} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#e8e8e0' }}>{agency}</span>
                  <span style={{ fontSize: '9px', color }}>{status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating deadline pill — left side */}
          <div className="absolute pointer-events-none hidden lg:block" style={{
            bottom: '10px', left: '-260px',
            animation: 'floatCard 10s 1.5s ease-in-out infinite',
          }}>
            <div style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '10px',
              padding: '10px 14px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 24px rgba(245,158,11,0.08)',
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}>
              <div style={{ fontSize: '8px', color: 'rgba(232,232,224,0.35)', marginBottom: '4px', letterSpacing: '0.08em' }}>UPCOMING</div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#e8e8e0' }}>DOH Permit Renewal</div>
              <div style={{ fontSize: '10px', color: '#f59e0b', marginTop: '2px' }}>Due Jun 30 · 18 days</div>
            </div>
          </div>

          {/* The actual headline */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: '800',
            lineHeight: '1.08',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            fontFamily: 'Georgia, serif',
            position: 'relative',
          }}>
            NYC compliance.<br />
            <span style={{
              background: 'linear-gradient(135deg, #4dba80 0%, #a8e6c4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Finally simple.
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p
          className="text-lg max-w-xl mx-auto mt-8 mb-10 leading-relaxed"
          style={{
            color: 'rgba(232,232,224,0.5)',
            animation: 'fadeUp 0.65s 0.3s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          BureauAI reads every NYC health, fire, building, and licensing regulation
          so you don't have to — AI audits, deadline alerts, violation guidance.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          style={{ animation: 'fadeUp 0.65s 0.4s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          <a
            href="/audit"
            style={{
              background: '#4dba80',
              color: '#06090e',
              padding: '14px 28px',
              fontWeight: '700',
              fontSize: '14px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              boxShadow: '0 0 40px rgba(77,186,128,0.3)',
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(77,186,128,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(77,186,128,0.3)' }}
          >
            Start free audit →
          </a>
          <a
            href="/dashboard"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e8e8e0',
              padding: '14px 28px',
              fontWeight: '600',
              fontSize: '14px',
              background: 'rgba(255,255,255,0.03)',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            See demo →
          </a>
        </div>

        <p style={{ color: 'rgba(232,232,224,0.25)', fontSize: '13px', animation: 'fadeUp 0.65s 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
          Free to try · No account needed · NYC businesses
        </p>
      </div>

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(6px) rotate(-2deg); }
        }
        @keyframes floatCard {
          0%, 100% { transform: perspective(800px) rotateY(-10deg) rotateX(4deg) translateY(0px); }
          50% { transform: perspective(800px) rotateY(-6deg) rotateX(2deg) translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
