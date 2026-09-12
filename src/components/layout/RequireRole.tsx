import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import type { Role } from '@/types'

// Protege rotas por perfil. Sem login → volta para a landing.
export function RequireRole({ allow }: { allow: Role[] }) {
  const { role } = useAuth()
  if (!role) return <Navigate to="/" replace />
  if (role !== 'admin' && !allow.includes(role)) return <Navigate to="/" replace />
  return <Outlet />
}
