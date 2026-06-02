export default function Footer() {
  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-sm" style={{ color: '#e8e8e0' }}>BureauAI</span>
        <div className="flex gap-6 text-sm">
          <a href="#" className="transition-colors" style={{ color: 'rgba(232,232,224,0.35)' }} onMouseEnter={e => { (e.target as HTMLElement).style.color = '#e8e8e0' }} onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(232,232,224,0.35)' }}>Privacy</a>
          <a href="#" className="transition-colors" style={{ color: 'rgba(232,232,224,0.35)' }} onMouseEnter={e => { (e.target as HTMLElement).style.color = '#e8e8e0' }} onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(232,232,224,0.35)' }}>Terms</a>
          <a href="mailto:hello@bureauai.com" className="transition-colors" style={{ color: 'rgba(232,232,224,0.35)' }} onMouseEnter={e => { (e.target as HTMLElement).style.color = '#e8e8e0' }} onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(232,232,224,0.35)' }}>Contact</a>
        </div>
        <p className="text-xs" style={{ color: 'rgba(232,232,224,0.25)' }}>© 2026 BureauAI. All rights reserved.</p>
      </div>
    </footer>
  )
}
