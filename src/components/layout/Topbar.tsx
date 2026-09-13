import type { ReactNode } from 'react'
import { Avatar } from '@/components/ui'

interface TopbarProps {
  /** Nome do produto ou logo. */
  brand: ReactNode
  userName?: string
  /** Ações à direita (ex.: botão Sair). */
  actions?: ReactNode
}

export function Topbar({ brand, userName, actions }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[calc(var(--height-topbar)+env(safe-area-inset-top))] items-center justify-between border-b border-border bg-surface px-4 pt-[env(safe-area-inset-top)] md:px-6">
      <div className="text-body font-semibold">{brand}</div>
      <div className="flex items-center gap-3">
        {userName && (
          <>
            <span className="hidden text-small text-fg-muted sm:inline">{userName}</span>
            <Avatar name={userName} size="sm" />
          </>
        )}
        {actions}
      </div>
    </header>
  )
}
