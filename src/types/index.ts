// Contrato de dados compartilhado entre as 4 páginas.
// Espelha src/data/db.json. Mudou aqui → avise o time.

export type Role = 'student' | 'teacher' | 'director' | 'admin'
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'justified'
export type PerformanceLevel = 'critical' | 'attention' | 'regular' | 'good' | 'excellent'
export type ActivityType = 'class' | 'exercise' | 'quiz' | 'exam' | 'homework' | 'participation'
export type AiMessageRole = 'user' | 'assistant' | 'system'
export type Shift = 'morning' | 'afternoon' | 'evening'
export type AlertSeverity = 'info' | 'warning' | 'critical'
export type AlertType = 'performance' | 'attendance' | 'participation'

export interface CurrentUser {
  id: string
  name: string
  email: string
  role: Role
  avatarUrl: string | null
  schoolId: string
}

export interface School {
  id: string
  name: string
  city: string
  state: string
}

export interface Grade {
  id: string
  name: string
}

export interface SchoolClass {
  id: string
  name: string
  gradeId: string
  shift: Shift
  studentCount: number
}

export interface Subject {
  id: string
  name: string
}

export interface AcademicContext {
  schoolYear: number
  term: number
  grades: Grade[]
  classes: SchoolClass[]
  subjects: Subject[]
}

export interface Teacher {
  id: string
  name: string
  role: 'teacher'
  subjects: string[]
  classes: string[]
}

export interface StudentPerformance {
  overallScore: number
  performanceLevel: PerformanceLevel
  averageGrade: number
  attendanceRate: number
  participationRate: number
}

export interface StudentStreak {
  current: number
  best: number
  points: number
  level: number
  xp: number
  nextLevelXp: number
}

export interface Student {
  id: string
  name: string
  role: 'student'
  classId: string
  gradeId: string
  avatarUrl: string | null
  performance: StudentPerformance
  streak: StudentStreak
}

export interface DashboardSummary {
  totalStudents: number
  averageGrade: number
  attendanceRate: number
  participationRate: number
  studentsAtRisk: number
}

export interface ClassPerformance {
  classId: string
  subjectId: string
  averageScore: number
  distribution: Record<PerformanceLevel, number>
}

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  studentId: string
  title: string
  message: string
  createdAt: string
}

export interface Dashboard {
  summary: DashboardSummary
  classPerformance: ClassPerformance
  recentAlerts: Alert[]
}

export type StreakRuleKey = 'attendance' | 'participation' | 'exerciseCompleted' | 'aboveAverageExam'

export interface StreakRule {
  enabled: boolean
  points: number
}

export interface StreakLevel {
  level: number
  name: string
  minXp: number
}

export interface StreakSystem {
  rules: Record<StreakRuleKey, StreakRule>
  levels: StreakLevel[]
}

export interface Activity {
  id: string
  type: ActivityType
  title: string
  subjectId: string
  classId: string
  teacherId: string
  maxScore: number
  averageScore: number
  createdAt: string
}

export interface StudentResult {
  id: string
  activityId: string
  studentId: string
  score: number
  percentage: number
  performanceLevel: PerformanceLevel
  teacherFeedback: string
}

export interface AiEvaluation {
  studentId: string
  performanceLevel: PerformanceLevel
  score: number
  strengths: string[]
  attentionPoints: string[]
  recommendations: string[]
  generatedAt: string
}

export interface AiMessage {
  id: string
  role: AiMessageRole
  content: string
  createdAt: string
}

export interface AiConfig {
  studentAssistant: {
    enabled: boolean
    context: { studentId: string; subjectId: string; gradeId: string }
    capabilities: string[]
    restrictions: { giveDirectExamAnswers: boolean; contentOutsideGrade: boolean }
  }
  teacherAssistant: {
    enabled: boolean
    capabilities: string[]
  }
  studentEvaluation: {
    enabled: boolean
    input: Record<'grades' | 'attendance' | 'participation' | 'activityHistory', boolean>
    exampleOutput: AiEvaluation
  }
}

export interface FeatureFlags {
  studentAiTutor: boolean
  teacherAiAssistant: boolean
  aiStudentEvaluation: boolean
  gamification: boolean
  directorDashboard: boolean
  notifications: boolean
  parentPortal: boolean
}

export interface Database {
  schemaVersion: string
  app: { name: string; locale: string; timezone: string }
  auth: { currentUser: CurrentUser }
  school: School
  academicContext: AcademicContext
  users: { teachers: Teacher[]; students: Student[] }
  dashboard: Dashboard
  streakSystem: StreakSystem
  activities: Activity[]
  studentResults: StudentResult[]
  ai: AiConfig
  featureFlags: FeatureFlags
}
