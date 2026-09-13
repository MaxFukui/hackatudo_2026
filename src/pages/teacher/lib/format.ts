import type { Tone } from '@/components/ui'
import { PERFORMANCE_LABEL } from '@/lib/format'
import { MASCOTES, stageForXp } from '@/pages/student/lib/mascotes'
import type { PerformanceLevel } from '@/types'
import type { ClassStudent } from '../data/turma'

export const LEVEL_TONE: Record<PerformanceLevel, Tone> = {
  critical: 'danger',
  attention: 'warning',
  regular: 'neutral',
  good: 'success',
  excellent: 'info',
}

export { PERFORMANCE_LABEL }

export const firstName = (name: string) => name.split(' ')[0]

export function mascoteOf(s: ClassStudent) {
  return MASCOTES.find((m) => m.id === s.mascote) ?? MASCOTES[0]
}

export function stageOf(s: ClassStudent) {
  return stageForXp(s.xp)
}
