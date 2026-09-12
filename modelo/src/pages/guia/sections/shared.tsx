import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  lead?: string
  children: ReactNode
}

export function Section({ id, title, lead, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 space-y-5 border-t border-border pt-8">
      <div className="max-w-prose">
        <h2 className="text-h2 font-semibold">{title}</h2>
        {lead && <p className="mt-1 text-body text-fg-muted">{lead}</p>}
      </div>
      {children}
    </section>
  )
}

interface SpecProps {
  /** Nome do que está sendo mostrado, em código: "variant=primary". */
  label: string
  note?: string
  children: ReactNode
}

// Exemplo com legenda técnica. O conteúdo é o componente real, não uma imagem dele.
export function Spec({ label, note, children }: SpecProps) {
  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="p-5">{children}</div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border px-5 py-2.5">
        <code className="font-mono text-caption text-fg">{label}</code>
        {note && <span className="text-caption text-fg-muted">{note}</span>}
      </div>
    </div>
  )
}

interface SwatchProps {
  cls: string
  name: string
  note?: string
  placeholder?: boolean
}

export function Swatch({ cls, name, note, placeholder = false }: SwatchProps) {
  return (
    <div className={`flex h-20 flex-col justify-end rounded-md p-2.5 ${cls}`}>
      <span className="font-mono text-caption font-medium">{name}</span>
      {(note || placeholder) && <span className="text-caption">{placeholder ? 'provisório' : note}</span>}
    </div>
  )
}

export function Rule({ children }: { children: ReactNode }) {
  return <li className="flex gap-3 text-body"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-fg" />{children}</li>
}
