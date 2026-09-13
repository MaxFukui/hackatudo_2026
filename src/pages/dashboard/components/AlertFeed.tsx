import { Badge, Card } from '@/components/ui'
import { COORDINATION_ALERTS } from '../coordinatorData'

export function AlertFeed() {
  return (
    <Card title="Alertas pedagógicos" description="Prioridades para a coordenação acompanhar.">
      <ul className="space-y-3">
        {COORDINATION_ALERTS.map((alert) => (
          <li key={alert.id} className="rounded-lg border border-border p-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={alert.severity === 'critical' ? 'danger' : alert.severity === 'warning' ? 'warning' : 'info'} dot>
                {alert.scope}
              </Badge>
              <h3 className="text-small font-semibold text-fg">{alert.title}</h3>
            </div>
            <p className="mt-2 text-small text-fg-muted">{alert.message}</p>
            <p className="mt-2 text-caption font-medium text-fg">{alert.action}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
