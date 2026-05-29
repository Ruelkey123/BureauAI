export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-navy flex items-center justify-center rounded-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="13" width="14" height="2" fill="white" />
            <rect x="1" y="6" width="14" height="1.5" fill="white" />
            <rect x="2" y="7.5" width="1.5" height="5.5" fill="white" />
            <rect x="7.25" y="7.5" width="1.5" height="5.5" fill="white" />
            <rect x="12.5" y="7.5" width="1.5" height="5.5" fill="white" />
            <polygon points="8,1 1,6 15,6" fill="white" />
          </svg>
        </div>
        <span className="font-serif text-base text-navy tracking-tight">BureauAI</span>
      </div>
      <a
        href="#waitlist"
        className="bg-navy text-cream text-sm font-medium px-4 py-2 rounded-sm hover:bg-navy-mid transition-colors"
      >
        Book a demo →
      </a>
    </nav>
  )
}
