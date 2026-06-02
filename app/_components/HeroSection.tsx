'use client'

import { useEffect } from 'react'

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
          position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '80%',
          background: 'linear-gradient(135deg, rgba(58,122,92,0.06) 0%, transparent 60%)',
          transform: 'perspective(1200px) rotateY(25deg) rotateX(15deg)',
          border: '1px solid rgba(77,186,128,0.04)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%', width: '65%', height: '75%',
          background: 'linear-gradient(225deg, rgba(77,158,186,0.04) 0%, transparent 60%)',
          transform: 'perspective(1200px) rotateY(-20deg) rotateX(-10deg)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(58,122,92,0.06) 0%, transparent 65%)',
        }} />
      </div>

      {/* ── Abstract floating artifacts ── */}

      {/* 1. Concentric rings — top left */}
      <div className="absolute pointer-events-none hidden lg:block" style={{
        top: '14%', left: '6%',
        animation: 'driftA 14s ease-in-out infinite',
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.55">
          <circle cx="60" cy="60" r="54" stroke="#4dba80" strokeWidth="0.5" strokeDasharray="4 6"/>
          <circle cx="60" cy="60" r="38" stroke="#4dba80" strokeWidth="0.75" strokeDasharray="2 4"/>
          <circle cx="60" cy="60" r="22" stroke="#4dba80" strokeWidth="1" />
          <circle cx="60" cy="60" r="3" fill="#4dba80" />
          <line x1="60" y1="6" x2="60" y2="18" stroke="#4dba80" strokeWidth="0.75"/>
          <line x1="114" y1="60" x2="102" y2="60" stroke="#4dba80" strokeWidth="0.75"/>
        </svg>
      </div>

      {/* 2. Hexagonal seal — top right */}
      <div className="absolute pointer-events-none hidden lg:block" style={{
        top: '10%', right: '7%',
        animation: 'driftB 18s ease-in-out infinite',
        transform: 'rotate(15deg)',
      }}>
        <svg width="100" height="115" viewBox="0 0 100 115" fill="none" opacity="0.45">
          <polygon points="50,4 96,27 96,88 50,111 4,88 4,27" stroke="#4dba80" strokeWidth="0.75" />
          <polygon points="50,16 84,34 84,81 50,99 16,81 16,34" stroke="#4dba80" strokeWidth="0.4" strokeDasharray="3 4"/>
          <polygon points="50,30 72,42 72,73 50,85 28,73 28,42" stroke="#4dba80" strokeWidth="0.4" opacity="0.6"/>
          <line x1="50" y1="4" x2="50" y2="16" stroke="#4dba80" strokeWidth="0.75"/>
          <line x1="50" y1="99" x2="50" y2="111" stroke="#4dba80" strokeWidth="0.75"/>
        </svg>
      </div>

      {/* 3. Grid coordinate marker — bottom left */}
      <div className="absolute pointer-events-none hidden lg:block" style={{
        bottom: '20%', left: '4%',
        animation: 'driftC 12s ease-in-out infinite',
      }}>
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" opacity="0.4">
          {/* Grid lines */}
          {[0,1,2,3,4].map(n => (
            <line key={`h${n}`} x1="0" y1={n*22+11} x2="110" y2={n*22+11} stroke="rgba(77,186,128,0.4)" strokeWidth="0.5"/>
          ))}
          {[0,1,2,3,4].map(n => (
            <line key={`v${n}`} x1={n*22+11} y1="0" x2={n*22+11} y2="110" stroke="rgba(77,186,128,0.4)" strokeWidth="0.5"/>
          ))}
          {/* X marker */}
          <line x1="44" y1="44" x2="66" y2="66" stroke="#4dba80" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="66" y1="44" x2="44" y2="66" stroke="#4dba80" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="55" cy="55" r="12" stroke="#4dba80" strokeWidth="1"/>
        </svg>
      </div>

      {/* 4. Corner bracket / frame — bottom right */}
      <div className="absolute pointer-events-none hidden lg:block" style={{
        bottom: '18%', right: '5%',
        animation: 'driftA 16s 2s ease-in-out infinite',
        transform: 'rotate(-10deg)',
      }}>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" opacity="0.45">
          {/* Corner brackets */}
          <path d="M8 30 L8 8 L30 8" stroke="#4dba80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M60 8 L82 8 L82 30" stroke="#4dba80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 60 L8 82 L30 82" stroke="#4dba80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M60 82 L82 82 L82 60" stroke="#4dba80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Centre dot */}
          <circle cx="45" cy="45" r="3" fill="#4dba80" opacity="0.6"/>
          <circle cx="45" cy="45" r="8" stroke="#4dba80" strokeWidth="0.5" opacity="0.4"/>
        </svg>
      </div>

      {/* 5. Arc / partial ring — right centre */}
      <div className="absolute pointer-events-none hidden lg:block" style={{
        top: '40%', right: '3%',
        animation: 'driftB 20s 4s ease-in-out infinite',
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.35">
          <path d="M 40 5 A 35 35 0 0 1 75 40" stroke="#4dba80" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 40 5 A 35 35 0 0 1 75 40" stroke="#4dba80" strokeWidth="0.4" strokeLinecap="round" transform="scale(0.7) translate(17,17)"/>
          <circle cx="75" cy="40" r="2.5" fill="#4dba80"/>
          <circle cx="40" cy="5" r="2.5" fill="#4dba80"/>
        </svg>
      </div>

      {/* 6. Tiny floating dots */}
      {[
        { top: '28%', left: '18%', size: 4, color: '#4dba80', opacity: 0.5, delay: '0s', dur: '7s' },
        { top: '65%', left: '12%', size: 3, color: '#4d9eba', opacity: 0.4, delay: '2s', dur: '9s' },
        { top: '22%', right: '22%', size: 5, color: '#4dba80', opacity: 0.35, delay: '1s', dur: '11s' },
        { top: '72%', right: '14%', size: 3, color: '#a78bfa', opacity: 0.4, delay: '3s', dur: '8s' },
      ].map((d, i) => (
        <div key={i} className="absolute pointer-events-none hidden lg:block" style={{
          top: d.top, left: (d as any).left, right: (d as any).right,
          width: d.size, height: d.size,
          borderRadius: '50%',
          background: d.color,
          opacity: d.opacity,
          boxShadow: `0 0 8px ${d.color}`,
          animation: `driftC ${d.dur} ${d.delay} ease-in-out infinite`,
        }} />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm mb-8"
          style={{
            background: 'rgba(77,186,128,0.08)', border: '1px solid rgba(77,186,128,0.2)',
            color: 'rgba(232,232,224,0.7)',
            animation: 'fadeUp 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          <span style={{ color: '#4dba80' }}>◆</span>
          Now live for NYC businesses
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: '800', lineHeight: '1.08',
          letterSpacing: '-0.02em', color: '#ffffff',
          fontFamily: 'Georgia, serif',
          animation: 'fadeUp 0.65s 0.2s cubic-bezier(0.16,1,0.3,1) both',
          marginBottom: '1.5rem',
        }}>
          NYC compliance.<br />
          <span style={{
            background: 'linear-gradient(135deg, #4dba80 0%, #a8e6c4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Finally simple.
          </span>
        </h1>

        <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(232,232,224,0.5)', animation: 'fadeUp 0.65s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}>
          BureauAI reads every NYC health, fire, building, and licensing regulation
          so you don't have to — AI audits, deadline alerts, violation guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          style={{ animation: 'fadeUp 0.65s 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>
          <a href="/audit" style={{
            background: '#4dba80', color: '#06090e',
            padding: '14px 28px', fontWeight: '700', fontSize: '14px',
            letterSpacing: '0.05em', textTransform: 'uppercase',
            boxShadow: '0 0 40px rgba(77,186,128,0.3)', transition: 'box-shadow 0.3s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(77,186,128,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(77,186,128,0.3)' }}
          >
            Start free audit →
          </a>
          <a href="/dashboard" style={{
            border: '1px solid rgba(255,255,255,0.15)', color: '#e8e8e0',
            padding: '14px 28px', fontWeight: '600', fontSize: '14px',
            background: 'rgba(255,255,255,0.03)', transition: 'border-color 0.2s ease',
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
        @keyframes driftA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(-14px) rotate(3deg); }
          70% { transform: translateY(8px) rotate(-1deg); }
        }
        @keyframes driftB {
          0%, 100% { transform: rotate(15deg) translateY(0px); }
          35% { transform: rotate(15deg) translateY(-18px); }
          65% { transform: rotate(15deg) translateY(-6px); }
        }
        @keyframes driftC {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(6px) translateX(-4px); }
        }
      `}</style>
    </section>
  )
}
