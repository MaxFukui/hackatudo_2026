import type { ReactNode } from 'react'

export interface ChoiceOption<V extends string> {
  value: V
  label: string
  description?: string
  /** 20–24px. Para a criança, um ícone vale mais que a descrição. */
  icon?: ReactNode
}

interface ChoiceGroupProps<V extends string> {
  name: string
  label: string
  options: ChoiceOption<V>[]
  value: V | null
  onChange: (value: V) => void
  hint?: string
  error?: string
  /** Colunas no celular. Até 3 opções curtas cabem lado a lado; textos longos, 1. */
  columns?: 1 | 2 | 3
}

// Escolha entre poucas opções (2–5), cada uma um bloco grande de tocar — não um radio de 16px.
// É a forma certa de perguntar qualquer coisa para a criança. Para mais de 5 opções, Select.
export function ChoiceGroup<V extends string>({ name, label, options, value, onChange, hint, error, columns = 1 }: ChoiceGroupProps<V>) {
  const cols = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' }[columns]
  const message = error ?? hint
  return (
    <fieldset className="space-y-1.5">
      <legend className="mb-1.5 block text-small font-medium text-fg">{label}</legend>
      <div role="radiogroup" className={`grid gap-2 ${cols}`}>
        {options.map((opt) => {
          const selected = opt.value === value
          return (
            <label
              key={opt.value}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border-2 px-3 py-2.5 transition-[border-color,background-color,transform] duration-fast ease-standard active:scale-99 ${
                selected ? 'border-primary bg-primary-soft' : 'border-border-strong bg-surface hover:border-fg-subtle'
              } ${columns > 1 ? 'flex-col justify-center text-center' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                aria-describedby={message ? `${name}-message` : undefined}
                className="sr-only"
              />
              {opt.icon && <span className={selected ? 'text-fg' : 'text-fg-muted'}>{opt.icon}</span>}
              <span className="min-w-0">
                <span className="block text-body font-medium text-fg">{opt.label}</span>
                {opt.description && <span className="block text-small text-fg-muted">{opt.description}</span>}
              </span>
              {columns === 1 && (
                <span
                  aria-hidden="true"
                  className={`ml-auto flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-fast ${
                    selected ? 'border-primary bg-primary' : 'border-border-strong'
                  }`}
                >
                  {selected && <span className="size-2 rounded-full bg-primary-fg" />}
                </span>
              )}
            </label>
          )
        })}
      </div>
      {message && (
        <p id={`${name}-message`} role={error ? 'alert' : undefined} className={`text-caption ${error ? 'animate-rise text-danger' : 'text-fg-muted'}`}>
          {message}
        </p>
      )}
    </fieldset>
  )
}
