import { Card } from '@/components/ui'
import { COORDINATOR_CLASSES, STATUS_LABEL, STATUS_TONE } from '../coordinatorData'
import { MetricLine } from './MetricLine'

const average = Math.round(COORDINATOR_CLASSES.reduce((sum, item) => sum + item.rewardProgress, 0) / COORDINATOR_CLASSES.length)

export function PerformanceDistribution() {
  const statusCounts = COORDINATOR_CLASSES.reduce(
    (acc, item) => {
      acc[item.status] += 1
      return acc
    },
    { healthy: 0, attention: 0, risk: 0 },
  )

  return (
    <Card title="Saúde das turmas" description="Combina notas, presença, participação e entregas.">
      <MetricLine label="Progresso médio das metas coletivas" value={average} tone="accent" />
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {(['healthy', 'attention', 'risk'] as const).map((status) => (
          <div key={status} className={`rounded-lg px-3 py-2 text-center ${STATUS_TONE[status] === 'success' ? 'bg-success-soft' : STATUS_TONE[status] === 'warning' ? 'bg-warning-soft' : 'bg-danger-soft'}`}>
            <dt className="text-caption text-fg-muted">{STATUS_LABEL[status]}</dt>
            <dd className="text-xl font-semibold tabular-nums text-fg">{statusCounts[status]}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 space-y-2">
        {COORDINATOR_CLASSES.slice(0, 4).map((item) => (
          <div key={item.id} className="grid grid-cols-[5rem_1fr_auto] items-center gap-3 text-small">
            <span className="font-medium text-fg">{item.name}</span>
            <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full rounded-full bg-accent" style={{ width: `${item.rewardProgress}%` }} />
            </div>
            <span className="tabular-nums text-fg-muted">{item.rewardProgress}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
