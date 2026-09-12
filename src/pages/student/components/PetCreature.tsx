import { Card } from '@/components/ui'
import { db } from '@/services/client'

// Placeholder do bichinho: tamanho cresce com o nível. Trocar por arte/animação.
export function PetCreature({ level }: { level: number }) {
  const levelInfo = db.streakSystem.levels.find((l) => l.level === level)
  const size = 48 + level * 16

  return (
    <Card title="Seu bichinho">
      <div className="flex flex-col items-center gap-3 py-4">
        <div
          className="flex items-center justify-center rounded-full bg-accent/30 text-primary-strong"
          style={{ width: size, height: size }}
          aria-label={`Bichinho nível ${level}`}
        >
          Nv {level}
        </div>
        <p className="font-medium">{levelInfo?.name ?? `Nível ${level}`}</p>
      </div>
    </Card>
  )
}
