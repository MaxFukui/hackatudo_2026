import { useMemo, useState } from 'react'
import type { NavItem } from '@/components/layout'
import { StudentShell } from './components/StudentShell'
import { Confetti } from './components/Confetti'
import { Toast } from '@/components/ui'
import { useTab } from '@/hooks/useTab'
import { db } from '@/services/client'
import { ALUNO, type Student, type SubjectId } from '@/pages/student/data/aluno'
import type { ContextoAluno } from '@/pages/student/prompts/exercicios'
import type { Alvo } from '@/pages/student/services/exercicios'
import { Exercicio } from './sections/Exercicio'
import { mascoteForStudent, stageForXp } from '@/pages/student/lib/mascotes'
import { IconBook, IconChart, IconChat, IconHome, IconPet } from './icons'
import { Inicio } from './sections/Inicio'
import { MascoteSection } from './sections/MascoteSection'
import { Materiais } from './sections/Materiais'
import { Progresso } from './sections/Progresso'
import { Tutor } from './sections/Tutor'

const TABS = ['inicio', 'mascote', 'materiais', 'tutor', 'progresso'] as const
type Tab = (typeof TABS)[number]

const NAV: NavItem<Tab>[] = [
  { id: 'inicio', label: 'Início', icon: <IconHome /> },
  { id: 'mascote', label: 'Mascote', icon: <IconPet /> },
  { id: 'materiais', label: 'Materiais', icon: <IconBook /> },
  { id: 'tutor', label: 'Tutor', icon: <IconChat /> },
  { id: 'progresso', label: 'Progresso', icon: <IconChart /> },
]

export function StudentPage() {
  const [tab, setTab] = useTab(TABS, 'inicio')
  // Estado local no lugar do backend: pontos e strikes mudam na hora, como vai ser com a API.
  const [student, setStudent] = useState<Student>(ALUNO)
  const [toast, setToast] = useState<string | null>(null)
  // Sessão de exercícios aberta (material ou atividade). Substitui a aba enquanto durar.
  const [sessao, setSessao] = useState<{ alvo: Alvo; subjectId: SubjectId } | null>(null)
  // Cada recompensa incrementa: dispara confete e o pulinho do mascote.
  const [celebration, setCelebration] = useState<{ tick: number; big: boolean }>({ tick: 0, big: false })

  function reward(subjectId: Student['subjects'][number]['id'], xp: number, note: string) {
    const before = stageForXp(student.xp)
    const after = stageForXp(student.xp + xp)
    setStudent((s) => ({
      ...s,
      xp: s.xp + xp,
      points: s.points + xp,
      subjects: s.subjects.map((x) => (x.id === subjectId ? { ...x, streak: x.streak + 1 } : x)),
    }))
    // Evoluiu: a notícia vale mais do que os pontos — e o confete é maior.
    const evolved = after.stage !== before.stage
    setToast(evolved ? `🎉 ${mascoteForStudent(student.subjects).name}: ${after.celebration}` : note)
    setCelebration((c) => ({ tick: c.tick + 1, big: evolved }))
  }

  // Escola, série, turma e professora vêm do sistema da professora (db.json compartilhado).
  // A parte do aluno só lê: quem cadastra é o outro módulo.
  const contexto = useMemo(() => {
    const dbStudent = db.users.students.find((s) => s.id === student.id)
    const turma = db.academicContext.classes.find((c) => c.id === dbStudent?.classId)
    const serie = db.academicContext.grades.find((g) => g.id === turma?.gradeId)
    const professora = db.users.teachers.find((t) => t.classes.includes(turma?.id ?? ''))
    return { escola: db.school.name, serie: serie?.name ?? student.className, turma: turma?.name ?? student.className, professora: professora?.name ?? student.evaluation.teacher }
  }, [student.id, student.className, student.evaluation.teacher])

  function contextoPara(subjectId: SubjectId): ContextoAluno {
    const s = student.subjects.find((x) => x.id === subjectId)!
    return {
      ...contexto,
      aluno: student.name,
      materia: s.name,
      assuntosDoBimestre: s.topics,
      notaAtual: s.grade,
      pontosFortes: student.evaluation.strengths,
      pontosDeAtencao: student.evaluation.attention,
    }
  }

  function abrirExercicio(alvo: Alvo, subjectId: SubjectId) {
    setSessao({ alvo, subjectId })
    window.scrollTo({ top: 0 })
  }

  function fecharExercicio(xpGanho: number, resumo: string) {
    if (!sessao) return
    const { alvo, subjectId } = sessao
    setSessao(null)
    if (xpGanho > 0) {
      // Atividade aberta pelo Início conta como feita.
      setStudent((s) => ({ ...s, activities: s.activities.map((a) => (a.id === alvo.id ? { ...a, done: true } : a)) }))
      reward(subjectId, xpGanho, resumo)
    }
  }

  return (
    <StudentShell userName={student.name} points={student.points} nav={NAV} active={tab} onNavigate={setTab}>
      {sessao ? (
        <Exercicio
          key={sessao.alvo.id}
          alvo={sessao.alvo}
          subject={student.subjects.find((s) => s.id === sessao.subjectId)!}
          ctx={contextoPara(sessao.subjectId)}
          xp={student.xp}
          onExit={fecharExercicio}
        />
      ) : (
        <>
          {tab === 'inicio' && (
            <Inicio
              student={student}
              cheer={celebration.tick}
              onGo={setTab}
              onStart={(a) => abrirExercicio({ id: a.id, titulo: a.title, descricao: `${a.kind} de ${a.minutes} minutos` }, a.subjectId)}
            />
          )}
          {tab === 'mascote' && <MascoteSection student={student} cheer={celebration.tick} />}
          {tab === 'materiais' && <Materiais student={student} onStart={(m) => abrirExercicio({ id: m.id, titulo: m.title, descricao: m.description }, m.subjectId)} />}
          {tab === 'tutor' && <Tutor student={student} />}
          {tab === 'progresso' && <Progresso student={student} />}
        </>
      )}

      <Confetti trigger={celebration.tick} size={celebration.big ? 'big' : 'small'} />
      <Toast open={toast !== null} onClose={() => setToast(null)}>
        {toast}
      </Toast>
    </StudentShell>
  )
}
