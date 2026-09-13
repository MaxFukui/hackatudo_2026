import { useEffect, useState } from 'react'
import { Badge, Button, Card, ProgressBar } from '@/components/ui'
import { useCountUp } from '@/pages/student/hooks/useCountUp'
import type { Activity, Student } from '@/pages/student/data/aluno'
import { mascoteForStudent, nextStage, stageForXp } from '@/pages/student/lib/mascotes'
import { MASCOTE_CARD, SUBJECT_EMOJI, SUBJECT_TILE, fmtGrade } from '@/pages/student/lib/materias'
import { coachMessage } from '@/pages/student/services/coach'
import { IconChart, IconChat, IconCheck, IconFlame, IconPlay, IconStar, IconTrend } from '../icons'
import { IconTile, MascoteStage, Tile } from './shared'

interface Props {
  student: Student
  /** Incrementa a cada recompensa: o mascote comemora. */
  cheer: number
  onGo: (tab: 'tutor' | 'materiais' | 'mascote' | 'progresso') => void
  /** Abre a sessão de exercícios da atividade. */
  onStart: (activity: Activity) => void
}

function saudacao() {
  const h = new Date().getHours()
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
}

// A primeira coisa que o aluno vê é o mascote falando com ele. Depois: números, atividades, progresso.
export function Inicio({ student, cheer, onGo, onStart }: Props) {
  const firstName = student.name.split(' ')[0]
  const mascote = mascoteForStudent(student.subjects)
  const stage = stageForXp(student.xp)
  const next = nextStage(student.xp)
  const coach = coachMessage(student)
  const pending = student.activities.filter((a) => !a.done)
  const xpShown = useCountUp(student.xp)
  const avg = student.subjects.reduce((s, x) => s + x.grade, 0) / student.subjects.length

  return (
    <>
      <div>
        <p className="text-body font-medium text-fg-muted animate-rise">
          {saudacao()}, {firstName}! <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
        </p>
        <h1 className="font-display text-display font-semibold text-fg animate-rise" style={{ animationDelay: '80ms' }}>Vamos aprender juntos?</h1>
      </div>

      {/* Herói: mascote à esquerda, a dica dele à direita. */}
      <Card tone={MASCOTE_CARD[mascote.id]} className="overflow-hidden">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-6">
          <MascoteStage mascote={mascote} stage={stage.stage} cheer={cheer} label={`${mascote.name} · ${stage.name}`} />

          <div className="rounded-lg border border-border bg-surface p-4 animate-bubble-in md:p-5" style={{ animationDelay: '150ms' }}>
            <Badge tone="warning">💡 Dica do {mascote.name}</Badge>
            <p className="mt-3 text-reading text-fg">
              <strong className="font-display text-h2 font-semibold">Oi, {firstName}!</strong> {coach.headline}
            </p>
            <ul className="mt-3 space-y-2">
              {coach.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-body text-fg animate-rise" style={{ animationDelay: `${350 + i * 140}ms` }}>
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-soft-fg animate-check-in" style={{ animationDelay: `${450 + i * 140}ms` }}>
                    <IconCheck />
                  </span>
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="accent" size="lg" icon={<IconChat />} onClick={() => onGo('tutor')} className="w-full sm:w-auto">
                Tirar uma dúvida →
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Três números: sequência, nível, média. Ícone num quadrado pastel para a criança achar de longe. */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 stagger">
        <Tile index={0} icon={<span className="inline-flex animate-flicker"><IconFlame /></span>} iconClass="bg-accent-soft text-accent-soft-fg" glow="to-accent-soft/50" label="Sequência" value={`${student.streak.current} dias`} detail={`Seu recorde: ${student.streak.best}`} />
        <Tile index={1} icon={<IconStar />} iconClass="bg-warning-soft text-warning-soft-fg" glow="to-amarelo-claro" label={`Nível · ${stage.name}`} value={mascote.name}>
          <div className="mt-2">
            {next ? (
              <>
                <ProgressBar value={student.xp} max={next.minXp} label="XP até evoluir" tone="accent" />
                <p className="mt-1 text-caption text-fg-muted" data-numeric>
                  {xpShown} de {next.minXp} XP para evoluir
                </p>
              </>
            ) : (
              <Badge tone="accent" pop>Evoluído! {xpShown} XP</Badge>
            )}
          </div>
        </Tile>
        <Tile index={2} icon={<IconTrend />} iconClass="bg-success-soft text-success-soft-fg" glow="to-success-soft/60" label="Minha média" value={fmtGrade(avg)}>
          <div className="mt-2">
            <Badge tone="success">{avg >= 8 ? 'Muito bem!' : avg >= 7 ? 'Indo bem!' : 'Vamos juntos!'}</Badge>
          </div>
        </Tile>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card>
          <h2 className="font-display text-h1 font-semibold text-fg">Próximas atividades</h2>
          {pending.length === 0 ? (
            <p className="mt-3 text-reading text-fg-muted">Tudo feito por hoje. Que tal um material extra?</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {pending.slice(0, 3).map((a) => {
                const subject = student.subjects.find((s) => s.id === a.subjectId)!
                return (
                  <li key={a.id} className="flex items-center gap-3 py-3">
                    <IconTile className={SUBJECT_TILE[subject.id]}>{SUBJECT_EMOJI[subject.id]}</IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-body font-medium text-fg">{a.title}</p>
                      <p className="text-small text-fg-muted">
                        {subject.name} · {a.minutes} min · {a.dueLabel}
                        <span className="sm:hidden"> · +XP</span>
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex">
                      <Badge tone="accent">+XP</Badge>
                    </span>
                    <Button variant="secondary" size="sm" icon={<IconPlay />} onClick={() => onStart(a)} aria-label={`Começar ${a.title}`}>
                      Começar
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
          <Button variant="ghost" size="sm" className="mt-2 -ml-3 text-info" onClick={() => onGo('materiais')}>
            Ver todas as atividades →
          </Button>
        </Card>

        <Card tone="verde" className="card-lift">
          <h2 className="font-display text-h1 font-semibold text-fg">Seu progresso</h2>
          <p className="text-small text-fg-muted">Você está evoluindo!</p>
          <div className="mt-4 flex items-center gap-5">
            <Donut value={student.performance.overallScore} />
            <dl className="flex-1 divide-y divide-verde-esc">
              <div className="flex items-center justify-between py-2">
                <dt className="text-small text-fg-muted">Frequência</dt>
                <dd className="font-display text-h2 font-semibold text-fg" data-numeric>{student.performance.attendanceRate}%</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-small text-fg-muted">Participação</dt>
                <dd className="font-display text-h2 font-semibold text-fg" data-numeric>{student.performance.participationRate}%</dd>
              </div>
            </dl>
          </div>
          <Button variant="ghost" size="sm" className="mt-2 -ml-3 text-info" icon={<IconChart />} onClick={() => onGo('progresso')}>
            Ver meu progresso →
          </Button>
        </Card>
      </div>
    </>
  )
}

// Anel verde com a porcentagem no meio. Local porque o ScoreDonut compartilhado é cinza-escuro e sem "%".
function Donut({ value, size = 104 }: { value: number; size?: number }) {
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  // Nasce vazio e desenha até o valor (como a ProgressBar do modelo).
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const id = requestAnimationFrame(() => setPct(value))
    return () => cancelAnimationFrame(id)
  }, [value])
  const shown = useCountUp(pct, 900)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Progresso geral: ${value}%`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-surface" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-success transition-[stroke-dashoffset] duration-[900ms] ease-enter"
        strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="fill-fg font-display text-h1 font-semibold">
        {shown}%
      </text>
    </svg>
  )
}
