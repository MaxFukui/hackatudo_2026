import type { Role } from '@/types'

const ROLE_OPTIONS: { role: Role; label: string }[] = [
  { role: 'student', label: 'Aluno' },
  { role: 'teacher', label: 'Professor' },
  { role: 'director', label: 'Direção' },
]

interface RoleSwitcherProps {
  value: Role
  onChange: (role: Role) => void
}

export function RoleSwitcher({ value, onChange }: RoleSwitcherProps) {
  return (
    <div role="radiogroup" aria-label="Entrar como" className="grid grid-cols-3 gap-1 rounded-full border-2 border-ink bg-surface p-1">
      {ROLE_OPTIONS.map((opt) => (
        <button
          key={opt.role}
          type="button"
          role="radio"
          aria-checked={value === opt.role}
          onClick={() => onChange(opt.role)}
          className={`rounded-full px-3 py-1.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            value === opt.role ? 'bg-ink text-surface' : 'text-ink/70 hover:text-ink'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
