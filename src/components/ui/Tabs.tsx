import { useEffect, useRef, useState } from 'react'
import type React from 'react'

export interface TabItem<T extends string> {
  id: T
  label: string
  count?: number
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  active: T
  onChange: (id: T) => void
  'aria-label'?: string
}

// Abas internas (troca de conteúdo no mesmo lugar). Navegação entre áreas é a Sidebar.
// O sublinhado é um só e desliza até a aba ativa — o olho acompanha para onde foi.
// Celular: a fileira vai até a borda da tela e rola de lado; a aba ativa é trazida para a vista.
export function Tabs<T extends string>({ items, active, onChange, 'aria-label': ariaLabel }: TabsProps<T>) {
  const list = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const root = list.current
    if (!root) return
    let alive = true
    const measure = () => {
      const el = root.querySelector<HTMLElement>('[aria-selected="true"]')
      if (!el || !alive) return
      setBar({ left: el.offsetLeft, width: el.offsetWidth })
      // Só a fileira rola, nunca a página (scrollIntoView rolaria a janela até as abas).
      const left = el.offsetLeft - root.clientWidth / 2 + el.offsetWidth / 2
      root.scrollTo({ left, behavior: 'smooth' })
    }
    measure()
    // A fonte chega depois e muda a largura das abas; a janela muda de tamanho.
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    return () => {
      alive = false
      ro.disconnect()
    }
  }, [active, items])

  // Setas movem entre abas (padrão WAI-ARIA): a aba focada é a ativa.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = items.findIndex((t) => t.id === active)
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : -1
    if (next < 0 || next >= items.length) return
    e.preventDefault()
    onChange(items[next].id)
    list.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <div
      ref={list}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className="relative -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto border-b border-border px-4 scrollbar-none md:mx-0 md:gap-4 md:px-0"
    >
      {items.map((item) => {
        const selected = item.id === active
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={`inline-flex h-11 shrink-0 snap-start items-center gap-2 px-1 text-small font-medium whitespace-nowrap transition-colors duration-fast ease-standard active:text-fg md:h-10 ${
              selected ? 'text-fg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {item.label}
            {item.count !== undefined && (
              <span
                className={`rounded-full px-1.5 text-caption transition-colors duration-fast ${
                  selected ? 'bg-primary-soft text-primary-soft-fg' : 'bg-surface-muted text-fg-muted'
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        )
      })}
      {bar && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 h-0.5 rounded-full bg-primary transition-[transform,width] duration-base ease-standard"
          style={{ width: bar.width, transform: `translateX(${bar.left}px)`, left: 0 }}
        />
      )}
    </div>
  )
}
