// Tutor de IA por matéria. Simulado: responde só dentro da matéria escolhida.
// O bloqueio de escopo fica AQUI (não na tela) para valer também quando a IA real entrar:
// o prompt de sistema vai receber a matéria e os assuntos, e este filtro continua como segunda barreira.
import type { Subject } from '@/pages/student/data/aluno'

export interface TutorMessage {
  id: string
  role: 'user' | 'tutor'
  text: string
  /** Fora do escopo da matéria: a tela mostra diferente. */
  blocked?: boolean
}

// Palavras que denunciam outra matéria. Simples de propósito: é um protótipo.
const SIGNALS: Record<Subject['id'], string[]> = {
  matematica: ['fração', 'fracao', 'conta', 'soma', 'multiplic', 'divis', 'número', 'numero', 'tabuada', 'geometria', 'medida', 'metro', 'quilo', 'litro'],
  ciencias: ['planeta', 'sol', 'lua', 'animal', 'planta', 'água', 'agua', 'energia', 'corpo', 'célula', 'celula', 'experi'],
  portugues: ['texto', 'palavra', 'verbo', 'ortografia', 'vírgula', 'virgula', 'letra', 'frase', 'leitura', 'escrev', 'substantivo'],
  historia: ['indígena', 'indigena', 'coloniza', 'independência', 'independencia', 'rei', 'império', 'imperio', 'antigamente', 'século', 'seculo', 'descobr', 'portugues', 'portugueses', 'escrav', 'guerra'],
  geografia: ['mapa', 'estado', 'região', 'regiao', 'clima', 'relevo', 'rio', 'país', 'pais', 'cidade', 'continente', 'oceano', 'capital'],
  filosofia: ['justo', 'amizade', 'respeito', 'certo', 'errado', 'pergunta', 'pensar', 'verdade', 'felicidade'],
}

function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function msg(role: TutorMessage['role'], text: string, blocked = false): TutorMessage {
  return { id: crypto.randomUUID(), role, text, blocked }
}

export function greeting(subject: Subject): TutorMessage {
  return msg('tutor', `Oba, ${subject.name}! Sobre o que você quer conversar? Pode ser ${subject.topics.slice(0, 3).join(', ')}…`)
}

export function ask(subject: Subject, question: string): Promise<TutorMessage> {
  const q = question.toLowerCase()
  const inScope = SIGNALS[subject.id].some((w) => q.includes(w)) || subject.topics.some((t) => q.includes(t.toLowerCase()))
  const other = (Object.keys(SIGNALS) as Subject['id'][]).find((id) => id !== subject.id && SIGNALS[id].some((w) => q.includes(w)))

  if (!inScope && other) {
    return delay(msg('tutor', `Essa pergunta parece ser de outra matéria. Aqui a gente só conversa sobre ${subject.name}. Se quiser trocar, toque em "Voltar ao menu".`, true))
  }
  if (!inScope) {
    return delay(msg('tutor', `Hmm, não entendi como isso se liga a ${subject.name}. Tenta perguntar sobre ${subject.topics[0]} ou ${subject.topics[1]}?`, true))
  }
  // Não entrega a resposta: devolve uma pergunta e uma dica, como o tutor de verdade vai fazer.
  return delay(msg('tutor', `Boa pergunta! Vamos por partes: o que você já sabe sobre isso? Dica: em ${subject.name}, comece separando o que a pergunta pede do que ela já te dá.`))
}
