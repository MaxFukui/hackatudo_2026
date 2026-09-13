// "Treinador": a fala do mascote na tela inicial. Simulado a partir dos dados do aluno.
// Quando a IA (Anthropic/OpenAI) entrar, esta função vira uma chamada — a tela não muda.
import type { Student, Subject } from '@/pages/student/data/aluno'
import { mascoteForStudent } from '@/pages/student/lib/mascotes'

export type Mood = 'feliz' | 'animado' | 'atento'

export interface CoachMessage {
  mood: Mood
  /** Uma frase curta, no tom do mascote. A tela põe o "Oi, nome!" antes. */
  headline: string
  /** Até três passos, cada um com uma matéria de referência. */
  steps: { subject: Subject; text: string }[]
}

function fmt(n: number) {
  return n.toFixed(1).replace('.', ',')
}

export function coachMessage(student: Student): CoachMessage {
  const byGrade = [...student.subjects].sort((a, b) => b.grade - a.grade)
  const best = byGrade[0]
  const weakest = byGrade[byGrade.length - 1]
  const mascote = mascoteForStudent(student.subjects)
  const pending = student.activities.filter((a) => !a.done)

  const mood: Mood = weakest.grade < 6 ? 'atento' : student.streak.current >= 5 ? 'animado' : 'feliz'

  const headline =
    mood === 'atento'
      ? `Vamos dar uma força em ${weakest.name} hoje?`
      : mood === 'animado'
        ? `Você mandou muito bem em ${best.name}. Que tal treinar ${weakest.name} por 10 minutinhos hoje?`
        : `Que bom te ver de novo. Bora estudar um pouquinho?`

  const steps: CoachMessage['steps'] = [
    { subject: weakest, text: `Sua nota em ${weakest.name} está em ${fmt(weakest.grade)}. Dez minutinhos por dia já mudam isso.` },
    { subject: best, text: `${best.name} está em ${fmt(best.grade)} — continue assim que o ${mascote.name} fica mais forte.` },
  ]
  if (pending[0]) {
    const s = student.subjects.find((x) => x.id === pending[0].subjectId)!
    steps.push({ subject: s, text: `Tem uma atividade de ${s.name} para ${pending[0].dueLabel.toLowerCase()}: "${pending[0].title}".` })
  }
  return { mood, headline, steps }
}
