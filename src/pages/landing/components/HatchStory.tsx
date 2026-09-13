import { useRef, useState } from 'react'
import { VIDEOS } from '../videos'
import { Reveal } from './Reveal'
import { ScrollVideo } from './ScrollVideo'

// Cada passo corresponde a um trecho do vídeo (segundos). O texto acompanha o vídeo em loop.
const STEPS = [
  { title: 'A criança participa', text: 'Presença, pergunta em aula, lição entregue. Cada coisa vira pontinho para o ovo.', from: 0, to: 1.5 },
  { title: 'O ovo racha', text: 'Com pontinhos suficientes o ovo começa a rachar — na TV da sala, com a turma vendo.', from: 1.5, to: 3 },
  { title: 'Nasce o monstrinho', text: 'Ele sai do ovo e cresce enquanto a criança mantém a sequência de dias.', from: 3, to: 8 },
  { title: 'E vai para a aula', text: 'Leitura, escrita e contas: o monstrinho aprende junto e mostra o progresso da criança.', from: 8, to: 15.05 },
]

export function HatchStory() {
  const bars = useRef<(HTMLSpanElement | null)[]>([])
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  const onTime = (t: number) => {
    const index = Math.max(0, STEPS.findIndex((s) => t >= s.from && t < s.to))
    bars.current.forEach((bar, i) => {
      if (!bar) return
      const step = STEPS[i]
      const fill = i < index ? 1 : i === index ? (t - step.from) / (step.to - step.from) : 0
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, fill))})`
    })
    if (index !== activeRef.current) {
      activeRef.current = index
      setActive(index)
    }
  }

  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="mx-auto max-w-content scroll-mt-16 px-4 py-20 md:px-8 md:py-28">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="order-2 md:order-1">
          <Reveal>
            <h2 id="como-funciona-titulo" className="text-statement font-display font-semibold">
              Do ovinho à sala de aula
            </h2>
          </Reveal>
          <ol className="mt-8 space-y-5 md:mt-10">
            {STEPS.map((step, i) => {
              const isActive = i === active
              return (
                <li
                  key={step.title}
                  aria-current={isActive ? 'step' : undefined}
                  className={`transition-opacity duration-base ease-standard ${isActive ? 'opacity-100' : 'opacity-40'}`}
                >
                  <span className="relative block h-0.5 overflow-hidden rounded-full bg-border">
                    <span
                      ref={(node) => {
                        bars.current[i] = node
                      }}
                      className="absolute inset-0 origin-left scale-x-0 bg-accent"
                    />
                  </span>
                  <h3 className="mt-3 font-display text-h1 font-semibold">
                    <span className="text-fg-subtle" data-numeric>
                      {i + 1}.
                    </span>{' '}
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-reading text-reading text-fg-muted">{step.text}</p>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <ScrollVideo video={VIDEOS.hatch} onTime={onTime} videoClassName="block h-auto max-h-[80dvh] w-auto max-w-full" />
        </div>
      </div>
    </section>
  )
}
