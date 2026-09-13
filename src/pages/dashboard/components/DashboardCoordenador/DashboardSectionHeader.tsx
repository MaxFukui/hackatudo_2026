import type { ReactNode } from 'react'

interface DashboardSectionHeaderProps {
  title: string
  description: string
  actions?: ReactNode
}

export function DashboardSectionHeader({ title, description, actions }: DashboardSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-6">
      <div className="min-w-0">
        <p className="mb-1 text-caption font-medium uppercase tracking-wide text-laranja">Direção</p>
        <h1 className="text-h1 font-semibold text-fg">{title}</h1>
        <p className="mt-1 max-w-prose text-body text-fg-muted">{description}</p>
      </div>
      {actions && <div className="flex gap-2 sm:shrink-0 [&>*]:flex-1 sm:[&>*]:flex-none">{actions}</div>}
    </div>
  )
}
