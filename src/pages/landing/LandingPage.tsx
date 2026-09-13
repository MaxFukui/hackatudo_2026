import { Audiences } from './components/Audiences'
import { ClassroomTvPreview } from './components/ClassroomTvPreview'
import { ConsciousTech } from './components/ConsciousTech'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { IntroVideo } from './components/IntroVideo'
import { LoginCard } from './components/LoginCard'
import { MonstersVideo } from './components/MonstersVideo'
import { SchoolVideo } from './components/SchoolVideo'
import { SiteHeader } from './components/SiteHeader'

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-canvas text-fg">
      <SiteHeader />
      <main>
        <div className="mx-auto grid max-w-content gap-8 px-4 pt-8 pb-12 md:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
          <Hero />
          <LoginCard />
        </div>
        <IntroVideo />
        <HowItWorks />
        <MonstersVideo />
        <ClassroomTvPreview />
        <SchoolVideo />
        <ConsciousTech />
        <Audiences />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
