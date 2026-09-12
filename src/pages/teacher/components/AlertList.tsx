import { Badge, Card, EmptyState } from '@/components/ui'
import { formatDate } from '@/lib/format'
import type { Alert } from '@/types'

export function AlertList({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) return <EmptyState title="Nenhum alerta" />

  return (
    <Card title="Alertas recentes">
      <ul className="divide-y divide-slate-100">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-start justify-between gap-3 py-3">
            <div>
              <p className="font-medium">{alert.title}</p>
              <p className="text-sm text-slate-600">{alert.message}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge tone={alert.severity === 'critical' ? 'danger' : 'warning'}>{alert.severity}</Badge>
              <span className="text-xs text-slate-400">{formatDate(alert.createdAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
