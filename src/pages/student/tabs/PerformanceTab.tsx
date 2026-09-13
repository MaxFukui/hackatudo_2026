import { PageHeader } from '@/components/layout'
import type { Student } from '@/types'
import { PerformanceCard } from '../components/PerformanceCard'

export function PerformanceTab({ student }: { student: Student }) {
  return (
    <>
      <PageHeader title="Desempenho" />
      <PerformanceCard performance={student.performance} />
    </>
  )
}
