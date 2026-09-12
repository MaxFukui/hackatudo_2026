import { Modal } from '@/components/ui'
import { formatGrade, formatPercent } from '@/lib/format'
import type { Student } from '@/types'

interface StudentDetailDrawerProps {
  student: Student | null
  onClose: () => void
}

export function StudentDetailDrawer({ student, onClose }: StudentDetailDrawerProps) {
  return (
    <Modal open={student !== null} title={student?.name ?? ''} onClose={onClose}>
      {student && (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <dt className="text-stone-500">Média</dt>
          <dd className="tabular-nums">{formatGrade(student.performance.averageGrade)}</dd>
          <dt className="text-stone-500">Presença</dt>
          <dd className="tabular-nums">{formatPercent(student.performance.attendanceRate)}</dd>
          <dt className="text-stone-500">Participação</dt>
          <dd className="tabular-nums">{formatPercent(student.performance.participationRate)}</dd>
          <dt className="text-stone-500">Streak atual</dt>
          <dd className="tabular-nums">{student.streak.current} dias</dd>
        </dl>
      )}
    </Modal>
  )
}
