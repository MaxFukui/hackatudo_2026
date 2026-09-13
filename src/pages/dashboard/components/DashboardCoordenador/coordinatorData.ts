import type { Tone } from '@/components/ui'

export type ClassStatus = 'priority' | 'watch' | 'steady'
export type Shift = 'Manhã' | 'Tarde'
export type ClassAccent = 'blue' | 'green' | 'rose' | 'yellow' | 'lilac' | 'mint' | 'sky'

export interface CoordinatorClass {
  id: string
  name: string
  segment: string
  shift: Shift
  teacher: string
  subjects: string[]
  accent: ClassAccent
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
  nextStep: string
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
  nextMeeting: string
}

export interface CollectiveGoal {
  id: string
  className: string
  reward: string
  progress: number
  requirement: string
  remaining: string
  owner: string
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

export interface SubjectInsight {
  id: string
  subject: string
  color: 'blue' | 'green' | 'rose' | 'yellow'
  averageGrade: number
  engagement: number
  note: string
}

export interface Intervention {
  id: string
  title: string
  scope: string
  reason: string
  owner: string
  due: string
  tone: Tone
}

export const STATUS_LABEL: Record<ClassStatus, string> = {
  priority: 'Prioridade',
  watch: 'Acompanhar',
  steady: 'Estável',
}

export const STATUS_TONE: Record<ClassStatus, Tone> = {
  priority: 'danger',
  watch: 'warning',
  steady: 'success',
}

export const STATUS_BORDER: Record<ClassStatus, string> = {
  priority: 'director-status-border-priority',
  watch: 'director-status-border-watch',
  steady: 'director-status-border-steady',
}

export const CLASS_ACCENT: Record<ClassAccent, { border: string; bg: string; text: string }> = {
  blue: { border: '#88AEC2', bg: '#A6CBDE', text: '#1F3D4F' },
  green: { border: '#82B577', bg: '#D8F1DD', text: '#2F5A2A' },
  rose: { border: '#D18AAC', bg: '#F4D4E4', text: '#7A2A48' },
  yellow: { border: '#D6C957', bg: '#FFFED4', text: '#6F6400' },
  lilac: { border: '#A99AD4', bg: '#DDD5F3', text: '#4E3D78' },
  mint: { border: '#8CAC80', bg: '#C3DAB9', text: '#335A2D' },
  sky: { border: '#6C9CB5', bg: '#88AEC2', text: '#17364A' },
}

export const SUBJECT_COLOR: Record<SubjectInsight['color'], string> = {
  blue: 'bg-azul-claro',
  green: 'bg-verde-agua',
  rose: 'bg-rosa-claro',
  yellow: 'bg-amarelo',
}

export const COORDINATOR_CLASSES: CoordinatorClass[] = [
  {
    id: 'class_01a',
    name: '1º Ano A',
    segment: 'Anos iniciais',
    shift: 'Manhã',
    teacher: 'Professor 1',
    subjects: ['Português', 'Matemática'],
    accent: 'blue',
    studentCount: 23,
    averageGrade: 8.6,
    attendanceRate: 97,
    participationRate: 90,
    activityCompletionRate: 93,
    collectivePoints: 1910,
    rewardProgress: 94,
    rewardName: 'Dia do brinquedo',
    studentsAtRisk: 1,
    status: 'steady',
    trend: '+7% de participação',
    highlight: 'Rotina de leitura e presença muito consistente.',
    nextStep: 'Validar a recompensa coletiva e registrar devolutiva positiva.',
  },
  {
    id: 'class_01b',
    name: '1º Ano B',
    segment: 'Anos iniciais',
    shift: 'Tarde',
    teacher: 'Professor 2',
    subjects: ['Português', 'Ciências'],
    accent: 'rose',
    studentCount: 24,
    averageGrade: 7.9,
    attendanceRate: 93,
    participationRate: 82,
    activityCompletionRate: 86,
    collectivePoints: 1540,
    rewardProgress: 77,
    rewardName: 'Oficina criativa',
    studentsAtRisk: 2,
    status: 'watch',
    trend: '+4% em entregas',
    highlight: 'Boa resposta às missões curtas de participação.',
    nextStep: 'Manter meta semanal e observar alunos com baixa entrega.',
  },
  {
    id: 'class_02a',
    name: '2º Ano A',
    segment: 'Anos iniciais',
    shift: 'Manhã',
    teacher: 'Professor 3',
    subjects: ['Matemática', 'Ciências'],
    accent: 'green',
    studentCount: 25,
    averageGrade: 8.1,
    attendanceRate: 95,
    participationRate: 84,
    activityCompletionRate: 88,
    collectivePoints: 1680,
    rewardProgress: 84,
    rewardName: 'Aula gamificada',
    studentsAtRisk: 2,
    status: 'steady',
    trend: '+6% em atividades',
    highlight: 'A turma avançou bem em exercícios progressivos.',
    nextStep: 'Usar a evolução da turma como exemplo no encontro pedagógico.',
  },
  {
    id: 'class_02b',
    name: '2º Ano B',
    segment: 'Anos iniciais',
    shift: 'Tarde',
    teacher: 'Professor 4',
    subjects: ['Português', 'História'],
    accent: 'yellow',
    studentCount: 26,
    averageGrade: 6.1,
    attendanceRate: 90,
    participationRate: 72,
    activityCompletionRate: 89,
    collectivePoints: 1460,
    rewardProgress: 73,
    rewardName: 'Lanche coletivo',
    studentsAtRisk: 7,
    status: 'priority',
    trend: '-12% na média',
    highlight: 'A meta coletiva avança bem, mas a aprendizagem ficou abaixo da média esperada.',
    nextStep: 'Planejar reforço de conteúdo sem pausar a meta do lanche coletivo.',
  },
  {
    id: 'class_02c',
    name: '2º Ano C',
    segment: 'Anos iniciais',
    shift: 'Tarde',
    teacher: 'Professor 5',
    subjects: ['Matemática', 'Geografia'],
    accent: 'lilac',
    studentCount: 27,
    averageGrade: 6.8,
    attendanceRate: 86,
    participationRate: 61,
    activityCompletionRate: 66,
    collectivePoints: 820,
    rewardProgress: 41,
    rewardName: 'Recreio estendido',
    studentsAtRisk: 8,
    status: 'priority',
    trend: '-10% em entregas',
    highlight: 'Pequeno grupo mantém boa constância e pode apoiar pares.',
    nextStep: 'Criar plano de 10 dias com presença, revisão e meta coletiva curta.',
  },
  {
    id: 'class_03a',
    name: '3º Ano A',
    segment: 'Anos iniciais',
    shift: 'Manhã',
    teacher: 'Professor 6',
    subjects: ['História', 'Geografia', 'Português'],
    accent: 'mint',
    studentCount: 28,
    averageGrade: 7.5,
    attendanceRate: 91,
    participationRate: 74,
    activityCompletionRate: 81,
    collectivePoints: 1400,
    rewardProgress: 70,
    rewardName: 'Sessão de jogos educativos',
    studentsAtRisk: 4,
    status: 'watch',
    trend: '+5% em pesquisa',
    highlight: 'Pesquisas em grupo elevaram o engajamento.',
    nextStep: 'Transformar pesquisas em apresentações rápidas para participação oral.',
  },
  {
    id: 'class_04',
    name: '4º Ano',
    segment: 'Anos iniciais',
    shift: 'Manhã',
    teacher: 'Professor 7',
    subjects: ['Matemática', 'Ciências', 'Tecnologia'],
    accent: 'sky',
    studentCount: 29,
    averageGrade: 7.7,
    attendanceRate: 92,
    participationRate: 78,
    activityCompletionRate: 84,
    collectivePoints: 1580,
    rewardProgress: 79,
    rewardName: 'Laboratório maker',
    studentsAtRisk: 3,
    status: 'watch',
    trend: '+8% em frações',
    highlight: 'Melhora após trilha de exercícios contextualizados.',
    nextStep: 'Separar reforço por habilidade e acompanhar evolução semanal.',
  },
]

export const COORDINATOR_TEACHERS: CoordinatorTeacher[] = COORDINATOR_CLASSES.map((schoolClass, index) => ({
  id: `teacher_${String(index + 1).padStart(2, '0')}`,
  name: schoolClass.teacher,
  classes: [schoolClass.name],
  focus:
    schoolClass.status === 'priority'
      ? 'Recuperação e engajamento coletivo'
      : schoolClass.status === 'watch'
        ? 'Presença, participação e devolutivas'
        : 'Boas práticas e reconhecimento',
  activityRate: schoolClass.activityCompletionRate,
  studentsAtRisk: schoolClass.studentsAtRisk,
  weeklyRecords: 24 + index * 3,
  supportSignal: schoolClass.status,
  nextMeeting:
    schoolClass.status === 'priority'
      ? 'Montar plano de retomada com coordenação'
      : schoolClass.status === 'watch'
        ? 'Revisar indicadores e combinar uma meta curta'
        : 'Registrar prática para compartilhar com o time',
}))

export const COLLECTIVE_GOALS: CollectiveGoal[] = [
  {
    id: 'goal_01',
    className: '1º Ano A',
    reward: 'Dia do brinquedo',
    progress: 94,
    requirement: '90% de presença + atividades entregues',
    remaining: 'Meta pronta para validação',
    owner: 'Professor 1',
    tone: 'success',
  },
  {
    id: 'goal_02',
    className: '2º Ano A',
    reward: 'Aula gamificada',
    progress: 84,
    requirement: 'Participação acima de 80% na semana',
    remaining: 'Faltam 5 registros de participação',
    owner: 'Professor 3',
    tone: 'info',
  },
  {
    id: 'goal_03',
    className: '2º Ano B',
    reward: 'Lanche coletivo',
    progress: 73,
    requirement: 'Participação e entregas da turma acima de 70%',
    remaining: 'Meta avançada, mesmo com reforço acadêmico necessário',
    owner: 'Professor 4',
    tone: 'warning',
  },
  {
    id: 'goal_04',
    className: '4º Ano',
    reward: 'Laboratório maker',
    progress: 79,
    requirement: 'Média acima de 7 e presença acima de 90%',
    remaining: 'Faltam 10 atividades concluídas',
    owner: 'Professor 7',
    tone: 'accent',
  },
  {
    id: 'goal_05',
    className: '2º Ano C',
    reward: 'Recreio estendido',
    progress: 41,
    requirement: 'Participação mínima de 75%',
    remaining: 'Precisa de plano de engajamento',
    owner: 'Professor 5',
    tone: 'warning',
  },
]

export const COORDINATION_ALERTS: CoordinationAlert[] = [
  {
    id: 'alert_01',
    severity: 'critical',
    scope: '2º Ano C',
    title: 'Queda combinada de presença e entregas',
    message: 'A turma concentra 8 alunos em atenção e perdeu 10% nas entregas da semana.',
    action: 'Agendar plano de retomada com Professor 5.',
  },
  {
    id: 'alert_02',
    severity: 'critical',
    scope: '2º Ano B',
    title: 'Média abaixo, meta coletiva avançando',
    message: 'A turma está com média 6,1, mas já chegou a 73% do lanche coletivo.',
    action: 'Organizar reforço com Professor 4 mantendo a motivação da recompensa.',
  },
  {
    id: 'alert_03',
    severity: 'info',
    scope: '1º Ano A',
    title: 'Meta coletiva quase concluída',
    message: 'A turma atingiu 94% da meta para o Dia do brinquedo.',
    action: 'Confirmar recompensa e registrar devolutiva positiva.',
  },
]

export const SUBJECT_INSIGHTS: SubjectInsight[] = [
  {
    id: 'subject_math',
    subject: 'Matemática',
    color: 'blue',
    averageGrade: 7.4,
    engagement: 76,
    note: 'Frações e problemas contextualizados pedem reforço no 4º Ano.',
  },
  {
    id: 'subject_portuguese',
    subject: 'Português',
    color: 'rose',
    averageGrade: 8.2,
    engagement: 87,
    note: 'Leitura guiada está puxando presença e entregas no 1º Ano A.',
  },
  {
    id: 'subject_science',
    subject: 'Ciências',
    color: 'green',
    averageGrade: 7.7,
    engagement: 80,
    note: 'Atividades práticas geram boa participação nos 2º anos.',
  },
  {
    id: 'subject_history',
    subject: 'História',
    color: 'yellow',
    averageGrade: 7.3,
    engagement: 71,
    note: 'Pesquisas em grupo melhoraram, porém participação oral ainda oscila.',
  },
]

export const INTERVENTIONS: Intervention[] = [
  {
    id: 'intervention_01',
    title: 'Plano de 10 dias para retomada',
    scope: '2º Ano C',
    reason: 'Baixa entrega, presença instável e 8 alunos em atenção.',
    owner: 'Coordenação + Professor 5',
    due: 'Esta semana',
    tone: 'danger',
  },
  {
    id: 'intervention_02',
    title: 'Reforço de aprendizagem',
    scope: '2º Ano B',
    reason: 'Média 6,1 com boa adesão à meta coletiva; precisa separar recompensa de desempenho acadêmico.',
    owner: 'Coordenação + Professor 4',
    due: 'Próximas duas aulas',
    tone: 'danger',
  },
  {
    id: 'intervention_03',
    title: 'Registro de boas práticas',
    scope: '1º Ano A e 2º Ano A',
    reason: 'Turmas próximas de metas coletivas, boas para inspirar o time.',
    owner: 'Coordenação',
    due: 'Reunião pedagógica',
    tone: 'success',
  },
]

const totalStudents = COORDINATOR_CLASSES.reduce((sum, item) => sum + item.studentCount, 0)
const weightedAverage = (pick: (item: CoordinatorClass) => number) =>
  COORDINATOR_CLASSES.reduce((sum, item) => sum + pick(item) * item.studentCount, 0) / totalStudents
const simpleAverage = (pick: (item: CoordinatorClass) => number) =>
  COORDINATOR_CLASSES.reduce((sum, item) => sum + pick(item), 0) / COORDINATOR_CLASSES.length

export const COORDINATOR_SUMMARY = {
  totalStudents,
  averageGrade: Number(weightedAverage((item) => item.averageGrade).toFixed(1)),
  attendanceRate: Math.round(weightedAverage((item) => item.attendanceRate)),
  participationRate: Math.round(weightedAverage((item) => item.participationRate)),
  studentsAtRisk: COORDINATOR_CLASSES.reduce((sum, item) => sum + item.studentsAtRisk, 0),
  collectiveProgress: Math.round(simpleAverage((item) => item.rewardProgress)),
  classesWatched: COORDINATOR_CLASSES.length,
}
