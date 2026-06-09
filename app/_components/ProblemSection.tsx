'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { stat: '8–12', label: 'government agencies', sub: 'DOH, DOB, SLA, DCWP, FDNY, and more' },
  { stat: '3–18 mo', label: 'typical timeline range', sub: 'from application to opening, varies by business type' },
  { stat: '$50K+', label: 'in potential professional fees', sub: 'expeditors, attorneys, consultants — for complex cases' },
]

const CARDS = [
  { agency: 'DOHMH', title: 'Food Service Permit', sub: 'Annual renewal · $280', color1: '#0d2218', color2: '#1a4d30', shine: '#4dba8030', tx: -155, ty: -110 },
  { agency: 'FDNY', title: 'Place of Assembly', sub: 'Annual inspection · $150', color1: '#0f1e2e', color2: '#1a3550', shine: '#4d9eba30', tx: 155, ty: -110 },
  { agency: 'DOB', title: 'Certificate of Occupancy', sub: 'On changes · $200–2,000', color1: '#0a1a28', color2: '#143040', shine: '#4d9eba25', tx: 0, ty: -10 },
  { agency: 'DCWP', title: 'Business License', sub: 'Biannual renewal · $110', color1: '#0d1f16', color2: '#183a25', shine: '#4dba8025', tx: -155, ty: 115 },
  { agency: 'SLA', title: 'Liquor License', sub: 'Biannual · $4,352', color1: '#1a150a', color2: '#2e2010', shine: '#f59e0b20', tx: 155, ty: 115 },
]

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const targetRef = useRef(0)
  const currentRef = useRef(0)

  useEffect(() => {
    // Smooth lerp loop — no jank
    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.08
      setProgress(currentRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // Fully spread as soon as section reaches mid-viewport
      const p = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH * 0.45)))
      targetRef.current = p
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
          {/* Text — centered above */}
          <div className="lg:col-span-2 text-center mb-4">
            <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: '#e8e8e0' }}>
              This used to cost $50K+. We do it for $99/mo.
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(232,232,224,0.45)' }}>
              Until now, navigating NYC's DOH, FDNY, DOB, DCWP, and SLA required hiring expeditors, attorneys, and consultants. BureauAI replaces them all.
            </p>
            <div className="flex justify-center gap-10 flex-wrap">
              {stats.map(({ stat, label }) => (
                <div key={stat} className="text-center">
                  <div className="font-serif text-3xl font-bold" style={{
                    background: 'linear-gradient(135deg, #4dba80, #a8e6c4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{stat}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(232,232,224,0.4)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: scroll-driven stacked → grid cards */}
          <div className="flex justify-center items-center" style={{ minHeight: '480px' }}>
            <div style={{ position: 'relative', width: '360px', height: '460px', perspective: '1200px' }}>
              {CARDS.map(({ agency, title, sub, color1, color2, shine, tx, ty }, i) => {
                const p = progress
                // Lerp from stacked to grid
                const translateX = tx * p
                const translateY = ty * p
                const scale = 1 - p * 0.3
                const rotX = (-52 + i * 1.5) * (1 - p) + (-8 * (1 - p))
                const rotY = (-8 + i * 1.2) * (1 - p)
                const baseBottom = i * 14 * (1 - p)

                return (
                  <div
                    key={agency}
                    style={{
                      position: 'absolute',
                      bottom: `${baseBottom + 160}px`,
                      left: '50%',
                      marginLeft: '-140px',
                      width: '280px',
                      height: '168px',
                      borderRadius: '16px',
                      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                      transformOrigin: 'center center',
                      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color1} 100%)`,
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: `0 ${8 + i * 4}px ${24 + i * 8}px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      overflow: 'hidden',
                      willChange: 'transform',
                    }}
                  >
                    {/* Shine */}
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 40%, ${shine} 0%, transparent 60%)` }} />
                    {/* Grid texture */}
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.06,
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }} />
                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 2, padding: '18px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '9px', letterSpacing: '0.14em', color: 'rgba(232,232,224,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>{agency}</div>
                          <div style={{ fontSize: '15px', fontWeight: '600', color: 'rgba(232,232,224,0.9)' }}>{title}</div>
                        </div>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: 'rgba(232,232,224,0.3)' }}>{sub}</div>
                        <div style={{ marginTop: '8px', height: '2px', borderRadius: '1px', background: 'rgba(255,255,255,0.05)' }}>
                          <div style={{ width: `${75 - i * 10}%`, height: '100%', borderRadius: '1px', background: 'rgba(255,255,255,0.15)' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </div>
    </section>
  )
}
