import { PageHeader } from '@/components/layout'
import { Button, Card } from '@/components/ui'

// Stub: exportação ainda não implementada.
export function ReportExport() {
  return (
    <>
      <PageHeader title="Relatórios" />
      <Card title="Relatório do bimestre">
        <p className="mb-4 text-sm text-fg-muted">Desempenho, frequência e alertas consolidados da escola.</p>
        <Button variant="secondary" disabled>
          Exportar PDF (em breve)
        </Button>
      </Card>
    </>
  )
}
