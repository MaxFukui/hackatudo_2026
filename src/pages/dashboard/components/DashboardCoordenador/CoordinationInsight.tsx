import { Badge, Card } from '@/components/ui'

const INSIGHTS = [
  {
    label: 'Prioridade da semana',
    title: 'Engajamento do 2º Ano C',
    text: 'A turma tem queda simultânea em presença, participação e entregas. Vale combinar uma meta coletiva curta antes da próxima avaliação.',
    tone: 'danger' as const,
  },
  {
    label: 'Oportunidade',
    title: 'Recompensas como cultura de turma',
    text: '1º Ano A e 2º Ano A estão perto de conquistar recompensas. A coordenação pode usar esses casos como exemplo para outras salas.',
    tone: 'success' as const,
  },
  {
    label: 'Apoio pedagógico',
    title: 'Frações seguem como conteúdo sensível',
    text: 'O 4º Ano A evoluiu, mas ainda concentra dificuldades em problemas contextualizados. Uma intervenção curta pode evitar queda no bimestre.',
    tone: 'warning' as const,
  },
]

export function CoordinationInsight() {
  return (
    <Card title="Leitura da Coordenação" description="Sinais transformados em decisões práticas para a semana.">
      <div className="space-y-3">
        {INSIGHTS.map((item) => (
          <article key={item.title} className="rounded-lg border border-border bg-surface-muted p-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge tone={item.tone} dot>
                {item.label}
              </Badge>
              <h3 className="text-small font-semibold text-fg">{item.title}</h3>
            </div>
            <p className="text-small text-fg-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </Card>
  )
}
