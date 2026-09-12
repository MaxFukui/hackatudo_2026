import { Children, type ReactNode } from 'react'

export type GridLayout = 'stats' | 'two' | 'three' | 'main-aside' | 'aside-main'

// Grids com nome: as únicas combinações de coluna que o produto usa.
// Celular sempre em 1 coluna (stats em 2). Escolha pelo conteúdo, não pelo espaço.
const LAYOUT: Record<GridLayout, string> = {
  stats: 'grid-cols-2 lg:grid-cols-4',                 // fileira de Stat: 2×2 no celular, 4 no desktop
  two: 'md:grid-cols-2',                                // dois blocos de mesmo peso
  three: 'md:grid-cols-2 lg:grid-cols-3',               // três blocos iguais (lista de cards)
  'main-aside': 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]', // principal à esquerda, apoio à direita
  'aside-main': 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]', // apoio à esquerda
}

interface GridProps {
  layout: GridLayout
  /** Cards na mesma linha ficam com a mesma altura. Desligue para alinhar pelo topo. */
  stretch?: boolean
  /** Filhos entram um após o outro (40ms). Para a primeira pintura de uma seção; não para listas que atualizam. */
  stagger?: boolean
  className?: string
  children: ReactNode
}

export function Grid({ layout, stretch = true, stagger = false, className = '', children }: GridProps) {
  return (
    <div className={`grid gap-3 md:gap-4 ${LAYOUT[layout]} ${stretch ? '' : 'items-start'} ${className}`}>
      {stagger
        ? Children.map(children, (child, i) => (
            <div className="flex min-w-0 animate-rise [&>*]:flex-1" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
