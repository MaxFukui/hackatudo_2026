import { useState, type FormEvent } from 'react'
import { Button, Card } from '@/components/ui'
import { askTeacherAssistant } from '@/services/ai'

const SUGGESTIONS = ['Plano de aula sobre frações', 'Exercícios para alunos em atenção', 'Resumo da turma']

export function AiAssistantPanel() {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const ask = async (text: string) => {
    if (!text.trim()) return
    setLoading(true)
    const reply = await askTeacherAssistant(text)
    setAnswer(reply.content)
    setLoading(false)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void ask(prompt)
  }

  return (
    <Card>
      <div className="mb-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <Button key={s} variant="secondary" onClick={() => void ask(s)}>
            {s}
          </Button>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          id="assistant-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Peça algo ao assistente"
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
        <Button type="submit" disabled={loading}>
          Perguntar
        </Button>
      </form>
      {answer && <p className="mt-4 rounded-lg bg-stone-100 p-3 text-sm">{answer}</p>}
    </Card>
  )
}
