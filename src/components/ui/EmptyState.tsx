import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-stone-300 p-8 text-center">
      <p className="font-medium text-stone-700">{title}</p>
      {description && <p className="max-w-sm text-sm text-stone-500">{description}</p>}
      {action}
    </div>
  )
}
