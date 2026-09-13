import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, useScrollProgress } from '../hooks/useScrollProgress'
import { VIDEOS } from '../videos'

// Cada passo ocupa a mesma distância de rolagem e mapeia um trecho do vídeo (segundos).
const STEPS = [
  { title: 'A criança participa', text: 'Presença, pergunta em aula, lição entregue. Cada coisa vira pontinho para o ovo.', from: 0, to: 1.5 },
  { title: 'O ovo racha', text: 'Com pontinhos suficientes o ovo começa a rachar — na TV da sala, com a turma vendo.', from: 1.5, to: 3 },
  { title: 'Nasce o monstrinho', text: 'Ele sai do ovo e cresce enquanto a criança mantém a sequência de dias.', from: 3, to: 8 },
  { title: 'E vai para a aula', text: 'Leitura, escrita e contas: o monstrinho aprende junto e mostra o progresso da criança.', from: 8, to: 15 },
]

export function HatchStory() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const bars = useRef<(HTMLSpanElement | null)[]>([])
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  // Deixa o vídeo pronto para "pular" de quadro assim que a seção se aproxima (iOS exige um play antes).
  useEffect(() => {
    const el = video.current
    if (!el || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.preload = 'auto'
        el.play().then(() => el.pause()).catch(() => {})
        io.disconnect()
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useScrollProgress(
    section,
    (p) => {
      const scaled = Math.min(STEPS.length - 0.0001, p * STEPS.length)
      const index = Math.floor(scaled)
      const local = scaled - index
      const step = STEPS[index]

      const el = video.current
      if (el && el.readyState >= 1) {
        const target = step.from + (step.to - step.from) * local
        if (!el.seeking && Math.abs(el.currentTime - target) > 0.04) el.currentTime = target
      }
      bars.current.forEach((bar, i) => {
        if (bar) bar.style.transform = `scaleX(${i < index ? 1 : i === index ? local : 0})`
      })
      if (index !== activeRef.current) {
        activeRef.current = index
        setActive(index)
      }
    },
    'sticky',
  )

  const togglePlay = () => {
    const el = video.current
    if (el) void (el.paused ? el.play() : el.pause())
  }

  return (
    <section
      id="como-funciona"
      ref={section}
      aria-labelledby="como-funciona-titulo"
      className="relative h-[400dvh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <div className="mx-auto grid w-full max-w-content items-center gap-6 px-4 pt-16 md:grid-cols-2 md:gap-12 md:px-8 md:pt-0">
          <div className="order-2 md:order-1">
            <h2 id="como-funciona-titulo" className="text-statement font-display font-semibold">
              Do ovinho à sala de aula
            </h2>
            <ol className="mt-6 space-y-2 md:mt-10 md:space-y-5">
              {STEPS.map((step, i) => {
                const isActive = i === active
                return (
                  <li
                    key={step.title}
                    aria-current={isActive ? 'step' : undefined}
                    className={`transition-opacity duration-base ease-standard motion-reduce:block motion-reduce:opacity-100 ${
                      isActive ? 'opacity-100' : 'hidden opacity-35 md:block'
                    }`}
                  >
                    <span className="relative block h-0.5 overflow-hidden rounded-full bg-border motion-reduce:hidden">
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
            <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
              <video
                ref={video}
                className="block h-[52dvh] w-auto md:h-[78dvh]"
                width={VIDEOS.hatch.width}
                height={VIDEOS.hatch.height}
                poster={VIDEOS.hatch.poster}
                preload="none"
                muted
                playsInline
                disablePictureInPicture
                aria-label={`${VIDEOS.hatch.name}: ${VIDEOS.hatch.description}`}
              >
                <source src={VIDEOS.hatch.src} type="video/mp4" />
              </video>
              {/* Com movimento reduzido a rolagem não mexe no vídeo: toca pelo botão. */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={`Tocar ou pausar vídeo: ${VIDEOS.hatch.name}`}
                className="absolute right-3 bottom-3 hidden size-11 items-center justify-center rounded-full bg-ink-950/60 text-branco motion-reduce:inline-flex"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
