import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

const CONTROL =
  'w-full rounded-md border border-border-strong bg-surface px-3 text-body text-fg outline-none ring-0 ring-primary/15 transition-[border-color,box-shadow] duration-fast ease-standard hover:border-fg-subtle focus:border-fg focus:ring-4 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-fg-subtle aria-invalid:border-danger aria-invalid:ring-danger/15'

export interface FieldProps {
  id: string
  label: string
  /** Aparece embaixo, em cinza. Diz o formato ou o porquê — antes de a pessoa errar. */
  hint?: string
  /** Substitui a dica, em vermelho, com ícone. Diz o que corrigir, não "inválido". */
  error?: string
  /** Marca "(opcional)" no rótulo. O padrão é obrigatório — sem asterisco. */
  optional?: boolean
  children: ReactNode
}

// Label em cima, sempre visível. Dica ou erro embaixo, no mesmo lugar (sem pular layout).
export function Field({ id, label, hint, error, optional = false, children }: FieldProps) {
  const message = error ?? hint
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-small font-medium text-fg">
        {label}
        {optional && <span className="ml-1 font-normal text-fg-muted">(opcional)</span>}
      </label>
      {children}
      {message && (
        <p
          id={`${id}-message`}
          role={error ? 'alert' : undefined}
          className={`flex items-start gap-1.5 text-caption ${error ? 'animate-rise text-danger' : 'text-fg-muted'}`}
        >
          {error && (
            <svg className="mt-px shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          )}
          {message}
        </p>
      )}
    </div>
  )
}

type Describe = { 'aria-invalid'?: true; 'aria-describedby'?: string }
function describe(id: string, hint?: string, error?: string): Describe {
  return { 'aria-invalid': error ? true : undefined, 'aria-describedby': hint || error ? `${id}-message` : undefined }
}

// Teclado certo no celular pelo tipo do campo. Quem usa o componente não precisa lembrar.
const KEYBOARD: Record<string, Partial<InputHTMLAttributes<HTMLInputElement>>> = {
  email: { inputMode: 'email', autoCapitalize: 'none', autoCorrect: 'off', spellCheck: false, autoComplete: 'email' },
  tel: { inputMode: 'tel', autoComplete: 'tel' },
  url: { inputMode: 'url', autoCapitalize: 'none', autoCorrect: 'off', spellCheck: false },
  number: { inputMode: 'decimal' },
  search: { inputMode: 'search', enterKeyHint: 'search' },
  password: { autoCapitalize: 'none', autoCorrect: 'off', spellCheck: false },
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & Omit<FieldProps, 'children'>

export function Input({ id, label, hint, error, optional, className = '', type = 'text', ...props }: InputProps) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <Field id={id} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? 'text' : type}
          {...KEYBOARD[type]}
          {...describe(id, hint, error)}
          className={`h-11 md:h-10 ${CONTROL} ${isPassword ? 'pr-11' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={show}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-fg-muted transition-colors duration-fast hover:text-fg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {show ? (
                <>
                  <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A10 10 0 0 1 12 5c5 0 9 4 10 7a11 11 0 0 1-2.5 3.5M6.6 6.6A11 11 0 0 0 2 12c1 3 5 7 10 7a10 10 0 0 0 4-.8" />
                </>
              ) : (
                <>
                  <path d="M2 12c1-3 5-7 10-7s9 4 10 7c-1 3-5 7-10 7S3 15 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
    </Field>
  )
}

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & Omit<FieldProps, 'children'>

// Com maxLength, mostra o contador — e ele fica vermelho antes de estourar (90%).
export function Textarea({ id, label, hint, error, optional, className = '', rows = 3, maxLength, value, defaultValue, onChange, ...props }: TextareaProps) {
  const [innerLen, setInnerLen] = useState(String(defaultValue ?? '').length)
  const len = value !== undefined ? String(value).length : innerLen
  const near = maxLength !== undefined && len >= maxLength * 0.9
  return (
    <Field id={id} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            setInnerLen(e.target.value.length)
            onChange?.(e)
          }}
          {...describe(id, hint, error)}
          className={`resize-y py-2 ${CONTROL} ${maxLength ? 'pb-7' : ''} ${className}`}
          {...props}
        />
        {maxLength !== undefined && (
          <span
            aria-live="polite"
            className={`pointer-events-none absolute right-3 bottom-2 text-caption ${near ? 'text-danger' : 'text-fg-subtle'}`}
            data-numeric
          >
            {len}/{maxLength}
          </span>
        )}
      </div>
    </Field>
  )
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & Omit<FieldProps, 'children'>

// Nativo (o melhor picker que existe no celular), só com a seta padronizada.
export function Select({ id, label, hint, error, optional, className = '', children, ...props }: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <select id={id} {...describe(id, hint, error)} className={`h-11 appearance-none pr-10 md:h-10 ${CONTROL} ${className}`} {...props}>
          {children}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-fg-muted"
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </Field>
  )
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  description?: string
}

// Linha inteira é o alvo (44px). Descrição opcional embaixo, em cinza.
export function Checkbox({ label, description, id, className = '', ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className={`flex min-h-11 cursor-pointer items-start gap-3 py-2 text-body md:min-h-10 ${className}`}>
      <input id={id} type="checkbox" className="mt-0.5 size-5 shrink-0 rounded-sm border-border-strong accent-primary md:size-4 md:mt-1" {...props} />
      <span>
        <span className="block">{label}</span>
        {description && <span className="block text-small text-fg-muted">{description}</span>}
      </span>
    </label>
  )
}
