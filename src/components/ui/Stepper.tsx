import { Field } from './Field'

interface StepperProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  hint?: string
  error?: string
  /** Formata o valor exibido: nota "8,5", tempo "10 min". */
  format?: (value: number) => string
}

// Número pequeno num intervalo conhecido (nota 0–10, minutos, quantidade): dois botões grandes
// batem digitar em teclado numérico no celular. Para número livre, Input type="number".
export function Stepper({ id, label, value, onChange, min = 0, max = 100, step = 1, hint, error, format }: StepperProps) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, Math.round(v / step) * step)))
  const btn =
    'flex h-11 w-12 items-center justify-center text-fg transition-colors duration-fast hover:bg-surface-muted active:bg-border disabled:opacity-40 disabled:hover:bg-transparent md:h-10'
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <div
        className={`inline-flex overflow-hidden rounded-md border bg-surface ${error ? 'border-danger' : 'border-border-strong'}`}
      >
        <button type="button" className={btn} onClick={() => set(value - step)} disabled={value <= min} aria-label="Diminuir">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
        </button>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => set(Number(e.target.value))}
          className="w-20 border-x border-border-strong bg-surface text-center text-body font-medium text-fg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          data-numeric
        />
        <button type="button" className={btn} onClick={() => set(value + step)} disabled={value >= max} aria-label="Aumentar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </button>
        {format && <span className="flex items-center px-3 text-small text-fg-muted">{format(value)}</span>}
      </div>
    </Field>
  )
}
