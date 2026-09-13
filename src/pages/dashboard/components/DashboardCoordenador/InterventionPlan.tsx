import { Card } from '@/components/ui'
import { ClassTags } from './ClassTag'
import { INTERVENTIONS } from './coordinatorData'

export function InterventionPlan() {
  return (
    <Card title="Plano de Ação" description="Próximas decisões sugeridas para a coordenação.">
      <ol className="space-y-3">
        {INTERVENTIONS.map((item, index) => (
          <li key={item.id} className="grid gap-3 rounded-lg border border-border bg-surface-muted p-3 md:grid-cols-[2rem_1fr]">
            <div className="flex size-8 items-center justify-center rounded-full bg-surface text-caption font-semibold text-fg" data-numeric>
              {index + 1}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <ClassTags scope={item.scope} />
                <h3 className="text-small font-semibold text-fg">{item.title}</h3>
              </div>
              <p className="mt-2 text-small text-fg-muted">{item.reason}</p>
              <p className="mt-2 text-caption text-fg-subtle">
                {item.owner} · {item.due}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  )
}
