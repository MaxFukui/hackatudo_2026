import type { ReactNode } from 'react'
import type { TabItem } from '@/components/ui'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

interface AppShellProps<T extends string> {
  userName: string
  nav: TabItem<T>[]
  active: T
  onNavigate: (id: T) => void
  children: ReactNode
}

// Casca comum das páginas logadas: topo + navegação lateral + conteúdo.
export function AppShell<T extends string>({ userName, nav, active, onNavigate, children }: AppShellProps<T>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar userName={userName} />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar items={nav} active={active} onChange={onNavigate} />
        <main className="flex-1 space-y-6 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
