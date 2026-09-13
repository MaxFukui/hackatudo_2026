// Mock da turma da professora. Sem backend: tudo que a área do professor precisa vive aqui.
// Coerente com src/data/db.json: 4º Ano A, 28 alunos, média 7,6, distribuição 2/4/8/10/4.
// Lucas Silva (student_001) é o mesmo aluno da área do aluno.
import type { MascoteId } from '@/pages/student/lib/mascotes'
import type { ActivityType, PerformanceLevel } from '@/types'

export interface ClassStudent {
  id: string
  name: string
  mascote: MascoteId
  xp: number
  /** Dias seguidos com presença. */
  streak: number
  averageGrade: number
  attendanceRate: number
  participationRate: number
  /** Variação (%) nas últimas três atividades. Negativo = caiu. */
  trend: number
}

export interface ClassActivity {
  id: string
  title: string
  type: ActivityType
  dueLabel: string
  delivered: number
  /** Média da turma (0–10); null enquanto não corrigida. */
  average: number | null
}

export const TEACHER = { name: 'Prof.ª Mariana Oliveira', className: '4º Ano A', subject: 'Matemática' }

// [id, nome, mascote, xp, sequência, média, presença %, participação %, tendência %]
type Row = [string, string, MascoteId, number, number, number, number, number, number]
const ROWS: Row[] = [
  ['student_001', 'Lucas Silva', 'x', 340, 7, 7.6, 94, 82, 3],
  ['student_002', 'Ana Costa', 'z', 480, 12, 9.1, 100, 92, 4],
  ['student_003', 'Pedro Lima', 'k', 130, 1, 5.8, 84, 62, -18],
  ['student_004', 'Júlia Martins', 'x', 245, 9, 8.4, 97, 88, 6],
  ['student_005', 'Davi Pereira', 'z', 95, 2, 6.8, 88, 70, 0],
  ['student_006', 'Maria Eduarda', 'k', 490, 14, 9.5, 100, 95, 2],
  ['student_007', 'Arthur Mendes', 'x', 310, 6, 8.0, 94, 78, 1],
  ['student_008', 'Beatriz Lopes', 'z', 270, 5, 7.3, 91, 74, -2],
  ['student_009', 'Bernardo Souza', 'k', 60, 0, 4.6, 76, 48, -12],
  ['student_010', 'Caio Ribeiro', 'x', 205, 4, 7.0, 90, 70, 0],
  ['student_011', 'Clara Figueiredo', 'z', 520, 11, 9.7, 100, 90, 5],
  ['student_012', 'Enzo Gomes', 'k', 180, 3, 6.4, 86, 66, -10],
  ['student_013', 'Eduarda Nunes', 'x', 360, 8, 8.2, 96, 84, 2],
  ['student_014', 'Gabriel Torres', 'z', 150, 3, 7.2, 90, 74, -1],
  ['student_015', 'Helena Barros', 'k', 400, 10, 8.6, 98, 86, 3],
  ['student_016', 'Heitor Alves', 'x', 90, 1, 4.9, 80, 54, -6],
  ['student_017', 'Isabela Duarte', 'z', 330, 7, 8.1, 95, 80, 1],
  ['student_018', 'João Vitor', 'k', 210, 4, 7.4, 92, 72, 0],
  ['student_019', 'Laura Campos', 'x', 380, 9, 8.3, 96, 83, 4],
  ['student_020', 'Lorenzo Freitas', 'z', 120, 2, 6.0, 87, 61, -4],
  ['student_021', 'Manuela Rocha', 'k', 560, 15, 9.9, 100, 96, 2],
  ['student_022', 'Miguel Oliveira', 'x', 240, 5, 7.1, 91, 71, -3],
  ['student_023', 'Nicolas Henrique', 'z', 290, 6, 7.8, 93, 76, 0],
  ['student_024', 'Rafael Kato', 'k', 160, 3, 6.2, 85, 63, -11],
  ['student_025', 'Sofia Andrade', 'x', 420, 10, 8.7, 98, 89, 5],
  ['student_026', 'Theo Barbosa', 'z', 230, 4, 7.3, 92, 75, 0],
  ['student_027', 'Valentina Jardim', 'k', 350, 8, 8.5, 95, 85, 2],
  ['student_028', 'Yasmin Prado', 'x', 260, 5, 7.4, 93, 73, 1],
]

export const CLASS_STUDENTS: ClassStudent[] = ROWS.map(
  ([id, name, mascote, xp, streak, averageGrade, attendanceRate, participationRate, trend]) => ({
    id,
    name,
    mascote,
    xp,
    streak,
    averageGrade,
    attendanceRate,
    participationRate,
    trend,
  }),
)

export const CLASS_ACTIVITIES: ClassActivity[] = [
  { id: 'act_1', title: 'Avaliação de Frações', type: 'exam', dueLabel: '10 de set.', delivered: 28, average: 7.2 },
  { id: 'act_2', title: 'Frações equivalentes', type: 'exercise', dueLabel: 'Hoje', delivered: 19, average: null },
  { id: 'act_3', title: 'Quiz: multiplicação', type: 'quiz', dueLabel: '11 de set.', delivered: 26, average: 8.1 },
  { id: 'act_4', title: 'Problemas com medidas', type: 'homework', dueLabel: 'Segunda', delivered: 4, average: null },
]

export const ACTIVITY_LABEL: Record<ActivityType, string> = {
  class: 'Aula',
  exercise: 'Exercício',
  quiz: 'Quiz',
  exam: 'Prova',
  homework: 'Tarefa de casa',
  participation: 'Participação',
}

/** Nível pela média: mesmos cortes para tabela, badge e distribuição. */
export function levelFor(grade: number): PerformanceLevel {
  if (grade < 5) return 'critical'
  if (grade < 6.5) return 'attention'
  if (grade < 7.5) return 'regular'
  if (grade < 8.8) return 'good'
  return 'excellent'
}

/** Caiu 10% ou mais nas últimas atividades: aparece em "pedem atenção". */
export const needsAttention = (s: ClassStudent) => s.trend <= -10

export function classStats(students: ClassStudent[]) {
  const n = students.length
  const avg = (pick: (s: ClassStudent) => number) => students.reduce((sum, s) => sum + pick(s), 0) / n
  const distribution: Record<PerformanceLevel, number> = { critical: 0, attention: 0, regular: 0, good: 0, excellent: 0 }
  students.forEach((s) => distribution[levelFor(s.averageGrade)]++)
  return {
    total: n,
    averageGrade: avg((s) => s.averageGrade),
    attendanceRate: Math.round(avg((s) => s.attendanceRate)),
    participationRate: Math.round(avg((s) => s.participationRate)),
    attention: students.filter(needsAttention),
    distribution,
  }
}
