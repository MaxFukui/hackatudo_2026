import { useState } from 'react'
import { PageHeader } from '@/components/layout'
import { Spinner } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { listStudents } from '@/services/students'
import type { Student } from '@/types'
import { StudentDetailDrawer } from '../components/StudentDetailDrawer'
import { StudentTable } from '../components/StudentTable'

export function StudentsTab({ classId }: { classId: string }) {
  const { data, loading } = useAsync(() => listStudents(classId), [classId])
  const [selected, setSelected] = useState<Student | null>(null)

  if (loading || !data) return <Spinner />

  return (
    <>
      <PageHeader title="Alunos" />
      <StudentTable students={data} onSelect={setSelected} />
      <StudentDetailDrawer student={selected} onClose={() => setSelected(null)} />
    </>
  )
}
