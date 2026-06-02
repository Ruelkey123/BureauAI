export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-3">

        {/* Icon mark — angular seal with bold § */}
        <div style={{
          width: '34px', height: '34px',
          background: 'linear-gradient(145deg, #0e1f16 0%, #0a1510 100%)',
          border: '1px solid rgba(77,186,128,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
        }}>
          {/* Inner glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 40% 40%, rgba(77,186,128,0.12) 0%, transparent 70%)',
          }} />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'relative', zIndex: 1 }}>
            {/* Abstract angular mark — two overlapping chevrons suggesting layers/documents */}
            <path d="M3 13 L9 5 L15 13" stroke="#4dba80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M3 9.5 L9 2 L15 9.5" stroke="#4dba80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.45"/>
          </svg>
        </div>

        {/* Wordmark — BUREAU thin + AI bold green */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px', lineHeight: 1 }}>
          <span style={{
            fontSize: '15px',
            fontWeight: '300',
            letterSpacing: '0.18em',
            color: '#e8e8e0',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            Bureau
          </span>
          <span style={{
            fontSize: '15px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            color: '#4dba80',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            AI
          </span>
        </div>
      </div>

      <a
        href="#waitlist"
        className="glow-green text-sm font-medium px-4 py-2 transition-all"
        style={{
          background: '#4dba80', color: '#06090e',
          letterSpacing: '0.04em', fontWeight: '600',
        }}
      >
        Get early access →
      </a>
    </nav>
  )
}
