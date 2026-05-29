import Nav from './_components/Nav'
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'

export default function Home() {
  return (
    <main className="min-h-screen graph-paper">
      <Nav />
      <HeroSection />
      <ProblemSection />
    </main>
  )
}
