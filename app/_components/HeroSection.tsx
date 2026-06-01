// app/_components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20 pb-16">
      <div className="inline-flex items-center gap-2 border border-bureau-border bg-white/60 rounded-full px-4 py-2 text-sm text-bureau-muted mb-10">
        <span className="text-green font-semibold">+</span>
        Now live for NYC restaurants
      </div>

      <h1 className="font-serif text-5xl md:text-7xl text-navy max-w-3xl leading-tight mb-6">
        Compliance that{' '}
        <span className="text-green">reads the rules</span>
        {' '}for you.
      </h1>

      <p className="text-bureau-muted text-lg max-w-xl mb-10 leading-relaxed">
        BureauAI turns thousands of pages of food safety, fire, and building
        regulations into a living checklist for every location you operate — with AI
        audits, smart alerts, and inspector-ready paperwork.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <a
          href="/audit"
          className="bg-navy text-cream px-6 py-3 font-medium text-sm hover:bg-navy-mid transition-colors"
        >
          Start a free audit →
        </a>
        <button className="border border-navy text-navy px-6 py-3 font-medium text-sm hover:bg-navy/5 transition-colors">
          Watch 90-sec demo
        </button>
      </div>

      <p className="text-bureau-muted text-sm">
        Free to try · No account needed · NYC restaurants
      </p>
    </section>
  )
}
