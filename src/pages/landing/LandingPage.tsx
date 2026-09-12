import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LoginCard } from './components/LoginCard'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr] md:py-20">
        <Hero />
        <LoginCard />
      </div>
      <Features />
      <Footer />
    </div>
  )
}
