import { AppShell } from '@/components/layout/AppShell'
import { Spinner, type TabItem } from '@/components/ui'
import { useAsync } from '@/hooks/useAsync'
import { useTab } from '@/hooks/useTab'
import { getTeacher } from '@/services/teachers'
import { ActivitiesTab } from './tabs/ActivitiesTab'
import { AssistantTab } from './tabs/AssistantTab'
import { EvaluationsTab } from './tabs/EvaluationsTab'
import { OverviewTab } from './tabs/OverviewTab'
import { StudentsTab } from './tabs/StudentsTab'

const TABS = ['overview', 'students', 'activities', 'evaluations', 'assistant'] as const
type TeacherTab = (typeof TABS)[number]

const NAV: TabItem<TeacherTab>[] = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'students', label: 'Alunos' },
  { id: 'activities', label: 'Atividades' },
  { id: 'evaluations', label: 'Avaliações' },
  { id: 'assistant', label: 'Assistente IA' },
]

// Protótipo: professor fixo do db.json.
const TEACHER_ID = 'teacher_001'

export function TeacherPage() {
  const [tab, setTab] = useTab(TABS, 'overview')
  const { data: teacher, loading } = useAsync(() => getTeacher(TEACHER_ID))

  if (loading || !teacher) return <Spinner />

  const classId = teacher.classes[0]

  return (
    <AppShell userName={teacher.name} nav={NAV} active={tab} onNavigate={setTab}>
      {tab === 'overview' && <OverviewTab />}
      {tab === 'students' && <StudentsTab classId={classId} />}
      {tab === 'activities' && <ActivitiesTab teacherId={teacher.id} />}
      {tab === 'evaluations' && <EvaluationsTab classId={classId} />}
      {tab === 'assistant' && <AssistantTab />}
    </AppShell>
  )
}
