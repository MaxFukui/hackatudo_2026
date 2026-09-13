import type { FormEvent } from 'react'
import { Button, Card } from '@/components/ui'
import type { ActivityType } from '@/types'

const TYPES: { value: ActivityType; label: string }[] = [
  { value: 'exercise', label: 'Exercício' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'exam', label: 'Prova' },
  { value: 'homework', label: 'Tarefa de casa' },
]

// Stub: ainda não persiste. Ligar a um createActivity() em services/activities.ts.
export function ActivityForm() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Card title="Nova atividade">
      <form onSubmit={onSubmit} className="space-y-3 text-sm">
        <label className="block space-y-1">
          <span className="text-fg-muted">Título</span>
          <input id="activity-title" className="w-full rounded-lg border border-border-strong px-3 py-2" />
        </label>
        <label className="block space-y-1">
          <span className="text-fg-muted">Tipo</span>
          <select id="activity-type" className="w-full rounded-lg border border-border-strong px-3 py-2">
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit" className="w-full">
          Criar atividade
        </Button>
      </form>
    </Card>
  )
}
