import type { ReactNode } from 'react'
import { usePressable } from '@/hooks/usePressable'

export type CardTone = 'default' | 'verde' | 'rosa' | 'azul' | 'amarelo'

// Os pares claro/escuro da paleta: fundo + borda. Para a área do aluno e destaques; no professor/diretor, default.
const TONE: Record<CardTone, string> = {
  default: 'border-border bg-surface',
  verde: 'border-verde-esc bg-verde-agua',
  rosa: 'border-rosa-esc bg-rosa-claro',
  azul: 'border-azul-esc bg-azul-claro',
  amarelo: 'border-amarelo bg-amarelo-claro',
}

interface CardProps {
  /** Fundo pastel da paleta. Máximo dois cards coloridos por tela; nunca em tabela ou formulário. */
  tone?: CardTone
  title?: string
  description?: string
  /** Canto superior direito: Badge, Button ghost/sm, texto curto. No celular desce para baixo do título se não couber. */
  action?: ReactNode
  footer?: ReactNode
  /** Remove o padding do corpo: tabela e lista que encostam na borda. */
  flush?: boolean
  /** Card inteiro clicável (abre detalhe). Ganha hover, foco e cursor. Não coloque botão dentro. */
  onClick?: () => void
  className?: string
  children: ReactNode
}

// Padding menor no celular (16px) e maior no desktop (20px): o mesmo card, o mesmo ritmo.
// Borda em vez de sombra: cards lado a lado não competem entre si.
const PAD_X = 'px-4 md:px-5'

export function Card({ tone = 'default', title, description, action, footer, flush = false, onClick, className = '', children }: CardProps) {
  const interactive = onClick !== undefined
  const pressable = usePressable(onClick)
  // <section> não pode receber role="button"; o card clicável vira <div>.
  const Root = interactive ? 'div' : 'section'

  return (
    <Root
      {...pressable}
      className={`flex w-full flex-col rounded-lg border text-left ${TONE[tone]} ${
        interactive ? 'cursor-pointer transition-[border-color,box-shadow,transform] duration-base ease-standard hover:border-border-strong hover:shadow-raised active:scale-99 active:shadow-none' : ''
      } ${className}`}
    >
      {(title || action) && (
        <header className={`flex flex-wrap items-start justify-between gap-x-3 gap-y-2 ${PAD_X} pt-4 pb-3`}>
          <div className="min-w-0 flex-1 basis-40">
            {title && <h2 className="text-h3 font-semibold text-fg">{title}</h2>}
            {description && <p className="mt-0.5 text-small text-fg-muted">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={`flex-1 ${flush ? '' : `${PAD_X} ${title ? 'pb-4 md:pb-5' : 'py-4 md:py-5'}`}`}>{children}</div>
      {footer && <footer className={`border-t border-inherit ${PAD_X} py-3 text-small text-fg-muted`}>{footer}</footer>}
    </Root>
  )
}
