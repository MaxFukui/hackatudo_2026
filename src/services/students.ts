import type { Student, StudentResult } from '@/types'
import { db, notFound, respond } from './client'

export function listStudents(classId?: string): Promise<Student[]> {
  const students = db.users.students
  return respond(classId ? students.filter((s) => s.classId === classId) : students)
}

export function getStudent(id: string): Promise<Student> {
  const student = db.users.students.find((s) => s.id === id)
  return student ? respond(student) : notFound('Aluno', id)
}

export function listStudentResults(studentId: string): Promise<StudentResult[]> {
  return respond(db.studentResults.filter((r) => r.studentId === studentId))
}
