import type { Teacher } from '@/types'
import { db, notFound, respond } from './client'

export function listTeachers(): Promise<Teacher[]> {
  return respond(db.users.teachers)
}

export function getTeacher(id: string): Promise<Teacher> {
  const teacher = db.users.teachers.find((t) => t.id === id)
  return teacher ? respond(teacher) : notFound('Professor', id)
}
