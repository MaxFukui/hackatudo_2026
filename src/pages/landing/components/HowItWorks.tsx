import { Grid } from '@/components/ui'
import { Pet } from './Pet'
import type { PetStage } from './pet-stages'

const STEPS: { stage: PetStage; title: string; text: string }[] = [
  {
    stage: 0,
    title: 'A criança participa',
    text: 'Presença, pergunta feita em aula, lição entregue, prova acima da média. O professor registra em segundos.',
  },
  {
    stage: 1,
    title: 'Ganha pontinhos',
    text: 'Cada conquista vira XP. A sequência de dias seguidos dá vontade de voltar amanhã.',
  },
  {
    stage: 3,
    title: 'O monstrinho evolui',
    text: 'Do ovinho ao giz brilhante. Se a criança some, o monstrinho sente falta — e ela quer voltar para cuidar dele.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="mx-auto max-w-content scroll-mt-4 px-4 py-16 md:px-8">
      <h2 id="como-funciona-titulo" className="font-display text-h1 font-semibold">
        Como funciona
      </h2>
      <p className="mt-2 max-w-reading text-reading text-fg-muted">
        Cuidar do monstrinho é cuidar da própria educação. A recompensa aparece na hora, e o esforço fica visível.
      </p>

      <ol className="mt-8">
        <Grid layout="three">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-2">
              <div className="flex items-end gap-3">
                <Pet stage={step.stage} size={80} />
                <span aria-hidden="true" className="mb-2 font-display text-numeral font-semibold text-accent-soft-fg">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-h2 font-semibold">{step.title}</h3>
              <p className="text-body text-fg-muted">{step.text}</p>
            </li>
          ))}
        </Grid>
      </ol>
    </section>
  )
}
