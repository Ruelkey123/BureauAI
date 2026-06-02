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

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Badge */}
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

        {/* Headline wrapper — floating elements orbit this */}
        <div className="relative" style={{ animation: 'fadeUp 0.65s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}>

          {/* ── FLOAT 1: Compliance score — top left ── */}
          <div className="absolute hidden lg:block pointer-events-none" style={{
            top: '-20px', left: '-290px',
            animation: 'floatA 7s ease-in-out infinite',
            transform: 'rotate(-4deg)',
          }}>
            <div style={{
              background: 'rgba(15,25,20,0.85)', border: '1px solid rgba(77,186,128,0.18)',
              borderRadius: '14px', padding: '14px 18px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(77,186,128,0.1)',
              textAlign: 'left', minWidth: '160px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '10px', color: 'rgba(232,232,224,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Score</span>
                <span style={{ fontSize: '9px', background: 'rgba(77,186,128,0.15)', color: '#4dba80', padding: '2px 8px', borderRadius: '20px' }}>A Grade</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#e8e8e0', lineHeight: 1, fontFamily: 'Georgia, serif' }}>94<span style={{ fontSize: '14px', color: 'rgba(232,232,224,0.3)', fontWeight: '400' }}>/100</span></div>
              <div style={{ marginTop: '10px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }}>
                <div style={{ width: '94%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #3a7a5c, #4dba80)' }} />
              </div>
            </div>
          </div>

          {/* ── FLOAT 2: Inspection passed — top right ── */}
          <div className="absolute hidden lg:block pointer-events-none" style={{
            top: '-30px', right: '-300px',
            animation: 'floatB 8s ease-in-out infinite',
            transform: 'rotate(3deg)',
          }}>
            <div style={{
              background: 'rgba(10,18,14,0.85)', border: '1px solid rgba(77,186,128,0.15)',
              borderRadius: '14px', padding: '12px 16px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4dba80', boxShadow: '0 0 8px #4dba80' }} />
                <span style={{ fontSize: '10px', color: '#4dba80', fontWeight: '600', letterSpacing: '0.05em' }}>INSPECTION PASSED</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0' }}>DOH Annual Review</div>
              <div style={{ fontSize: '10px', color: 'rgba(232,232,224,0.35)', marginTop: '3px' }}>May 14, 2026 · Manhattan</div>
            </div>
          </div>

          {/* ── FLOAT 3: Action required — bottom left ── */}
          <div className="absolute hidden lg:block pointer-events-none" style={{
            bottom: '-40px', left: '-270px',
            animation: 'floatC 9s ease-in-out infinite',
            transform: 'rotate(-2deg)',
          }}>
            <div style={{
              background: 'rgba(20,15,8,0.85)', border: '1px solid rgba(245,158,11,0.18)',
              borderRadius: '14px', padding: '12px 16px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.05)',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '600', letterSpacing: '0.05em' }}>ACTION REQUIRED</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8e8e0' }}>FDNY Permit Renewal</div>
              <div style={{ fontSize: '10px', color: 'rgba(232,232,224,0.35)', marginTop: '3px' }}>Due in 18 days · $150 fee</div>
            </div>
          </div>

          {/* ── FLOAT 4: Savings pill — bottom right ── */}
          <div className="absolute hidden lg:block pointer-events-none" style={{
            bottom: '-30px', right: '-260px',
            animation: 'floatA 6s 1.5s ease-in-out infinite',
            transform: 'rotate(2deg)',
          }}>
            <div style={{
              background: 'rgba(12,18,25,0.85)', border: '1px solid rgba(77,158,186,0.18)',
              borderRadius: '14px', padding: '12px 16px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '10px', color: 'rgba(232,232,224,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '5px' }}>Tax Credit Found</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#4d9eba', fontFamily: 'Georgia, serif' }}>$9,600</div>
              <div style={{ fontSize: '10px', color: 'rgba(232,232,224,0.35)', marginTop: '3px' }}>WOTC · Apply now</div>
            </div>
          </div>

          {/* ── FLOAT 5: Small glowing orbs ── */}
          {[
            { top: '-60px', left: '-60px', color: '#4dba80', size: 7, delay: '0s', dur: '5s' },
            { top: '-40px', right: '-50px', color: '#a78bfa', size: 5, delay: '2s', dur: '6s' },
            { bottom: '-50px', left: '15%', color: '#4d9eba', size: 6, delay: '1s', dur: '7s' },
            { bottom: '-40px', right: '20%', color: '#f59e0b', size: 4, delay: '3s', dur: '5.5s' },
          ].map((s, i) => (
            <div key={i} className="absolute pointer-events-none" style={{
              top: s.top, bottom: s.bottom, left: s.left, right: s.right,
              width: s.size, height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${s.color}, ${s.color}50)`,
              boxShadow: `0 0 12px ${s.color}`,
              animation: `floatA ${s.dur} ${s.delay} ease-in-out infinite`,
            }} />
          ))}

          {/* The headline */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: '800', lineHeight: '1.08',
            letterSpacing: '-0.02em', color: '#ffffff',
            fontFamily: 'Georgia, serif', position: 'relative', zIndex: 2,
          }}>
            NYC compliance.<br />
            <span style={{
              background: 'linear-gradient(135deg, #4dba80 0%, #a8e6c4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Finally simple.
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-lg max-w-xl mx-auto mt-8 mb-10 leading-relaxed"
          style={{ color: 'rgba(232,232,224,0.5)', animation: 'fadeUp 0.65s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}>
          BureauAI reads every NYC health, fire, building, and licensing regulation
          so you don't have to — AI audits, deadline alerts, violation guidance.
        </p>

        {/* CTAs */}
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
        @keyframes floatA {
          0%, 100% { transform: rotate(var(--r, -4deg)) translateY(0px); }
          50% { transform: rotate(var(--r, -4deg)) translateY(-10px); }
        }
        @keyframes floatB {
          0%, 100% { transform: rotate(3deg) translateY(0px); }
          40% { transform: rotate(3deg) translateY(-14px); }
          70% { transform: rotate(3deg) translateY(-5px); }
        }
        @keyframes floatC {
          0%, 100% { transform: rotate(-2deg) translateY(0px); }
          33% { transform: rotate(-2deg) translateY(-8px); }
          66% { transform: rotate(-2deg) translateY(-16px); }
        }
      `}</style>
    </section>
  )
}
