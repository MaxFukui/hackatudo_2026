import { Audiences } from './components/Audiences'
import { ClassroomTvPreview } from './components/ClassroomTvPreview'
import { ConsciousTech } from './components/ConsciousTech'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { LoginCard } from './components/LoginCard'
import { SiteHeader } from './components/SiteHeader'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <SiteHeader />
      <main>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-6 pb-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <Hero />
          <LoginCard />
        </div>
        <HowItWorks />
        <ClassroomTvPreview />
        <ConsciousTech />
        <Audiences />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
