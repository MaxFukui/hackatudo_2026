import { PageHeader } from '@/components/layout'
import { Spinner } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { getDashboard } from '@/services/dashboard'
import { AlertList } from '../components/AlertList'
import { ClassSummary } from '../components/ClassSummary'

export function OverviewTab() {
  const { data, loading } = useAsync(getDashboard)
  if (loading || !data) return <Spinner />

  return (
    <>
      <PageHeader title="4º Ano A · Matemática" description="Visão geral da turma" />
      <ClassSummary summary={data.summary} performance={data.classPerformance} />
      <AlertList alerts={data.recentAlerts} />
    </>
  )
}
