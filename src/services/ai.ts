// Respostas simuladas. Substituir pelo backend de IA quando existir.
import type { AiEvaluation, AiMessage } from '@/types'
import { db, respond } from './client'

function message(content: string): AiMessage {
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content,
    createdAt: new Date().toISOString(),
  }
}

export function askTutor(studentId: string, prompt: string): Promise<AiMessage> {
  void studentId
  return respond(message(`Vamos pensar juntos sobre "${prompt}". Qual foi o primeiro passo que você tentou?`))
}

export function askTeacherAssistant(prompt: string): Promise<AiMessage> {
  return respond(message(`Sugestão para "${prompt}": comece por exercícios progressivos de frações.`))
}

export function evaluateStudent(studentId: string): Promise<AiEvaluation> {
  return respond({ ...db.ai.studentEvaluation.exampleOutput, studentId })
}
