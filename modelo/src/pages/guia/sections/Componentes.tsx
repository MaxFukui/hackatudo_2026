import { useState } from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardSkeleton,
  EmptyState,
  Grid,
  Modal,
  ProgressBar,
  Spinner,
  Stat,
  Table,
  Tabs,
  Toast,
  type Column,
} from '@/components/ui'
import { Section, Spec } from './shared'

const PLUS = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export function Botoes() {
  return (
    <Section id="button" title="Button" lead="Um primário por área. Accent (laranja) só para a recompensa ou o CTA do aluno. Secondary para a segunda ação, ghost para as discretas, danger só para destruir.">
      <Spec label="variant · size · icon · loading · disabled">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primário</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Excluir</Button>
          <Button icon={PLUS}>Nova atividade</Button>
          <Button variant="secondary" loading>
            Salvando
          </Button>
          <Button disabled>Desabilitado</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Pequeno · sm</Button>
          <Button size="md">Padrão · md</Button>
          <Button size="lg">Grande · lg</Button>
        </div>
      </Spec>
    </Section>
  )
}

export function Rotulos() {
  return (
    <Section id="badge" title="Badge e Alert" lead="Badge é uma palavra de estado. Alert é uma frase no fluxo da página. Nenhum dos dois é clicável.">
      <Spec label="<Badge tone dot>">
        <div className="flex flex-wrap gap-2">
          <Badge>Neutro</Badge>
          <Badge tone="primary">Primary</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success" dot>Concluída</Badge>
          <Badge tone="warning" dot>Pendente</Badge>
          <Badge tone="danger" dot>Atrasada</Badge>
          <Badge tone="info">Nova</Badge>
        </div>
      </Spec>
      <Spec label="<Alert tone title>">
        <div className="space-y-3">
          <Alert tone="info">A turma tem 28 alunos. Os dados abaixo cobrem o 3º bimestre.</Alert>
          <Alert tone="warning" title="Sem conexão">
            Mostrando os últimos dados salvos. Vamos atualizar quando voltar.
          </Alert>
          <Alert tone="danger" title="Não foi possível salvar">
            Tente de novo. Se continuar, avise o suporte.
          </Alert>
        </div>
      </Spec>
    </Section>
  )
}

export function Cartoes() {
  return (
    <Section id="card" title="Card e Stat" lead="Card agrupa. Stat é a métrica de uma linha, em fileira no topo da página.">
      <Spec label="<Card title description action footer flush onClick>" note="padding 16px no celular, 20px no desktop. Header quebra linha se a ação não couber.">
        <Grid layout="two">
          <Card title="Com cabeçalho" description="Descrição curta em fg-muted." action={<Badge tone="success" dot>Ativo</Badge>} footer="Rodapé para nota ou ação secundária.">
            <p className="text-small text-fg-muted">Corpo do card. Texto em small, listas com divisória fina.</p>
          </Card>
          <Card>
            <p className="text-small text-fg-muted">Sem cabeçalho: só o conteúdo, padding igual.</p>
          </Card>
        </Grid>
      </Spec>
      <Spec label="<Stat label value detail trend>" note='em <Grid layout="stats">: 2×2 no celular, fileira no desktop. Nunca mais que 5.'>
        <Grid layout="stats">
          <Stat label="Alunos" value="28" />
          <Stat label="Média da turma" value="7,6" detail="+0,3 vs. bimestre anterior" trend="up" />
          <Stat label="Frequência" value="92%" detail="estável" />
          <Stat label="Precisam de atenção" value="4" detail="+1 esta semana" trend="down" />
        </Grid>
      </Spec>
    </Section>
  )
}

