import './landing.css'
import { AudienceCards } from './components/AudienceCards'
import { ClassroomTvPreview } from './components/ClassroomTvPreview'
import { ConsciousTech } from './components/ConsciousTech'
import { ExpandingVideo } from './components/ExpandingVideo'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { HatchStory } from './components/HatchStory'
import { HeroVideo } from './components/HeroVideo'
import { LoginSection } from './components/LoginSection'
import { PetPlayground } from './components/PetPlayground'
import { PointsNumbers } from './components/PointsNumbers'
import { SchoolVideo } from './components/SchoolVideo'
import { SiteHeader } from './components/SiteHeader'

// Landing escura com efeitos de rolagem (inspirada na Revolut Business) e a paleta do gizzi.
export function LandingPage() {
  return (
    <div className="theme-escuro min-h-dvh overflow-x-clip bg-canvas text-fg">
      <SiteHeader />
      <main>
        <HeroVideo />
        <LoginSection />
        <ExpandingVideo />
        <HatchStory />
        <PointsNumbers />
        <PetPlayground />
        <ClassroomTvPreview />
        <SchoolVideo />
        <AudienceCards />
        <ConsciousTech />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
