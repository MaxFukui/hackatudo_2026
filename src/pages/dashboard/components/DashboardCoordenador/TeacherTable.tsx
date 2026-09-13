import { Card, Table, type Column } from '@/components/ui'
import { COORDINATOR_TEACHERS, STATUS_LABEL, type CoordinatorTeacher } from './coordinatorData'
import { DashboardSectionHeader } from './DashboardSectionHeader'
import { MetricLine } from './MetricLine'
import { StatusPill } from './StatusPill'

const COLUMNS: Column<CoordinatorTeacher>[] = [
  { key: 'name', header: 'Professor', primary: true, render: (t) => <span className="font-medium">{t.name}</span> },
  { key: 'classes', header: 'Turmas', render: (t) => t.classes.join(', ') },
  { key: 'focus', header: 'Foco sugerido', render: (t) => t.focus },
  { key: 'records', header: 'Registros', align: 'right', render: (t) => t.weeklyRecords },
  { key: 'risk', header: 'Alunos em atenção', align: 'right', render: (t) => t.studentsAtRisk },
  { key: 'signal', header: 'Sinal', render: (t) => <StatusPill status={t.supportSignal}>{STATUS_LABEL[t.supportSignal]}</StatusPill> },
]

export function TeacherTable() {
  return (
    <>
      <DashboardSectionHeader
        title="Professores"
        description="Acompanhamento pensado como apoio pedagógico: quem precisa de suporte, quem pode compartilhar boas práticas e quais combinados vêm a seguir."
      />
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card title="Agenda da coordenação" description="Fila prática para reuniões curtas de acompanhamento.">
          <ol className="space-y-3">
            {[...COORDINATOR_TEACHERS]
              .sort((a, b) => b.studentsAtRisk - a.studentsAtRisk)
              .slice(0, 4)
              .map((teacher, index) => (
                <li key={teacher.id} className="grid grid-cols-[2rem_1fr] gap-3 rounded-lg border border-border bg-surface-muted p-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-surface text-caption font-semibold text-fg" data-numeric>
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill status={teacher.supportSignal}>{STATUS_LABEL[teacher.supportSignal]}</StatusPill>
                      <p className="text-small font-semibold text-fg">{teacher.name}</p>
                    </div>
                    <p className="mt-1 text-small text-fg-muted">{teacher.nextMeeting}</p>
                  </div>
                </li>
              ))}
          </ol>
        </Card>
        <Card title="Distribuição de suporte" description="Sinal consolidado por professor.">
          <div className="space-y-3">
            {COORDINATOR_TEACHERS.map((teacher) => (
              <div key={teacher.id} className="grid gap-2 rounded-lg border border-border p-3 md:grid-cols-[1fr_11rem] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-small font-semibold text-fg">{teacher.name}</p>
                    <StatusPill status={teacher.supportSignal}>{STATUS_LABEL[teacher.supportSignal]}</StatusPill>
                  </div>
                  <p className="mt-1 text-caption text-fg-muted">{teacher.focus}</p>
                </div>
                <MetricLine label="Registros" value={teacher.activityRate} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {COORDINATOR_TEACHERS.map((teacher) => (
          <Card
            key={teacher.id}
            title={teacher.name}
            description={teacher.classes.join(', ')}
            action={<StatusPill status={teacher.supportSignal}>{STATUS_LABEL[teacher.supportSignal]}</StatusPill>}
          >
            <div className="space-y-4">
              <p className="text-small text-fg-muted">{teacher.focus}</p>
              <MetricLine label="Atividades registradas" value={teacher.activityRate} />
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
