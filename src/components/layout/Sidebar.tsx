import type { TabItem } from '@/components/ui'

interface SidebarProps<T extends string> {
  items: TabItem<T>[]
  active: T
  onChange: (id: T) => void
}

export function Sidebar<T extends string>({ items, active, onChange }: SidebarProps<T>) {
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white p-2 md:w-56 md:flex-col md:border-b-0 md:border-r">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          aria-current={item.id === active ? 'page' : undefined}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
            item.id === active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
