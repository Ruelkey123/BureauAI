const stats = [
  { stat: '8–12', label: 'government agencies', sub: 'DOH, DOB, SLA, DCWP, FDNY, and more' },
  { stat: '3–18 mo', label: 'typical timeline range', sub: 'from application to opening, varies by business type' },
  { stat: '$50K+', label: 'in potential professional fees', sub: 'expeditors, attorneys, consultants — for complex cases' },
]

const CARDS = [
  { agency: 'DOHMH', title: 'Food Service Permit', sub: 'Annual renewal · $280', color1: '#0d2218', color2: '#1a4d30', shine: '#4dba8030' },
  { agency: 'FDNY', title: 'Place of Assembly', sub: 'Annual inspection · $150', color1: '#0f1e2e', color2: '#1a3550', shine: '#4d9eba30' },
  { agency: 'DOB', title: 'Certificate of Occupancy', sub: 'On changes · $200–2,000', color1: '#0a1a28', color2: '#143040', shine: '#4d9eba25' },
  { agency: 'DCWP', title: 'Business License', sub: 'Biannual renewal · $110', color1: '#0d1f16', color2: '#183a25', shine: '#4dba8025' },
  { agency: 'SLA', title: 'Liquor License', sub: 'Biannual · $4,352', color1: '#1a150a', color2: '#2e2010', shine: '#f59e0b20' },
]

export default function ProblemSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: '#e8e8e0' }}>
              The complexity<br />is real.
            </h2>
            <p className="text-lg mb-12 leading-relaxed" style={{ color: 'rgba(232,232,224,0.45)' }}>
              Running a business in NYC means navigating one of the most complex regulatory environments in the country. Most owners spend their savings and months of their lives before they can focus on actually running their business.
            </p>
            <div className="flex flex-col gap-4">
              {stats.map(({ stat, label, sub }) => (
                <div key={stat} className="flex items-start gap-5" style={{ borderLeft: '1px solid rgba(77,186,128,0.2)', paddingLeft: '20px' }}>
                  <div className="font-serif text-3xl font-bold shrink-0" style={{
                    background: 'linear-gradient(135deg, #4dba80, #a8e6c4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{stat}</div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#e8e8e0' }}>{label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(232,232,224,0.35)' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm font-medium" style={{ color: 'rgba(232,232,224,0.5)' }}>
              We help you understand what you're dealing with — so you can make informed decisions.
            </p>
          </div>

          {/* Right: stacked cards */}
          <div className="flex justify-center items-center" style={{ minHeight: '420px' }}>
            <div style={{ position: 'relative', width: '300px', height: '380px', perspective: '1000px' }}>
              {CARDS.map(({ agency, title, sub, color1, color2, shine }, i) => {
                const total = CARDS.length
                const offset = i * 18
                const rotX = -55 + i * 2
                const rotY = -8 + i * 1.5
                const z = i * 12
                return (
                  <div
                    key={agency}
                    style={{
                      position: 'absolute',
                      bottom: `${offset}px`,
                      left: `${i * 3}px`,
                      width: '280px',
                      height: '168px',
                      borderRadius: '16px',
                      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${z}px)`,
                      transformOrigin: 'bottom center',
                      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color1} 100%)`,
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: `0 ${8 + i * 4}px ${24 + i * 8}px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      overflow: 'hidden',
                      cursor: 'default',
                      animation: `cardFloat ${6 + i}s ${i * 0.4}s ease-in-out infinite`,
                    }}
                  >
                    {/* Shine overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(ellipse at 30% 40%, ${shine} 0%, transparent 60%)`,
                    }} />
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
                          <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(232,232,224,0.9)', lineHeight: 1.3 }}>{title}</div>
                        </div>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: 'rgba(232,232,224,0.3)' }}>{sub}</div>
                        <div style={{ marginTop: '8px', height: '2px', borderRadius: '1px', background: 'rgba(255,255,255,0.05)' }}>
                          <div style={{ width: `${70 - i * 10}%`, height: '100%', borderRadius: '1px', background: 'rgba(255,255,255,0.15)' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cardFloat {
          0%, 100% { transform: perspective(1000px) rotateX(var(--rx, -55deg)) rotateY(var(--ry, -8deg)) translateZ(0) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(var(--rx, -55deg)) rotateY(var(--ry, -8deg)) translateZ(0) translateY(-4px); }
        }
      `}</style>
    </section>
  )
}
