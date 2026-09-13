import { Grid } from '@/components/ui'
import { Reveal } from './Reveal'

// Valores reais do streakSystem (src/data/db.json).
const POINTS = [
  { value: '+10', label: 'Presença', detail: 'por aula em que a criança está lá' },
  { value: '+15', label: 'Participação', detail: 'pergunta, resposta, ajuda a um colega' },
  { value: '+10', label: 'Lição feita', detail: 'exercício entregue no prazo' },
  { value: '+30', label: 'Prova acima da média', detail: 'nota maior que a média da turma' },
]

export function PointsNumbers() {
  return (
    <section aria-labelledby="pontos-titulo" className="mx-auto max-w-content px-4 py-20 md:px-8 md:py-28">
      <Reveal className="text-center">
        <h2 id="pontos-titulo" className="text-statement font-display font-semibold">
          Cada conquista vale pontinhos
        </h2>
      </Reveal>
      <Grid layout="stats" className="mt-10 md:mt-14">
        {POINTS.map((point) => (
          <div key={point.label} className="flex flex-col items-center rounded-lg border border-border bg-surface px-4 py-8 text-center md:py-10">
            <p data-numeric className="text-hero font-display font-semibold text-(--color-highlight)">
              {point.value}
            </p>
            <p className="mt-2 text-h2 font-semibold">{point.label}</p>
            <p className="mt-1 text-small text-fg-muted">{point.detail}</p>
          </div>
        ))}
      </Grid>
    </section>
  )
}
