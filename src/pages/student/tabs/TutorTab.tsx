import { PageHeader } from '@/components/layout/PageHeader'
import type { Student } from '@/types'
import { AiTutorChat } from '../components/AiTutorChat'

export function TutorTab({ student }: { student: Student }) {
  return (
    <>
      <PageHeader title="Tutor IA" subtitle="Dicas e explicações — a resposta final é sua." />
      <AiTutorChat studentId={student.id} />
    </>
  )
}
