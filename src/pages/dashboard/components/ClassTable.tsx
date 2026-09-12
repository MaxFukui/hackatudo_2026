import { PageHeader } from '@/components/layout'
import { Badge, Card, Table, type Column } from '@/components/ui'
import { formatGrade, formatPercent } from '@/lib/format'
import { COORDINATOR_CLASSES, STATUS_LABEL, STATUS_TONE, type CoordinatorClass } from '../coordinatorData'
import { MetricLine } from './MetricLine'

const COLUMNS: Column<CoordinatorClass>[] = [
  { key: 'name', header: 'Turma', primary: true, render: (c) => <span className="font-medium">{c.name}</span> },
  { key: 'teacher', header: 'Responsavel', render: (c) => c.teacher },
  { key: 'grade', header: 'Média', align: 'right', render: (c) => formatGrade(c.averageGrade) },
  { key: 'attendance', header: 'Presença', align: 'right', render: (c) => formatPercent(c.attendanceRate) },
  { key: 'goal', header: 'Meta coletiva', align: 'right', render: (c) => formatPercent(c.rewardProgress) },
  { key: 'risk', header: 'Atenção', align: 'right', render: (c) => c.studentsAtRisk },
  { key: 'status', header: 'Status', render: (c) => <Badge tone={STATUS_TONE[c.status]} dot>{STATUS_LABEL[c.status]}</Badge> },
]

export function ClassTable() {
  return (
    <>
      <PageHeader title="Turmas" description="Leitura por sala para priorizar apoio pedagógico, reconhecimento e metas coletivas." />
      <div className="grid gap-4 lg:grid-cols-3">
        {COORDINATOR_CLASSES.map((schoolClass) => (
          <Card
            key={schoolClass.id}
            title={schoolClass.name}
            description={`${schoolClass.shift} · ${schoolClass.studentCount} alunos · ${schoolClass.stage}`}
            action={<Badge tone={STATUS_TONE[schoolClass.status]} dot>{STATUS_LABEL[schoolClass.status]}</Badge>}
          >
            <div className="space-y-4">
              <div>
                <p className="text-small font-medium text-fg">{schoolClass.teacher}</p>
                <p className="text-caption text-fg-muted">{schoolClass.subjects.join(' · ')}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <SmallStat label="Média" value={formatGrade(schoolClass.averageGrade)} />
                <SmallStat label="Presença" value={formatPercent(schoolClass.attendanceRate)} />
                <SmallStat label="Atenção" value={String(schoolClass.studentsAtRisk)} />
              </div>
              <MetricLine label={schoolClass.rewardName} value={schoolClass.rewardProgress} tone="accent" />
              <div className="space-y-1 rounded-lg bg-surface-muted p-3 text-small">
                <p className="font-medium text-fg">{schoolClass.highlight}</p>
                <p className="text-fg-muted">{schoolClass.needs}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card title="Comparativo das turmas" flush>
        <Table columns={COLUMNS} rows={COORDINATOR_CLASSES} rowKey={(c) => c.id} />
      </Card>
    </>
  )
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-2 py-2">
      <p className="text-caption text-fg-muted">{label}</p>
      <p className="text-small font-semibold tabular-nums text-fg">{value}</p>
    </div>
  )
}
