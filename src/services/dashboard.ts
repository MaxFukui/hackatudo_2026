import type { Dashboard } from '@/types'
import { db, respond } from './client'

export function getDashboard(): Promise<Dashboard> {
  return respond(db.dashboard)
}
