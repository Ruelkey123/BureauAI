export default function Footer() {
  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <style>{`
        .footer-link { color: rgba(232,232,224,0.35); transition: color 0.2s; }
        .footer-link:hover { color: #e8e8e0; }
      `}</style>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-sm" style={{ color: '#e8e8e0' }}>BureauAI</span>
        <div className="flex gap-6 text-sm">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="mailto:hello@bureauai.com" className="footer-link">Contact</a>
        </div>
        <p className="text-xs" style={{ color: 'rgba(232,232,224,0.25)' }}>© 2026 BureauAI. All rights reserved.</p>
      </div>
    </footer>
  )
}
