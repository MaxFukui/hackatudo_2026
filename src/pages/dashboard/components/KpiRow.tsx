import { formatGrade, formatPercent } from '@/lib/format'
import type { COORDINATOR_SUMMARY } from '../coordinatorData'
import { KpiCard } from './KpiCard'

type CoordinatorSummary = typeof COORDINATOR_SUMMARY

export function KpiRow({ summary }: { summary: CoordinatorSummary }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
      <KpiCard label="Alunos" value={String(summary.totalStudents)} />
      <KpiCard label="Média geral" value={formatGrade(summary.averageGrade)} />
      <KpiCard label="Presença" value={formatPercent(summary.attendanceRate)} />
      <KpiCard label="Participação" value={formatPercent(summary.participationRate)} />
      <KpiCard label="Em atenção" value={String(summary.studentsAtRisk)} hint="precisam de acompanhamento" />
      <KpiCard label="Metas" value={formatPercent(summary.collectiveProgress)} hint="progresso médio coletivo" />
    </div>
  )
}
