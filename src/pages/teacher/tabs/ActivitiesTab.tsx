import { PageHeader } from '@/components/layout/PageHeader'
import { Card, Spinner } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { formatDate, formatGrade } from '@/lib/format'
import { listActivities } from '@/services/activities'
import { ActivityForm } from '../components/ActivityForm'

export function ActivitiesTab({ teacherId }: { teacherId: string }) {
  const { data, loading } = useAsync(() => listActivities({ teacherId }), [teacherId])

  return (
    <>
      <PageHeader title="Atividades" />
      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card title="Criadas">
          {loading || !data ? (
            <Spinner />
          ) : (
            <ul className="divide-y divide-stone-100">
              {data.map((a) => (
                <li key={a.id} className="flex justify-between py-2 text-sm">
                  <span>{a.title}</span>
                  <span className="text-stone-500 tabular-nums">
                    média {formatGrade(a.averageScore)} · {formatDate(a.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <ActivityForm />
      </div>
    </>
  )
}
