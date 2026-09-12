import type { AcademicContext, FeatureFlags, School } from '@/types'
import { db, respond } from './client'

export function getSchool(): Promise<School> {
  return respond(db.school)
}

export function getAcademicContext(): Promise<AcademicContext> {
  return respond(db.academicContext)
}

export function getFeatureFlags(): Promise<FeatureFlags> {
  return respond(db.featureFlags)
}
