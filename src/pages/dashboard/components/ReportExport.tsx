import { PageHeader } from '@/components/layout'
import { Badge, Button, Card } from '@/components/ui'
import { COORDINATOR_SUMMARY } from '../coordinatorData'

export function ReportExport() {
  return (
    <>
      <PageHeader title="Relatórios" description="Material pronto para reunião pedagógica, conselho de classe e apresentação do bimestre." />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card title="Prévia do relatório do bimestre" action={<Badge tone="accent">3o bimestre</Badge>}>
          <div className="space-y-4">
            <section className="rounded-lg border border-border bg-surface-muted p-4">
              <h3 className="text-small font-semibold text-fg">Resumo executivo</h3>
              <p className="mt-2 text-small text-fg-muted">
                A escola acompanha {COORDINATOR_SUMMARY.totalStudents} alunos no painel. A presença média segue em {COORDINATOR_SUMMARY.attendanceRate}%, com participação em {COORDINATOR_SUMMARY.participationRate}% e {COORDINATOR_SUMMARY.studentsAtRisk} alunos em atenção.
              </p>
            </section>
            <div className="grid gap-3 md:grid-cols-3">
              <ReportTopic title="Turmas em destaque" text="1o Ano A e 6o Ano A próximos de recompensas coletivas." />
              <ReportTopic title="Intervenções" text="5o Ano B precisa de plano curto de recuperação e presença." />
              <ReportTopic title="Aprendizagem" text="Frações e problemas contextualizados aparecem como foco comum." />
            </div>
          </div>
        </Card>
        <Card title="Entregáveis">
          <div className="space-y-3">
            <ReportAction label="Resumo para coordenação" detail="1 página com prioridades da semana." />
            <ReportAction label="Conselho de classe" detail="Turmas, professores, alunos em atenção e evolução." />
            <ReportAction label="Reconhecimento coletivo" detail="Metas alcançadas e próximas recompensas." />
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
