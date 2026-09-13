import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Logo } from '@/components/brand/Logo'
import { LogoutButton, type NavItem } from '@/components/layout'
import { Avatar } from '@/components/ui'
import { useCountUp } from '@/pages/student/hooks/useCountUp'
import { Background } from './Background'

interface Props<T extends string> {
  userName: string
  points: number
  nav: NavItem<T>[]
  active: T
  onNavigate: (id: T) => void
  children: ReactNode
}

// Mede o botão ativo para a "pílula" deslizar até ele (mesma técnica do sublinhado das Tabs do modelo).
function useSlidingPill<T extends string>(active: T) {
  const list = useRef<HTMLElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number; top: number; height: number } | null>(null)
  useEffect(() => {
    const root = list.current
    if (!root) return
    let alive = true
    const measure = () => {
      const el = root.querySelector<HTMLElement>('[aria-current="page"]')
      if (!el || !alive) return
      setPill({ left: el.offsetLeft, width: el.offsetWidth, top: el.offsetTop, height: el.offsetHeight })
    }
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    return () => {
      alive = false
      ro.disconnect()
    }
  }, [active])
  return [list, pill] as const
}

// Casca da área do aluno. Diferente do AppShell (sidebar): a navegação fica na barra de cima,
// como um app de criança — tudo à vista, um toque de distância. Celular: barra no rodapé.
export function StudentShell<T extends string>({ userName, points, nav, active, onNavigate, children }: Props<T>) {
  const shownPoints = useCountUp(points)
  const [topList, topPill] = useSlidingPill(active)
  const [bottomList, bottomPill] = useSlidingPill(active)
  const navigate = (id: T) => {
    onNavigate(id)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-topbar w-full max-w-content items-center gap-4 px-4 md:gap-6 md:px-8">
          <Logo height={30} />

          {/* Desktop: fileira de botões com uma pílula azul que desliza até o ativo. */}
          <nav ref={topList} aria-label="Seções" className="relative hidden flex-1 items-center gap-1 md:flex">
            {topPill && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 rounded-md bg-primary-soft transition-[transform,width] duration-slow ease-spring"
                style={{ width: topPill.width, height: topPill.height, transform: `translate(${topPill.left}px, ${topPill.top}px)` }}
              />
            )}
            {nav.map((item) => {
              const selected = item.id === active
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  aria-current={selected ? 'page' : undefined}
                  className={`group relative z-10 inline-flex h-10 items-center gap-2 rounded-md px-3 text-body font-medium whitespace-nowrap transition-[color,transform] duration-fast ease-standard active:scale-95 ${
                    selected ? 'text-primary-soft-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  <span
                    key={selected ? 'on' : 'off'}
                    className={`inline-flex transition-transform duration-base ease-spring group-hover:-translate-y-0.5 group-hover:scale-110 ${selected ? 'animate-nav-bounce text-current' : 'text-fg-subtle group-hover:text-fg'}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <span
              aria-label={`${points} pontos`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-amarelo bg-amarelo-claro px-3.5 text-small font-semibold text-fg"
              data-numeric
            >
              <span key={points} className="inline-block text-accent animate-pop" aria-hidden="true">★</span>
              <span>{shownPoints.toLocaleString('pt-BR')}</span>
              <span className="hidden sm:inline">pontos</span>
            </span>
            <Avatar name={userName} size="sm" />
            <span className="hidden text-small text-fg-muted lg:inline">{userName}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <Background />

      <main className="min-w-0 flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        {/* fill-mode backwards: depois da entrada a animação "solta" o transform — senão o Safari prende
            modal, toast e confete (position: fixed) dentro desta coluna. */}
        <div key={String(active)} className="mx-auto w-full max-w-content animate-rise [animation-fill-mode:backwards] space-y-4 px-4 py-4 md:space-y-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>

      {/* Celular: barra no rodapé, pílula desliza atrás do ícone ativo. */}
      <nav
        ref={bottomList}
        aria-label="Seções"
        className="fixed inset-x-0 bottom-0 z-30 grid auto-cols-fr grid-flow-col border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        {bottomPill && (
          <span
            aria-hidden="true"
            className="absolute top-2 h-7 w-12 rounded-full bg-primary-soft transition-transform duration-slow ease-spring"
            style={{ transform: `translateX(${bottomPill.left + bottomPill.width / 2 - 24}px)` }}
          />
        )}
        {nav.slice(0, 5).map((item) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              aria-current={selected ? 'page' : undefined}
              className={`relative z-10 flex h-14 flex-col items-center justify-center gap-0.5 px-1 text-caption font-medium transition-colors duration-fast active:bg-surface-muted/60 ${selected ? 'text-fg' : 'text-fg-muted'}`}
            >
              <span key={selected ? 'on' : 'off'} className={`flex h-7 items-center ${selected ? 'animate-nav-bounce text-primary-soft-fg' : ''}`}>{item.icon}</span>
              <span className="max-w-full truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
