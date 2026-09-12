import { AppShell, LogoutButton, PageHeader, type NavItem } from '@/components/layout'
import { useTab } from '@/hooks/useTab'
import { COORDINATOR_CLASSES, COORDINATOR_SUMMARY } from './coordinatorData'
import { AlertFeed } from './components/AlertFeed'
import { ClassTable } from './components/ClassTable'
import { CollectiveGoals } from './components/CollectiveGoals'
import { CoordinationInsight } from './components/CoordinationInsight'
import { KpiRow } from './components/KpiRow'
import { PerformanceDistribution } from './components/PerformanceDistribution'
import { ReportExport } from './components/ReportExport'
import { TeacherTable } from './components/TeacherTable'

const TABS = ['overview', 'classes', 'teachers', 'goals', 'reports'] as const
type DirectorTab = (typeof TABS)[number]

const NAV: NavItem<DirectorTab>[] = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'classes', label: 'Turmas' },
  { id: 'teachers', label: 'Professores' },
  { id: 'goals', label: 'Metas coletivas' },
  { id: 'reports', label: 'Relatórios' },
]

export function DashboardPage() {
  const [tab, setTab] = useTab(TABS, 'overview')

  return (
    <AppShell brand="gizzi" topbarActions={<LogoutButton />} userName="Direção" nav={NAV} active={tab} onNavigate={setTab}>
      {tab === 'overview' && (
        <>
          <PageHeader
            eyebrow="Coordenação pedagógica"
            title="Escola Municipal Exemplo"
            description="Painel institucional para acompanhar engajamento, presença, metas coletivas e pontos de atenção por turma."
          />
          <KpiRow summary={COORDINATOR_SUMMARY} />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <PerformanceDistribution />
            <CoordinationInsight />
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <AlertFeed />
            <OverviewClassList />
          </div>
        </>
      )}
      {tab === 'classes' && <ClassTable />}
      {tab === 'teachers' && <TeacherTable />}
      {tab === 'goals' && <CollectiveGoals />}
      {tab === 'reports' && <ReportExport />}
    </AppShell>
  )
}

function OverviewClassList() {
  const priorityClasses = [...COORDINATOR_CLASSES].sort((a, b) => b.studentsAtRisk - a.studentsAtRisk).slice(0, 4)

  return (
    <section className="rounded-lg border border-border bg-surface px-4 py-4 md:px-5 md:py-5">
      <div className="mb-3">
        <h2 className="text-h3 font-semibold text-fg">Turmas para acompanhar</h2>
        <p className="text-small text-fg-muted">Ordenadas por quantidade de alunos em atenção.</p>
      </div>
      <ul className="divide-y divide-border">
        {priorityClasses.map((item) => (
          <li key={item.id} className="grid gap-2 py-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-medium text-fg">{item.name}</p>
              <p className="text-small text-fg-muted">{item.needs}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-lg font-semibold tabular-nums text-fg">{item.studentsAtRisk}</p>
              <p className="text-caption text-fg-muted">alunos em atenção</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
