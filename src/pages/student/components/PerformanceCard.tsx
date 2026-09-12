import { ScoreDonut } from '@/components/charts/ScoreDonut'
import { Badge, Card } from '@/components/ui'
import { formatGrade, formatPercent, PERFORMANCE_LABEL } from '@/lib/format'
import type { StudentPerformance } from '@/types'

export function PerformanceCard({ performance }: { performance: StudentPerformance }) {
  return (
    <Card title="Desempenho" action={<Badge tone="success">{PERFORMANCE_LABEL[performance.performanceLevel]}</Badge>}>
      <div className="flex flex-wrap items-center gap-6">
        <ScoreDonut value={performance.overallScore} label="Geral" />
        <dl className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-stone-500">Média</dt>
            <dd className="text-lg font-semibold tabular-nums">{formatGrade(performance.averageGrade)}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Presença</dt>
            <dd className="text-lg font-semibold tabular-nums">{formatPercent(performance.attendanceRate)}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Participação</dt>
            <dd className="text-lg font-semibold tabular-nums">{formatPercent(performance.participationRate)}</dd>
          </div>
        </dl>
      </div>
    </Card>
  )
}
