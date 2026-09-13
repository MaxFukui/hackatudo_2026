import { useRef, type ReactNode } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'

interface RevealProps {
  children: ReactNode
  className?: string
}

// Texto que "acende" ao entrar na tela: começa apagado e sobe um pouco até ficar nítido.
// Sem JavaScript ou com prefers-reduced-motion, fica simplesmente visível.
export function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useScrollProgress(ref, (p) => {
    const el = ref.current
    if (!el) return
    const t = Math.min(1, p / 0.45)
    el.style.opacity = String(0.15 + 0.85 * t)
    el.style.transform = `translate3d(0, ${(1 - t) * 24}px, 0)`
  })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
