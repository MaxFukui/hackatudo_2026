import { PageHeader } from '@/components/layout/PageHeader'
import { Spinner } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { listStudents } from '@/services/students'
import { AiEvaluationCard } from '../components/AiEvaluationCard'

export function EvaluationsTab({ classId }: { classId: string }) {
  const { data, loading } = useAsync(() => listStudents(classId), [classId])
  if (loading || !data) return <Spinner />

  return (
    <>
      <PageHeader title="Avaliações por IA" subtitle="Notas, frequência, participação e histórico cruzados por aluno." />
      <div className="grid gap-4 lg:grid-cols-2">
        {data.map((student) => (
          <AiEvaluationCard key={student.id} student={student} />
        ))}
      </div>
    </>
  )
}
