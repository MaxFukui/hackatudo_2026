import type { Subject, SubjectId } from '@/pages/student/data/aluno'

// Cada mascote é "dono" de duas matérias. O aluno ganha o mascote das matérias em que
// está mais firme — medido pelo strike (dias seguidos) de cada uma. O mascote muda
// quando o aluno muda: quem melhora em Português ganha o Zeta.
export type MascoteId = 'x' | 'z' | 'k'

/** Tons pastel da paleta (Card tone) e o tom forte para o corpo do mascote. */
export type MascoteTone = 'laranja' | 'azul' | 'verde'

export interface Mascote {
  id: MascoteId
  name: string
  letter: string
  tone: MascoteTone
  subjects: [SubjectId, SubjectId]
  /** Como o mascote fala de si. */
  motto: string
}

export const MASCOTES: Mascote[] = [
  { id: 'x', name: 'Xis', letter: 'X', tone: 'laranja', subjects: ['matematica', 'ciencias'], motto: 'Adoro números e experiências!' },
  { id: 'z', name: 'Zeta', letter: 'Z', tone: 'azul', subjects: ['portugues', 'historia'], motto: 'Uma boa história muda tudo.' },
  { id: 'k', name: 'Kiko', letter: 'K', tone: 'verde', subjects: ['geografia', 'filosofia'], motto: 'Gosto de mapas e de perguntas grandes.' },
]

/** Quatro estágios, como o ovinho da landing: ovo → racha → nasce → brilha.
 *  XP segue o streakSystem (presença +10, participação +15, tarefa +10, prova +30). */
export const STAGES = [
  { stage: 0, minXp: 0, name: 'Ovinho', celebration: 'Um ovinho apareceu!' },
  { stage: 1, minXp: 100, name: 'Rachando', celebration: 'O ovinho começou a rachar!' },
  { stage: 2, minXp: 250, name: 'Gizinho', celebration: 'Nasceu! Seu gizinho saiu do ovo.' },
  { stage: 3, minXp: 500, name: 'Giz brilhante', celebration: 'Evoluiu! Virou um giz brilhante.' },
] as const

export type StageIndex = Stage['stage']

export type Stage = (typeof STAGES)[number]

export function stageForXp(xp: number): Stage {
  return [...STAGES].reverse().find((s) => xp >= s.minXp) ?? STAGES[0]
}

export function nextStage(xp: number): Stage | null {
  return STAGES.find((s) => s.minXp > xp) ?? null
}

/** Força do mascote = soma dos strikes das duas matérias dele. */
export function mascoteStrength(m: Mascote, subjects: Subject[]): number {
  return m.subjects.reduce((sum, id) => sum + (subjects.find((s) => s.id === id)?.streak ?? 0), 0)
}

/** O mascote do aluno hoje: o mais forte. Empate → ordem da lista. */
export function mascoteForStudent(subjects: Subject[]): Mascote {
  return MASCOTES.reduce((best, m) => (mascoteStrength(m, subjects) > mascoteStrength(best, subjects) ? m : best), MASCOTES[0])
}

/** Quantos strikes faltam para o mascote assumir (0 se já é o atual). Ajuda a mostrar "quase lá". */
export function strikesToLead(m: Mascote, subjects: Subject[]): number {
  const lead = Math.max(...MASCOTES.map((x) => mascoteStrength(x, subjects)))
  return Math.max(0, lead - mascoteStrength(m, subjects) + (m.id === mascoteForStudent(subjects).id ? 0 : 1))
}
