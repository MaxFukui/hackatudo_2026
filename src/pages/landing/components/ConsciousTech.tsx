import { Grid } from '@/components/ui'

const POINTS = [
  {
    title: 'Tela coletiva, não celular individual',
    text: 'A tecnologia fica na parede da sala, a serviço da turma. Nada de mais uma notificação disputando atenção.',
  },
  {
    title: 'IA que ensina, não entrega a resposta',
    text: 'O tutor dá dicas, explica de outro jeito e revisa os erros. A resposta final continua sendo da criança.',
  },
  {
    title: 'Recompensa pelo que importa',
    text: 'Pontinhos vêm de presença, participação e esforço — não de tempo de tela.',
  },
]

export function ConsciousTech() {
  return (
    <section aria-labelledby="consciente-titulo" className="mx-auto max-w-content px-4 py-16 md:px-8">
      <h2 id="consciente-titulo" className="max-w-reading font-display text-h1 font-semibold">
        A mesma dopamina das redes sociais, agora a favor da escola
      </h2>
      <Grid layout="three" className="mt-8">
        {POINTS.map((point) => (
          <article key={point.title} className="space-y-2 border-t-2 border-border-strong pt-4">
            <h3 className="text-h2 font-semibold">{point.title}</h3>
            <p className="text-body text-fg-muted">{point.text}</p>
          </article>
        ))}
      </Grid>
    </section>
  )
}
