import { Badge, Card, ProgressBar } from '@/components/ui'
import { COLLECTIVE_GOALS } from './coordinatorData'
import { DashboardSectionHeader } from './DashboardSectionHeader'

export function CollectiveGoals() {
  const sortedGoals = [...COLLECTIVE_GOALS].sort((a, b) => b.progress - a.progress)
  const nextReward = sortedGoals[0]

  return (
    <>
      <DashboardSectionHeader title="Metas coletivas" description="Recompensas de turma conectadas a presença, participação e atividades concluídas." />
      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card title="Próxima recompensa" description="Ajuda a direção a validar combinados e reconhecer a turma no momento certo.">
          <div className="rounded-lg border border-border border-l-4 border-l-success bg-surface-muted p-4">
            <Badge tone="success">{nextReward.className}</Badge>
            <h2 className="mt-3 text-h2 font-semibold text-fg">{nextReward.reward}</h2>
            <p className="mt-2 text-small text-fg-muted">{nextReward.requirement}</p>
            <div className="mt-4">
              <ProgressBar value={nextReward.progress} label={nextReward.reward} tone="success" showValue />
            </div>
            <p className="mt-3 text-small font-medium text-fg">{nextReward.remaining}</p>
          </div>
        </Card>
        <Card title="Como a coordenação usa" description="Recompensas coletivas viram combinados de turma, não prêmio individual.">
          <div className="grid gap-3 md:grid-cols-3">
            <UseCase title="Reconhecer" text="validar conquistas sem esperar o fim do bimestre" />
            <UseCase title="Reorientar" text="criar metas curtas para presença e participação" />
            <UseCase title="Equilibrar" text="evitar competição por nota e valorizar evolução" />
          </div>
        </Card>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        {sortedGoals.map((goal) => (
          <Card key={goal.id} title={goal.className} description={goal.requirement} action={<Badge tone={goal.tone}>{goal.reward}</Badge>}>
            <div className="space-y-4">
              <div>
                <div className="flex items-end justify-between gap-3">
                  <p className="text-3xl font-semibold tabular-nums text-fg">{goal.progress}%</p>
                  <p className="pb-1 text-small text-fg-muted">{goal.remaining}</p>
                </div>
                <div className="mt-3">
                  <ProgressBar value={goal.progress} label={`${goal.className} - ${goal.reward}`} tone={goal.progress >= 90 ? 'success' : goal.progress >= 70 ? 'accent' : 'warning'} />
                </div>
              </div>
              <div className="grid gap-3 rounded-lg bg-surface-muted p-3 text-small md:grid-cols-[1fr_auto] md:items-center">
                <p className="text-fg-muted">Responsável pelo combinado</p>
                <p className="font-medium text-fg">{goal.owner}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

function UseCase({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-lg border border-border bg-surface-muted p-3">
      <h3 className="text-small font-semibold text-fg">{title}</h3>
      <p className="mt-1 text-caption text-fg-muted">{text}</p>
    </article>
  )
}
