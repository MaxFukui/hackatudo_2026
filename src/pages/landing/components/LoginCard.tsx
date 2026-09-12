import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { HOME_BY_ROLE } from '@/lib/roles'
import type { Role } from '@/types'
import { RoleSwitcher } from './RoleSwitcher'

const GREETING: Record<Role, string> = {
  student: 'Seu monstrinho está com saudade.',
  teacher: 'Sua turma está esperando.',
  director: 'O painel da escola está pronto.',
  admin: 'Bem-vindo de volta.',
}

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
    <form
      id="entrar"
      onSubmit={onSubmit}
      aria-labelledby="entrar-titulo"
      className="w-full scroll-mt-8 space-y-4 self-start rounded-3xl border-4 border-ink bg-white p-6 shadow-[6px_6px_0_0_var(--color-ink)] lg:mt-10"
    >
      <div>
        <h2 id="entrar-titulo" className="font-display text-2xl font-bold">
          Entrar
        </h2>
        <p className="text-sm text-ink/70">{GREETING[role]}</p>
      </div>

      <RoleSwitcher value={role} onChange={setRole} />

      <div className="space-y-1">
        <label htmlFor="login-email" className="text-sm font-semibold">
          E-mail
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue="usuario@escola.edu.br"
          className="w-full rounded-xl border-2 border-ink/30 bg-surface/50 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="login-password" className="text-sm font-semibold">
          Senha
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          defaultValue="hacktudo"
          className="w-full rounded-xl border-2 border-ink/30 bg-surface/50 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-primary py-3 font-display text-lg font-bold text-white transition hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Entrar
      </button>

      <p className="text-center text-xs text-ink/60">Protótipo: escolha o perfil e clique em Entrar.</p>
    </form>
  )
}
