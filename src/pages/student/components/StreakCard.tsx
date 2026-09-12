import { Card } from '@/components/ui'
import type { StudentStreak } from '@/types'
import { XpBar } from './XpBar'

export function StreakCard({ streak }: { streak: StudentStreak }) {
  return (
    <Card title="Sequência">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold tabular-nums">{streak.current}</span>
        <span className="text-sm text-stone-500">dias seguidos · recorde {streak.best}</span>
      </div>
      <p className="mt-1 text-sm text-stone-600 tabular-nums">{streak.points} pontos</p>
      <div className="mt-4">
        <XpBar xp={streak.xp} nextLevelXp={streak.nextLevelXp} level={streak.level} />
      </div>
    </Card>
  )
}
