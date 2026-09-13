import { Badge, Button, Card } from '@/components/ui'
import { COLLECTIVE_GOALS, COORDINATOR_SUMMARY, INTERVENTIONS } from './coordinatorData'
import { DashboardSectionHeader } from './DashboardSectionHeader'

export function ReportExport() {
  return (
    <>
      <DashboardSectionHeader title="Relatórios" description="Material pronto para reunião pedagógica, conselho de classe e apresentação do bimestre." />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card title="Prévia do relatório do bimestre" action={<Badge tone="accent">3º bimestre</Badge>}>
          <div className="space-y-4">
            <section className="rounded-lg border border-border border-l-4 border-l-azul-esc bg-surface-muted p-4">
              <h3 className="text-small font-semibold text-fg">Resumo executivo</h3>
              <p className="mt-2 text-small text-fg-muted">
                A escola acompanha {COORDINATOR_SUMMARY.totalStudents} alunos no painel. A presença média segue em {COORDINATOR_SUMMARY.attendanceRate}%, com participação em {COORDINATOR_SUMMARY.participationRate}% e {COORDINATOR_SUMMARY.studentsAtRisk} alunos em atenção.
              </p>
            </section>
            <div className="grid gap-3 md:grid-cols-3">
              <ReportTopic title="Turmas em destaque" text="1º Ano A e 2º Ano A próximos de recompensas coletivas." />
              <ReportTopic title="Intervenções" text="2º Ano C precisa de plano curto de recuperação e presença." />
              <ReportTopic title="Aprendizagem" text="Frações e problemas contextualizados aparecem como foco comum." />
            </div>
            <section className="rounded-lg border border-border p-4">
              <h3 className="text-small font-semibold text-fg">Pauta sugerida</h3>
              <ol className="mt-3 space-y-2 text-small text-fg-muted">
                {INTERVENTIONS.map((item) => (
                  <li key={item.id} className="grid gap-1 rounded-md bg-surface-muted p-3 md:grid-cols-[1fr_auto] md:items-center">
                    <span>{item.title}</span>
                    <span className="font-medium text-fg">{item.scope}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Card>
        <Card title="Entregáveis">
          <div className="space-y-3">
            <ReportAction label="Resumo para coordenação" detail="1 página com prioridades da semana." />
            <ReportAction label="Conselho de classe" detail="Turmas, professores, alunos em atenção e evolução." />
            <ReportAction label="Reconhecimento coletivo" detail="Metas alcançadas e próximas recompensas." />
            <div className="rounded-lg border border-border bg-surface-muted p-3">
              <p className="text-small font-medium text-fg">Metas para destacar</p>
              <ul className="mt-2 space-y-2 text-caption text-fg-muted">
                {COLLECTIVE_GOALS.slice(0, 3).map((goal) => (
                  <li key={goal.id} className="flex justify-between gap-3">
                    <span>{goal.className}</span>
                    <span className="font-medium text-fg">{goal.progress}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="secondary" disabled className="mt-2 w-full">
              Exportar PDF (em breve)
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

function ReportTopic({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-lg border border-border p-3">
      <h3 className="text-small font-semibold text-fg">{title}</h3>
      <p className="mt-1 text-caption text-fg-muted">{text}</p>
    </article>
  )
}

function ReportAction({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-muted p-3">
      <p className="text-small font-medium text-fg">{label}</p>
      <p className="mt-1 text-caption text-fg-muted">{detail}</p>
    </div>
  )
}
