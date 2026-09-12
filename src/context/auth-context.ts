import { createContext } from 'react'
import type { Role } from '@/types'

export interface AuthState {
  role: Role | null
  login: (role: Role) => void
  logout: () => void
}

export const AuthContext = createContext<AuthState | null>(null)
