import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

export function Card({ title, action, className = '', children }: CardProps) {
  return (
    <section className={`rounded-xl border border-stone-200 bg-white p-5 ${className}`}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-2">
          {title && <h2 className="text-sm font-semibold text-stone-700">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  )
}
