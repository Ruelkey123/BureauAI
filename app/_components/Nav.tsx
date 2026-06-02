export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-3">

        {/* Icon — steely Greek frontage */}
        <div style={{
          width: '38px', height: '38px',
          background: 'linear-gradient(180deg, #111820 0%, #080d12 100%)',
          border: '1px solid rgba(160,190,220,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,220,255,0.06)',
        }}>
          {/* Subtle top sheen */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(180deg, rgba(160,190,230,0.05) 0%, transparent 100%)',
          }} />
          <svg width="26" height="24" viewBox="0 0 26 24" fill="none" style={{ position: 'relative', zIndex: 1, display: 'block' }}>
            <defs>
              <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ddeaf5"/>
                <stop offset="35%" stopColor="#b0c8dc"/>
                <stop offset="100%" stopColor="#5a7a90"/>
              </linearGradient>
            </defs>
            {/* Pediment */}
            <polygon points="13,1 24.5,7 1.5,7" fill="none" stroke="url(#steel)" strokeWidth="1" strokeLinejoin="miter"/>
            {/* Entablature */}
            <rect x="1.5" y="7" width="23" height="1.6" fill="url(#steel)"/>
            {/* 4 columns */}
            <rect x="3.2" y="8.6" width="1.6" height="9.4" fill="url(#steel)" opacity="0.95"/>
            <rect x="8" y="8.6" width="1.6" height="9.4" fill="url(#steel)" opacity="0.95"/>
            <rect x="14.4" y="8.6" width="1.6" height="9.4" fill="url(#steel)" opacity="0.95"/>
            <rect x="21.2" y="8.6" width="1.6" height="9.4" fill="url(#steel)" opacity="0.95"/>
            {/* Stylobate — 2 steps */}
            <rect x="1" y="18" width="24" height="1.4" fill="url(#steel)" opacity="0.85"/>
            <rect x="0" y="19.4" width="26" height="1.4" fill="url(#steel)" opacity="0.6"/>
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
