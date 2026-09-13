import { PageHeader } from '@/components/layout'
import { Badge, Card, Table, type Column } from '@/components/ui'
import { COORDINATOR_TEACHERS, STATUS_LABEL, STATUS_TONE, type CoordinatorTeacher } from '../coordinatorData'
import { MetricLine } from './MetricLine'

const COLUMNS: Column<CoordinatorTeacher>[] = [
  { key: 'name', header: 'Professor', primary: true, render: (t) => <span className="font-medium">{t.name}</span> },
  { key: 'classes', header: 'Turmas', render: (t) => t.classes.join(', ') },
  { key: 'focus', header: 'Foco sugerido', render: (t) => t.focus },
  { key: 'records', header: 'Registros', align: 'right', render: (t) => t.weeklyRecords },
  { key: 'risk', header: 'Alunos em atenção', align: 'right', render: (t) => t.studentsAtRisk },
  { key: 'signal', header: 'Sinal', render: (t) => <Badge tone={STATUS_TONE[t.supportSignal]} dot>{STATUS_LABEL[t.supportSignal]}</Badge> },
]

export function TeacherTable() {
  return (
    <>
      <PageHeader title="Professores" description="Acompanhamento adulto, pensado como apoio pedagógico e não como fiscalização." />
      <div className="grid gap-4 lg:grid-cols-3">
        {COORDINATOR_TEACHERS.map((teacher) => (
          <Card
            key={teacher.id}
            title={teacher.name}
            description={teacher.classes.join(', ')}
            action={<Badge tone={STATUS_TONE[teacher.supportSignal]} dot>{STATUS_LABEL[teacher.supportSignal]}</Badge>}
          >
            <div className="space-y-4">
              <p className="text-small text-fg-muted">{teacher.focus}</p>
              <MetricLine label="Atividades registradas" value={teacher.activityRate} tone={teacher.supportSignal === 'risk' ? 'danger' : teacher.supportSignal === 'attention' ? 'warning' : 'success'} />
              <div className="grid grid-cols-2 gap-2">
                <SmallStat label="Registros semanais" value={String(teacher.weeklyRecords)} />
                <SmallStat label="Alunos em atenção" value={String(teacher.studentsAtRisk)} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card title="Matriz de acompanhamento" flush>
        <Table columns={COLUMNS} rows={COORDINATOR_TEACHERS} rowKey={(t) => t.id} />
      </Card>
    </>
  )
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-muted px-3 py-2">
      <p className="text-caption text-fg-muted">{label}</p>
      <p className="text-lg font-semibold tabular-nums text-fg">{value}</p>
    </div>
  )
}
