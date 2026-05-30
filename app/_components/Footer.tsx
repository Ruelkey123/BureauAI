// app/_components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-bureau-border py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-sm text-navy">BureauAI</span>
        <div className="flex gap-6 text-sm text-bureau-muted">
          <a href="#" className="hover:text-navy transition-colors">Privacy</a>
          <a href="#" className="hover:text-navy transition-colors">Terms</a>
          <a href="mailto:hello@bureauai.com" className="hover:text-navy transition-colors">Contact</a>
        </div>
        <p className="text-bureau-muted text-xs">© 2026 BureauAI. All rights reserved.</p>
      </div>
    </footer>
  )
}
