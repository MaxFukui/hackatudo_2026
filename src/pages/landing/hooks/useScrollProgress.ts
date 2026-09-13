import { useEffect, useRef, type RefObject } from 'react'

const clamp = (n: number) => Math.min(1, Math.max(0, n))

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Chama onProgress(p) com p de 0 a 1 enquanto o elemento está perto da tela:
 * 0 = topo do elemento entrando por baixo · 1 = base saindo por cima.
 * Não gera render: o callback escreve estilo direto no DOM, a no máximo 1 vez por quadro.
 * Com prefers-reduced-motion não faz nada (a página fica no estado de repouso, legível).
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (p: number) => void,
) {
  const callback = useRef(onProgress)
  useEffect(() => {
    callback.current = onProgress
  })

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    let frame = 0
    let visible = false

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      callback.current(clamp((vh - rect.top) / (vh + rect.height)))
    }
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(measure)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        el.style.willChange = visible ? 'transform, opacity' : ''
        if (visible) schedule()
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    measure()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}
