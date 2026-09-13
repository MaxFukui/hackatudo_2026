import { useSyncExternalStore } from 'react'

const KEY = 'gizzi.tema'
const listeners = new Set<() => void>()

// O tema vive em html[data-tema]; o index.html já aplica o salvo antes de pintar.
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
const isSol = () => document.documentElement.dataset.tema === 'sol'

// ☀️ sol / 🌙 escuro.
export function ThemeToggle() {
  const sol = useSyncExternalStore(subscribe, isSol, () => false)

  const toggle = () => {
    const next = !sol
    if (next) document.documentElement.dataset.tema = 'sol'
    else delete document.documentElement.dataset.tema
    try {
      localStorage.setItem(KEY, next ? 'sol' : 'escuro')
    } catch {
      // sem storage: vale só até recarregar
    }
    listeners.forEach((fn) => fn())
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={sol ? 'Mudar para o modo escuro' : 'Mudar para o modo sol'}
      aria-pressed={sol}
      className="inline-flex size-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-fast hover:bg-surface-muted hover:text-fg md:size-10"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {sol ? (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  )
}
