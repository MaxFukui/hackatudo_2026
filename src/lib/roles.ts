import type { Role } from '@/types'

export const HOME_BY_ROLE: Record<Role, string> = {
  student: '/aluno',
  teacher: '/professor',
  director: '/diretor',
  admin: '/diretor',
}
