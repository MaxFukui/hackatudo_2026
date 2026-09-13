import { useEffect, useRef, useState } from 'react'
import { VIDEOS } from '../videos'
import { Reveal } from './Reveal'

const CARDS = [
  {
    who: 'Alunos',
    text: 'Chocam ovinhos, cuidam do monstrinho e têm um tutor de IA que ajuda sem dar cola.',
    image: VIDEOS.monsters.poster,
  },
  {
    who: 'Professores',
    text: 'Registram participação em segundos e recebem avaliações por IA de cada aluno.',
    image: VIDEOS.school.poster,
  },
  {
    who: 'Direção',
    text: 'Acompanha frequência, desempenho e alertas da escola inteira em um só painel.',
    image: VIDEOS.intro.poster,
  },
]

// Desktop: três cards, o do meio mais alto. Celular: carrossel com encaixe e bolinhas.
export function AudienceCards() {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = track.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { root, threshold: 0.6 },
    )
    root.querySelectorAll('li').forEach((li) => io.observe(li))
    return () => io.disconnect()
  }, [])

  return (
    <section aria-labelledby="publico-titulo" className="py-20 md:py-28">
      <Reveal className="mx-auto max-w-content px-4 text-center md:px-8">
        <h2 id="publico-titulo" className="text-statement font-display font-semibold">
          Feito para a escola inteira
        </h2>
      </Reveal>

      <ul
        ref={track}
        className="scrollbar-none mx-auto mt-10 flex max-w-content snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:mt-20 md:grid md:grid-cols-3 md:items-stretch md:overflow-visible md:px-8"
      >
        {CARDS.map((card, i) => (
          <li
            key={card.who}
            data-index={i}
            // Mesma altura nos três; o do meio só sobe (transform), sem mudar de tamanho.
            className={`flex shrink-0 basis-4/5 snap-center flex-col overflow-hidden rounded-lg border border-border bg-surface sm:basis-3/5 md:basis-auto ${
              i === 1 ? 'md:-translate-y-8' : ''
            }`}
          >
            <div className="px-5 pt-6 pb-6">
              <h3 className="font-display text-h1 font-semibold">{card.who}</h3>
              <p className="mt-2 text-body text-fg-muted">{card.text}</p>
            </div>
            <img src={card.image} alt="" loading="lazy" width={640} height={360} className="mt-auto aspect-video w-full object-cover" />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-center gap-2 md:hidden" aria-hidden="true">
        {CARDS.map((card, i) => (
          <span
            key={card.who}
            className={`size-2 rounded-full transition-colors duration-base ${i === active ? 'bg-fg' : 'bg-border-strong'}`}
          />
        ))}
      </div>
    </section>
  )
}
