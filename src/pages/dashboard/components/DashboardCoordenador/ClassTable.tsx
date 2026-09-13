import { useMemo, useState } from 'react'
import { Button, Card, Select, Table, type Column } from '@/components/ui'
import { formatGrade, formatPercent } from '@/lib/format'
import { IconArrowLeft } from '@/pages/student/icons'
import { COORDINATOR_CLASSES, STATUS_LABEL, type CoordinatorClass } from './coordinatorData'
import { ClassFocusBoard } from './ClassFocusBoard'
import { ClassTag } from './ClassTag'
import { DashboardSectionHeader } from './DashboardSectionHeader'
import { ScaledProgress } from './ScaledProgress'
import { StatusPill } from './StatusPill'
import {
  subjectsForClass,
  type ClassSubjectPerformance,
  type StudentSort,
  type SubjectSort,
  type SubjectStudentGrade,
} from './classSubjectData'

const COLUMNS: Column<CoordinatorClass>[] = [
  { key: 'name', header: 'Turma', primary: true, render: (c) => <span className="font-medium">{c.name}</span> },
  { key: 'teacher', header: 'Responsável', render: (c) => c.teacher },
  { key: 'grade', header: 'Média', align: 'right', render: (c) => formatGrade(c.averageGrade) },
  { key: 'attendance', header: 'Presença', align: 'right', render: (c) => formatPercent(c.attendanceRate) },
  { key: 'participation', header: 'Participação', align: 'right', render: (c) => formatPercent(c.participationRate) },
  { key: 'goal', header: 'Meta coletiva', align: 'right', render: (c) => formatPercent(c.rewardProgress) },
  { key: 'risk', header: 'Atenção', align: 'right', render: (c) => c.studentsAtRisk },
  { key: 'status', header: 'Resultados', render: (c) => <StatusPill status={c.status}>{STATUS_LABEL[c.status]}</StatusPill> },
]

interface ClassTableProps {
  selectedClass?: CoordinatorClass | null
  onSelectedClassChange?: (schoolClass: CoordinatorClass | null) => void
}

export function ClassTable({ selectedClass: controlledSelectedClass, onSelectedClassChange }: ClassTableProps = {}) {
  const [localSelectedClass, setLocalSelectedClass] = useState<CoordinatorClass | null>(null)
  const isControlled = onSelectedClassChange !== undefined
  const selectedClass = isControlled ? controlledSelectedClass ?? null : localSelectedClass
  const setSelectedClass = isControlled ? onSelectedClassChange : setLocalSelectedClass
  const morning = COORDINATOR_CLASSES.filter((item) => item.shift === 'Manhã').length
  const afternoon = COORDINATOR_CLASSES.length - morning

  if (selectedClass) {
    return <ClassDetailView schoolClass={selectedClass} onBack={() => setSelectedClass(null)} />
  }

  return (
    <>
      <DashboardSectionHeader title="Turmas" description="Comparação de indicadores por sala, seguida do mapa visual por prioridade." />
      <div className="grid gap-3 md:grid-cols-3">
        <SummaryTile label="Manhã" value={morning} detail="turmas acompanhadas" tone="azul" />
        <SummaryTile label="Tarde" value={afternoon} detail="turmas acompanhadas" tone="rosa" />
        <SummaryTile label="Total" value={COORDINATOR_CLASSES.length} detail="salas no painel" tone="verde" />
      </div>
      <Card title="Comparativo das Turmas" description="Clique em uma turma para ver médias por matéria e notas dos alunos." flush>
        <Table columns={COLUMNS} rows={COORDINATOR_CLASSES} rowKey={(c) => c.id} onRowClick={setSelectedClass} />
      </Card>
      <ClassFocusBoard onClassSelect={setSelectedClass} />
    </>
  )
}

