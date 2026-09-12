import { formatGrade, formatPercent } from '@/lib/format'
import type { DashboardSummary } from '@/types'
import { KpiCard } from './KpiCard'

export function KpiRow({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <KpiCard label="Alunos" value={String(summary.totalStudents)} />
      <KpiCard label="Média geral" value={formatGrade(summary.averageGrade)} />
      <KpiCard label="Presença" value={formatPercent(summary.attendanceRate)} />
      <KpiCard label="Participação" value={formatPercent(summary.participationRate)} />
      <KpiCard label="Em risco" value={String(summary.studentsAtRisk)} hint="níveis crítico + atenção" />
    </div>
  )
}
