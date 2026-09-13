interface SwitchProps {
  id: string
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

// Liga/desliga que vale na hora (sem "Salvar"). Se precisa de Salvar, é Checkbox.
export function Switch({ id, label, description, checked, onChange, disabled = false }: SwitchProps) {
  return (
    <label htmlFor={id} className={`flex min-h-11 items-center justify-between gap-4 py-2 ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
      <span className="min-w-0">
        <span className="block text-body text-fg">{label}</span>
        {description && <span className="block text-small text-fg-muted">{description}</span>}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-base ease-standard ${checked ? 'bg-primary' : 'bg-border-strong'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-6 rounded-full bg-branco shadow-raised transition-transform duration-base ease-spring ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </label>
  )
}
