import { PageHeader } from '@/components/layout'
import { Card, Spinner, Table, type Column } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { listTeachers } from '@/services/teachers'
import type { Teacher } from '@/types'

const COLUMNS: Column<Teacher>[] = [
  { key: 'name', header: 'Professor', render: (t) => t.name },
  { key: 'subjects', header: 'Matérias', align: 'right', render: (t) => t.subjects.length },
  { key: 'classes', header: 'Turmas', align: 'right', render: (t) => t.classes.length },
]

export function TeacherTable() {
  const { data, loading } = useAsync(listTeachers)

  return (
    <>
      <PageHeader title="Professores" />
      <Card>{loading || !data ? <Spinner /> : <Table columns={COLUMNS} rows={data} rowKey={(t) => t.id} />}</Card>
    </>
  )
}
