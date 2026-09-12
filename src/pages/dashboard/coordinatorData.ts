import type { Tone } from '@/components/ui'

export type ClassStatus = 'healthy' | 'attention' | 'risk'

export interface CoordinatorClass {
  id: string
  name: string
  stage: string
  shift: 'Manha' | 'Tarde'
  teacher: string
  subjects: string[]
  studentCount: number
  averageGrade: number
  attendanceRate: number
  participationRate: number
  activityCompletionRate: number
  collectivePoints: number
  rewardProgress: number
  rewardName: string
  studentsAtRisk: number
  status: ClassStatus
  trend: string
  highlight: string
  needs: string
}

export interface CoordinatorTeacher {
  id: string
  name: string
  classes: string[]
  focus: string
  activityRate: number
  studentsAtRisk: number
  weeklyRecords: number
  supportSignal: ClassStatus
}

export interface CollectiveGoal {
  id: string
  className: string
  reward: string
  progress: number
  requirement: string
  remaining: string
  tone: Tone
}

export interface CoordinationAlert {
  id: string
  severity: 'info' | 'warning' | 'critical'
  scope: string
  title: string
  message: string
  action: string
}

export const STATUS_LABEL: Record<ClassStatus, string> = {
  healthy: 'Estavel',
  attention: 'Atencao',
  risk: 'Prioridade',
}

export const STATUS_TONE: Record<ClassStatus, Tone> = {
  healthy: 'success',
  attention: 'warning',
  risk: 'danger',
}

export const COORDINATOR_CLASSES: CoordinatorClass[] = [
  {
    id: 'class_01a',
    name: '1o Ano A',
    stage: 'Anos iniciais',
    shift: 'Manha',
    teacher: 'Professor 1',
    subjects: ['Portugues', 'Matematica'],
    studentCount: 24,
    averageGrade: 8.4,
    attendanceRate: 96,
    participationRate: 88,
    activityCompletionRate: 91,
    collectivePoints: 1840,
    rewardProgress: 92,
    rewardName: 'Dia do brinquedo',
    studentsAtRisk: 1,
    status: 'healthy',
    trend: '+6% de participacao',
    highlight: 'Turma muito constante nas missoes de leitura.',
    needs: 'Manter ritmo e registrar mais evidencias de participacao oral.',
  },
  {
    id: 'class_02b',
    name: '2o Ano B',
    stage: 'Anos iniciais',
    shift: 'Tarde',
    teacher: 'Professor 2',
    subjects: ['Ciencias', 'Portugues'],
    studentCount: 26,
    averageGrade: 7.8,
    attendanceRate: 91,
    participationRate: 74,
    activityCompletionRate: 80,
    collectivePoints: 1320,
    rewardProgress: 66,
    rewardName: 'Oficina criativa',
    studentsAtRisk: 3,
    status: 'attention',
    trend: '-4% em presenca',
    highlight: 'Boa entrega de atividades de casa.',
    needs: 'Acompanhar faltas de sexta-feira e propor meta curta de presenca.',
  },
  {
    id: 'class_03a',
    name: '3o Ano A',
    stage: 'Anos iniciais',
    shift: 'Manha',
    teacher: 'Professor 3',
    subjects: ['Historia', 'Geografia'],
    studentCount: 27,
    averageGrade: 7.1,
    attendanceRate: 89,
    participationRate: 69,
    activityCompletionRate: 73,
    collectivePoints: 1180,
    rewardProgress: 59,
    rewardName: 'Lanche coletivo',
    studentsAtRisk: 5,
    status: 'attention',
    trend: '+3% em atividades',
    highlight: 'Crescimento em pesquisas em grupo.',
    needs: 'Reforcar combinados de participacao e revisar conteudos historicos.',
  },
  {
    id: 'class_04a',
    name: '4o Ano A',
    stage: 'Anos iniciais',
    shift: 'Manha',
    teacher: 'Professor 4',
    subjects: ['Matematica'],
    studentCount: 28,
    averageGrade: 7.6,
    attendanceRate: 92,
    participationRate: 76,
    activityCompletionRate: 84,
    collectivePoints: 1560,
    rewardProgress: 78,
    rewardName: 'Aula gamificada',
    studentsAtRisk: 4,
    status: 'attention',
    trend: '+8% em frações',
    highlight: 'Melhora apos trilha de exercicios progressivos.',
    needs: 'Separar alunos com dificuldade em problemas contextualizados.',
  },
  {
    id: 'class_05b',
    name: '5o Ano B',
    stage: 'Anos iniciais',
    shift: 'Tarde',
    teacher: 'Professor 5',
    subjects: ['Matematica', 'Ciencias'],
    studentCount: 30,
    averageGrade: 6.5,
    attendanceRate: 84,
    participationRate: 58,
    activityCompletionRate: 62,
    collectivePoints: 760,
    rewardProgress: 38,
    rewardName: 'Recreio estendido',
    studentsAtRisk: 9,
    status: 'risk',
    trend: '-12% em entregas',
    highlight: 'Pequeno grupo lidera bem as atividades praticas.',
    needs: 'Priorizar plano de recuperacao e conversa com responsaveis.',
  },
  {
    id: 'class_06a',
    name: '6o Ano A',
    stage: 'Anos finais',
    shift: 'Manha',
    teacher: 'Professor 6',
    subjects: ['Portugues', 'Historia', 'Tecnologia'],
    studentCount: 31,
    averageGrade: 8.0,
    attendanceRate: 95,
    participationRate: 81,
    activityCompletionRate: 88,
    collectivePoints: 1710,
    rewardProgress: 86,
    rewardName: 'Laboratorio maker',
    studentsAtRisk: 2,
    status: 'healthy',
    trend: '+10% em projetos',
    highlight: 'Alta colaboracao em desafios de tecnologia consciente.',
    needs: 'Transformar bons projetos em apresentacoes curtas para outras turmas.',
  },
]

