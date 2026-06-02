// app/page.tsx
import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowItWorksSection from './_components/HowItWorksSection'
import CoverageSection from './_components/CoverageSection'
import SocialProofSection from './_components/SocialProofSection'
import PricingTeaserSection from './_components/PricingTeaserSection'
import FooterCTASection from './_components/FooterCTASection'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <main className="dark-grid">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <CoverageSection />
      <SocialProofSection />
      <PricingTeaserSection />
      <FooterCTASection />
      <Footer />
    </main>
  )
}
