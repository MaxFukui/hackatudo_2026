import type { SubjectId } from '@/pages/student/data/aluno'
import { MASCOTES, type Mascote, type MascoteId } from '@/pages/student/lib/mascotes'
import type { CardTone, Tone } from '@/components/ui'

// Cada mascote pinta suas matérias: o aluno aprende a cor uma vez e reconhece em toda tela.
export const MASCOTE_CARD: Record<MascoteId, CardTone> = { x: 'rosa', z: 'azul', k: 'verde' }
export const MASCOTE_BADGE: Record<MascoteId, Tone> = { x: 'accent', z: 'info', k: 'success' }

export function mascoteOfSubject(id: SubjectId): Mascote {
  return MASCOTES.find((m) => m.subjects.includes(id)) ?? MASCOTES[0]
}

export function subjectTone(id: SubjectId): Tone {
  return MASCOTE_BADGE[mascoteOfSubject(id).id]
}

export function fmtGrade(n: number) {
  return n.toFixed(1).replace('.', ',')
}

/** Emoji por matéria: a criança acha pela figura antes de ler. */
export const SUBJECT_EMOJI: Record<SubjectId, string> = {
  matematica: '➗',
  ciencias: '🔬',
  portugues: '📚',
  historia: '🏛️',
  geografia: '🗺️',
  filosofia: '💭',
}

/** Quadrado pastel por matéria (mesma cor do mascote dela). */
export const SUBJECT_TILE: Record<SubjectId, string> = {
  matematica: 'bg-accent-soft text-accent-soft-fg',
  ciencias: 'bg-accent-soft text-accent-soft-fg',
  portugues: 'bg-azul-claro text-info-soft-fg',
  historia: 'bg-azul-claro text-info-soft-fg',
  geografia: 'bg-success-soft text-success-soft-fg',
  filosofia: 'bg-success-soft text-success-soft-fg',
}

