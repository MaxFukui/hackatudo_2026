import { DistributionBar } from '@/components/charts/DistributionBar'
import { Card } from '@/components/ui'
import { formatGrade, formatPercent } from '@/lib/format'
import type { ClassPerformance, DashboardSummary } from '@/types'

interface ClassSummaryProps {
  summary: DashboardSummary
  performance: ClassPerformance
}

export function ClassSummary({ summary, performance }: ClassSummaryProps) {
  const stats = [
    { label: 'Alunos', value: String(summary.totalStudents) },
    { label: 'Média', value: formatGrade(summary.averageGrade) },
    { label: 'Presença', value: formatPercent(summary.attendanceRate) },
    { label: 'Em risco', value: String(summary.studentsAtRisk) },
  ]

  return (
    <Card title="Resumo da turma">
      <dl className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-xs text-fg-muted">{s.label}</dt>
            <dd className="text-2xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <DistributionBar distribution={performance.distribution} />
    </Card>
  )
}
