import { Badge, Card, EmptyState } from '@/components/ui'
import type { Alert } from '@/types'

export function AlertFeed({ alerts }: { alerts: Alert[] }) {
  return (
    <Card title="Alertas">
      {alerts.length === 0 ? (
        <EmptyState title="Nenhum alerta" />
      ) : (
        <ul className="space-y-3">
          {alerts.map((a) => (
            <li key={a.id} className="flex items-start gap-3 text-sm">
              <Badge tone={a.severity === 'critical' ? 'danger' : 'warning'}>{a.type}</Badge>
              <span>{a.message}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
