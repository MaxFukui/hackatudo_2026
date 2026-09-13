import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { Button, Card, Modal } from '@/components/ui'

type CalendarRole = 'coordinator' | 'teacher'

export interface CalendarTeacherOption {
  id: string
  name: string
}

interface CalendarEvent {
  id: string
  date: string
  title: string
  time?: string
  description?: string
  teacher?: string
  createdBy: CalendarRole
}

interface DraftEvent {
  title: string
  time: string
  description: string
  teacher: string
}

interface SchoolCalendarProps {
  role: CalendarRole
  title: string
  description: string
  teacherName?: string
  teacherOptions?: CalendarTeacherOption[]
  /** Mostra a lixeira nos eventos do dia. A exclusão vale para todos que compartilham a agenda. */
  allowDelete?: boolean
}

/** Posição do mouse sobre um dia com evento: o card de prévia acompanha o cursor. */
interface DayHover {
  date: string
  x: number
  y: number
}

const STORAGE_KEY = 'gizzi.calendar.events.v1'
// Os eventos fixos não estão no localStorage; para excluí-los guardamos só o id.
const REMOVED_KEY = 'gizzi.calendar.removed.v1'
const CALENDAR_EVENT = 'gizzi:calendar-updated'
const YEAR = 2026
const MONTH = 8
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
// Quantos eventos o card de prévia lista antes de resumir em "+n".
const PREVIEW_LIMIT = 4
const PREVIEW_OFFSET = 16
const PREVIEW_WIDTH = 288

const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    id: 'default_recovery',
    date: '2026-09-15',
    title: 'Retomada do 2º Ano C',
    time: '09:30',
    description: 'Plano curto para presença, participação e entregas.',
    teacher: 'Professor 5',
    createdBy: 'coordinator',
  },
  {
    id: 'default_math',
    date: '2026-09-18',
    title: 'Revisão de Frações',
    time: '14:00',
    description: 'Apoio para a turma do 4º Ano antes da próxima atividade.',
    teacher: 'Professor 7',
    createdBy: 'coordinator',
  },
  {
    id: 'default_goals',
    date: '2026-09-22',
    title: 'Validação de Metas Coletivas',
    description: 'Conferir turmas próximas de recompensa.',
    createdBy: 'coordinator',
  },
]

const emptyDraft = (teacherName = ''): DraftEvent => ({ title: '', time: '', description: '', teacher: teacherName })

function readLocalList<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as T[]) : []
  } catch {
    return []
  }
}

const readLocalEvents = () => readLocalList<CalendarEvent>(STORAGE_KEY)
const readRemovedIds = () => readLocalList<string>(REMOVED_KEY)

// Uma escrita, um aviso: a outra agenda (direção ou professor) recarrega na hora.
function writeLocalList(key: string, list: unknown[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(list))
  window.dispatchEvent(new Event(CALENDAR_EVENT))
}

function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(DEFAULT_EVENTS)

  useEffect(() => {
    const refresh = () => {
      const removed = new Set(readRemovedIds())
      setEvents([...DEFAULT_EVENTS.filter((event) => !removed.has(event.id)), ...readLocalEvents()])
    }
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener(CALENDAR_EVENT, refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener(CALENDAR_EVENT, refresh)
    }
  }, [])

  const addEvent = (event: CalendarEvent) => {
    writeLocalList(STORAGE_KEY, [...readLocalEvents(), event])
  }

  // Evento fixo: entra na lista de removidos. Evento criado aqui: sai do localStorage.
  const removeEvent = (id: string) => {
    if (DEFAULT_EVENTS.some((event) => event.id === id)) {
      writeLocalList(REMOVED_KEY, [...new Set([...readRemovedIds(), id])])
      return
    }
    writeLocalList(
      STORAGE_KEY,
      readLocalEvents().filter((event) => event.id !== id),
    )
  }

  return { events, addEvent, removeEvent }
}

