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
    text: 'Cada conquista vira XP. A sequência de dias seguidos (streak) multiplica a vontade de voltar amanhã.',
  },
  {
    stage: 3,
    title: 'O monstrinho evolui',
    text: 'Do ovinho à coruja sábia. Se a criança some, o monstrinho sente falta — e ela quer voltar para cuidar dele.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20">
      <h2 id="como-funciona-titulo" className="font-display text-3xl font-bold text-balance sm:text-4xl">
        Como funciona
      </h2>
      <p className="mt-2 max-w-2xl text-lg text-ink/80">
        Cuidar do monstrinho é cuidar da própria educação. A recompensa aparece na hora, e o esforço fica visível.
      </p>

      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3">
            <div className="flex items-end gap-3">
              <Pet stage={step.stage} size={88} />
              <span className="mb-2 font-display text-5xl font-bold text-accent" aria-hidden="true">
                {i + 1}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold">{step.title}</h3>
            <p className="text-ink/80">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
