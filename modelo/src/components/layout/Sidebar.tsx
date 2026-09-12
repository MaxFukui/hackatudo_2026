import type { ReactNode } from 'react'

export interface NavItem<T extends string> {
  id: T
  label: string
  /** 20px, stroke 1.75. Obrigatório se a área for usada no celular: a barra inferior mostra ícone + rótulo. */
  icon?: ReactNode
}

interface SidebarProps<T extends string> {
  items: NavItem<T>[]
  active: T
  onChange: (id: T) => void
}

// Desktop: coluna fixa à esquerda. Celular: barra fixa no rodapé, na zona do polegar (máx. 5 itens).
export function Sidebar<T extends string>({ items, active, onChange }: SidebarProps<T>) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden border-r border-border bg-surface md:block md:w-sidebar md:shrink-0">
        <nav aria-label="Seções" className="sticky top-topbar flex flex-col gap-1 p-3">
          {items.map((item) => {
            const selected = item.id === active
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={selected ? 'page' : undefined}
                className={`inline-flex h-9 items-center gap-2.5 rounded-md px-3 text-small font-medium whitespace-nowrap transition-[background-color,color,transform] duration-fast ease-standard active:scale-98 ${
                  selected ? 'bg-primary-soft text-primary-soft-fg' : 'text-fg-muted hover:bg-surface-muted hover:text-fg'
                }`}
              >
                {item.icon && <span className={selected ? 'text-current' : 'text-fg-subtle'}>{item.icon}</span>}
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Celular */}
      <nav
        aria-label="Seções"
        className="fixed inset-x-0 bottom-0 z-30 grid auto-cols-fr grid-flow-col border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {items.slice(0, 5).map((item) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-current={selected ? 'page' : undefined}
              className={`flex h-14 flex-col items-center justify-center gap-0.5 px-1 text-caption font-medium transition-colors duration-fast active:bg-surface-muted ${
                selected ? 'text-fg' : 'text-fg-muted'
              }`}
            >
              {item.icon ? (
                <span className={`flex h-6 items-center rounded-full px-3 transition-colors duration-base ${selected ? 'animate-pop bg-primary-soft' : ''}`}>{item.icon}</span>
              ) : (
                <span className={`h-0.5 w-6 rounded-full ${selected ? 'bg-primary' : 'bg-transparent'}`} />
              )}
              <span className="max-w-full truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
