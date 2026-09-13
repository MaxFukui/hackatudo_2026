import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button, Card, ChoiceGroup, Form, Input, type ChoiceOption } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { HOME_BY_ROLE } from '@/lib/roles'
import type { Role } from '@/types'

type LoginRole = Exclude<Role, 'admin'>

const ROLES: ChoiceOption<LoginRole>[] = [
  { value: 'student', label: 'Aluno' },
  { value: 'teacher', label: 'Professor' },
  { value: 'director', label: 'Direção' },
]

const GREETING: Record<LoginRole, string> = {
  student: 'Seu monstrinho está com saudade.',
  teacher: 'Sua turma está esperando.',
  director: 'O painel da escola está pronto.',
}

// Login simulado: escolhe o perfil e entra. Sem validação de senha no protótipo.
export function LoginCard() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<LoginRole>('student')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(role)
    navigate(HOME_BY_ROLE[role])
  }

  return (
    <div className="w-full">
      <Card title="Entrar" description={GREETING[role]}>
        <Form onSubmit={onSubmit}>
          <ChoiceGroup name="role" label="Entrar como" options={ROLES} value={role} onChange={setRole} columns={3} />
          <Input id="login-email" name="email" type="email" label="E-mail" defaultValue="usuario@escola.edu.br" />
          <Input
            id="login-password"
            name="password"
            type="password"
            label="Senha"
            autoComplete="current-password"
            defaultValue="hacktudo"
            hint="Protótipo: qualquer senha entra."
          />
          <Button type="submit" size="lg" className="w-full">
            Entrar
          </Button>
        </Form>
      </Card>
    </div>
  )
}
