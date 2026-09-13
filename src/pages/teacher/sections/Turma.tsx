import { DistributionBar } from '@/components/charts/DistributionBar'
import { Badge, Button, Card, Table, type Column } from '@/components/ui'
import { Mascote } from '@/pages/student/components/Mascote'
import { IconChart, IconCheck, IconFlame, IconTrend } from '@/pages/student/icons'
import { StudentHeader, Tile } from '@/pages/student/sections/shared'
import { fmtGrade } from '@/pages/student/lib/materias'
import { classStats, levelFor, TEACHER, type ClassStudent } from '../data/turma'
import { LEVEL_TONE, mascoteOf, PERFORMANCE_LABEL, stageOf } from '../lib/format'

interface Props {
  students: ClassStudent[]
  onOpen: (student: ClassStudent) => void
}

const COLUMNS = (onOpen: (s: ClassStudent) => void): Column<ClassStudent>[] => [
  {
    key: 'name',
    header: 'Aluno',
    primary: true,
    render: (s) => (
      <span className="flex items-center gap-2">
        <Mascote mascote={mascoteOf(s)} stage={stageOf(s).stage} size={32} still />
        <span className="font-medium text-fg">{s.name}</span>
      </span>
    ),
  },
  { key: 'grade', header: 'Média', align: 'right', render: (s) => fmtGrade(s.averageGrade) },
  { key: 'attendance', header: 'Presença', align: 'right', render: (s) => `${s.attendanceRate}%` },
  { key: 'participation', header: 'Participação', align: 'right', render: (s) => `${s.participationRate}%`, hideOnMobile: true },
  { key: 'streak', header: 'Sequência', align: 'right', render: (s) => `🔥 ${s.streak}`, hideOnMobile: true },
  {
    key: 'level',
    header: 'Nível',
    render: (s) => {
      const level = levelFor(s.averageGrade)
      return <Badge tone={LEVEL_TONE[level]}>{PERFORMANCE_LABEL[level]}</Badge>
    },
  },
  {
    key: 'open',
    header: '',
    hideOnMobile: true,
    render: (s) => (
      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onOpen(s) }}>
        Ver
      </Button>
    ),
  },
]

export function Turma({ students, onOpen }: Props) {
  const stats = classStats(students)

  return (
    <>
      <StudentHeader eyebrow={`${TEACHER.subject} · ${stats.total} alunos`} title={TEACHER.className} description="Como a turma está indo e quem precisa de atenção agora." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-4 stagger">
        <Tile index={0} icon={<IconChart />} iconClass="bg-azul-claro text-info-soft-fg" glow="to-azul-claro/40" label="Média da turma" value={fmtGrade(stats.averageGrade)} />
        <Tile index={1} icon={<IconCheck />} iconClass="bg-success-soft text-success-soft-fg" glow="to-success-soft/60" label="Presença" value={`${stats.attendanceRate}%`} />
        <Tile index={2} icon={<IconFlame />} iconClass="bg-accent-soft text-accent-soft-fg" glow="to-accent-soft/50" label="Participação" value={`${stats.participationRate}%`} />
        <Tile index={3} icon={<IconTrend />} iconClass="bg-danger-soft text-danger-soft-fg" glow="to-rosa-claro/60" label="Pedem atenção" value={String(stats.attention.length)} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card title="Distribuição por nível" description="Pela média de cada aluno em Matemática.">
          <DistributionBar distribution={stats.distribution} />
        </Card>

        <Card title="Pedem atenção" description="Caíram 10% ou mais nas últimas três atividades.">
          <ul className="divide-y divide-border">
            {stats.attention.map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-2.5">
                <Mascote mascote={mascoteOf(s)} stage={stageOf(s).stage} size={40} still />
                <div className="min-w-0 flex-1">
                  <p className="text-body font-medium text-fg">{s.name}</p>
                  <p className="text-small text-danger" data-numeric>
                    Caiu {-s.trend}% · média {fmtGrade(s.averageGrade)}
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => onOpen(s)}>
                  Ver aluno
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Alunos" description="Toque em um aluno para ver a avaliação por IA." flush>
        <Table columns={COLUMNS(onOpen)} rows={students} rowKey={(s) => s.id} onRowClick={onOpen} />
      </Card>
    </>
  )
}
