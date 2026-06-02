export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-3">

        {/* Icon — steely Greek frontage */}
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(160deg, #0c1812 0%, #061009 100%)',
          border: '1px solid rgba(77,186,128,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Cold inner glow from top */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '120%', height: '60%',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(180,210,255,0.07) 0%, transparent 70%)',
          }} />
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ position: 'relative', zIndex: 1 }}>
            {/* Pediment — sharp steep triangle */}
            <polygon
              points="11,1.5 20.5,7.5 1.5,7.5"
              fill="none"
              stroke="url(#steelGrad)"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            {/* Entablature — horizontal beam */}
            <rect x="1.5" y="7.5" width="19" height="1.4" fill="url(#steelGrad)" opacity="0.9"/>
            {/* 4 columns */}
            <rect x="3" y="8.9" width="1.4" height="8" fill="url(#steelGrad)" opacity="0.85"/>
            <rect x="7.2" y="8.9" width="1.4" height="8" fill="url(#steelGrad)" opacity="0.85"/>
            <rect x="11.4" y="8.9" width="1.4" height="8" fill="url(#steelGrad)" opacity="0.85"/>
            <rect x="15.6" y="8.9" width="1.4" height="8" fill="url(#steelGrad)" opacity="0.85"/>
            {/* Stylobate — base steps */}
            <rect x="0.5" y="16.9" width="21" height="1.1" fill="url(#steelGrad)" opacity="0.7"/>
            <rect x="0" y="18" width="22" height="1.2" fill="url(#steelGrad)" opacity="0.5"/>
            <defs>
              <linearGradient id="steelGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#d4e8f0"/>
                <stop offset="50%" stopColor="#8ab8cc"/>
                <stop offset="100%" stopColor="#4d7a8a"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px', lineHeight: 1 }}>
          <span style={{
            fontSize: '17px', fontWeight: '400',
            letterSpacing: '0.06em', color: '#e8e8e0',
            fontFamily: 'var(--font-dm-serif), "Times New Roman", Georgia, serif',
            fontStyle: 'italic',
          }}>
            Bureau
          </span>
          <span style={{
            fontSize: '17px', fontWeight: '400',
            letterSpacing: '0.06em', color: '#4dba80',
            fontFamily: 'var(--font-dm-serif), "Times New Roman", Georgia, serif',
            fontStyle: 'normal',
          }}>
            AI
          </span>
        </div>
      </div>

      <a
        href="#waitlist"
        className="glow-green text-sm font-medium px-4 py-2 transition-all"
        style={{ background: '#4dba80', color: '#06090e', letterSpacing: '0.04em', fontWeight: '600' }}
      >
        Get early access →
      </a>
    </nav>
  )
}
