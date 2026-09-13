import { Card } from '@/components/ui'
import { ClassTag } from './ClassTag'
import { COORDINATION_ALERTS } from './coordinatorData'

export function AlertFeed() {
  return (
    <Card title="Alertas Pedagógicos" description="Prioridades para a coordenação acompanhar.">
      <ul className="space-y-3">
        {COORDINATION_ALERTS.map((alert) => (
          <li key={alert.id} className="rounded-lg border border-border bg-surface-muted p-3">
            <div className="flex flex-wrap items-center gap-2">
              <ClassTag name={alert.scope} />
              <h3 className="text-small font-semibold text-fg">{alert.title}</h3>
            </div>
            <p className="mt-2 text-small text-fg-muted">{alert.message}</p>
            <div className="mt-3 rounded-md bg-surface px-3 py-2">
              <p className="text-caption font-medium uppercase tracking-wide text-fg-subtle">Ação sugerida</p>
              <p className="mt-1 text-small font-medium text-fg">{alert.action}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
