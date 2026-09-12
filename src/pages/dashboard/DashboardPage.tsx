import { Logo } from '@/components/brand/Logo'
import { AppShell, LogoutButton, PageHeader, type NavItem } from '@/components/layout'
import { Spinner } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { useTab } from '@/hooks/useTab'
import { getDashboard } from '@/services/dashboard'
import { AlertFeed } from './components/AlertFeed'
import { ClassTable } from './components/ClassTable'
import { KpiRow } from './components/KpiRow'
import { PerformanceDistribution } from './components/PerformanceDistribution'
import { ReportExport } from './components/ReportExport'
import { TeacherTable } from './components/TeacherTable'

const TABS = ['overview', 'classes', 'teachers', 'reports'] as const
type DirectorTab = (typeof TABS)[number]

const NAV: NavItem<DirectorTab>[] = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'classes', label: 'Turmas' },
  { id: 'teachers', label: 'Professores' },
  { id: 'reports', label: 'Relatórios' },
]

export function DashboardPage() {
  const [tab, setTab] = useTab(TABS, 'overview')
  const { data, loading } = useAsync(getDashboard)

  if (loading || !data) return <Spinner />

  return (
    <AppShell brand={<Logo height={28} />} topbarActions={<LogoutButton />} userName="Direção" nav={NAV} active={tab} onNavigate={setTab}>
      {tab === 'overview' && (
        <>
          <PageHeader title="Escola Municipal Exemplo" description="Campo Grande · MS · 3º bimestre de 2026" />
          <KpiRow summary={data.summary} />
          <div className="grid gap-4 lg:grid-cols-2">
            <PerformanceDistribution performance={data.classPerformance} />
            <AlertFeed alerts={data.recentAlerts} />
          </div>
        </>
      )}
      {tab === 'classes' && <ClassTable />}
      {tab === 'teachers' && <TeacherTable />}
      {tab === 'reports' && <ReportExport />}
    </AppShell>
  )
}
