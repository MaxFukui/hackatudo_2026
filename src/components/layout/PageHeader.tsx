import type { ReactNode } from 'react'

interface PageHeaderProps {
  /** Texto pequeno acima do título: contexto (turma, período). */
  eyebrow?: string
  title: string
  description?: string
  /** Um botão primário, no máximo; o resto secondary/ghost. No celular dividem a largura, primário por último (à direita, no polegar). */
  actions?: ReactNode
}

// O único h1 da página. Tudo que vem depois começa em h2.
export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-6">
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-caption font-medium text-fg-muted">{eyebrow}</p>}
        <h1 className="text-h1 font-semibold text-fg">{title}</h1>
        {description && <p className="mt-1 max-w-prose text-body text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-2 sm:shrink-0 [&>*]:flex-1 sm:[&>*]:flex-none">{actions}</div>}
    </div>
  )
}
