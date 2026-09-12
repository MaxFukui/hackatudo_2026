export interface TabItem<T extends string> {
  id: T
  label: string
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  active: T
  onChange: (id: T) => void
}

export function Tabs<T extends string>({ items, active, onChange }: TabsProps<T>) {
  return (
    <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-slate-200">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={item.id === active}
          onClick={() => onChange(item.id)}
          className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition ${
            item.id === active
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