export const COORDINATOR_TEACHERS: CoordinatorTeacher[] = [
  {
    id: 'teacher_01',
    name: 'Professor 1',
    classes: ['1o Ano A'],
    focus: 'Alfabetizacao e missoes diarias',
    activityRate: 91,
    studentsAtRisk: 1,
    weeklyRecords: 42,
    supportSignal: 'healthy',
  },
  {
    id: 'teacher_02',
    name: 'Professor 2',
    classes: ['2o Ano B'],
    focus: 'Presenca e rotina de devolutivas',
    activityRate: 80,
    studentsAtRisk: 3,
    weeklyRecords: 34,
    supportSignal: 'attention',
  },
  {
    id: 'teacher_03',
    name: 'Professor 3',
    classes: ['3o Ano A'],
    focus: 'Participacao oral e pesquisa em grupo',
    activityRate: 73,
    studentsAtRisk: 5,
    weeklyRecords: 31,
    supportSignal: 'attention',
  },
  {
    id: 'teacher_04',
    name: 'Professor 4',
    classes: ['4o Ano A'],
    focus: 'Frações e problemas contextualizados',
    activityRate: 84,
    studentsAtRisk: 4,
    weeklyRecords: 39,
    supportSignal: 'attention',
  },
  {
    id: 'teacher_05',
    name: 'Professor 5',
    classes: ['5o Ano B'],
    focus: 'Recuperacao e engajamento coletivo',
    activityRate: 62,
    studentsAtRisk: 9,
    weeklyRecords: 22,
    supportSignal: 'risk',
  },
  {
    id: 'teacher_06',
    name: 'Professor 6',
    classes: ['6o Ano A'],
    focus: 'Projetos e tecnologia consciente',
    activityRate: 88,
    studentsAtRisk: 2,
    weeklyRecords: 44,
    supportSignal: 'healthy',
  },
]

export const COLLECTIVE_GOALS: CollectiveGoal[] = [
  {
    id: 'goal_01',
    className: '1o Ano A',
    reward: 'Dia do brinquedo',
    progress: 92,
    requirement: '90% de presenca + atividades entregues',
    remaining: 'Meta pronta para validacao da professora',
    tone: 'success',
  },
  {
    id: 'goal_02',
    className: '6o Ano A',
    reward: 'Laboratorio maker',
    progress: 86,
    requirement: 'Projetos concluídos e participacao semanal',
    remaining: 'Faltam 4 registros de participacao',
    tone: 'info',
  },
  {
    id: 'goal_03',
    className: '4o Ano A',
    reward: 'Aula gamificada',
    progress: 78,
    requirement: 'Media acima de 7 e presença acima de 90%',
    remaining: 'Faltam 12 atividades concluídas',
    tone: 'accent',
  },
  {
    id: 'goal_04',
    className: '5o Ano B',
    reward: 'Recreio estendido',
    progress: 38,
    requirement: 'Participacao minima de 75%',
    remaining: 'Precisa de plano de engajamento',
    tone: 'warning',
  },
]

export const COORDINATION_ALERTS: CoordinationAlert[] = [
  {
    id: 'alert_01',
    severity: 'critical',
    scope: '5o Ano B',
    title: 'Queda combinada de presença e entregas',
    message: 'A turma concentra 9 alunos em atencao e perdeu 12% nas entregas da semana.',
    action: 'Agendar apoio pedagogico com Professor 5.',
  },
  {
    id: 'alert_02',
    severity: 'warning',
    scope: '3o Ano A',
    title: 'Participacao abaixo do combinado',
    message: 'A turma melhorou nas pesquisas, mas segue abaixo de 70% de participacao em aula.',
    action: 'Sugerir dinâmica curta de perguntas por grupos.',
  },
  {
    id: 'alert_03',
    severity: 'info',
    scope: '1o Ano A',
    title: 'Meta coletiva quase concluida',
    message: 'A turma atingiu 92% da meta para o Dia do brinquedo.',
    action: 'Confirmar recompensa e registrar devolutiva positiva.',
  },
]

export const COORDINATOR_SUMMARY = {
  totalStudents: COORDINATOR_CLASSES.reduce((sum, item) => sum + item.studentCount, 0),
  averageGrade: 7.6,
  attendanceRate: 91,
  participationRate: 74,
  studentsAtRisk: COORDINATOR_CLASSES.reduce((sum, item) => sum + item.studentsAtRisk, 0),
  collectiveProgress: 70,
}
