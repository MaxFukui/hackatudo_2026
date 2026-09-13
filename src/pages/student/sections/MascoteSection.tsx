import type { CSSProperties } from 'react'
import { Badge, Card, ProgressBar } from '@/components/ui'
import { Mascote } from '@/pages/student/components/Mascote'
import type { Student } from '@/pages/student/data/aluno'
import { MASCOTES, STAGES, mascoteForStudent, mascoteStrength, nextStage, stageForXp, strikesToLead } from '@/pages/student/lib/mascotes'
import { MASCOTE_BADGE, MASCOTE_CARD, SUBJECT_EMOJI } from '@/pages/student/lib/materias'
import { MascoteStage, StrikeBadge, StudentHeader } from './shared'

// Quem é o mascote, por que é ele e como trocar: o aluno entende a regra olhando.
export function MascoteSection({ student, cheer }: { student: Student; cheer: number }) {
  const current = mascoteForStudent(student.subjects)
  const stage = stageForXp(student.xp)
  const next = nextStage(student.xp)
  const lead = mascoteStrength(current, student.subjects)

  return (
    <>
      <StudentHeader eyebrow={student.className} title="Seu mascote" description="Ele vem com você porque é onde você está mais forte. Faça atividades e ele evolui." />

      <Card tone={MASCOTE_CARD[current.id]} className="overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-6">
          <MascoteStage mascote={current} stage={stage.stage} cheer={cheer} label={stage.name} />
          <div className="rounded-lg border border-border bg-surface p-4 animate-bubble-in md:p-5" style={{ animationDelay: '150ms' }}>
            <p className="text-small font-medium text-fg-muted">Seu mascote hoje</p>
            <h2 className="font-display text-display font-semibold text-fg">{current.name}</h2>
            <p className="mt-1 text-reading text-fg-muted">"{current.motto}"</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {current.subjects.map((id) => {
                const s = student.subjects.find((x) => x.id === id)!
                return (
                  <Badge key={id} tone={MASCOTE_BADGE[current.id]}>
                    {SUBJECT_EMOJI[id]} {s.name} · {s.streak} dias
                  </Badge>
                )
              })}
            </div>
            <div className="mt-4">
              {next ? (
                <>
                  <ProgressBar value={student.xp} max={next.minXp} label="XP até evoluir" tone="accent" />
                  <p className="mt-1.5 text-small text-fg-muted" data-numeric>
                    <strong className="font-display text-h2 font-semibold text-fg">{student.xp}</strong> de {next.minXp} XP — faltam {next.minXp - student.xp} para ficar <strong>{next.name}</strong>
                  </p>
                </>
              ) : (
                <Badge tone="accent" pop>🎉 Evoluído! {student.xp} XP</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      <section aria-labelledby="mascotes-title">
        <h2 id="mascotes-title" className="font-display text-h1 font-semibold text-fg">Os três mascotes</h2>
        <p className="mb-3 text-small text-fg-muted">Cada um cuida de duas matérias. O mais forte vem com você.</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 stagger">
          {MASCOTES.map((m, i) => {
            const isCurrent = m.id === current.id
            const strength = mascoteStrength(m, student.subjects)
            const missing = strikesToLead(m, student.subjects)
            return (
              <div key={m.id} style={{ '--stagger-index': i } as CSSProperties}>
                <Card tone={isCurrent ? MASCOTE_CARD[m.id] : 'default'} className="h-full card-lift">
                  <div className="flex flex-col items-center text-center">
                    <Mascote mascote={m} stage={isCurrent ? stage.stage : 3} size={120} still className={isCurrent ? '' : 'opacity-80'} />
                    <p className="mt-2 flex items-center gap-2 font-display text-h1 font-semibold text-fg">
                      {m.name}
                      {isCurrent && <Badge tone="accent" pop>com você</Badge>}
                    </p>
                    <p className="text-small text-fg-muted">{m.subjects.map((id) => `${SUBJECT_EMOJI[id]} ${student.subjects.find((s) => s.id === id)!.name}`).join('  ')}</p>
                    <div className="mt-3 w-full">
                      <ProgressBar value={strength} max={Math.max(lead, 1)} label={`Força do ${m.name}`} tone={isCurrent ? 'accent' : 'primary'} />
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <StrikeBadge days={strength} />
                        <span className="text-caption text-fg-muted">{isCurrent ? 'o mais forte!' : `faltam ${missing} dias`}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </section>

      <Card title="Como ele cresce" description="Cada atividade vale XP. Presença +10 · participação +15 · atividade +10 · prova acima da média +30.">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s) => {
            const reached = student.xp >= s.minXp
            const isNow = s.stage === stage.stage
            return (
              <li key={s.stage} className={`flex items-center gap-3 rounded-lg border p-3 transition-colors duration-base ${isNow ? 'border-primary-soft bg-primary-soft/40' : 'border-border'}`}>
                <Mascote mascote={current} stage={s.stage} size={64} still className={reached ? '' : 'opacity-40 grayscale'} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-h2 font-semibold text-fg">{s.name}</p>
                  <p className="text-small text-fg-muted" data-numeric>a partir de {s.minXp} XP</p>
                </div>
                {isNow ? <Badge tone="primary">agora</Badge> : reached ? <Badge tone="success">✓</Badge> : <Badge tone="neutral">🔒</Badge>}
              </li>
            )
          })}
        </ol>
      </Card>
    </>
  )
}
