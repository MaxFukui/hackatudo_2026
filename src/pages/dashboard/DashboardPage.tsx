import { useState } from 'react'
import type { NavItem } from '@/components/layout'
import { useTab } from '@/hooks/useTab'
import {
  AlertFeed,
  ClassFocusBoard,
  ClassTable,
  CollectiveGoals,
  CoordinatorCalendar,
  CoordinationInsight,
  CoordinatorShell,
  DirectorHero,
  InterventionPlan,
  ReportExport,
  SubjectInsights,
  TeacherTable,
} from './components/DashboardCoordenador'
import type { CoordinatorClass } from './components/DashboardCoordenador/coordinatorData'
import {
  IconChart,
  IconCheck,
  IconHome,
  IconBook,
  IconCalendar,
  IconTrend,
} from '@/pages/student/icons'

const TABS = ['overview', 'classes', 'teachers', 'goals', 'calendar', 'reports'] as const
type DirectorTab = (typeof TABS)[number]

const NAV: NavItem<DirectorTab>[] = [
  { id: 'overview', label: 'Visão Geral', icon: <IconHome /> },
  { id: 'classes', label: 'Turmas', icon: <IconChart /> },
  { id: 'teachers', label: 'Professores', icon: <IconCheck /> },
  { id: 'goals', label: 'Metas', icon: <IconTrend /> },
  { id: 'calendar', label: 'Calendário', icon: <IconCalendar /> },
  { id: 'reports', label: 'Relatórios', icon: <IconBook /> },
]

export function DashboardPage() {
  const [tab, setTab] = useTab(TABS, 'overview')
  const [selectedClass, setSelectedClass] = useState<CoordinatorClass | null>(null)

  function handleNavigate(nextTab: DirectorTab) {
    if (nextTab !== 'classes') {
      setSelectedClass(null)
    }
    setTab(nextTab)
  }

  function openClassDetail(schoolClass: CoordinatorClass) {
    setSelectedClass(schoolClass)
    setTab('classes')
  }

  return (
    <CoordinatorShell userName="Direção" nav={NAV} active={tab} onNavigate={handleNavigate}>
      {tab === 'overview' && (
        <>
          <DirectorHero />
          <ClassFocusBoard limit={2} onClassSelect={openClassDetail} />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <CoordinationInsight />
            <InterventionPlan />
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <AlertFeed />
            <SubjectInsights />
          </div>
        </>
      )}
      {tab === 'classes' && <ClassTable selectedClass={selectedClass} onSelectedClassChange={setSelectedClass} />}
      {tab === 'teachers' && <TeacherTable />}
      {tab === 'goals' && <CollectiveGoals />}
      {tab === 'calendar' && <CoordinatorCalendar />}
      {tab === 'reports' && <ReportExport />}
    </CoordinatorShell>
  )
}
