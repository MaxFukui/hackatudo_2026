import { ProgressBar } from '@/components/ui'

interface XpBarProps {
  xp: number
  nextLevelXp: number
  level: number
}

export function XpBar({ xp, nextLevelXp, level }: XpBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-stone-500 tabular-nums">
        <span>Nível {level}</span>
        <span>
          {xp} / {nextLevelXp} XP
        </span>
      </div>
      <ProgressBar value={xp} max={nextLevelXp} label="XP para o próximo nível" />
    </div>
  )
}
