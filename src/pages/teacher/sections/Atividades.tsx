import { useState, type FormEvent } from 'react'
import { Badge, Button, Card, Form, FormActions, Input, ProgressBar, Select } from '@/components/ui'
import { IconBook } from '@/pages/student/icons'
import { fmtGrade } from '@/pages/student/lib/materias'
import { IconTile, StudentHeader } from '@/pages/student/sections/shared'
import type { ActivityType } from '@/types'
import { ACTIVITY_LABEL, TEACHER, type ClassActivity } from '../data/turma'

interface Props {
  activities: ClassActivity[]
  total: number
  onCreate: (activity: ClassActivity) => void
}

const TYPES: ActivityType[] = ['exercise', 'quiz', 'homework', 'exam']

export function Atividades({ activities, total, onCreate }: Props) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | undefined>()

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (!title.trim()) {
      setError('Dê um nome para a atividade, por exemplo "Frações com pizza".')
      return
    }
    onCreate({ id: crypto.randomUUID(), title: title.trim(), type: data.get('type') as ActivityType, dueLabel: String(data.get('due') || 'Sem prazo'), delivered: 0, average: null })
    setTitle('')
    setError(undefined)
  }

  return (
    <>
      <StudentHeader eyebrow={`${TEACHER.className} · ${TEACHER.subject}`} title="Atividades" description="Quem entrega ganha +10 no monstrinho; nota acima da média da turma vale +30." />

      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card title="Da turma" flush>
          <ul className="divide-y divide-border">
            {activities.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3 md:px-5 animate-rise">
                <IconTile className="bg-azul-claro text-info-soft-fg">
                  <IconBook />
                </IconTile>
                <div className="min-w-0 flex-1">
                  <p className="text-body font-medium text-fg">{a.title}</p>
                  <p className="text-small text-fg-muted">
                    {ACTIVITY_LABEL[a.type]} · {a.dueLabel}
                  </p>
                  <div className="mt-1.5 max-w-xs">
                    <ProgressBar value={a.delivered} max={total} label={`Entregas de ${a.title}`} tone={a.delivered === total ? 'success' : 'primary'} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-small text-fg-muted" data-numeric>
                    {a.delivered}/{total}
                  </p>
                  {a.average === null ? <Badge tone="warning">A corrigir</Badge> : <Badge tone="success">Média {fmtGrade(a.average)}</Badge>}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Nova atividade" description="Vai para a área do aluno na hora.">
          <Form onSubmit={submit}>
            <Input id="activity-title" label="Nome" value={title} onChange={(e) => setTitle(e.target.value)} error={error} hint="Curto e claro para a criança." />
            <Select id="activity-type" name="type" label="Tipo" defaultValue="exercise">
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {ACTIVITY_LABEL[t]}
                </option>
              ))}
            </Select>
            <Input id="activity-due" name="due" label="Prazo" placeholder="Ex.: Segunda" optional />
            <FormActions>
              <Button type="submit" className="w-full sm:w-auto">
                Criar atividade
              </Button>
            </FormActions>
          </Form>
        </Card>
      </div>
    </>
  )
}
