import { PageHeader } from '@/components/layout'
import type { Student } from '@/types'
import { PerformanceCard } from '../components/PerformanceCard'
import { StreakCard } from '../components/StreakCard'
import { SubjectList } from '../components/SubjectList'

export function HomeTab({ student }: { student: Student }) {
  return (
    <>
      <PageHeader title={`Olá, ${student.name.split(' ')[0]}`} description="Continue a sequência de hoje." />
      <div className="grid gap-4 lg:grid-cols-2">
        <StreakCard streak={student.streak} />
        <PerformanceCard performance={student.performance} />
      </div>
      <SubjectList />
    </>
  )
}
