import { Avatar, Badge, Card, ProgressBar, type ProgressTone } from '@/components/ui'
import type { Student } from '@/pages/student/data/aluno'
import { SUBJECT_EMOJI, SUBJECT_TILE, fmtGrade } from '@/pages/student/lib/materias'
import { IconCheck, IconFlame, IconStar, IconTrend } from '../icons'
import { IconTile, StrikeBadge, StudentHeader, Tile } from './shared'

function tone(grade: number): ProgressTone {
  return grade >= 8 ? 'success' : grade >= 7 ? 'primary' : grade >= 6 ? 'warning' : 'danger'
}
function word(grade: number) {
  return grade >= 8 ? 'Mandando bem' : grade >= 7 ? 'Indo bem' : grade >= 6 ? 'Precisa de atenção' : 'Vamos reforçar'
}

// O que o professor vê, traduzido para a criança: uma barra por matéria e a avaliação em três listas.
export function Progresso({ student }: { student: Student }) {
  const avg = student.subjects.reduce((s, x) => s + x.grade, 0) / student.subjects.length
  const done = student.activities.filter((a) => a.done).length
  const best = [...student.subjects].sort((a, b) => b.grade - a.grade)[0]
  const e = student.evaluation

  return (
    <>
      <StudentHeader eyebrow={student.className} title="Seu progresso" description="Como você está em cada matéria e o que a professora disse." />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 stagger">
        <Tile index={0} icon={<IconTrend />} iconClass="bg-success-soft text-success-soft-fg" glow="to-success-soft/60" label="Média geral" value={fmtGrade(avg)} detail={word(avg)} />
        <Tile index={1} icon={<IconStar />} iconClass="bg-warning-soft text-warning-soft-fg" glow="to-amarelo-claro" label="Melhor matéria" value={best.name} detail={`nota ${fmtGrade(best.grade)}`} />
        <Tile index={2} icon={<span className="inline-flex animate-flicker"><IconFlame /></span>} iconClass="bg-accent-soft text-accent-soft-fg" glow="to-accent-soft/50" label="Recorde de dias" value={`${student.streak.best} dias`} detail={`${done} de ${student.activities.length} atividades feitas`} />
      </div>

      <div className="grid grid-cols-1 items-start gap-3 md:gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card>
          <h2 className="font-display text-h1 font-semibold text-fg">Por matéria</h2>
          <p className="text-small text-fg-muted">Nota do bimestre e dias seguidos de atividade.</p>
          <ul className="mt-4 space-y-3">
            {student.subjects.map((s) => (
              <li key={s.id} className="flex items-center gap-3">
                <IconTile className={SUBJECT_TILE[s.id]}>{SUBJECT_EMOJI[s.id]}</IconTile>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="flex items-center gap-2">
                      <span className="text-body font-medium text-fg">{s.name}</span>
                      <span className="hidden text-small text-fg-muted sm:inline">{word(s.grade)}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <StrikeBadge days={s.streak} />
                      <span className="font-display text-h1 font-semibold text-fg" data-numeric>{fmtGrade(s.grade)}</span>
                    </span>
                  </div>
                  <ProgressBar value={s.grade} max={10} label={`Nota em ${s.name}`} tone={tone(s.grade)} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card tone="azul">
          <div className="flex items-center gap-3">
            <Avatar name={e.teacher.replace(/^Prof\.ª?\s*/, '')} size="lg" />
            <div className="min-w-0">
              <h2 className="font-display text-h1 font-semibold text-fg">O que a professora disse</h2>
              <p className="text-small text-fg-muted">
                {e.teacher} · {new Date(e.updatedAt + 'T12:00:00').toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <Lista tone="success" emoji="💪" title="Você manda bem em" items={e.strengths} />
            <Lista tone="warning" emoji="👀" title="Vale prestar atenção" items={e.attention} />
            <Lista tone="info" emoji="💡" title="Dicas para esta semana" items={e.recommendations} />
          </div>
        </Card>
      </div>
    </>
  )
}

function Lista({ tone, emoji, title, items }: { tone: 'success' | 'warning' | 'info'; emoji: string; title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3 md:p-4">
      <Badge tone={tone}>
        {emoji} {title}
      </Badge>
      <ul className="mt-2 space-y-1.5">
        {items.map((t, i) => (
          <li key={t} className="flex items-start gap-2 text-reading text-fg">
            <span className="mt-1.5 text-success animate-check-in" style={{ animationDelay: `${300 + i * 120}ms` }} aria-hidden="true"><IconCheck /></span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
