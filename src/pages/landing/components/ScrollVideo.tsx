import { useEffect, useRef, useState } from 'react'
import type { LandingVideo } from '../videos'

interface ScrollVideoProps {
  video: LandingVideo
  /** Ocupa o pai inteiro (object-cover), sem borda: fundo do topo. */
  cover?: boolean
  /** Recebe o tempo atual (s) a cada quadro enquanto o vídeo toca. */
  onTime?: (seconds: number) => void
  /** Classe do elemento <video>. */
  videoClassName?: string
  className?: string
}

// Vídeo que toca quando pelo menos metade dele aparece na tela e pausa quando sai.
// Sem áudio (navegador só deixa tocar sozinho se estiver mudo). Só baixa quando chega perto.
// prefers-reduced-motion: não toca sozinho — fica a capa com o botão de play.
// Botão de pausa sempre visível: conteúdo que se move por mais de 5s precisa poder parar (WCAG 2.2.2).
export function ScrollVideo({ video, cover = false, onTime, videoClassName, className = '' }: ScrollVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const timeCallback = useRef(onTime)
  useEffect(() => {
    timeCallback.current = onTime
  })

  // Enquanto toca, avisa o tempo a cada quadro (usado para sincronizar texto com o vídeo).
  useEffect(() => {
    const el = ref.current
    if (!playing || !el || !timeCallback.current) return
    let frame = requestAnimationFrame(function tick() {
      timeCallback.current?.(el.currentTime)
      frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [playing])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Começa a baixar um pouco antes de entrar na tela.
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = 'auto'
          preload.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          if (!reduceMotion && !userPaused.current) el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: [0, 0.5] },
    )

    preload.observe(el)
    visibility.observe(el)
    return () => {
      preload.disconnect()
      visibility.disconnect()
    }
  }, [])

  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) {
      userPaused.current = false
      el.play().catch(() => {})
    } else {
      userPaused.current = true
      el.pause()
    }
  }

  return (
    <div className={cover ? `absolute inset-0 ${className}` : `relative overflow-hidden rounded-lg border border-border bg-ink-900 ${className}`}>
      <video
        ref={ref}
        className={videoClassName ?? (cover ? 'block h-full w-full object-cover' : 'block h-auto w-full')}
        width={video.width}
        height={video.height}
        poster={video.poster}
        preload={cover ? 'auto' : 'none'}
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label={`${video.name}: ${video.description}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar vídeo: ${video.name}` : `Tocar vídeo: ${video.name}`}
        className="absolute right-3 bottom-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-ink-950/60 text-branco transition-[background-color,transform] duration-fast ease-standard hover:bg-ink-950/80 active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />}
        </svg>
      </button>
    </div>
  )
}
