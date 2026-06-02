'use client'

import { useEffect } from 'react'

const BADGES = [
  { label: 'DOH', sub: 'Health', color: '#4dba80', glow: 'rgba(77,186,128,0.4)', x: '-38%', y: '-55%', delay: '0s', dur: '6s' },
  { label: 'FDNY', sub: 'Fire', color: '#ff7c4d', glow: 'rgba(255,124,77,0.4)', x: '42%', y: '-50%', delay: '1s', dur: '7s' },
  { label: 'DOB', sub: 'Buildings', color: '#4d9eba', glow: 'rgba(77,158,186,0.4)', x: '-52%', y: '20%', delay: '2s', dur: '8s' },
  { label: 'DCWP', sub: 'Licenses', color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', x: '50%', y: '15%', delay: '0.5s', dur: '9s' },
  { label: 'SLA', sub: 'Liquor', color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', x: '10%', y: '-72%', delay: '1.5s', dur: '7.5s' },
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
          border: '1px solid rgba(77,186,128,0.06)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '65%', height: '75%',
          background: 'linear-gradient(225deg, rgba(77,158,186,0.06) 0%, transparent 60%)',
          transform: 'perspective(1200px) rotateY(-20deg) rotateX(-10deg)',
          border: '1px solid rgba(77,158,186,0.05)',
        }} />
      </div>

      {/* Green radial glow centre */}
      <div className="absolute pointer-events-none" style={{
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(58,122,92,0.08) 0%, transparent 60%)',
        filter: 'blur(20px)',
      }} />

      {/* Floating agency badges */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        {BADGES.map(({ label, sub, color, glow, x, y, delay, dur }) => (
          <div
            key={label}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: `translate(${x}, ${y})`,
              animation: `floatBadge ${dur} ${delay} ease-in-out infinite`,
            }}
          >
            <div style={{
              width: '80px', height: '80px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${color}30, ${color}10)`,
              border: `1px solid ${color}50`,
              boxShadow: `0 0 20px ${glow}, inset 0 0 20px ${color}10`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color, letterSpacing: '0.05em' }}>{label}</div>
              <div style={{ fontSize: '9px', color: 'rgba(232,232,224,0.4)', marginTop: '2px', letterSpacing: '0.05em' }}>{sub.toUpperCase()}</div>
            </div>
          </div>
        ))}

        {/* Small floating spheres */}
        {[
          { size: 10, x: '-25%', y: '-80%', delay: '0s', color: '#4dba80' },
          { size: 6, x: '35%', y: '65%', delay: '2s', color: '#a78bfa' },
          { size: 8, x: '-60%', y: '55%', delay: '1s', color: '#4d9eba' },
          { size: 5, x: '65%', y: '-25%', delay: '3s', color: '#4dba80' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: `translate(${s.x}, ${s.y})`,
            width: s.size, height: s.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${s.color}, ${s.color}50)`,
            boxShadow: `0 0 10px ${s.color}60`,
            animation: `floatBadge ${6 + i}s ${s.delay} ease-in-out infinite`,
          }} />
        ))}
      </div>

      {/* Floating compliance card */}
      <div className="absolute pointer-events-none" style={{
        bottom: '8%', right: '4%',
        animation: 'floatCard 8s ease-in-out infinite',
        transform: 'perspective(800px) rotateY(-12deg) rotateX(6deg)',
      }}>
        <div style={{
          width: '200px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '16px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(77,186,128,0.05)',
        }}>
          <div style={{ fontSize: '9px', color: 'rgba(232,232,224,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>COMPLIANCE SCORE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#e8e8e0', fontFamily: 'Georgia, serif' }}>94</div>
            <div style={{ fontSize: '10px', background: 'rgba(77,186,128,0.2)', color: '#4dba80', padding: '2px 8px', borderRadius: '20px', border: '1px solid rgba(77,186,128,0.3)' }}>Good Standing</div>
          </div>
          {[
            { agency: 'DOHMH', status: 'Compliant', color: '#4dba80' },
            { agency: 'FDNY', status: 'Action needed', color: '#f59e0b' },
            { agency: 'DCWP', status: 'Compliant', color: '#4dba80' },
          ].map(({ agency, status, color }) => (
            <div key={agency} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#e8e8e0' }}>{agency}</span>
              <span style={{ fontSize: '9px', color }}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating deadline pill */}
      <div className="absolute pointer-events-none" style={{
        top: '22%', left: '5%',
        animation: 'floatCard 10s 2s ease-in-out infinite',
      }}>
        <div style={{
          background: 'rgba(245,158,11,0.1)',
          border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: '8px',
          padding: '10px 14px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 20px rgba(245,158,11,0.1)',
        }}>
          <div style={{ fontSize: '9px', color: 'rgba(232,232,224,0.4)', marginBottom: '4px', letterSpacing: '0.08em' }}>UPCOMING</div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#e8e8e0' }}>DOH Permit Renewal</div>
          <div style={{ fontSize: '10px', color: '#f59e0b', marginTop: '2px' }}>Due Jun 30 · 18 days</div>
        </div>
      </div>

      {/* Main content */}
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

        {/* Headline — large, bold, two lines */}
        <h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '800',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: '1.5rem',
            animation: 'fadeUp 0.65s 0.2s cubic-bezier(0.16,1,0.3,1) both',
            fontFamily: 'Georgia, serif',
          }}
        >
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

        {/* Subtext */}
        <p
          className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
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
              transition: 'all 0.2s ease',
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
          0%, 100% { transform: translate(var(--tx, 0), var(--ty, 0)) translateY(0px) rotate(0deg); }
          33% { transform: translate(var(--tx, 0), var(--ty, 0)) translateY(-12px) rotate(3deg); }
          66% { transform: translate(var(--tx, 0), var(--ty, 0)) translateY(8px) rotate(-2deg); }
        }
        @keyframes floatCard {
          0%, 100% { transform: perspective(800px) rotateY(-12deg) rotateX(6deg) translateY(0px); }
          50% { transform: perspective(800px) rotateY(-8deg) rotateX(3deg) translateY(-12px); }
        }
      `}</style>
    </section>
  )
}
