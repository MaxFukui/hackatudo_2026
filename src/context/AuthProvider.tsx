import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Role } from '@/types'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'gizzi.role'

function readRole(): Role | null {
  try {
    return (localStorage.getItem(STORAGE_KEY) as Role | null) ?? null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(readRole)

  const login = useCallback((next: Role) => {
    setRole(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage indisponível: sessão vale só até recarregar
    }
  }, [])

  const logout = useCallback(() => {
    setRole(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo(() => ({ role, login, logout }), [role, login, logout])

  return <AuthContext value={value}>{children}</AuthContext>
}
