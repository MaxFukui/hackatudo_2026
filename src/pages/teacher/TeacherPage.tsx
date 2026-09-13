import { useState } from 'react'
import type { NavItem } from '@/components/layout'
import { Toast } from '@/components/ui'
import { useTab } from '@/hooks/useTab'
import { Confetti } from '@/pages/student/components/Confetti'
import { StudentShell } from '@/pages/student/components/StudentShell'
import { IconBook, IconCalendar, IconChart, IconChat, IconHome } from '@/pages/student/icons'
import { stageForXp } from '@/pages/student/lib/mascotes'
import { StudentDetail } from './components/StudentDetail'
import { CLASS_ACTIVITIES, CLASS_STUDENTS, TEACHER, type ClassActivity, type ClassStudent } from './data/turma'
import { firstName, mascoteOf } from './lib/format'
import { Assistente } from './sections/Assistente'
import { Atividades } from './sections/Atividades'
import { RECORDS, type RecordKind, type TodayLog } from './lib/records'
import { AulaHoje } from './sections/AulaHoje'
import { Calendario } from './sections/Calendario'
import { Turma } from './sections/Turma'

const TABS = ['aula', 'turma', 'atividades', 'calendario', 'assistente'] as const
type Tab = (typeof TABS)[number]

const NAV: NavItem<Tab>[] = [
  { id: 'aula', label: 'Aula de hoje', icon: <IconHome /> },
  { id: 'turma', label: 'Turma', icon: <IconChart /> },
  { id: 'atividades', label: 'Atividades', icon: <IconBook /> },
  { id: 'calendario', label: 'Calendário', icon: <IconCalendar /> },
  { id: 'assistente', label: 'Assistente', icon: <IconChat /> },
]

const EMPTY_LOG: TodayLog = { present: false, participations: 0, homework: false }
const emptyToday = () => Object.fromEntries(CLASS_STUDENTS.map((s) => [s.id, { ...EMPTY_LOG }])) as Record<string, TodayLog>

// Mesma casca e mesmos componentes da área do aluno (branch do Magnum): o professor vê o mundo que a criança vê.
// Estado local no lugar do backend: os registros valem enquanto a página está aberta.
export function TeacherPage() {
  const [tab, setTab] = useTab(TABS, 'aula')
  const [students, setStudents] = useState<ClassStudent[]>(CLASS_STUDENTS)
  const [activities, setActivities] = useState<ClassActivity[]>(CLASS_ACTIVITIES)
  const [today, setToday] = useState<Record<string, TodayLog>>(emptyToday)
  const [mode, setMode] = useState<RecordKind>('attendance')
  const [pointsToday, setPointsToday] = useState(0)
  const [toastState, setToastState] = useState<{ id: number; text: string } | null>(null)
  // Cada aviso novo remonta o Toast: o tempo de sumir recomeça a cada toque.
  const setToast = (text: string | null) => setToastState((t) => (text === null ? null : { id: (t?.id ?? 0) + 1, text }))
  const [cheer, setCheer] = useState({ id: '', tick: 0 })
  const [celebration, setCelebration] = useState(0)
  const [selected, setSelected] = useState<ClassStudent | null>(null)

  const give = (student: ClassStudent, xp: number, note: string) => {
    const before = stageForXp(student.xp)
    const after = stageForXp(student.xp + xp)
    setStudents((list) => list.map((s) => (s.id === student.id ? { ...s, xp: Math.max(0, s.xp + xp) } : s)))
    setPointsToday((p) => p + xp)
    if (xp > 0) setCheer((c) => ({ id: student.id, tick: c.tick + 1 }))
    if (after.stage > before.stage) {
      setCelebration((n) => n + 1)
      setToast(`🎉 ${firstName(student.name)}: ${mascoteOf(student).name} — ${after.celebration}`)
    } else {
      setToast(note)
    }
  }

  const record = (student: ClassStudent) => {
    const log = today[student.id]
    const { xp, label } = RECORDS[mode]
    const name = firstName(student.name)

    if (mode === 'attendance') {
      const present = !log.present
      setToday((t) => ({ ...t, [student.id]: { ...log, present } }))
      give(student, present ? xp : -xp, present ? `✋ ${name} presente · +${xp}` : `Presença de ${name} desmarcada`)
      return
    }
    if (mode === 'homework') {
      if (log.homework) {
        setToast(`📘 ${name} já entregou a lição hoje`)
        return
      }
      setToday((t) => ({ ...t, [student.id]: { ...log, homework: true } }))
      give(student, xp, `📘 ${name} fez a lição · +${xp}`)
      return
    }
    setToday((t) => ({ ...t, [student.id]: { ...log, participations: log.participations + 1 } }))
    give(student, xp, `🙋 ${name} ${label.toLowerCase()} · +${xp}`)
  }

  const allPresent = () => {
    const missing = students.filter((s) => !today[s.id].present)
    if (missing.length === 0) return
    const xp = RECORDS.attendance.xp
    setToday((t) => Object.fromEntries(Object.entries(t).map(([id, log]) => [id, { ...log, present: true }])))
    setStudents((list) => list.map((s) => (missing.some((m) => m.id === s.id) ? { ...s, xp: s.xp + xp } : s)))
    setPointsToday((p) => p + xp * missing.length)
    const evolved = missing.filter((s) => stageForXp(s.xp + xp).stage > stageForXp(s.xp).stage)
    if (evolved.length) setCelebration((n) => n + 1)
    setToast(`✋ ${missing.length} presenças · +${xp * missing.length}${evolved.length ? ` · 🎉 ${evolved.map((s) => firstName(s.name)).join(', ')} evoluíram` : ''}`)
  }

  const createActivity = (activity: ClassActivity) => {
    setActivities((list) => [activity, ...list])
    setToast(`📘 "${activity.title}" enviada para a turma`)
  }

  return (
    <StudentShell userName={TEACHER.name} points={pointsToday} nav={NAV} active={tab} onNavigate={setTab}>
      {tab === 'aula' && (
        <AulaHoje
          students={students}
          today={today}
          mode={mode}
          onModeChange={setMode}
          onRecord={record}
          onAllPresent={allPresent}
          pointsToday={pointsToday}
          cheer={cheer}
        />
      )}
      {tab === 'turma' && <Turma students={students} onOpen={setSelected} />}
      {tab === 'atividades' && <Atividades activities={activities} total={students.length} onCreate={createActivity} />}
      {tab === 'calendario' && <Calendario />}
      {tab === 'assistente' && <Assistente students={students} />}

      <StudentDetail student={selected ? (students.find((s) => s.id === selected.id) ?? selected) : null} onClose={() => setSelected(null)} />
      <Confetti trigger={celebration} size="big" />
      <Toast key={toastState?.id ?? 0} open={toastState !== null} onClose={() => setToastState(null)}>
        {toastState?.text}
      </Toast>
    </StudentShell>
  )
}
