import type { StreakLevel, StreakSystem } from '@/types'
import { db, respond } from './client'

export function getStreakSystem(): Promise<StreakSystem> {
  return respond(db.streakSystem)
}

// Funções puras: podem ser usadas direto no render.
export function levelForXp(xp: number, levels: StreakLevel[] = db.streakSystem.levels): StreakLevel {
  return [...levels].reverse().find((l) => xp >= l.minXp) ?? levels[0]
}

export function progressToNextLevel(xp: number, nextLevelXp: number): number {
  if (nextLevelXp <= 0) return 100
  return Math.min(100, Math.round((xp / nextLevelXp) * 100))
}
