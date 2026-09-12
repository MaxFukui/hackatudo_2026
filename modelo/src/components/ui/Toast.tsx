import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ToastProps {
  open: boolean
  onClose: () => void
  /** Some sozinho depois de `duration` ms. 0 = fica até fechar. */
  duration?: number
  children: ReactNode
}

// Confirmação curta ("Salvo", "+10 pontos"). Sobe, fica, desce. Celular: acima da barra de
// navegação, fora do polegar. Desktop: canto inferior direito. Uma por vez.
export function Toast({ open, onClose, duration = 3000, children }: ToastProps) {
  const [mounted, setMounted] = useState(open)
  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) setMounted(true)
  }
  const closing = mounted && !open
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open || duration === 0) return
    const t = setTimeout(() => closeRef.current(), duration)
    return () => clearTimeout(t)
  }, [open, duration])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 z-40 flex justify-center bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:inset-x-auto md:right-6 md:bottom-6 md:justify-end"
    >
      {mounted && (
        <div
          onAnimationEnd={(e) => closing && e.target === e.currentTarget && setMounted(false)}
          className={`pointer-events-auto flex min-h-11 max-w-md items-center gap-3 rounded-md bg-ink-900 px-4 py-2.5 text-small font-medium text-branco shadow-overlay ${
            closing ? 'animate-fade-out' : 'animate-rise'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
