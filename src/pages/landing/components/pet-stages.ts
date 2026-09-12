// Estágios do monstrinho. XP mínimo segue a lógica do streakSystem do db.json:
// presença +10, participação +15, tarefa +10, prova acima da média +30.
export type PetStage = 0 | 1 | 2 | 3

export const PET_STAGES: { stage: PetStage; minXp: number; name: string; celebration: string }[] = [
  { stage: 0, minXp: 0, name: 'Ovinho', celebration: 'Um ovinho apareceu!' },
  { stage: 1, minXp: 25, name: 'Ovinho rachando', celebration: 'O ovinho começou a rachar!' },
  { stage: 2, minXp: 60, name: 'Gizinho', celebration: 'Nasceu! Um gizinho saiu do ovo.' },
  { stage: 3, minXp: 110, name: 'Giz brilhante', celebration: 'Evoluiu! Seu gizinho virou um giz brilhante.' },
]

export function stageForXp(xp: number): PetStage {
  return [...PET_STAGES].reverse().find((s) => xp >= s.minXp)?.stage ?? 0
}
