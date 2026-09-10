import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import CoverageSection from './_components/CoverageSection'
import AuditDemoSection from './_components/AuditDemoSection'
import HowItWorksSection from './_components/HowItWorksSection'
import StatusSection from './_components/StatusSection'
import PricingTeaserSection from './_components/PricingTeaserSection'
import FaqSection from './_components/FaqSection'
import FooterCTASection from './_components/FooterCTASection'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <CoverageSection />
        <AuditDemoSection />
        <HowItWorksSection />
        <StatusSection />
        <PricingTeaserSection />
        <FaqSection />
        <FooterCTASection />
      </main>
      <Footer />
    </>
  )
}
