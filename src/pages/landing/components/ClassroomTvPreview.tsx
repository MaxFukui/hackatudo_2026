import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui'
import { Pet } from './Pet'
import type { PetStage } from './pet-stages'

// Dados de exemplo para a prévia da TV.
const CLASSMATES: { name: string; stage: PetStage; streak: number }[] = [
  { name: 'Lucas', stage: 3, streak: 7 },
  { name: 'Ana', stage: 2, streak: 5 },
  { name: 'Pedro', stage: 1, streak: 2 },
  { name: 'Júlia', stage: 3, streak: 12 },
  { name: 'Davi', stage: 0, streak: 1 },
  { name: 'Maria', stage: 2, streak: 4 },
]

const FEED = [
  'Júlia chegou a 12 dias seguidos!',
  'O ovinho do Pedro começou a rachar',
  'Ana participou da aula · +15',
  'Lucas tirou nota acima da média · +30',
  'A turma bateu 92% de presença esta semana',
]

export function ClassroomTvPreview() {
  const [feedIndex, setFeedIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFeedIndex((i) => (i + 1) % FEED.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="tv-da-sala" aria-labelledby="tv-titulo" className="scroll-mt-16 bg-surface py-20 text-fg md:py-28">
      <div className="mx-auto grid max-w-content items-center gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          <h2 id="tv-titulo" className="text-statement font-display font-semibold">
            A TV da sala vira o viveiro da turma
          </h2>
          <p className="max-w-reading text-reading text-fg-muted">
            Um painel ao vivo na televisão da sala mostra os monstrinhos de todo mundo e comemora cada conquista na hora. A tela é
            coletiva: ninguém precisa de celular para participar.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-body text-fg-muted">
            <li>Comemorações em tempo real quando alguém ganha pontinhos</li>
            <li>Sequência de dias seguidos de cada aluno</li>
            <li>Metas da turma inteira, não só individuais</li>
          </ul>
        </div>

        <figure className="rounded-lg border-8 border-ink-900 bg-canvas p-3 text-fg shadow-overlay sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="font-display text-h2 font-semibold">4º Ano A · Matemática</p>
            <Badge tone="accent" dot>
              Ao vivo
            </Badge>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CLASSMATES.map((kid) => (
              <li key={kid.name} className="flex flex-col items-center rounded-md border border-border bg-surface p-2">
                <Pet stage={kid.stage} size={64} />
                <p className="text-small font-semibold">{kid.name}</p>
                <p className="text-caption text-fg-muted" data-numeric>
                  {kid.streak} {kid.streak === 1 ? 'dia' : 'dias'}
                </p>
              </li>
            ))}
          </ul>
          <figcaption aria-live="polite" className="mt-3 rounded-md bg-accent-soft px-3 py-2 text-small font-medium text-accent-soft-fg">
            <span key={feedIndex} className="block animate-rise">
              {FEED[feedIndex]}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
