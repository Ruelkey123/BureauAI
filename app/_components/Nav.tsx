export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 flex items-center justify-center rounded-sm" style={{ background: 'rgba(77,186,128,0.15)', border: '1px solid rgba(77,186,128,0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="13" width="14" height="2" fill="#4dba80" />
            <rect x="1" y="6" width="14" height="1.5" fill="#4dba80" />
            <rect x="2" y="7.5" width="1.5" height="5.5" fill="#4dba80" />
            <rect x="7.25" y="7.5" width="1.5" height="5.5" fill="#4dba80" />
            <rect x="12.5" y="7.5" width="1.5" height="5.5" fill="#4dba80" />
            <polygon points="8,1 1,6 15,6" fill="#4dba80" />
          </svg>
        </div>
        <span className="font-serif text-base tracking-tight" style={{ color: '#e8e8e0' }}>BureauAI</span>
      </div>
      <a
        href="#waitlist"
        className="glow-green text-sm font-medium px-4 py-2 rounded-sm transition-all"
        style={{ background: '#4dba80', color: '#06090e' }}
      >
        Get early access →
      </a>
    </nav>
  )
}
