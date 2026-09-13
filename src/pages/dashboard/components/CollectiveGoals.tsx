import { PageHeader } from '@/components/layout'
import { Badge, Card, ProgressBar } from '@/components/ui'
import { COLLECTIVE_GOALS } from '../coordinatorData'

export function CollectiveGoals() {
  return (
    <>
      <PageHeader title="Metas coletivas" description="Recompensas de turma conectadas a presença, participação e atividades concluídas." />
      <div className="grid gap-4 lg:grid-cols-2">
        {COLLECTIVE_GOALS.map((goal) => (
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
              <p className="rounded-lg bg-surface-muted p-3 text-small text-fg-muted">
                A recompensa coletiva ajuda a turma a cuidar do próprio ritmo: quem está mais engajado puxa combinados positivos sem expor quem está com dificuldade.
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