interface Row {
  id: string
  name: string
  value: number
  status: 'ok' | 'warn'
}
const ROWS: Row[] = [
  { id: '1', name: 'Primeiro item', value: 8.1, status: 'ok' },
  { id: '2', name: 'Segundo item', value: 6.2, status: 'warn' },
  { id: '3', name: 'Terceiro item', value: 9.4, status: 'ok' },
]
const COLS: Column<Row>[] = [
  { key: 'name', header: 'Nome', render: (r) => <span className="font-medium text-fg">{r.name}</span> },
  { key: 'value', header: 'Valor', align: 'right', width: '6rem', render: (r) => r.value.toFixed(1).replace('.', ',') },
  {
    key: 'status',
    header: 'Situação',
    width: '8rem',
    render: (r) => (r.status === 'ok' ? <Badge tone="success" dot>Em dia</Badge> : <Badge tone="warning" dot>Atenção</Badge>),
  },
]
const TABS = [
  { id: 'a', label: 'Visão geral' },
  { id: 'b', label: 'Itens', count: 3 },
  { id: 'c', label: 'Histórico' },
]

export function Navegacao() {
  const [tab, setTab] = useState('a')
  return (
    <Section id="tabs" title="Tabs e Table" lead="Tabs trocam conteúdo no mesmo lugar (estado na URL via useTab). Table vai dentro de Card flush.">
      <Spec label="<Tabs items active onChange>">
        <Tabs items={TABS} active={tab} onChange={setTab} aria-label="Exemplo" />
        <p className="pt-4 text-small text-fg-muted">Conteúdo da aba "{TABS.find((t) => t.id === tab)?.label}".</p>
      </Spec>
      <Spec label="<Card flush><Table columns rows rowKey onRowClick /></Card>" note="desktop: tabela. Celular: lista de blocos (veja Receitas de card). Números à direita e tabulares.">
        <Card flush>
          <Table columns={COLS} rows={ROWS} rowKey={(r) => r.id} />
        </Card>
      </Spec>
    </Section>
  )
}

export function Feedback() {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(false)
  return (
    <Section id="feedback" title="Progresso, carregamento e vazio" lead="Cada estado tem forma própria. Nunca uma área em branco, nunca um spinner gigante no meio da tela.">
      <Spec label="<ProgressBar value max label tone showValue>">
        <div className="max-w-md space-y-4">
          <ProgressBar value={340} max={500} label="XP" showValue />
          <ProgressBar value={92} label="Frequência" tone="success" />
          <ProgressBar value={35} label="Risco" tone="danger" />
        </div>
      </Spec>
      <Spec label="<Spinner> · <Skeleton> · <CardSkeleton>" note="spinner em ação curta; skeleton onde o conteúdo vai aparecer.">
        <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
          <Spinner />
          <CardSkeleton />
        </div>
      </Spec>
      <Spec label="<EmptyState title description action>">
        <EmptyState
          title="Nenhuma atividade ainda"
          description="Quando você criar a primeira, ela aparece aqui com a média da turma."
          action={<Button size="sm" icon={PLUS}>Criar atividade</Button>}
        />
      </Spec>
      <Spec label="<Avatar name src size>">
        <div className="flex items-center gap-3">
          <Avatar name="Ana Beatriz" size="sm" />
          <Avatar name="Carlos Eduardo" />
          <Avatar name="Maria" size="lg" />
        </div>
      </Spec>
      <Spec label="<Toast open onClose duration>" note="confirmação curta. Celular: acima da barra inferior. Desktop: canto inferior direito. Some em 3s.">
        <Button variant="secondary" onClick={() => setToast(true)}>
          Mostrar toast
        </Button>
        <Toast open={toast} onClose={() => setToast(false)}>
          Salvo. <span className="text-accent">+10 pontos</span>
        </Toast>
      </Spec>
      <Spec label="<Modal open title description onClose footer>" note="desktop: 448px, centralizado. Celular: folha que sobe do rodapé, com alça. Fecha com Esc, X ou tocando fora. Rodapé: ghost à esquerda, primário à direita (empilham no celular).">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Abrir modal
        </Button>
        <Modal
          open={open}
          title="Excluir atividade?"
          description="Os resultados dos alunos também serão removidos."
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Excluir
              </Button>
            </>
          }
        >
          <p className="text-small text-fg-muted">Essa ação não pode ser desfeita.</p>
        </Modal>
      </Spec>
    </Section>
  )
}
