import type { FormHTMLAttributes, ReactNode } from 'react'
import { Alert } from './Alert'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

// noValidate: a validação nativa do navegador mostra balões inconsistentes e em inglês.
// Validamos nós, no blur e no submit, com mensagem embaixo do campo.
export function Form({ children, className = '', ...props }: FormProps) {
  return (
    <form noValidate className={`space-y-6 ${className}`} {...props}>
      {children}
    </form>
  )
}

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
}

// Formulário com mais de 5 campos: separe em seções com título. A pessoa vê onde está.
export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-3">
        <span className="block text-h3 font-semibold text-fg">{title}</span>
        {description && <span className="mt-0.5 block text-small text-fg-muted">{description}</span>}
      </legend>
      {children}
    </fieldset>
  )
}

// Dois campos curtos lado a lado no desktop (CEP e número, dia e hora). Celular: um por linha.
export function FormRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>
}

// Depois do último campo, nunca fixo no rodapé (o teclado cobre). Primário por último.
// Celular: dividem a largura. Desktop: à direita.
export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 border-t border-border pt-4 [&>*]:flex-1 md:justify-end md:[&>*]:flex-none">{children}</div>
}

interface FormErrorSummaryProps {
  /** Mapa campo → mensagem. Vazio = não renderiza. */
  errors: Record<string, string | undefined>
  labels: Record<string, string>
}

// No submit com erro: resumo no topo, um link por campo. Toca o link, o foco vai para o campo.
// Sem isso, no celular a pessoa aperta Salvar e não vê o erro que ficou lá em cima.
export function FormErrorSummary({ errors, labels }: FormErrorSummaryProps) {
  const entries = Object.entries(errors).filter((e): e is [string, string] => Boolean(e[1]))
  if (entries.length === 0) return null
  return (
    <Alert tone="danger" title={entries.length === 1 ? 'Falta corrigir 1 campo' : `Faltam corrigir ${entries.length} campos`} animate>
      <ul className="mt-1 space-y-0.5">
        {entries.map(([id, msg]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.focus()
              }}
              className="font-medium underline underline-offset-2"
            >
              {labels[id] ?? id}
            </a>
            : {msg}
          </li>
        ))}
      </ul>
    </Alert>
  )
}
