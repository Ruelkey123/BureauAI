export default function SocialProofSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'rgba(58,122,92,0.05)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
          Built for NYC business owners
        </h2>
        <p className="text-bureau-muted text-lg leading-relaxed mb-10">
          BureauAI is now in early access for NYC businesses. Try the free compliance audit — no account, no credit card required.
        </p>
        <a
          href="/audit"
          className="inline-block bg-navy text-cream px-8 py-3 font-medium text-sm hover:bg-navy-mid transition-colors"
        >
          Try the free audit →
        </a>
      </div>
    </section>
  )
}
