import { useEffect, useMemo, useState, type CSSProperties } from 'react'

const COLORS = ['var(--color-laranja)', 'var(--color-azul-esc)', 'var(--color-verde-esc)', 'var(--color-rosa-esc)', 'var(--color-amarelo)']

interface Piece {
  id: number
  style: CSSProperties
  round: boolean
}

function burst(count: number, spread: number): Piece[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6
    const dist = spread * (0.6 + Math.random() * 0.6)
    return {
      id: i,
      round: i % 3 === 0,
      style: {
        '--dx': `${Math.cos(angle) * dist}px`,
        '--dy': `${Math.sin(angle) * dist - spread * 0.4}px`,
        '--rot': `${(Math.random() - 0.5) * 720}deg`,
        background: COLORS[i % COLORS.length],
        animationDelay: `${Math.random() * 120}ms`,
      } as CSSProperties,
    }
  })
}

interface ConfettiProps {
  /** Muda o valor para disparar. 0 = nada. */
  trigger: number
  /** big: evolução do mascote (mais peças, mais longe). */
  size?: 'small' | 'big'
}

// Recompensa visual: um estouro de papel picado a partir do centro da tela, que cai e some.
// Só transform/opacity; some do DOM depois de 1,2 s. Reduced-motion: dura 0,01 ms (base.css).
export function Confetti({ trigger, size = 'small' }: ConfettiProps) {
  // Peças derivadas do gatilho (sem setState no efeito); o efeito só agenda o sumiço.
  // Começa "já visto": se o componente remontar (troca de aba), o último estouro não repete.
  const [seen, setSeen] = useState(trigger)
  const pieces = useMemo(() => (trigger ? burst(size === 'big' ? 40 : 22, size === 'big' ? 340 : 200) : []), [trigger, size])

  useEffect(() => {
    if (!trigger) return
    const id = setTimeout(() => setSeen(trigger), 1200)
    return () => clearTimeout(id)
  }, [trigger])

  if (pieces.length === 0 || seen === trigger) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
      {pieces.map((p) => (
        <span key={p.id} className={`absolute size-3 animate-confetti ${p.round ? 'rounded-full' : 'rounded-sm'}`} style={p.style} />
      ))}
    </div>
  )
}
