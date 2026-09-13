import { useRef, useState } from 'react'
import { Button, Card, ProgressBar } from '@/components/ui'
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
  const [earned, setEarned] = useState(0)
  const [floats, setFloats] = useState<{ key: number; value: number }[]>([])
  const [message, setMessage] = useState('Toque nas ações e veja o ovinho ganhar vida.')
  const floatId = useRef(0)

  const stage = stageForXp(xp)
  const current = PET_STAGES[stage]
  const next = PET_STAGES[stage + 1]
  const done = xp >= MAX_XP

  const earn = (value: number) => {
    const nextXp = Math.min(MAX_XP, xp + value)
    const nextStage = stageForXp(nextXp)
    setXp(nextXp)
    setEarned((n) => n + 1)
    setMessage(nextStage > stage ? PET_STAGES[nextStage].celebration : `+${value} pontinhos para o seu monstrinho.`)

    const key = ++floatId.current
    setFloats((prev) => [...prev, { key, value }])
    setTimeout(() => setFloats((prev) => prev.filter((f) => f.key !== key)), 900)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <p className="text-small font-medium text-accent-soft-fg">Sala de aula gamificada</p>
        <h1 className="font-display text-display font-semibold text-fg">Cuide do seu monstrinho. Cuide do seu aprendizado.</h1>
        <p className="max-w-reading text-reading text-fg-muted">
          Cada presença, participação e lição feita vira pontinho. Os pontinhos chocam o ovo e fazem o monstrinho crescer — na TV
          da sala, na frente da turma toda.
        </p>
      </div>

      <Card tone="amarelo">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="relative shrink-0">
            <div key={stage} className={stage > 0 ? 'animate-pop' : undefined}>
              <Pet stage={stage} size={160} wiggleKey={earned} />
            </div>
            {floats.map((f) => (
              <span
                key={f.key}
                aria-hidden="true"
                className="xp-float pointer-events-none absolute top-4 left-1/2 font-display text-numeral font-semibold text-accent-soft-fg"
              >
                +{f.value}
              </span>
            ))}
          </div>

          <div className="w-full min-w-0 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-display text-h2 font-semibold text-fg">{current.name}</p>
              <p className="text-small text-fg-muted" data-numeric>
                {xp} XP
              </p>
            </div>
            <ProgressBar
              tone="accent"
              label={next ? `XP para ${next.name.toLowerCase()}` : 'Evolução completa'}
              value={next ? xp - current.minXp : 1}
              max={next ? next.minXp - current.minXp : 1}
            />
            <p aria-live="polite" className="min-h-6 text-body font-medium text-fg">
              {message}
            </p>

            {done ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setXp(0)
                  setMessage('Um ovinho novo apareceu!')
                }}
              >
                Chocar outro ovinho
              </Button>
            ) : (
              <div className="flex flex-wrap gap-2">
                {ACTIONS.map((action) => (
                  <Button key={action.id} variant="secondary" onClick={() => earn(action.xp)}>
                    {action.label}
                    <span className="font-semibold text-accent-soft-fg" data-numeric>
                      +{action.xp}
                    </span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
