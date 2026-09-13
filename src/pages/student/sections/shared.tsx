import type { CSSProperties, ReactNode } from 'react'
import { Badge } from '@/components/ui'
import { Mascote } from '@/pages/student/components/Mascote'
import type { Mascote as MascoteData, StageIndex } from '@/pages/student/lib/mascotes'
import type { Subject } from '@/pages/student/data/aluno'
import { subjectTone } from '@/pages/student/lib/materias'

/** Cabeçalho das abas do aluno: título em Fredoka, como o Início. O único h1 da tela. */
export function StudentHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div>
      {eyebrow && <p className="text-body font-medium text-fg-muted">{eyebrow}</p>}
      <h1 className="font-display text-display font-semibold text-fg">{title}</h1>
      {description && <p className="mt-1 max-w-prose text-reading text-fg-muted">{description}</p>}
    </div>
  )
}

/** Ícone num quadrado pastel. Tamanho md nas listas, lg nos cartões de número. */
export function IconTile({ children, className = '', size = 'md' }: { children: ReactNode; className?: string; size?: 'md' | 'lg' }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-lg ${size === 'lg' ? 'size-16 text-[2rem] [&_svg]:size-7' : 'size-12 text-[1.5rem] [&_svg]:size-6'} ${className}`} aria-hidden="true">
      {children}
    </span>
  )
}

/** Cartão de número: ícone + rótulo + valor grande. Em grid de 3 com `stagger`. */
export function Tile({ icon, iconClass, label, value, detail, index, glow = '', children }: { icon: ReactNode; iconClass: string; label: string; value: string; detail?: string; index: number; /** Classe de gradiente: `to-accent-soft/40`. */ glow?: string; children?: ReactNode }) {
  return (
    <div className={`card-lift flex gap-4 rounded-lg border border-border bg-linear-to-br from-surface from-40% px-4 py-4 md:px-5 ${glow || 'to-surface'}`} style={{ '--stagger-index': index } as CSSProperties}>
      <IconTile size="lg" className={iconClass}>{icon}</IconTile>
      <div className="min-w-0 flex-1">
        <p className="text-small text-fg-muted">{label}</p>
        <p className="font-display text-numeral font-semibold text-fg" data-numeric>{value}</p>
        {detail && <p className="text-small text-fg-muted">{detail}</p>}
        {children}
      </div>
    </div>
  )
}

/** Fileira de pílulas para filtrar (Todas · Matemática · …). Alvo grande, rola de lado no celular. */
export function Chips<T extends string>({ items, active, onChange, label }: { items: { id: T; label: string; count?: number; emoji?: string }[]; active: T; onChange: (id: T) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none md:mx-0 md:flex-wrap md:px-0">
      {items.map((c) => {
        const selected = c.id === active
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(c.id)}
            className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-small font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-fast ease-standard active:scale-97 md:h-10 ${
              selected ? 'border-primary bg-primary text-primary-fg' : 'border-border-strong bg-surface text-fg-muted hover:border-fg-subtle hover:text-fg'
            }`}
          >
            {c.emoji && <span aria-hidden="true">{c.emoji}</span>}
            {c.label}
            {c.count !== undefined && <span className={`rounded-full px-1.5 text-caption ${selected ? 'bg-surface/20' : 'bg-surface-muted'}`} data-numeric>{c.count}</span>}
          </button>
        )
      })}
    </div>
  )
}

/** Palco do mascote: círculo de luz atrás, sombra no chão, estrelinhas piscando e a plaquinha com o nome. */
export function MascoteStage({ mascote, stage, cheer, size = 240, label }: { mascote: MascoteData; stage: StageIndex; cheer?: number; size?: number; label?: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-[55%] rounded-full bg-surface/70 blur-2xl" />
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 h-4 w-[45%] -translate-x-1/2 rounded-full bg-ink-950/10 blur-md" />
      <svg aria-hidden="true" className="absolute top-[12%] left-[14%] w-6 text-amarelo animate-twinkle" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" /></svg>
      <svg aria-hidden="true" className="absolute top-[20%] right-[12%] w-4 text-laranja animate-twinkle" style={{ animationDelay: '0.8s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" /></svg>
      <svg aria-hidden="true" className="absolute bottom-[22%] right-[18%] w-5 text-branco animate-twinkle" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" /></svg>
      <div key={`${mascote.id}-${stage}`} className="relative animate-pop">
        <Mascote mascote={mascote} stage={stage} size={size} cheer={cheer} />
      </div>
      {label && (
        <span className="relative -mt-2 rounded-full border border-border bg-surface px-3 py-1 font-display text-h3 font-semibold text-fg shadow-raised animate-rise" style={{ animationDelay: '250ms' }}>
          {label}
        </span>
      )}
    </div>
  )
}

/** Badge da matéria, na cor do mascote dela. */
export function SubjectBadge({ subject }: { subject: Subject }) {
  return <Badge tone={subjectTone(subject.id)}>{subject.name}</Badge>
}

/** Strike da matéria: dias seguidos. Laranja com ponto quando está quente (5+). */
export function StrikeBadge({ days }: { days: number }) {
  return (
    <Badge tone={days >= 5 ? 'accent' : 'neutral'} dot={days >= 5}>
      🔥 {days} {days === 1 ? 'dia' : 'dias'}
    </Badge>
  )
}
