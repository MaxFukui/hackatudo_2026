import { useState } from 'react'
import { Badge, Button, Modal, Spinner } from '@/components/ui'
import { Mascote } from '@/pages/student/components/Mascote'
import { fmtGrade } from '@/pages/student/lib/materias'
import { levelFor, type ClassStudent } from '../data/turma'
import { evaluateLater, type StudentEvaluation } from '../lib/evaluation'
import { LEVEL_TONE, mascoteOf, PERFORMANCE_LABEL, stageOf } from '../lib/format'

interface Props {
  student: ClassStudent | null
  onClose: () => void
}

export function StudentDetail({ student, onClose }: Props) {
  return (
    <Modal open={student !== null} title={student?.name ?? ''} description={student ? subtitle(student) : undefined} onClose={onClose} footer={<Button variant="ghost" onClick={onClose}>Fechar</Button>}>
      {student && <DetailBody key={student.id} student={student} />}
    </Modal>
  )
}

function subtitle(s: ClassStudent) {
  const m = mascoteOf(s)
  return `${m.name} · ${stageOf(s).name} · ${s.xp} XP`
}

function DetailBody({ student }: { student: ClassStudent }) {
  const [evaluation, setEvaluation] = useState<StudentEvaluation | null>(null)
  const [loading, setLoading] = useState(false)
  const level = levelFor(student.averageGrade)

  const generate = async () => {
    setLoading(true)
    setEvaluation(await evaluateLater(student))
    setLoading(false)
  }

  const stats = [
    { label: 'Média', value: fmtGrade(student.averageGrade) },
    { label: 'Presença', value: `${student.attendanceRate}%` },
    { label: 'Participação', value: `${student.participationRate}%` },
    { label: 'Sequência', value: `🔥 ${student.streak}` },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Mascote mascote={mascoteOf(student)} stage={stageOf(student).stage} size={88} />
        <div className="space-y-1">
          <Badge tone={LEVEL_TONE[level]}>{PERFORMANCE_LABEL[level]}</Badge>
          <p className={`text-small ${student.trend <= -10 ? 'text-danger' : 'text-fg-muted'}`} data-numeric>
            {student.trend === 0 ? 'Estável nas últimas atividades' : `${student.trend > 0 ? 'Subiu' : 'Caiu'} ${Math.abs(student.trend)}% nas últimas três atividades`}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md bg-surface-muted px-3 py-2">
            <dt className="text-caption text-fg-muted">{s.label}</dt>
            <dd className="font-display text-h2 font-semibold text-fg" data-numeric>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <section className="rounded-lg border border-border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-h3 font-semibold text-fg">Avaliação por IA</h3>
          {!loading && (
            <Button variant={evaluation ? 'ghost' : 'accent'} size="sm" onClick={generate}>
              {evaluation ? 'Gerar de novo' : '✨ Gerar avaliação'}
            </Button>
          )}
        </div>
        {loading && (
          <div className="mt-3">
            <Spinner label="Cruzando notas, presença e participação…" />
          </div>
        )}
        {!loading && !evaluation && <p className="mt-2 text-small text-fg-muted">A IA cruza notas, presença, participação e histórico de atividades.</p>}
        {!loading && evaluation && (
          <div className="mt-3 space-y-3 animate-rise">
            <EvalList title="Pontos fortes" tone="success" items={evaluation.strengths} />
            <EvalList title="Pontos de atenção" tone="warning" items={evaluation.attention} />
            <EvalList title="Recomendações" tone="info" items={evaluation.recommendations} />
          </div>
        )}
      </section>
    </div>
  )
}

function EvalList({ title, tone, items }: { title: string; tone: 'success' | 'warning' | 'info'; items: string[] }) {
  return (
    <div>
      <Badge tone={tone}>{title}</Badge>
      <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-body text-fg">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
