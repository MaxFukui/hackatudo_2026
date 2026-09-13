// O que o professor registra na aula e quanto cada coisa vale (streakSystem do db.json).
export type RecordKind = 'attendance' | 'participation' | 'homework'

export const RECORDS: Record<RecordKind, { label: string; xp: number; emoji: string }> = {
  attendance: { label: 'Presença', xp: 10, emoji: '✋' },
  participation: { label: 'Participou', xp: 15, emoji: '🙋' },
  homework: { label: 'Fez a lição', xp: 10, emoji: '📘' },
}

export interface TodayLog {
  present: boolean
  participations: number
  homework: boolean
}
