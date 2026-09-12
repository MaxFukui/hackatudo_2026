import type { Activity } from '@/types'
import { db, respond } from './client'

export function listActivities(filter: { classId?: string; teacherId?: string } = {}): Promise<Activity[]> {
  return respond(
    db.activities.filter(
      (a) =>
        (!filter.classId || a.classId === filter.classId) &&
        (!filter.teacherId || a.teacherId === filter.teacherId),
    ),
  )
}
