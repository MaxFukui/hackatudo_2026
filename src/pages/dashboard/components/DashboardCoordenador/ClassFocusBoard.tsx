import { formatGrade, formatPercent } from '@/lib/format'
import { CLASS_ACCENT, COORDINATOR_CLASSES, STATUS_LABEL, type ClassStatus, type CoordinatorClass } from './coordinatorData'
import { MetricLine } from './MetricLine'
import { StatusPill } from './StatusPill'

const GROUPS: { id: ClassStatus; title: string; description: string }[] = [
  { id: 'priority', title: 'Prioridade', description: 'Turmas abaixo da média ou com risco pedagógico.' },
  { id: 'watch', title: 'Acompanhar', description: 'Turmas com sinais pontuais para observar.' },
  { id: 'steady', title: 'Estáveis', description: 'Turmas boas para reconhecer e replicar práticas.' },
]

export function ClassFocusBoard({ limit, onClassSelect }: { limit?: number; onClassSelect?: (schoolClass: CoordinatorClass) => void }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-h2 font-semibold text-fg">Mapa de turmas</h2>
        <p className="text-small text-fg-muted">Separação pedagógica por média e risco; a barra mostra a meta coletiva escolhida pela turma.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {GROUPS.map((group) => {
          const allClasses = COORDINATOR_CLASSES.filter((item) => item.status === group.id)
          const classes = allClasses.slice(0, limit)
          return (
            <div key={group.id} className="director-panel rounded-lg border border-border bg-surface">
              <header className="border-b border-border px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-h3 font-semibold text-fg">{group.title}</h3>
                  <StatusPill status={group.id}>{allClasses.length}</StatusPill>
                </div>
                <p className="mt-1 text-caption text-fg-muted">{group.description}</p>
              </header>
              <div className="space-y-3 p-3">
                {classes.map((schoolClass) => (
                  <ClassFocusCard key={schoolClass.id} schoolClass={schoolClass} onSelect={onClassSelect ? () => onClassSelect(schoolClass) : undefined} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ClassFocusCard({ schoolClass, onSelect }: { schoolClass: CoordinatorClass; onSelect?: () => void }) {
  const accent = CLASS_ACCENT[schoolClass.accent]
  const Root = onSelect ? 'button' : 'article'

  return (
    <Root
      type={onSelect ? 'button' : undefined}
      onClick={onSelect}
      className={`w-full rounded-lg border border-border border-l-4 bg-surface p-3 text-left transition-[border-color,background-color,transform] duration-fast ${
        onSelect ? 'cursor-pointer hover:border-primary focus-visible:border-primary focus-visible:outline-none active:scale-99' : ''
      }`}
      style={{ borderLeftColor: accent.border }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-body font-semibold text-fg">{schoolClass.name}</h4>
          <p className="text-caption text-fg-muted">
            {schoolClass.teacher} · {schoolClass.shift} · {schoolClass.studentCount} alunos
          </p>
        </div>
        <StatusPill status={schoolClass.status}>{STATUS_LABEL[schoolClass.status]}</StatusPill>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <MiniMetric label="Média" value={formatGrade(schoolClass.averageGrade)} />
        <MiniMetric label="Presença" value={formatPercent(schoolClass.attendanceRate)} />
        <MiniMetric label="Atenção" value={schoolClass.studentsAtRisk} />
      </div>

      <div className="mt-3">
        <MetricLine label={schoolClass.rewardName} value={schoolClass.rewardProgress} />
      </div>
      <p className="mt-3 rounded-md bg-surface-muted px-3 py-2 text-small text-fg-muted">{schoolClass.nextStep}</p>
    </Root>
  )
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border bg-surface-muted px-2 py-2">
      <p className="text-caption text-fg-subtle">{label}</p>
      <p className="text-small font-semibold tabular-nums text-fg">{value}</p>
    </div>
  )
}
