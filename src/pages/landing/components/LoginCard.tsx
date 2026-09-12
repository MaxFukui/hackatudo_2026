import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { HOME_BY_ROLE } from '@/lib/roles'
import type { Role } from '@/types'
import { RoleSwitcher } from './RoleSwitcher'

// Login simulado: escolhe o perfil e entra. Sem validação de senha no protótipo.
export function LoginCard() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('student')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(role)
    navigate(HOME_BY_ROLE[role])
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 self-center rounded-2xl border border-stone-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Entrar</h2>
      <RoleSwitcher value={role} onChange={setRole} />
      <label className="block space-y-1 text-sm">
        <span className="text-stone-600">E-mail</span>
        <input id="login-email" type="email" defaultValue="usuario@escola.edu.br" className="w-full rounded-lg border border-stone-300 px-3 py-2" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-stone-600">Senha</span>
        <input id="login-password" type="password" defaultValue="hacktudo" className="w-full rounded-lg border border-stone-300 px-3 py-2" />
      </label>
      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  )
}
