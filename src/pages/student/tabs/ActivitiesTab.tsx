import { PageHeader } from '@/components/layout/PageHeader'
import type { Student } from '@/types'
import { ActivityList } from '../components/ActivityList'

export function ActivitiesTab({ student }: { student: Student }) {
  return (
    <>
      <PageHeader title="Atividades" />
      <ActivityList student={student} />
    </>
  )
}
