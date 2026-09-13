import './landing.css'
import { AudienceCards } from './components/AudienceCards'
import { ClassroomTvPreview } from './components/ClassroomTvPreview'
import { ConsciousTech } from './components/ConsciousTech'
import { IntroCurtain } from './components/IntroCurtain'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { HatchStory } from './components/HatchStory'
import { HeroVideo } from './components/HeroVideo'
import { LoginSection } from './components/LoginSection'
import { PetPlayground } from './components/PetPlayground'
import { PointsNumbers } from './components/PointsNumbers'
import { SchoolVideo } from './components/SchoolVideo'
import { SiteHeader } from './components/SiteHeader'

// Landing com efeitos de rolagem (inspirada na Revolut Business). Tema 🌙 escuro por padrão, ☀️ sol no botão do topo.
export function LandingPage() {
  return (
    <div className="landing min-h-dvh overflow-x-clip bg-canvas text-fg">
      <SiteHeader />
      <main>
        <HeroVideo />
        <LoginSection />
        <IntroCurtain>
          <HatchStory />
        </IntroCurtain>
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
