import type { ReactNode } from 'react'
import { Sidebar, type NavItem } from './Sidebar'
import { Topbar } from './Topbar'

interface AppShellProps<T extends string> {
  brand: ReactNode
  userName?: string
  topbarActions?: ReactNode
  nav: NavItem<T>[]
  active: T
  onNavigate: (id: T) => void
  children: ReactNode
}

// Casca de toda área logada. Celular: topbar + conteúdo + barra inferior. Desktop: topbar + sidebar + conteúdo.
export function AppShell<T extends string>({ brand, userName, topbarActions, nav, active, onNavigate, children }: AppShellProps<T>) {
  // Trocar de seção no celular: o conteúdo muda no mesmo lugar, então volta ao topo — senão a pessoa
  // cai no meio da seção nova.
  const navigate = (id: T) => {
    onNavigate(id)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Topbar brand={brand} userName={userName} actions={topbarActions} />
      <div className="flex flex-1">
        <Sidebar items={nav} active={active} onChange={navigate} />
        {/* pb no celular reserva espaço para a barra inferior + safe area */}
        <main className="min-w-0 flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
          {/* key={active}: a seção nova entra com um fade-up curto — um quadro de transição, não um show. */}
          <div key={String(active)} className="mx-auto w-full max-w-content animate-rise space-y-4 px-4 py-4 md:space-y-6 md:px-8 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
