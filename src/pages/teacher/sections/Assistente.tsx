import { useState, type FormEvent } from 'react'
import { Button, Card } from '@/components/ui'
import { Mascote } from '@/pages/student/components/Mascote'
import { MASCOTES } from '@/pages/student/lib/mascotes'
import { StudentHeader } from '@/pages/student/sections/shared'
import { classStats, TEACHER, type ClassStudent } from '../data/turma'

// Respostas simuladas com dados reais da turma. Quando a IA real entrar, o prompt recebe o mesmo contexto.
function answerFor(prompt: string, students: ClassStudent[]): string[] {
  const stats = classStats(students)
  const names = stats.attention.map((s) => s.name.split(' ')[0]).join(', ')
  const p = prompt.toLowerCase()
  if (p.includes('plano')) {
    return [
      'Plano de aula · Frações equivalentes (50 min)',
      '1. Aquecimento (10 min): pizza de papel dividida em 2, 4 e 8 partes.',
      '2. Descoberta em duplas (20 min): quantos pedaços de 1/8 cabem em 1/2?',
      '3. Desafio na TV da sala (15 min): cada acerto vale +15 no monstrinho.',
      '4. Fechamento (5 min): cada criança explica uma equivalência com as próprias palavras.',
    ]
  }
  if (p.includes('exerc')) {
    return [
      `Exercícios para quem pede atenção (${names}):`,
      '1. Pinte 1/2 de uma barra com 4 quadrados. Quantos quadrados você pintou?',
      '2. Qual é maior: 1/3 ou 1/4 de uma mesma pizza? Desenhe.',
      '3. Complete: 2/4 = ?/2',
      'Dica: comece pelo concreto (desenho) antes da conta.',
    ]
  }
  return [
    `Resumo da ${TEACHER.className}:`,
    `Média ${stats.averageGrade.toFixed(1).replace('.', ',')}, presença ${stats.attendanceRate}% e participação ${stats.participationRate}%.`,
    `${stats.attention.length} alunos caíram nas últimas atividades: ${names}.`,
    'Sugestão: uma conversa rápida com cada um e exercícios de frações com material concreto.',
  ]
}

const SUGGESTIONS = ['Plano de aula sobre frações equivalentes', 'Exercícios para quem pede atenção', 'Resumo da turma para a coordenação']

export function Assistente({ students }: { students: ClassStudent[] }) {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)

  const ask = (text: string) => {
    if (!text.trim()) return
    setPrompt(text)
    setLoading(true)
    setTimeout(() => {
      setAnswer(answerFor(text, students))
      setLoading(false)
    }, 900)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    ask(prompt)
  }

  return (
    <>
      <StudentHeader eyebrow="Assistente IA" title="Como posso ajudar?" description="Planos de aula, exercícios e resumos com os dados da sua turma." />

      <Card tone="azul">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Mascote mascote={MASCOTES[1]} stage={3} size={96} cheer={answer ? answer.length : 0} />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <Button key={s} variant="secondary" size="sm" onClick={() => ask(s)} disabled={loading}>
                  {s}
                </Button>
              ))}
            </div>
            <form onSubmit={submit} className="flex gap-2">
              <label htmlFor="assistant-input" className="sr-only">
                Peça algo ao assistente
              </label>
              <input
                id="assistant-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Peça um plano de aula, exercícios ou um resumo"
                className="h-11 min-w-0 flex-1 rounded-md border border-border-strong bg-surface px-3 text-body text-fg md:h-10"
              />
              <Button type="submit" loading={loading}>
                Perguntar
              </Button>
            </form>
          </div>
        </div>
      </Card>

      {answer && !loading && (
        <Card className="animate-rise">
          <div className="space-y-1.5 text-reading text-fg">
            {answer.map((line, i) => (
              <p key={i} className={i === 0 ? 'font-display text-h2 font-semibold' : ''}>
                {line}
              </p>
            ))}
          </div>
        </Card>
      )}
    </>
  )
}
