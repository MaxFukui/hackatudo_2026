import { Card } from '@/components/ui'
import { formatGrade } from '@/lib/format'
import { SUBJECT_COLOR, SUBJECT_INSIGHTS } from './coordinatorData'
import { MetricLine } from './MetricLine'

export function SubjectInsights() {
  return (
    <Card title="Leitura por Matéria" description="Onde o engajamento ajuda e onde a aprendizagem ainda pede apoio.">
      <div className="grid gap-3 md:grid-cols-2">
        {SUBJECT_INSIGHTS.map((item) => (
          <article key={item.id} className="rounded-lg border border-border bg-surface-muted p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 gap-2">
                <span className={`mt-1 size-2.5 shrink-0 rounded-full ${SUBJECT_COLOR[item.color]}`} aria-hidden="true" />
                <div>
                  <h3 className="text-small font-semibold text-fg">{item.subject}</h3>
                  <p className="mt-1 text-caption text-fg-muted">Média {formatGrade(item.averageGrade)}</p>
                </div>
              </div>
              <div className="rounded-md bg-surface px-2 py-1 text-right">
                <p className="text-lg font-semibold tabular-nums text-fg">{item.engagement}%</p>
                <p className="text-caption text-fg-subtle">engajamento</p>
              </div>
            </div>
            <div className="mt-3">
              <MetricLine label="Engajamento" value={item.engagement} />
            </div>
            <p className="mt-3 text-caption text-fg-muted">{item.note}</p>
          </article>
        ))}
      </div>
    </Card>
  )
}