function dateKey(day: number) {
  return `${YEAR}-${String(MONTH + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function prettyDate(key: string) {
  const [, month, day] = key.split('-')
  return `${day}/${month}/${YEAR}`
}

export function SchoolCalendar({ role, title, description, teacherName, teacherOptions = [], allowDelete = false }: SchoolCalendarProps) {
  const { events, addEvent, removeEvent } = useCalendarEvents()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [draft, setDraft] = useState<DraftEvent>(() => emptyDraft(teacherName))
  const [hover, setHover] = useState<DayHover | null>(null)
  const [pendingDelete, setPendingDelete] = useState<CalendarEvent | null>(null)
  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate()
  const startOffset = new Date(YEAR, MONTH, 1).getDay()
  const cells = Array.from({ length: Math.ceil((startOffset + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - startOffset + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })
  const visibleEvents = useMemo(
    () => (role === 'teacher' && teacherName ? events.filter((event) => event.teacher === teacherName || event.createdBy === 'teacher') : events),
    [events, role, teacherName],
  )
  const eventsByDate = useMemo(() => {
    return visibleEvents.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
      acc[event.date] = [...(acc[event.date] ?? []), event]
      return acc
    }, {})
  }, [visibleEvents])
  const selectedEvents = selectedDate ? (eventsByDate[selectedDate] ?? []) : []
  const hoverEvents = hover ? (eventsByDate[hover.date] ?? []) : []

  const openDay = (date: string) => {
    setHover(null)
    setSelectedDate(date)
    setDraft(emptyDraft(role === 'teacher' ? teacherName : ''))
  }

  // Só dias com evento mostram a prévia; o card segue o mouse enquanto ele estiver sobre o dia.
  const trackHover = (date: string, hasEvents: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
    if (!hasEvents) return
    setHover({ date, x: event.clientX, y: event.clientY })
  }

  const saveEvent = () => {
    const title = draft.title.trim()
    if (!selectedDate || !title) return

    addEvent({
      id: `event_${Date.now()}`,
      date: selectedDate,
      title,
      time: draft.time || undefined,
      description: draft.description.trim() || undefined,
      teacher: role === 'teacher' ? teacherName : draft.teacher || undefined,
      createdBy: role,
    })
    setDraft(emptyDraft(role === 'teacher' ? teacherName : ''))
  }

  const confirmDelete = () => {
    if (!pendingDelete) return
    removeEvent(pendingDelete.id)
    setPendingDelete(null)
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-6">
        <div className="min-w-0">
          <p className="mb-1 text-caption font-medium uppercase tracking-wide text-laranja">{role === 'teacher' ? 'Professor' : 'Direção'}</p>
          <h1 className="text-h1 font-semibold text-fg">{title}</h1>
          <p className="mt-1 max-w-prose text-body text-fg-muted">{description}</p>
        </div>
      </div>

      <Card title="Setembro de 2026" description="Clique em um dia para registrar reunião, retomada, conselho ou combinado pedagógico." flush>
        <div className="grid grid-cols-7 border-b border-border text-center text-caption font-semibold text-fg-muted">
          {WEEKDAYS.map((day) => (
            <div key={day} className="px-2 py-3">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, index) => {
            const key = day ? dateKey(day) : `blank_${index}`
            const dayEvents = day ? (eventsByDate[key] ?? []) : []
            const hasEvents = dayEvents.length > 0
            return (
              <button
                key={key}
                type="button"
                disabled={!day}
                onClick={() => day && openDay(key)}
                onMouseEnter={trackHover(key, hasEvents)}
                onMouseMove={trackHover(key, hasEvents)}
                onMouseLeave={() => setHover(null)}
                className="min-h-24 border-r border-b border-border p-2 text-left transition-colors duration-fast enabled:hover:bg-surface-muted disabled:bg-surface/40 md:min-h-32"
              >
                {day && (
                  <>
                    <span className="text-small font-semibold tabular-nums text-fg">{day}</span>
                    <span className="mt-2 flex flex-col gap-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <span key={event.id} className="truncate rounded-md bg-azul-claro px-2 py-1 text-caption font-medium text-primary-soft-fg">
                          {event.time ? `${event.time} · ` : ''}
                          {event.title}
                        </span>
                      ))}
                      {dayEvents.length > 3 && <span className="text-caption text-fg-muted">+{dayEvents.length - 3} eventos</span>}
                    </span>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card title="Próximos Eventos" description={role === 'teacher' ? 'Compromissos próprios e eventos enviados pela direção.' : 'Agenda geral da coordenação.'}>
          <div className="space-y-3">
            {visibleEvents.slice(0, 5).map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </Card>
        <Card title="Como Usar" description="Agenda pensada para virar rotina de acompanhamento, não só lembrete solto.">
          <div className="grid gap-3 md:grid-cols-3">
            <UsageCard title="Reuniões" text="marque encontros curtos com professores" />
            <UsageCard title="Retomadas" text="acompanhe turmas em atenção" />
            <UsageCard title="Combinados" text="registre metas e entregas da semana" />
          </div>
        </Card>
      </div>

      {hover && hoverEvents.length > 0 && <DayPreview date={hover.date} x={hover.x} y={hover.y} events={hoverEvents} />}

      {selectedDate && (
        <CalendarDrawer
          role={role}
          date={selectedDate}
          events={selectedEvents}
          draft={draft}
          teacherOptions={teacherOptions}
          onDraftChange={setDraft}
          onClose={() => setSelectedDate(null)}
          onSave={saveEvent}
          onDelete={allowDelete ? setPendingDelete : undefined}
        />
      )}

      <Modal
        open={pendingDelete !== null}
        title="Excluir evento?"
        description="Tem certeza que deseja excluir este evento? Ele some para todos que compartilham esta agenda e não dá para desfazer."
        onClose={() => setPendingDelete(null)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Excluir
            </Button>
          </>
        }
      >
        {pendingDelete && <EventRow event={pendingDelete} />}
      </Modal>
    </>
  )
}

// Card fixo na tela, encostado no cursor. Perto da borda direita ou de baixo, vira para o outro lado.
function DayPreview({ date, x, y, events }: { date: string; x: number; y: number; events: CalendarEvent[] }) {
  const flipX = x + PREVIEW_OFFSET + PREVIEW_WIDTH > window.innerWidth
  const flipY = y > window.innerHeight * 0.6
  const style = {
    left: flipX ? x - PREVIEW_OFFSET : x + PREVIEW_OFFSET,
    top: flipY ? y - PREVIEW_OFFSET : y + PREVIEW_OFFSET,
    width: PREVIEW_WIDTH,
    transform: `translate(${flipX ? '-100%' : '0'}, ${flipY ? '-100%' : '0'})`,
  }
  const extra = events.length - PREVIEW_LIMIT

  return (
    <div
      role="tooltip"
      aria-hidden="true"
      style={style}
      className="pointer-events-none fixed z-30 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-surface p-3 shadow-overlay animate-fade-in"
    >
      <p className="text-caption font-medium uppercase tracking-wide text-laranja">{prettyDate(date)}</p>
      <ul className="mt-2 space-y-2">
        {events.slice(0, PREVIEW_LIMIT).map((event) => (
          <li key={event.id} className="border-t border-border pt-2 first:border-t-0 first:pt-0">
            <p className="text-small font-semibold text-fg">
              {event.time && <span className="mr-1.5 tabular-nums text-fg-muted">{event.time}</span>}
              {event.title}
            </p>
            {event.description && <p className="mt-0.5 line-clamp-2 text-caption text-fg-muted">{event.description}</p>}
            {event.teacher && <p className="mt-0.5 text-caption font-medium text-fg">Professor: {event.teacher}</p>}
          </li>
        ))}
      </ul>
      {extra > 0 && <p className="mt-2 text-caption text-fg-muted">+{extra} eventos neste dia</p>}
    </div>
  )
}

function CalendarDrawer({
  role,
  date,
  events,
  draft,
  teacherOptions,
  onDraftChange,
  onClose,
  onSave,
  onDelete,
}: {
  role: CalendarRole
  date: string
  events: CalendarEvent[]
  draft: DraftEvent
  teacherOptions: CalendarTeacherOption[]
  onDraftChange: (draft: DraftEvent) => void
  onClose: () => void
  onSave: () => void
  onDelete?: (event: CalendarEvent) => void
}) {
  return (
    <div className="fixed inset-0 z-40 bg-ink-950/55" role="dialog" aria-modal="true" aria-labelledby="calendar-drawer-title">
      <button type="button" aria-label="Fechar calendário" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-surface p-4 shadow-overlay md:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
          <div>
            <h2 id="calendar-drawer-title" className="text-h2 font-semibold text-fg">
              {prettyDate(date)}
            </h2>
            <p className="mt-1 text-small text-fg-muted">Crie um evento e acompanhe os compromissos deste dia.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto py-4">
          <section className="space-y-3">
            <h3 className="text-small font-semibold text-fg">Novo Evento</h3>
            <label className="block">
              <span className="text-caption font-medium text-fg-muted">Título</span>
              <input
                value={draft.title}
                onChange={(event) => onDraftChange({ ...draft, title: event.target.value })}
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface-muted px-3 text-small text-fg outline-none transition-colors duration-fast focus:border-azul-claro"
                placeholder="Ex.: Reunião de retomada"
              />
            </label>
            <label className="block">
              <span className="text-caption font-medium text-fg-muted">Horário Opcional</span>
              <input
                type="time"
                value={draft.time}
                onChange={(event) => onDraftChange({ ...draft, time: event.target.value })}
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface-muted px-3 text-small text-fg outline-none transition-colors duration-fast focus:border-azul-claro"
              />
            </label>
            <label className="block">
              <span className="text-caption font-medium text-fg-muted">Descrição Opcional</span>
              <textarea
                value={draft.description}
                onChange={(event) => onDraftChange({ ...draft, description: event.target.value })}
                rows={3}
                className="mt-1 w-full resize-none rounded-md border border-border bg-surface-muted px-3 py-2 text-small text-fg outline-none transition-colors duration-fast focus:border-azul-claro"
                placeholder="Detalhes do combinado, pauta ou observação..."
              />
            </label>
            {role === 'coordinator' && (
              <label className="block">
                <span className="text-caption font-medium text-fg-muted">Professor</span>
                <select
                  value={draft.teacher}
                  onChange={(event) => onDraftChange({ ...draft, teacher: event.target.value })}
                  className="mt-1 h-10 w-full rounded-md border border-border bg-surface-muted px-3 text-small text-fg outline-none transition-colors duration-fast focus:border-azul-claro"
                >
                  <option value="">Não enviar para professor</option>
                  {teacherOptions.map((teacher) => (
                    <option key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <Button variant="accent" className="w-full" disabled={!draft.title.trim()} onClick={onSave}>
              Salvar Evento
            </Button>
          </section>

          <section className="space-y-3">
            <h3 className="text-small font-semibold text-fg">Eventos do Dia</h3>
            {events.length > 0 ? (
              <div className="space-y-2">
                {events.map((event) => (
                  <EventRow key={event.id} event={event} onDelete={onDelete} />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-border bg-surface-muted p-3 text-small text-fg-muted">Nenhum evento registrado neste dia.</p>
            )}
          </section>
        </div>
      </aside>
    </div>
  )
}

// Com onDelete, a lixeira aparece no hover (ou no foco do teclado) e pede confirmação antes de apagar.
function EventRow({ event, onDelete }: { event: CalendarEvent; onDelete?: (event: CalendarEvent) => void }) {
  return (
    <article className="group relative rounded-lg border border-border bg-surface-muted p-3">
      <div className={`flex flex-wrap items-center justify-between gap-2 ${onDelete ? 'pr-9' : ''}`}>
        <h3 className="text-small font-semibold text-fg">{event.title}</h3>
        <span className="text-caption font-medium text-fg-muted">{event.time || prettyDate(event.date)}</span>
      </div>
      {event.description && <p className="mt-2 text-caption text-fg-muted">{event.description}</p>}
      {event.teacher && <p className="mt-2 text-caption font-medium text-fg">Professor: {event.teacher}</p>}
      {onDelete && (
        <button
          type="button"
          aria-label={`Excluir evento ${event.title}`}
          onClick={() => onDelete(event)}
          className="absolute top-2 right-2 inline-flex size-8 min-h-0 items-center justify-center rounded-md text-fg-subtle opacity-0 transition-[opacity,background-color,color] duration-fast ease-standard group-hover:opacity-100 hover:bg-danger-soft hover:text-danger-soft-fg focus-visible:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </article>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </svg>
  )
}

function UsageCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-lg border border-border bg-surface-muted p-3">
      <h3 className="text-small font-semibold text-fg">{title}</h3>
      <p className="mt-1 text-caption text-fg-muted">{text}</p>
    </article>
  )
}
