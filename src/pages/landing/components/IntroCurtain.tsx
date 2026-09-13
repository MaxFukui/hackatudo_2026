import type { ReactNode } from 'react'
import { VIDEOS } from '../videos'
import { Reveal } from './Reveal'
import { ScrollVideo } from './ScrollVideo'

// "Cortina": o vídeo do giz ocupa a largura toda e fica parado no topo da tela,
// enquanto a seção seguinte (children) sobe por cima e o cobre.
export function IntroCurtain({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="conheca-titulo">
      <Reveal className="mx-auto max-w-content px-4 pt-8 pb-10 text-center md:px-8 md:pb-14">
        <h2 id="conheca-titulo" className="text-statement font-display font-semibold">
          Conheça o gizzi
        </h2>
        <p className="mx-auto mt-4 max-w-reading text-reading text-fg-muted">{VIDEOS.intro.description}</p>
      </Reveal>

      <div className="relative">
        <div className="sticky top-16 w-full" style={{ aspectRatio: `${VIDEOS.intro.width} / ${VIDEOS.intro.height}` }}>
          <ScrollVideo video={VIDEOS.intro} cover />
        </div>
        <div className="relative z-10 rounded-t-lg border-t border-border bg-canvas shadow-overlay">{children}</div>
      </div>
    </section>
  )
}
