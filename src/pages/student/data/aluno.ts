// Mock do aluno. Sem backend por enquanto: tudo que a tela precisa vive aqui.
// Quando a API existir, os services trocam este arquivo por fetch sem mexer nas seções.

export type SubjectId = 'matematica' | 'ciencias' | 'portugues' | 'historia' | 'geografia' | 'filosofia'

export interface Subject {
  id: SubjectId
  name: string
  /** Nota média da matéria (0–10). */
  grade: number
  /** Dias seguidos de atividade nesta matéria: é o "strike" que define o mascote. */
  streak: number
  /** Assuntos do bimestre, para o tutor e para os materiais. */
  topics: string[]
}

export interface Activity {
  id: string
  subjectId: SubjectId
  title: string
  kind: 'exercicio' | 'quiz' | 'leitura'
  /** Minutos estimados. */
  minutes: number
  done: boolean
  dueLabel: string
}

export interface Material {
  id: string
  subjectId: SubjectId
  title: string
  kind: 'exercicios' | 'video' | 'leitura' | 'jogo'
  description: string
  minutes: number
}

/** Avaliação feita pelo professor (a IA do professor gera; aqui é só o resultado). */
export interface TeacherEvaluation {
  teacher: string
  updatedAt: string
  strengths: string[]
  attention: string[]
  recommendations: string[]
}

export interface Student {
  id: string
  name: string
  className: string
  streak: { current: number; best: number }
  xp: number
  /** Pontos acumulados (vitrine da topbar). */
  points: number
  performance: { overallScore: number; attendanceRate: number; participationRate: number }
  subjects: Subject[]
  activities: Activity[]
  materials: Material[]
  evaluation: TeacherEvaluation
}

export const ALUNO: Student = {
  id: 'student_001',
  name: 'Lucas Silva',
  className: '4º Ano A',
  streak: { current: 7, best: 12 },
  xp: 340,
  points: 1240,
  performance: { overallScore: 78, attendanceRate: 94, participationRate: 82 },
  subjects: [
    { id: 'matematica', name: 'Matemática', grade: 8.6, streak: 9, topics: ['frações', 'multiplicação', 'divisão', 'geometria', 'medidas'] },
    { id: 'ciencias', name: 'Ciências', grade: 8.2, streak: 7, topics: ['sistema solar', 'seres vivos', 'água', 'energia'] },
    { id: 'portugues', name: 'Português', grade: 6.4, streak: 2, topics: ['interpretação de texto', 'ortografia', 'verbos', 'pontuação'] },
    { id: 'historia', name: 'História', grade: 7.1, streak: 3, topics: ['povos indígenas', 'colonização', 'independência'] },
    { id: 'geografia', name: 'Geografia', grade: 7.8, streak: 5, topics: ['mapas', 'regiões do Brasil', 'clima', 'relevo'] },
    { id: 'filosofia', name: 'Filosofia', grade: 7.5, streak: 4, topics: ['amizade', 'respeito', 'perguntas e respostas', 'o que é justo'] },
  ],
  activities: [
    { id: 'a1', subjectId: 'portugues', title: 'Interpretação: "O menino e o rio"', kind: 'leitura', minutes: 15, done: false, dueLabel: 'Hoje' },
    { id: 'a2', subjectId: 'matematica', title: 'Frações equivalentes', kind: 'exercicio', minutes: 10, done: false, dueLabel: 'Hoje' },
    { id: 'a3', subjectId: 'historia', title: 'Quiz: povos indígenas', kind: 'quiz', minutes: 8, done: false, dueLabel: 'Amanhã' },
    { id: 'a4', subjectId: 'ciencias', title: 'Planetas do sistema solar', kind: 'quiz', minutes: 8, done: true, dueLabel: 'Ontem' },
    { id: 'a5', subjectId: 'geografia', title: 'Regiões do Brasil no mapa', kind: 'exercicio', minutes: 12, done: true, dueLabel: 'Ontem' },
  ],
  materials: [
    { id: 'm1', subjectId: 'portugues', title: 'Caça-palavras de ortografia', kind: 'jogo', description: 'Palavras com S, SS e Ç.', minutes: 10 },
    { id: 'm2', subjectId: 'portugues', title: 'Lendo e entendendo', kind: 'leitura', description: 'Três textos curtos com perguntas.', minutes: 15 },
    { id: 'm3', subjectId: 'matematica', title: 'Frações com pizza', kind: 'exercicios', description: 'Dez exercícios com desenhos.', minutes: 12 },
    { id: 'm4', subjectId: 'matematica', title: 'Tabuada em 5 minutos', kind: 'jogo', description: 'Jogo rápido de multiplicação.', minutes: 5 },
    { id: 'm5', subjectId: 'ciencias', title: 'Viagem pelo sistema solar', kind: 'video', description: 'Vídeo de 6 minutos.', minutes: 6 },
    { id: 'm6', subjectId: 'historia', title: 'Linha do tempo do Brasil', kind: 'leitura', description: 'Do descobrimento à independência.', minutes: 12 },
    { id: 'm7', subjectId: 'geografia', title: 'Monte o mapa', kind: 'jogo', description: 'Arraste os estados para o lugar certo.', minutes: 10 },
    { id: 'm8', subjectId: 'filosofia', title: 'O que é ser justo?', kind: 'leitura', description: 'Uma história e três perguntas para pensar.', minutes: 10 },
  ],
  evaluation: {
    teacher: 'Prof.ª Ana Beatriz',
    updatedAt: '2026-09-10',
    strengths: ['Raciocínio rápido em Matemática', 'Participa bastante em Ciências', 'Não falta às aulas'],
    attention: ['Interpretação de texto em Português', 'Ortografia: S, SS e Ç'],
    recommendations: ['Ler 10 minutos por dia', 'Fazer o caça-palavras de ortografia', 'Continuar o ritmo em Matemática'],
  },
}
