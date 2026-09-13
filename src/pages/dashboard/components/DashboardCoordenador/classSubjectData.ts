import { COORDINATOR_CLASSES } from './coordinatorData'

export type SubjectSort = 'high' | 'low'
export type StudentSort = 'low' | 'high'

export interface SubjectStudentGrade {
  id: string
  name: string
  grade: number
}

export interface ClassSubjectPerformance {
  id: string
  subject: string
  averageGrade: number
  studentsAboveAveragePct: number
  note: string
  students: SubjectStudentGrade[]
}

const SUBJECT_BLUEPRINTS: Record<string, Omit<ClassSubjectPerformance, 'students'>[]> = {
  class_01a: [
    { id: 'portuguese', subject: 'Português', averageGrade: 9.0, studentsAboveAveragePct: 91, note: 'Leitura e interpretação estão puxando a turma para cima.' },
    { id: 'math', subject: 'Matemática', averageGrade: 8.2, studentsAboveAveragePct: 78, note: 'Boa evolução em contas simples, com poucos alunos precisando revisão.' },
    { id: 'science', subject: 'Ciências', averageGrade: 8.6, studentsAboveAveragePct: 86, note: 'Atividades práticas mantêm a participação alta.' },
    { id: 'history', subject: 'História', averageGrade: 8.4, studentsAboveAveragePct: 82, note: 'A turma responde bem quando o conteúdo vira narrativa.' },
  ],
  class_01b: [
    { id: 'portuguese', subject: 'Português', averageGrade: 8.3, studentsAboveAveragePct: 83, note: 'Produção de frases está consistente.' },
    { id: 'math', subject: 'Matemática', averageGrade: 7.2, studentsAboveAveragePct: 62, note: 'Problemas com enunciado ainda derrubam parte da turma.' },
    { id: 'science', subject: 'Ciências', averageGrade: 8.0, studentsAboveAveragePct: 79, note: 'Curiosidade alta nas atividades experimentais.' },
    { id: 'history', subject: 'História', averageGrade: 7.8, studentsAboveAveragePct: 70, note: 'Boa participação oral, mas registros escritos oscilam.' },
  ],
  class_02a: [
    { id: 'science', subject: 'Ciências', averageGrade: 8.6, studentsAboveAveragePct: 88, note: 'Experimentos e desenhos explicativos funcionam muito bem.' },
    { id: 'portuguese', subject: 'Português', averageGrade: 8.1, studentsAboveAveragePct: 80, note: 'Interpretação de texto segue estável.' },
    { id: 'math', subject: 'Matemática', averageGrade: 7.7, studentsAboveAveragePct: 72, note: 'Operações estão boas, problemas longos pedem treino.' },
    { id: 'history', subject: 'História', averageGrade: 8.0, studentsAboveAveragePct: 76, note: 'Linha do tempo ajudou a turma a organizar ideias.' },
  ],
  class_02b: [
    { id: 'portuguese', subject: 'Português', averageGrade: 7.0, studentsAboveAveragePct: 59, note: 'Leitura está melhor que escrita, mas ainda precisa acompanhamento.' },
    { id: 'history', subject: 'História', averageGrade: 6.4, studentsAboveAveragePct: 42, note: 'A turma participa, porém erra na organização dos fatos.' },
    { id: 'science', subject: 'Ciências', averageGrade: 6.2, studentsAboveAveragePct: 38, note: 'Conceitos básicos precisam ser retomados com atividade prática.' },
    { id: 'math', subject: 'Matemática', averageGrade: 5.7, studentsAboveAveragePct: 31, note: 'Maior foco: problemas de multiplicação e interpretação.' },
  ],
  class_02c: [
    { id: 'geography', subject: 'Geografia', averageGrade: 7.1, studentsAboveAveragePct: 58, note: 'Mapas e imagens ajudam, mas registros ainda são fracos.' },
    { id: 'portuguese', subject: 'Português', averageGrade: 6.9, studentsAboveAveragePct: 51, note: 'Leitura coletiva ajuda a reduzir dúvidas.' },
    { id: 'science', subject: 'Ciências', averageGrade: 6.6, studentsAboveAveragePct: 44, note: 'Precisa retomar vocabulário antes das atividades.' },
    { id: 'math', subject: 'Matemática', averageGrade: 6.1, studentsAboveAveragePct: 36, note: 'A turma trava quando a conta vem dentro de uma situação.' },
  ],
  class_03a: [
    { id: 'portuguese', subject: 'Português', averageGrade: 7.9, studentsAboveAveragePct: 73, note: 'Apresentações curtas melhoraram leitura em voz alta.' },
    { id: 'history', subject: 'História', averageGrade: 7.7, studentsAboveAveragePct: 70, note: 'Pesquisa em grupo elevou engajamento.' },
    { id: 'geography', subject: 'Geografia', averageGrade: 7.4, studentsAboveAveragePct: 64, note: 'Localização e mapas pedem revisão guiada.' },
    { id: 'math', subject: 'Matemática', averageGrade: 6.9, studentsAboveAveragePct: 48, note: 'Interpretação de problemas ainda pede reforço.' },
  ],
  class_04: [
    { id: 'technology', subject: 'Tecnologia', averageGrade: 8.5, studentsAboveAveragePct: 86, note: 'A turma aprende bem com desafios maker.' },
    { id: 'science', subject: 'Ciências', averageGrade: 8.0, studentsAboveAveragePct: 75, note: 'Bom repertório em experimentos e hipóteses.' },
    { id: 'portuguese', subject: 'Português', averageGrade: 7.8, studentsAboveAveragePct: 70, note: 'Respostas completas melhoraram nas últimas atividades.' },
    { id: 'math', subject: 'Matemática', averageGrade: 6.7, studentsAboveAveragePct: 43, note: 'Frações e problemas contextualizados seguem como foco.' },
  ],
}

const OFFSETS = [-2.1, -1.4, -0.9, -0.5, -0.2, 0.1, 0.4, 0.7, 1.0, 1.3, -1.1, 0.2, 0.6, 1.5]

function clampGrade(value: number) {
  return Math.min(10, Math.max(3.5, Number(value.toFixed(1))))
}

function buildStudents(classId: string, subjectId: string, averageGrade: number): SubjectStudentGrade[] {
  const schoolClass = COORDINATOR_CLASSES.find((item) => item.id === classId)
  const total = Math.min(schoolClass?.studentCount ?? 24, 30)
  const seed = classId.length + subjectId.length

  return Array.from({ length: total }, (_, index) => ({
    id: `${classId}_${subjectId}_${index + 1}`,
    name: `Aluno ${index + 1}`,
    grade: clampGrade(averageGrade + OFFSETS[(index + seed) % OFFSETS.length]),
  }))
}

export function subjectsForClass(classId: string) {
  return (SUBJECT_BLUEPRINTS[classId] ?? []).map((subject) => ({
    ...subject,
    students: buildStudents(classId, subject.id, subject.averageGrade),
  }))
}

