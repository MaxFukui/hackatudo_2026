import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  /** Botões do rodapé. Convenção: ghost "Cancelar" à esquerda, primário à direita. No celular, empilham. */
  footer?: ReactNode
  children: ReactNode
}

// Celular: sobe do rodapé como uma folha (bottom sheet). Desktop: cresce do centro.
// Sai pelo caminho inverso, mais rápido do que entrou. Fecha com Esc, clique fora ou botão.
export function Modal({ open, title, description, onClose, footer, children }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const titleId = useId()
  // onClose costuma ser uma arrow inline (nova a cada render). Numa ref, o efeito depende só de `open`.
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])
  // Fica montado enquanto a animação de saída roda; desmonta no animationend.
  const [mounted, setMounted] = useState(open)
  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) setMounted(true)
  }
  const closing = mounted && !open

  useEffect(() => {
    if (!open) return
    // Guarda quem abriu para devolver o foco ao fechar — senão o teclado cai no topo da página.
    opener.current = document.activeElement as HTMLElement | null
    panel.current?.focus()
    document.body.style.overflow = 'hidden'

    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      // Tab preso dentro do diálogo: a página atrás está bloqueada, o foco não pode ir para lá.
      if (e.key === 'Tab' && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener.current?.focus()
    }
  }, [open])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-ink-950/40 sm:items-center sm:p-4 ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
      onClick={onClose}
      onAnimationEnd={(e) => {
        if (closing && e.target === e.currentTarget) setMounted(false)
      }}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[90dvh] w-full flex-col rounded-t-lg bg-surface shadow-overlay outline-none sm:max-h-[85dvh] sm:max-w-md sm:rounded-lg ${
          closing ? 'animate-sheet-down sm:animate-scale-out' : 'animate-sheet-up sm:animate-scale-in'
        }`}
      >
        {/* Alça: diz "isto é uma folha" no celular. Só visual — fechar é pelo X, Esc ou fora. */}
        <div className="flex justify-center pt-2 sm:hidden" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-border-strong" />
        </div>
        <header className="flex items-start justify-between gap-4 px-4 pt-3 sm:pt-5 md:px-5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-h2 font-semibold">
              {title}
            </h2>
            {description && <p className="mt-1 text-small text-fg-muted">{description}</p>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Fechar" className="-mt-1 -mr-2 px-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </Button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-5">{children}</div>
        {footer && (
          <footer className="flex flex-col-reverse gap-2 border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end md:px-5 [&>*]:w-full sm:[&>*]:w-auto">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}
