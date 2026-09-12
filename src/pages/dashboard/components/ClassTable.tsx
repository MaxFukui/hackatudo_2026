import { PageHeader } from '@/components/layout/PageHeader'
import { Card, Table, type Column } from '@/components/ui'
import { db } from '@/services/client'
import type { SchoolClass } from '@/types'

const SHIFT_LABEL: Record<SchoolClass['shift'], string> = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  evening: 'Noite',
}

const COLUMNS: Column<SchoolClass>[] = [
  { key: 'name', header: 'Turma', render: (c) => c.name },
  { key: 'shift', header: 'Turno', render: (c) => SHIFT_LABEL[c.shift] },
  { key: 'students', header: 'Alunos', align: 'right', render: (c) => c.studentCount },
]

export function ClassTable() {
  return (
    <>
      <PageHeader title="Turmas" />
      <Card>
        <Table columns={COLUMNS} rows={db.academicContext.classes} rowKey={(c) => c.id} />
      </Card>
    </>
  )
}
