import { useMemo, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui'
import { formatGrade, formatPercent } from '@/lib/format'
import { CLASS_ACCENT, COORDINATOR_CLASSES, COORDINATOR_SUMMARY, COORDINATOR_TEACHERS, STATUS_LABEL, type CoordinatorClass } from './coordinatorData'
import { ClassTag } from './ClassTag'
import { ScaledProgress } from './ScaledProgress'
import { StatusPill } from './StatusPill'

type HeroDrawer = 'decision' | 'focus' | null

const SYSTEM_FOCUS_OPTIONS = [
  { id: 'school', label: 'Toda a escola' },
  { id: 'council', label: 'Conselho de classe' },
  { id: 'goals', label: 'Metas coletivas' },
]

export function DirectorHero() {
  const [drawer, setDrawer] = useState<HeroDrawer>(null)
  const [decisionText, setDecisionText] = useState('Retomada do 2º Ano C')
  const [focusOption, setFocusOption] = useState('class_02c')
  const [focusTeacher, setFocusTeacher] = useState('teacher_05')
  const attentionClasses = useMemo(
    () =>
      [...COORDINATOR_CLASSES]
        .filter((schoolClass) => schoolClass.status === 'priority' || schoolClass.status === 'watch')
        .sort((a, b) => {
          if (a.status !== b.status) return a.status === 'priority' ? -1 : 1
          return b.studentsAtRisk - a.studentsAtRisk
        }),
    [],
  )
  const stableCount = COORDINATOR_CLASSES.filter((item) => item.status === 'steady').length
  const watchCount = COORDINATOR_CLASSES.filter((item) => item.status === 'watch').length
  const priorityCount = COORDINATOR_CLASSES.filter((item) => item.status === 'priority').length
  const focusLabel = focusOption.startsWith('class_')
    ? `${COORDINATOR_CLASSES.find((item) => item.id === focusOption)?.name ?? 'Turma'} · ${COORDINATOR_TEACHERS.find((item) => item.id === focusTeacher)?.name ?? 'Professor'}`
    : SYSTEM_FOCUS_OPTIONS.find((item) => item.id === focusOption)?.label ?? 'Toda a escola'

  return (
    <section className="director-panel overflow-hidden rounded-lg border border-border bg-surface">
      <div className="director-hero-grid border-b border-border bg-ink-950 px-4 py-5 text-branco md:px-6 md:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-caption font-medium uppercase tracking-wide text-laranja">Coordenação Pedagógica</p>
            <h1 className="mt-2 text-h1 font-semibold text-branco">Painel de Acompanhamento das Turmas</h1>
            <p className="mt-2 text-body text-ink-200">
              Visão executiva para decidir onde reconhecer, onde intervir e como manter a tecnologia a serviço da aprendizagem.
            </p>
          </div>
          <div className="grid gap-2 rounded-lg border border-branco/15 bg-branco/8 p-3 sm:grid-cols-2 lg:min-w-[24rem]">
            <DecisionTile label="Próxima Decisão" value={decisionText} onClick={() => setDrawer('decision')} />
            <DecisionTile label="Reunião Foco" value={focusLabel} onClick={() => setDrawer('focus')} />
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
        <HeroMetric label="Turmas" value={COORDINATOR_SUMMARY.classesWatched} detail="Acompanhadas" />
        <HeroMetric label="Alunos" value={COORDINATOR_SUMMARY.totalStudents} detail="No Painel" />
        <HeroMetric label="Média" value={formatGrade(COORDINATOR_SUMMARY.averageGrade)} detail="3º Bimestre" />
        <HeroMetric label="Presença" value={formatPercent(COORDINATOR_SUMMARY.attendanceRate)} detail="Média Escolar" />
        <HeroMetric label="Participação" value={formatPercent(COORDINATOR_SUMMARY.participationRate)} detail="Em Sala" />
        <HeroMetric label="Em Atenção" value={COORDINATOR_SUMMARY.studentsAtRisk} detail="Alunos" />
      </div>

      <div className="grid gap-4 px-4 py-4 md:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <ScaledProgress value={COORDINATOR_SUMMARY.collectiveProgress} label="Progresso Médio das Metas Coletivas" showValue />
        <div className="flex flex-wrap gap-2">
          <StatusPill status="steady">{`${stableCount} Turmas Estáveis`}</StatusPill>
          <StatusPill status="watch">{`${watchCount} Em Acompanhamento`}</StatusPill>
          <StatusPill status="priority">{`${priorityCount} Prioridade`}</StatusPill>
        </div>
      </div>

      {drawer === 'decision' && (
        <DecisionDrawer
          value={decisionText}
          suggestions={attentionClasses}
          onChange={setDecisionText}
          onPick={(schoolClass) => setDecisionText(`Retomada do ${schoolClass.name}`)}
          onClose={() => setDrawer(null)}
        />
      )}
      {drawer === 'focus' && (
        <FocusDrawer
          focusOption={focusOption}
          focusTeacher={focusTeacher}
          onFocusOptionChange={setFocusOption}
          onFocusTeacherChange={setFocusTeacher}
          onClose={() => setDrawer(null)}
        />
      )}
    </section>
  )
}

function DecisionTile({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-branco/12 bg-branco/8 px-3 py-3 text-left transition-[background-color,border-color,transform] duration-fast ease-standard hover:border-azul-claro hover:bg-branco/12 active:scale-98"
    >
      <p className="text-caption font-medium text-ink-200">{label}</p>
      <p className="mt-1 text-small font-semibold text-branco">{value}</p>
    </button>
  )
}

function HeroMetric({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <div className="bg-surface px-4 py-4 md:px-5">
      <p className="text-caption font-medium uppercase tracking-wide text-fg-subtle">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-branco">{value}</p>
      <p className="mt-1 text-caption text-fg-subtle">{detail}</p>
    </div>
  )
}

function DecisionDrawer({
  value,
  suggestions,
  onChange,
  onPick,
  onClose,
}: {
  value: string
  suggestions: CoordinatorClass[]
  onChange: (value: string) => void
  onPick: (schoolClass: CoordinatorClass) => void
  onClose: () => void
}) {
  return (
    <SideDrawer title="Próxima Decisão" description="Defina a decisão principal que a direção quer acompanhar nesta semana." onClose={onClose}>
      <label className="block">
        <span className="text-small font-medium text-fg">Decisão da Semana</span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="mt-2 w-full resize-none rounded-md border border-border bg-surface-muted px-3 py-2 text-small text-fg outline-none transition-colors duration-fast focus:border-azul-claro"
          placeholder="Escreva a decisão que precisa acompanhar..."
        />
      </label>

      <section className="space-y-3">
        <div>
          <h3 className="text-small font-semibold text-fg">Sugestões</h3>
          <p className="mt-1 text-caption text-fg-muted">Geradas pelas turmas marcadas como Acompanhar ou Prioridade.</p>
        </div>
        <div className="space-y-2">
          {suggestions.map((schoolClass) => (
            <button
              key={schoolClass.id}
              type="button"
              onClick={() => onPick(schoolClass)}
              className="w-full rounded-lg border border-border border-l-4 bg-surface-muted p-3 text-left transition-colors duration-fast hover:border-border-strong"
              style={{ borderLeftColor: CLASS_ACCENT[schoolClass.accent].border }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <ClassTag name={schoolClass.name} />
                <StatusPill status={schoolClass.status}>{STATUS_LABEL[schoolClass.status]}</StatusPill>
              </div>
              <p className="mt-2 text-caption text-fg-muted">{schoolClass.nextStep}</p>
            </button>
          ))}
        </div>
      </section>
    </SideDrawer>
  )
}

function FocusDrawer({
  focusOption,
  focusTeacher,
  onFocusOptionChange,
  onFocusTeacherChange,
  onClose,
}: {
  focusOption: string
  focusTeacher: string
  onFocusOptionChange: (value: string) => void
  onFocusTeacherChange: (value: string) => void
  onClose: () => void
}) {
  return (
    <SideDrawer title="Reunião Foco" description="Escolha o foco principal da reunião pedagógica desta semana." onClose={onClose}>
      <label className="block">
        <span className="text-small font-medium text-fg">Foco</span>
        <select
          value={focusOption}
          onChange={(event) => onFocusOptionChange(event.target.value)}
          className="mt-2 h-10 w-full rounded-md border border-border bg-surface-muted px-3 text-small text-fg outline-none transition-colors duration-fast focus:border-azul-claro"
        >
          <optgroup label="Turmas">
            {COORDINATOR_CLASSES.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {schoolClass.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Outros focos">
            {SYSTEM_FOCUS_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </optgroup>
        </select>
      </label>

      <label className="block">
        <span className="text-small font-medium text-fg">Professor Referência</span>
        <select
          value={focusTeacher}
          onChange={(event) => onFocusTeacherChange(event.target.value)}
          className="mt-2 h-10 w-full rounded-md border border-border bg-surface-muted px-3 text-small text-fg outline-none transition-colors duration-fast focus:border-azul-claro"
        >
          {COORDINATOR_TEACHERS.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </label>

      <div className="rounded-lg border border-border bg-surface-muted p-3">
        <h3 className="text-small font-semibold text-fg">Uso no protótipo</h3>
        <p className="mt-1 text-caption text-fg-muted">
          Depois, esse foco pode virar pauta, tarefa para professor e evento automático no calendário.
        </p>
      </div>
    </SideDrawer>
  )
}

function SideDrawer({ title, description, onClose, children }: { title: string; description: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 bg-ink-950/55" role="dialog" aria-modal="true" aria-labelledby={`${title}-title`}>
      <button type="button" aria-label="Fechar painel" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-surface p-4 shadow-overlay md:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
          <div>
            <h2 id={`${title}-title`} className="text-h2 font-semibold text-fg">{title}</h2>
            <p className="mt-1 text-small text-fg-muted">{description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto py-4">{children}</div>
      </aside>
    </div>
  )
}
