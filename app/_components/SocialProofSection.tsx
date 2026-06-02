export default function SocialProofSection() {
  return (
    <section className="py-24 px-6" style={{ background: 'rgba(77,186,128,0.04)', borderTop: '1px solid rgba(77,186,128,0.1)', borderBottom: '1px solid rgba(77,186,128,0.1)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: '#e8e8e0' }}>
          Built for NYC business owners
        </h2>
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(232,232,224,0.45)' }}>
          BureauAI is now in early access for NYC businesses. Try the free compliance audit — no account, no credit card required.
        </p>
        <a
          href="/audit"
          className="glow-green inline-block font-medium text-sm px-8 py-3 transition-all"
          style={{ background: '#4dba80', color: '#06090e' }}
        >
          Try the free audit →
        </a>
      </div>
    </section>
  )
}
