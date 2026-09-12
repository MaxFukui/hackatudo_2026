import type { Role } from '@/types'

const ROLE_OPTIONS: { role: Role; label: string }[] = [
  { role: 'student', label: 'Aluno' },
  { role: 'teacher', label: 'Professor' },
  { role: 'director', label: 'Diretor' },
]

interface RoleSwitcherProps {
  value: Role
  onChange: (role: Role) => void
}

export function RoleSwitcher({ value, onChange }: RoleSwitcherProps) {
  return (
    <div role="radiogroup" aria-label="Perfil" className="grid grid-cols-3 gap-1 rounded-lg bg-stone-100 p-1">
      {ROLE_OPTIONS.map((opt) => (
        <button
          key={opt.role}
          type="button"
          role="radio"
          aria-checked={value === opt.role}
          onClick={() => onChange(opt.role)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
            value === opt.role ? 'bg-white text-primary-strong shadow-sm' : 'text-stone-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
