import { useEffect, useRef, useState } from 'react'

// Número que "sobe" até o valor novo (1.240 → 1.250) em vez de trocar de repente.
// A criança vê o ganho acontecer. Primeira renderização mostra o valor direto.
export function useCountUp(value: number, duration = 600): number {
  const [shown, setShown] = useState(value)
  const from = useRef(value)

  useEffect(() => {
    const start = from.current
    if (start === value) return
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = reduced ? 1 : Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(Math.round(start + (value - start) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return shown
}
