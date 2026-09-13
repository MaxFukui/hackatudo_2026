import { useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { SUBJECT_EMOJI, SUBJECT_TILE } from '@/pages/student/lib/materias'
import { Badge, Button, Card, EmptyState, Modal } from '@/components/ui'
import type { Material, Student, SubjectId } from '@/pages/student/data/aluno'
import { IconPlay } from '../icons'
import { Chips, IconTile, StudentHeader, SubjectBadge } from './shared'

type Filter = 'todas' | SubjectId

const KIND: Record<Material['kind'], { label: string; emoji: string }> = {
  exercicios: { label: 'Exercícios', emoji: '✏️' },
  video: { label: 'Vídeo', emoji: '🎬' },
  leitura: { label: 'Leitura', emoji: '📖' },
  jogo: { label: 'Jogo', emoji: '🎮' },
}

interface Props {
  student: Student
  /** Abre a sessão de 50 questões do material. */
  onStart: (material: Material) => void
}

// Materiais que a escola disponibiliza, por matéria. Cada card tem o próprio botão "Começar".
export function Materiais({ student, onStart }: Props) {
  const [filter, setFilter] = useState<Filter>('todas')
  const [open, setOpen] = useState<Material | null>(null)

  const chips = [
    { id: 'todas' as Filter, label: 'Todas', count: student.materials.length },
    ...student.subjects.map((s) => ({ id: s.id as Filter, label: s.name, emoji: SUBJECT_EMOJI[s.id], count: student.materials.filter((m) => m.subjectId === s.id).length })),
  ]
  const list = student.materials.filter((m) => filter === 'todas' || m.subjectId === filter)
  const subjectOf = (m: Material) => student.subjects.find((s) => s.id === m.subjectId)!

  return (
    <>
      <StudentHeader eyebrow={student.className} title="Materiais" description="Exercícios, jogos e leituras que a escola preparou. A IA monta 15 questões novas de cada um todo dia." />

      <Chips items={chips} active={filter} onChange={setFilter} label="Matéria" />

      {list.length === 0 ? (
        <EmptyState title="Nada por aqui ainda" description="A escola ainda não enviou materiais dessa matéria." />
      ) : (
        <div key={filter} className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 stagger">
          {list.map((m, i) => (
            <div key={m.id} style={{ '--stagger-index': i } as CSSProperties}>
              <Card
                className="h-full card-lift"
                footer={
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone="accent">até +30 XP/dia</Badge>
                    <Button variant="secondary" size="sm" icon={<IconPlay />} onClick={() => setOpen(m)}>
                      Começar
                    </Button>
                  </div>
                }
              >
                <div className="flex gap-3">
                  <IconTile className={SUBJECT_TILE[m.subjectId]}>{KIND[m.kind].emoji}</IconTile>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-h2 font-semibold text-fg">{m.title}</h2>
                    <p className="mt-0.5 text-small text-fg-muted">{m.description}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-small text-fg-muted">
                      <SubjectBadge subject={subjectOf(m)} />
                      <span>{KIND[m.kind].label} · 15 questões por dia</span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Portal no body: o overlay cobre a tela inteira mesmo dentro de ancestrais com transform/filter. */}
      {createPortal(
        <Modal
          open={open !== null}
          title={open?.title ?? ''}
          description={open ? `${KIND[open.kind].label} de ${subjectOf(open).name} · ${open.minutes} minutos` : undefined}
          onClose={() => setOpen(null)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(null)}>
                Depois
              </Button>
              <Button
                variant="accent"
                icon={<IconPlay />}
                onClick={() => {
                  if (open) onStart(open)
                  setOpen(null)
                }}
              >
                Começar agora
              </Button>
            </>
          }
        >
          <div className="flex gap-3">
            {open && <IconTile size="lg" className={SUBJECT_TILE[open.subjectId]}>{KIND[open.kind].emoji}</IconTile>}
            <div>
              <p className="text-reading text-fg">{open?.description}</p>
              <p className="mt-2 text-small text-fg-muted">São <strong>15 questões</strong> feitas pela IA para você hoje, com dica. Cada acerto vale <strong>2 XP</strong> (1 XP se pedir dica). Pode parar e voltar — e amanhã tem 15 novas.</p>
            </div>
          </div>
        </Modal>,
        document.body,
      )}
    </>
  )
}