export function ClassDetailView({ schoolClass, onBack }: { schoolClass: CoordinatorClass; onBack: () => void }) {
  const [subjectSort, setSubjectSort] = useState<SubjectSort>('low')
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
  const subjects = useMemo(() => subjectsForClass(schoolClass.id), [schoolClass.id])
  const sortedSubjects = useMemo(
    () =>
      [...subjects].sort((a, b) =>
        subjectSort === 'low' ? a.averageGrade - b.averageGrade : b.averageGrade - a.averageGrade,
      ),
    [subjects, subjectSort],
  )
  const selectedSubject = subjects.find((subject) => subject.id === selectedSubjectId) ?? sortedSubjects[0]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" icon={<IconArrowLeft />} onClick={onBack}>
          Voltar
        </Button>
        <ClassTag name={schoolClass.name} />
        <StatusPill status={schoolClass.status}>{STATUS_LABEL[schoolClass.status]}</StatusPill>
      </div>

      <Card
        title={`${schoolClass.name} - Leitura por Matéria`}
        description={`${schoolClass.teacher} - ${schoolClass.shift} - ${schoolClass.studentCount} alunos`}
        action={
          <Select
            id="subject-sort"
            label="Ordenar matérias"
            value={subjectSort}
            onChange={(event) => setSubjectSort(event.target.value as SubjectSort)}
            className="min-w-52"
          >
            <option value="low">Piores médias primeiro</option>
            <option value="high">Melhores médias primeiro</option>
          </Select>
        }
      >
        <div className="grid gap-3 md:grid-cols-4">
          <DetailMetric label="Média" value={formatGrade(schoolClass.averageGrade)} />
          <DetailMetric label="Presença" value={formatPercent(schoolClass.attendanceRate)} />
          <DetailMetric label="Participação" value={formatPercent(schoolClass.participationRate)} />
          <DetailMetric label="Meta Coletiva" value={formatPercent(schoolClass.rewardProgress)} />
        </div>
      </Card>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Card title="Médias por Matéria" description="Selecione uma matéria para abrir as notas dos alunos.">
          <div className="grid gap-3 sm:grid-cols-2">
            {sortedSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                active={subject.id === selectedSubject.id}
                onClick={() => setSelectedSubjectId(subject.id)}
              />
            ))}
          </div>
        </Card>

        {selectedSubject && <StudentGradesPanel schoolClass={schoolClass} subject={selectedSubject} />}
      </div>
    </div>
  )
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-muted px-4 py-3">
      <p className="text-caption font-medium uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-fg">{value}</p>
    </div>
  )
}

function SubjectCard({ subject, active, onClick }: { subject: ClassSubjectPerformance; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border bg-surface-muted p-4 text-left transition-[border-color,background-color,transform] duration-fast hover:border-primary focus-visible:border-primary focus-visible:outline-none active:scale-99 ${
        active ? 'border-primary bg-surface' : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-body font-semibold text-fg">{subject.subject}</h3>
          <p className="mt-1 text-small text-fg-muted">{subject.note}</p>
        </div>
        <span className="rounded-full bg-primary px-2 py-1 text-caption font-semibold tabular-nums text-primary-fg">
          {formatGrade(subject.averageGrade)}
        </span>
      </div>
      <div className="mt-4">
        <ScaledProgress value={subject.studentsAboveAveragePct} label={`${subject.studentsAboveAveragePct}% acima da média`} />
      </div>
      <p className="mt-2 text-caption font-medium text-fg-muted">{subject.studentsAboveAveragePct}% dos alunos acima da média</p>
    </button>
  )
}

function StudentGradesPanel({ schoolClass, subject }: { schoolClass: CoordinatorClass; subject: ClassSubjectPerformance }) {
  const [studentSort, setStudentSort] = useState<StudentSort>('low')
  const sortedStudents = useMemo(
    () =>
      [...subject.students].sort((a, b) => (studentSort === 'low' ? a.grade - b.grade : b.grade - a.grade)),
    [studentSort, subject.students],
  )

  return (
    <Card
      title={`${subject.subject} - ${schoolClass.name}`}
      description="Notas fictícias para visualizar quem precisa de retomada primeiro."
      action={
        <Select
          id="student-sort"
          label="Ordenar alunos"
          value={studentSort}
          onChange={(event) => setStudentSort(event.target.value as StudentSort)}
          className="min-w-52"
        >
          <option value="low">Pior nota primeiro</option>
          <option value="high">Melhor nota primeiro</option>
        </Select>
      }
      flush
    >
      <Table columns={STUDENT_COLUMNS} rows={sortedStudents} rowKey={(student) => student.id} />
    </Card>
  )
}

const STUDENT_COLUMNS: Column<SubjectStudentGrade>[] = [
  { key: 'name', header: 'Aluno', primary: true, render: (student) => <span className="font-medium">{student.name}</span> },
  { key: 'grade', header: 'Nota', align: 'right', render: (student) => formatGrade(student.grade) },
  {
    key: 'status',
    header: 'Resultado',
    render: (student) => {
      const status = student.grade >= 7 ? 'steady' : student.grade < 6 ? 'priority' : 'watch'
      const label = student.grade >= 7 ? 'Acima da média' : student.grade < 6 ? 'Prioridade' : 'Acompanhar'
      return <StatusPill status={status}>{label}</StatusPill>
    },
  },
]

function SummaryTile({ label, value, detail, tone }: { label: string; value: number; detail: string; tone: 'azul' | 'rosa' | 'verde' }) {
  const classes = {
    azul: 'bg-surface border-l-4 border-l-azul-claro',
    rosa: 'bg-surface border-l-4 border-l-rosa-claro',
    verde: 'bg-surface border-l-4 border-l-verde-agua',
  }

  return (
    <div className={`director-panel rounded-lg border px-4 py-3 ${classes[tone]}`}>
      <p className="text-caption font-medium uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-fg">{value}</p>
      <p className="text-caption text-fg-muted">{detail}</p>
    </div>
  )
}
