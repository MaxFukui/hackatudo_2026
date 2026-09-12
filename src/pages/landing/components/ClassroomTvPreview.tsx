import { useEffect, useState } from 'react'
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
    <section id="tv-da-sala" aria-labelledby="tv-titulo" className="scroll-mt-8 bg-ink py-20 text-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <h2 id="tv-titulo" className="font-display text-3xl font-bold text-balance sm:text-4xl">
            A TV da sala vira o viveiro da turma
          </h2>
          <p className="text-lg text-surface/80">
            Um painel ao vivo na televisão da sala mostra os monstrinhos de todo mundo e comemora cada conquista na hora.
            A tela é coletiva: ninguém precisa de celular para participar.
          </p>
          <ul className="space-y-2 text-surface/90">
            <li>· Comemorações em tempo real quando alguém ganha pontinhos</li>
            <li>· Sequência de dias seguidos de cada aluno</li>
            <li>· Metas da turma inteira, não só individuais</li>
          </ul>
        </div>

        <figure className="rounded-[2rem] border-8 border-black/40 bg-surface p-4 text-ink shadow-2xl sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-lg font-bold">4º Ano A · Matemática</p>
            <p className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">AO VIVO</p>
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {CLASSMATES.map((kid) => (
              <li key={kid.name} className="flex flex-col items-center rounded-2xl bg-white/70 p-2">
                <Pet stage={kid.stage} size={72} />
                <p className="text-sm font-bold">{kid.name}</p>
                <p className="text-xs text-ink/70 tabular-nums">{kid.streak} {kid.streak === 1 ? 'dia' : 'dias'}</p>
              </li>
            ))}
          </ul>
          <figcaption aria-live="polite" className="mt-4 rounded-xl bg-accent/40 px-4 py-2 text-sm font-bold">
            {FEED[feedIndex]}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
