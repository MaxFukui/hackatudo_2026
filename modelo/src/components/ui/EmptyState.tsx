import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

// Área vazia nunca fica em branco: diz o que falta e o que fazer.
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-border-strong px-6 py-10 text-center">
      <p className="text-body font-medium text-fg">{title}</p>
      {description && <p className="max-w-sm text-small text-fg-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
