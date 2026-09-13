import { useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { VIDEOS } from '../videos'
import { Reveal } from './Reveal'
import { ScrollVideo } from './ScrollVideo'

// Como na Revolut: o vídeo entra pequeno e abre até a largura total conforme a página rola.
export function ExpandingVideo() {
  const frame = useRef<HTMLDivElement>(null)

  useScrollProgress(frame, (p) => {
    const el = frame.current
    if (!el) return
    const t = Math.min(1, p / 0.5)
    el.style.transform = `scale(${0.6 + 0.4 * t})`
  })

  return (
    <section aria-labelledby="conheca-titulo" className="mx-auto max-w-content px-4 py-16 text-center md:px-8">
      <Reveal>
        <h2 id="conheca-titulo" className="text-statement font-display font-semibold">
          Conheça o gizzi
        </h2>
        <p className="mx-auto mt-4 max-w-reading text-reading text-fg-muted">{VIDEOS.intro.description}</p>
      </Reveal>
      <div ref={frame} className="scroll-fx mt-10">
        <ScrollVideo video={VIDEOS.intro} />
      </div>
    </section>
  )
}
