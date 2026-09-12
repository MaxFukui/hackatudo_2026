import { Avatar, Badge, Card, Table, type Column } from '@/components/ui'
import { formatGrade, formatPercent, PERFORMANCE_LABEL } from '@/lib/format'
import type { Student } from '@/types'

const COLUMNS: Column<Student>[] = [
  {
    key: 'name',
    header: 'Aluno',
    render: (s) => (
      <span className="flex items-center gap-2">
        <Avatar name={s.name} size={28} />
        {s.name}
      </span>
    ),
  },
  { key: 'grade', header: 'Média', align: 'right', render: (s) => formatGrade(s.performance.averageGrade) },
  { key: 'attendance', header: 'Presença', align: 'right', render: (s) => formatPercent(s.performance.attendanceRate) },
  { key: 'streak', header: 'Streak', align: 'right', render: (s) => s.streak.current },
  { key: 'level', header: 'Nível', render: (s) => <Badge>{PERFORMANCE_LABEL[s.performance.performanceLevel]}</Badge> },
]

interface StudentTableProps {
  students: Student[]
  onSelect: (student: Student) => void
}

export function StudentTable({ students, onSelect }: StudentTableProps) {
  return (
    <Card>
      <Table columns={COLUMNS} rows={students} rowKey={(s) => s.id} onRowClick={onSelect} />
    </Card>
  )
}
