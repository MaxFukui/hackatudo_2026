import { Badge, Card, Spinner } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { PERFORMANCE_LABEL } from '@/lib/format'
import { evaluateStudent } from '@/services/ai'
import type { Student } from '@/types'

export function AiEvaluationCard({ student }: { student: Student }) {
  const { data, loading } = useAsync(() => evaluateStudent(student.id), [student.id])

  return (
    <Card title={student.name} action={data && <Badge tone="info">{PERFORMANCE_LABEL[data.performanceLevel]}</Badge>}>
      {loading || !data ? (
        <Spinner label="Gerando avaliação…" />
      ) : (
        <div className="space-y-3 text-sm">
          <Section title="Pontos fortes" items={data.strengths} />
          <Section title="Pontos de atenção" items={data.attentionPoints} />
          <Section title="Recomendações" items={data.recommendations} />
        </div>
      )}
    </Card>
  )
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <ul className="mt-1 list-disc space-y-0.5 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
