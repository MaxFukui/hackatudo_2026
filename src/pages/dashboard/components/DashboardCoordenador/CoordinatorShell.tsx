import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Logo } from '@/components/brand/Logo'
import { LogoutButton, type NavItem } from '@/components/layout'
import { Avatar } from '@/components/ui'
import './dashboard-coordenador.css'

interface CoordinatorShellProps<T extends string> {
  userName: string
  nav: NavItem<T>[]
  active: T
  onNavigate: (id: T) => void
  children: ReactNode
}

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

export function CoordinatorShell<T extends string>({ userName, nav, active, onNavigate, children }: CoordinatorShellProps<T>) {
  const [topList, topPill] = useSlidingPill(active)
  const [bottomList, bottomPill] = useSlidingPill(active)

  const navigate = (id: T) => {
    onNavigate(id)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="coordinator-shell relative flex min-h-dvh flex-col overflow-x-clip">
      <header className="coordinator-topbar sticky top-0 z-30 border-b pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-topbar w-full max-w-content items-center gap-4 px-4 md:gap-6 md:px-8">
          <Logo height={30} onDark />

          <nav ref={topList} aria-label="Seções da direção" className="relative hidden flex-1 items-center gap-1 md:flex">
            {topPill && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 rounded-md bg-azul-claro transition-[transform,width] duration-slow ease-spring"
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
                  className={`relative z-10 inline-flex h-10 items-center gap-2 rounded-md px-3 text-small font-medium whitespace-nowrap transition-[color,transform] duration-fast ease-standard active:scale-95 ${
                    selected ? 'text-ink-950' : 'text-ink-200 hover:text-branco'
                  }`}
                >
                  <span className={selected ? 'text-current' : 'text-azul-claro'}>{item.icon}</span>
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <Avatar name={userName} size="sm" />
            <span className="hidden text-small font-medium text-ink-100 lg:inline">{userName}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="min-w-0 flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <div key={String(active)} className="mx-auto w-full max-w-content animate-rise [animation-fill-mode:backwards] space-y-4 px-4 py-4 md:space-y-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>

      <nav
        ref={bottomList}
        aria-label="Seções da direção"
        className="coordinator-bottomnav fixed inset-x-0 bottom-0 z-30 grid auto-cols-fr grid-flow-col border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        {bottomPill && (
          <span
            aria-hidden="true"
            className="absolute top-2 h-7 w-12 rounded-full bg-azul-claro transition-transform duration-slow ease-spring"
            style={{ transform: `translateX(${bottomPill.left + bottomPill.width / 2 - 24}px)` }}
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
              className={`relative z-10 flex h-14 flex-col items-center justify-center gap-0.5 px-1 text-caption font-medium transition-colors duration-fast active:bg-branco/10 ${
                selected ? 'text-ink-950' : 'text-ink-200'
              }`}
            >
              <span className={`flex h-7 items-center ${selected ? '' : 'text-azul-claro'}`}>{item.icon}</span>
              <span className="max-w-full truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
