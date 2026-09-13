// Avaliação do aluno "por IA". Simulada: regras sobre notas, presença, participação e tendência.
// Quando a IA real entrar, este service recebe os mesmos dados e devolve o mesmo formato.
import type { ClassStudent } from '../data/turma'

export interface StudentEvaluation {
  strengths: string[]
  attention: string[]
  recommendations: string[]
}

export function evaluate(s: ClassStudent): StudentEvaluation {
  const strengths: string[] = []
  const attention: string[] = []
  const recommendations: string[] = []

  if (s.averageGrade >= 8.5) strengths.push('Domina frações e operações básicas')
  else if (s.averageGrade >= 7.5) strengths.push('Boa compreensão das operações básicas')
  if (s.attendanceRate >= 95) strengths.push('Presença exemplar nas aulas')
  if (s.participationRate >= 80) strengths.push('Participa bastante e ajuda os colegas')
  if (s.streak >= 8) strengths.push(`Sequência de ${s.streak} dias seguidos`)
  if (s.trend >= 4) strengths.push(`Melhorou ${s.trend}% nas últimas atividades`)

  if (s.averageGrade < 6.5) attention.push('Dificuldade com problemas envolvendo frações')
  if (s.trend <= -10) attention.push(`Desempenho caiu ${-s.trend}% nas últimas três atividades`)
  if (s.participationRate < 65) attention.push('Participa pouco durante a aula')
  if (s.attendanceRate < 88) attention.push('Faltas acima da média da turma')

  if (s.averageGrade < 6.5) recommendations.push('Exercícios progressivos de frações com material concreto')
  if (s.trend <= -10) recommendations.push('Conversa individual para entender a queda recente')
  if (s.participationRate < 65) recommendations.push('Perguntas diretas e fáceis para ganhar confiança')
  if (s.attendanceRate < 88) recommendations.push('Avisar a família sobre as faltas')
  if (recommendations.length === 0) recommendations.push('Propor desafios extras para manter o ritmo')

  if (strengths.length === 0) strengths.push(`Vem a ${s.attendanceRate}% das aulas: dá para construir a partir daí`)
  if (attention.length === 0) attention.push('Nenhum ponto crítico no momento')

  return { strengths, attention, recommendations }
}

export function evaluateLater(s: ClassStudent, ms = 900): Promise<StudentEvaluation> {
  return new Promise((resolve) => setTimeout(() => resolve(evaluate(s)), ms))
}
