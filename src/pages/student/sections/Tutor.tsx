import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Alert, Badge, Button, Card } from '@/components/ui'
import { Mascote } from '@/pages/student/components/Mascote'
import type { Student, Subject, SubjectId } from '@/pages/student/data/aluno'
import { stageForXp } from '@/pages/student/lib/mascotes'
import { MASCOTE_CARD, SUBJECT_EMOJI, mascoteOfSubject } from '@/pages/student/lib/materias'
import { ask, greeting, type TutorMessage } from '@/pages/student/services/tutor'
import { IconArrowLeft, IconSend } from '../icons'
import { StudentHeader } from './shared'

const SUGGESTIONS: Record<SubjectId, string[]> = {
  matematica: ['Como faço fração equivalente?', 'Me explica divisão com resto'],
  ciencias: ['Por que a Lua muda de forma?', 'O que as plantas comem?'],
  portugues: ['Quando uso S ou SS?', 'Como achar a ideia principal do texto?'],
  historia: ['Quem morava no Brasil antes dos portugueses?', 'O que foi a independência?'],
  geografia: ['Quais são as regiões do Brasil?', 'O que é relevo?'],
  filosofia: ['O que é ser justo?', 'Amigo de verdade é o quê?'],
}

// Fluxo em dois passos: escolhe a matéria → conversa só sobre ela. "Voltar ao menu" reinicia.
export function Tutor({ student }: { student: Student }) {
  const [subject, setSubject] = useState<Subject | null>(null)

  if (!subject) {
    return (
      <>
        <StudentHeader eyebrow={student.className} title="O que você quer tirar dúvida hoje?" description="Escolha uma matéria. O tutor conversa sobre uma de cada vez — e o mascote dela vem junto." />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 stagger">
          {student.subjects.map((s, i) => {
            const m = mascoteOfSubject(s.id)
            return (
              <div key={s.id} style={{ '--stagger-index': i } as CSSProperties}>
                <Card tone={MASCOTE_CARD[m.id]} onClick={() => setSubject(s)} className="h-full">
                  <div className="flex items-center gap-3">
                    <Mascote mascote={m} stage={stageForXp(student.xp).stage} size={72} still />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-h1 font-semibold text-fg">
                        {SUBJECT_EMOJI[s.id]} {s.name}
                      </p>
                      <p className="text-small text-fg-muted">{s.topics.slice(0, 3).join(' · ')}</p>
                      <p className="mt-1 text-caption font-medium text-fg-muted">com o {m.name} →</p>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return <Conversa key={subject.id} subject={subject} xp={student.xp} className={student.className} onBack={() => setSubject(null)} />
}

function Conversa({ subject, xp, className, onBack }: { subject: Subject; xp: number; className: string; onBack: () => void }) {
  const mascote = mascoteOfSubject(subject.id)
  const stage = stageForXp(xp).stage
  const [messages, setMessages] = useState<TutorMessage[]>([greeting(subject)])
  const [text, setText] = useState('')
  const [thinking, setThinking] = useState(false)
  const list = useRef<HTMLOListElement>(null)

  // Mensagem nova: rola só a lista, nunca a página.
  useEffect(() => {
    const el = list.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  async function send(question: string) {
    const q = question.trim()
    if (!q || thinking) return
    setText('')
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text: q }])
    setThinking(true)
    const reply = await ask(subject, q)
    setMessages((m) => [...m, reply])
    setThinking(false)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void send(text)
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StudentHeader eyebrow={className} title={`Tutor de ${subject.name}`} />
        <Button variant="secondary" icon={<IconArrowLeft />} onClick={onBack}>
          Voltar ao menu
        </Button>
      </div>

      <Card
        tone={MASCOTE_CARD[mascote.id]}
        className="overflow-hidden"
        flush
        footer={
          <form onSubmit={onSubmit} className="flex gap-2">
            <label htmlFor="pergunta" className="sr-only">
              Sua pergunta sobre {subject.name}
            </label>
            <input
              id="pergunta"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Pergunte sobre ${subject.name}…`}
              enterKeyHint="send"
              autoComplete="off"
              className="h-12 min-w-0 flex-1 rounded-md border border-border-strong bg-surface px-4 text-body text-fg outline-none ring-0 ring-primary/15 transition-[border-color,box-shadow] duration-fast ease-standard focus:border-fg focus:ring-4 md:h-11"
            />
            <Button type="submit" variant="accent" size="lg" icon={<IconSend />} loading={thinking} aria-label="Enviar">
              <span className="hidden sm:inline">Enviar</span>
            </Button>
          </form>
        }
      >
        {/* Cabeçalho do chat: o mascote da matéria "apresenta" a conversa. */}
        <div className="flex items-center gap-3 border-b border-inherit px-4 py-3 md:px-5">
          <Mascote mascote={mascote} stage={stage} size={56} still />
          <div className="min-w-0 flex-1">
            <p className="font-display text-h2 font-semibold text-fg">
              {mascote.name} · {SUBJECT_EMOJI[subject.id]} {subject.name}
            </p>
            <p className="text-small text-fg-muted">Ajuda a pensar — não dá a resposta pronta.</p>
          </div>
          <Badge tone="success" dot>online</Badge>
        </div>

        <ol ref={list} className="flex max-h-[26rem] min-h-72 flex-col gap-3 overflow-y-auto bg-surface px-4 py-4 scroll-smooth scrollbar-thin md:px-5" aria-live="polite">
          {messages.map((m) =>
            m.role === 'user' ? (
              <li key={m.id} className="ml-10 self-end rounded-lg rounded-br-sm bg-primary px-4 py-2.5 text-reading text-primary-fg animate-scale-in sm:ml-20">
                {m.text}
              </li>
            ) : m.blocked ? (
              <li key={m.id} className="mr-10 animate-wiggle sm:mr-20">
                <Alert tone="warning" title="Ops, essa é de outra matéria" animate>
                  {m.text}
                </Alert>
              </li>
            ) : (
              <li key={m.id} className="mr-10 flex items-end gap-2 sm:mr-20">
                <Mascote mascote={mascote} stage={stage} size={40} still className="animate-pop" />
                <div className="rounded-lg rounded-bl-sm bg-surface-muted px-4 py-2.5 text-reading text-fg animate-bubble-in">{m.text}</div>
              </li>
            ),
          )}
          {thinking && (
            <li className="mr-10 flex items-end gap-2 animate-fade-in">
              <Mascote mascote={mascote} stage={stage} size={40} still />
              <div className="rounded-lg rounded-bl-sm bg-surface-muted px-4 py-3" aria-label="Pensando…">
                <span className="inline-flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2 animate-bounce-dot rounded-full bg-fg-subtle" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </span>
              </div>
            </li>
          )}
        </ol>

        {messages.length === 1 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-inherit bg-surface px-4 py-3 md:px-5">
            <span className="text-small text-fg-muted">Experimente:</span>
            {SUGGESTIONS[subject.id].map((s) => (
              <Button key={s} variant="secondary" size="sm" onClick={() => void send(s)}>
                {s}
              </Button>
            ))}
          </div>
        )}
      </Card>
    </>
  )
}
