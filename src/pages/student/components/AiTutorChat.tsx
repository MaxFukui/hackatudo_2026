import { useState, type FormEvent } from 'react'
import { Button, Card } from '@/components/ui'
import { askTutor } from '@/services/ai'
import type { AiMessage } from '@/types'

export function AiTutorChat({ studentId }: { studentId: string }) {
  const [messages, setMessages] = useState<AiMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMessage: AiMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setSending(true)
    const reply = await askTutor(studentId, text)
    setMessages((prev) => [...prev, reply])
    setSending(false)
  }

  return (
    <Card>
      <div className="mb-4 flex max-h-96 min-h-40 flex-col gap-2 overflow-y-auto">
        {messages.length === 0 && <p className="text-sm text-fg-muted">Pergunte algo sobre frações.</p>}
        {messages.map((m) => (
          <p
            key={m.id}
            className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
              m.role === 'user' ? 'self-end bg-primary text-primary-fg' : 'self-start bg-surface-muted'
            }`}
          >
            {m.content}
          </p>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          id="tutor-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua dúvida"
          className="flex-1 rounded-lg border border-border-strong px-3 py-2 text-sm"
        />
        <Button type="submit" disabled={sending}>
          Enviar
        </Button>
      </form>
    </Card>
  )
}
