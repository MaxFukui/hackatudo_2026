import { Badge, Button } from '@/components/ui'
import { usePressable } from '@/hooks/usePressable'
import { Mascote } from '@/pages/student/components/Mascote'
import { useCountUp } from '@/pages/student/hooks/useCountUp'
import { IconCheck, IconFlame, IconStar } from '@/pages/student/icons'
import { Chips, StudentHeader, Tile } from '@/pages/student/sections/shared'
import type { ClassStudent } from '../data/turma'
import { TEACHER } from '../data/turma'
import { firstName, mascoteOf, stageOf } from '../lib/format'
import { RECORDS, type RecordKind, type TodayLog } from '../lib/records'

interface Props {
  students: ClassStudent[]
  today: Record<string, TodayLog>
  mode: RecordKind
  onModeChange: (mode: RecordKind) => void
  onRecord: (student: ClassStudent) => void
  onAllPresent: () => void
  pointsToday: number
  /** Id do aluno que acabou de ganhar pontos + contador: o mascote dele comemora. */
  cheer: { id: string; tick: number }
}

const DATE_LABEL = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

// A aula acontecendo: um toque no aluno registra presença, participação ou lição — e o monstrinho dele ganha pontos.
export function AulaHoje({ students, today, mode, onModeChange, onRecord, onAllPresent, pointsToday, cheer }: Props) {
  const logs = Object.values(today)
  const present = logs.filter((l) => l.present).length
  const participations = logs.reduce((sum, l) => sum + l.participations, 0)
  const shownPoints = useCountUp(pointsToday)

  return (
    <>
      <StudentHeader
        eyebrow={`${DATE_LABEL.charAt(0).toUpperCase()}${DATE_LABEL.slice(1)} · ${TEACHER.className} · ${TEACHER.subject}`}
        title="Aula de hoje"
        description="Escolha o que registrar e toque no aluno. Os pontos vão direto para o monstrinho dele — e aparecem na TV da sala."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4 stagger">
        <Tile index={0} icon={<IconCheck />} iconClass="bg-success-soft text-success-soft-fg" glow="to-success-soft/60" label="Presentes" value={`${present} de ${students.length}`} />
        <Tile index={1} icon={<IconFlame />} iconClass="bg-accent-soft text-accent-soft-fg" glow="to-accent-soft/50" label="Participações hoje" value={String(participations)} />
        <Tile index={2} icon={<IconStar />} iconClass="bg-warning-soft text-warning-soft-fg" glow="to-amarelo-claro" label="Pontos para a turma" value={`+${shownPoints}`} />
      </div>

      <div className="sticky top-[calc(var(--height-topbar)+env(safe-area-inset-top))] z-20 -mx-4 flex flex-col gap-3 border-b border-border bg-canvas/90 px-4 py-3 backdrop-blur-md md:mx-0 md:flex-row md:items-center md:justify-between md:rounded-lg md:border md:px-4">
        <Chips
          label="O que registrar"
          active={mode}
          onChange={onModeChange}
          items={(Object.keys(RECORDS) as RecordKind[]).map((id) => ({ id, label: `${RECORDS[id].label} +${RECORDS[id].xp}`, emoji: RECORDS[id].emoji }))}
        />
        <Button variant="secondary" onClick={onAllPresent} disabled={present === students.length}>
          Marcar todos presentes
        </Button>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {students.map((s) => (
          <StudentCard key={s.id} student={s} log={today[s.id]} mode={mode} cheer={cheer.id === s.id ? cheer.tick : 0} onRecord={() => onRecord(s)} />
        ))}
      </ul>
    </>
  )
}

function StudentCard({ student, log, mode, cheer, onRecord }: { student: ClassStudent; log: TodayLog; mode: RecordKind; cheer: number; onRecord: () => void }) {
  const pressable = usePressable(onRecord)
  const mascote = mascoteOf(student)
  const stage = stageOf(student)
  const done = (mode === 'attendance' && log.present) || (mode === 'homework' && log.homework)
  const action = mode === 'attendance' && log.present ? 'Desmarcar presença de' : `${RECORDS[mode].label} +${RECORDS[mode].xp} para`

  return (
    <li>
      <div
        {...pressable}
        aria-label={`${action} ${student.name}`}
        aria-pressed={done}
        className={`card-lift flex h-full cursor-pointer flex-col items-center rounded-lg border px-3 pt-3 pb-3 text-center transition-[background-color,border-color] duration-base ease-standard active:scale-98 ${
          done ? 'border-success bg-success-soft/60' : 'border-border bg-surface'
        }`}
      >
        <Mascote mascote={mascote} stage={stage.stage} size={72} still cheer={cheer} />
        <p className="mt-1 text-body font-semibold text-fg">{firstName(student.name)}</p>
        <p className="text-caption text-fg-muted">
          {mascote.name} · {stage.name}
        </p>
        <div className="mt-2 flex min-h-6 flex-wrap justify-center gap-1">
          {log.present && <Badge tone="success">✋</Badge>}
          {log.participations > 0 && <Badge tone="accent">🙋 {log.participations}</Badge>}
          {log.homework && <Badge tone="info">📘</Badge>}
          {!log.present && log.participations === 0 && !log.homework && (
            <span className="text-caption text-fg-subtle" data-numeric>
              🔥 {student.streak} {student.streak === 1 ? 'dia' : 'dias'}
            </span>
          )}
        </div>
      </div>
    </li>
  )
}
