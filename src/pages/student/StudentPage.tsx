import { AppShell } from '@/components/layout/AppShell'
import { Spinner, type TabItem } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { useTab } from '@/hooks/useTab'
import { getStudent } from '@/services/students'
import { ActivitiesTab } from './tabs/ActivitiesTab'
import { HomeTab } from './tabs/HomeTab'
import { PerformanceTab } from './tabs/PerformanceTab'
import { StreakTab } from './tabs/StreakTab'
import { TutorTab } from './tabs/TutorTab'

const TABS = ['home', 'activities', 'performance', 'streak', 'tutor'] as const
type StudentTab = (typeof TABS)[number]

const NAV: TabItem<StudentTab>[] = [
  { id: 'home', label: 'Início' },
  { id: 'activities', label: 'Atividades' },
  { id: 'performance', label: 'Desempenho' },
  { id: 'streak', label: 'Streak' },
  { id: 'tutor', label: 'Tutor IA' },
]

// Protótipo: aluno fixo do db.json.
const STUDENT_ID = 'student_001'

export function StudentPage() {
  const [tab, setTab] = useTab(TABS, 'home')
  const { data: student, loading } = useAsync(() => getStudent(STUDENT_ID))

  if (loading || !student) return <Spinner />

  return (
    <AppShell userName={student.name} nav={NAV} active={tab} onNavigate={setTab}>
      {tab === 'home' && <HomeTab student={student} />}
      {tab === 'activities' && <ActivitiesTab student={student} />}
      {tab === 'performance' && <PerformanceTab student={student} />}
      {tab === 'streak' && <StreakTab student={student} />}
      {tab === 'tutor' && <TutorTab student={student} />}
    </AppShell>
  )
}
