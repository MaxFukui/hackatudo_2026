import { useRef, useState } from 'react'
import { Pet } from './Pet'
import { PET_STAGES, stageForXp } from './pet-stages'

// Mesmos valores do streakSystem em db.json.
const ACTIONS = [
  { id: 'attendance', label: 'Vim à aula', xp: 10 },
  { id: 'participation', label: 'Participei', xp: 15 },
  { id: 'homework', label: 'Fiz a lição', xp: 10 },
  { id: 'exam', label: 'Prova acima da média', xp: 30 },
] as const

const MAX_XP = PET_STAGES[PET_STAGES.length - 1].minXp

export function Hero() {
  const [xp, setXp] = useState(0)
  const floatId = useRef(0)
  const [floats, setFloats] = useState<{ key: number; value: number }[]>([])
  const [message, setMessage] = useState('Toque nas ações e veja o ovinho ganhar vida.')

  const stage = stageForXp(xp)
  const next = PET_STAGES[stage + 1]
  const current = PET_STAGES[stage]
  const progress = next ? ((xp - current.minXp) / (next.minXp - current.minXp)) * 100 : 100

  const earn = (value: number) => {
    const nextXp = Math.min(MAX_XP, xp + value)
    const nextStage = stageForXp(nextXp)
    setXp(nextXp)
    setMessage(nextStage > stage ? PET_STAGES[nextStage].celebration : `+${value} pontinhos para o seu monstrinho.`)

    const key = ++floatId.current
    setFloats((prev) => [...prev, { key, value }])
    setTimeout(() => setFloats((prev) => prev.filter((f) => f.key !== key)), 900)
  }

  const done = xp >= MAX_XP

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-strong">Sala de aula gamificada</p>
        <h1 className="font-display text-4xl leading-[1.05] font-bold text-balance text-ink sm:text-5xl lg:text-6xl">
          Cuide do seu monstrinho. Cuide do seu aprendizado.
        </h1>
        <p className="max-w-xl text-lg text-ink/80">
          Cada presença, participação e lição feita vira pontinho. Os pontinhos chocam o ovo e fazem o monstrinho
          crescer — na TV da sala, na frente da turma toda.
        </p>
      </div>

      <div className="rounded-3xl border-4 border-ink bg-white/60 p-5 shadow-[6px_6px_0_0_var(--color-ink)]">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div key={stage} className="pet-pop">
              <Pet stage={stage} size={168} />
            </div>
            {floats.map((f) => (
              <span
                key={f.key}
                aria-hidden="true"
                className="xp-float pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 font-display text-2xl font-bold text-primary"
              >
                +{f.value}
              </span>
            ))}
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-display text-xl font-bold">{current.name}</p>
              <p className="text-sm font-semibold text-ink/70 tabular-nums">{xp} XP</p>
            </div>
            <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-surface">
              <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p aria-live="polite" className="min-h-[1.5em] text-sm font-semibold text-ink">
              {message}
            </p>

            {done ? (
              <button
                type="button"
                onClick={() => {
                  setXp(0)
                  setMessage('Um ovinho novo apareceu!')
                }}
                className="rounded-full border-2 border-ink bg-surface px-4 py-2 text-sm font-bold hover:bg-accent/40"
              >
                Chocar outro ovinho
              </button>
            ) : (
              <div className="flex flex-wrap gap-2">
                {ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => earn(action.xp)}
                    className="rounded-full border-2 border-ink bg-surface px-3 py-1.5 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-0"
                  >
                    {action.label} <span className="text-primary-strong">+{action.xp}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
