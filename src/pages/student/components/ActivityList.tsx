import { Badge, Card, EmptyState, Spinner } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { formatDate, formatGrade } from '@/lib/format'
import { listActivities } from '@/services/activities'
import { listStudentResults } from '@/services/students'
import type { Student } from '@/types'

export function ActivityList({ student }: { student: Student }) {
  const { data, loading } = useAsync(
    () => Promise.all([listActivities({ classId: student.classId }), listStudentResults(student.id)]),
    [student.id],
  )

  if (loading || !data) return <Spinner />
  const [activities, results] = data
  if (activities.length === 0) return <EmptyState title="Nenhuma atividade ainda" />

  return (
    <Card>
      <ul className="divide-y divide-border">
        {activities.map((activity) => {
          const result = results.find((r) => r.activityId === activity.id)
          return (
            <li key={activity.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-xs text-fg-muted">{formatDate(activity.createdAt)}</p>
              </div>
              {result ? (
                <Badge tone="success">Nota {formatGrade(result.score)}</Badge>
              ) : (
                <Badge tone="warning">Pendente</Badge>
              )}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
