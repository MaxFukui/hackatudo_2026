import { Badge, Button, Card, CardSkeleton, EmptyState, Grid, ProgressBar, Stat, Table, type Column } from '@/components/ui'
import { Rule, Section, Spec } from './shared'

const BREAKPOINTS = [
  { name: 'base', px: '< 640', what: 'celular. 1 coluna, padding 16px, barra de navegação no rodapé, botões em largura total, tabela vira lista, modal vira folha que sobe do rodapé, títulos um degrau menores.' },
  { name: 'sm', px: '≥ 640', what: 'celular deitado / tablet pequeno. Botões voltam ao tamanho natural, modal centraliza, cabeçalho põe ações ao lado do título.' },
  { name: 'md', px: '≥ 768', what: 'tablet. Sidebar à esquerda, padding 20px, tabela volta a ser tabela, grids de 2 colunas.' },
  { name: 'lg', px: '≥ 1024', what: 'desktop. Grids de 3–4 colunas e principal/apoio. Largura máxima do conteúdo: 1152px.' },
]

function Box({ children, h = 'h-16' }: { children: string; h?: string }) {
  return <div className={`flex ${h} items-center justify-center rounded-md border border-dashed border-border-strong text-caption text-fg-muted`}>{children}</div>
}

export function Telas() {
  return (
    <Section
      id="layout"
      title="Telas: celular e desktop"
      lead="Mobile primeiro: a tela do aluno vai ser aberta no celular da família. Não é a versão desktop espremida — alguns componentes mudam de forma."
    >
      <Spec label="base · sm · md · lg" note="o que muda em cada faixa. Teste em 390, 768 e 1280px antes de dizer que terminou.">
        <ul className="divide-y divide-border">
          {BREAKPOINTS.map((b) => (
            <li key={b.name} className="grid gap-1 py-3 text-small sm:grid-cols-[6rem_1fr] sm:gap-4">
              <span className="font-mono text-caption text-fg">
                {b.name} <span className="text-fg-muted">{b.px}</span>
              </span>
              <span className="text-fg-muted">{b.what}</span>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec label='<Grid layout="stats | two | three | main-aside | aside-main">' note="os únicos grids do produto. Escolha pelo conteúdo. Redimensione a janela para ver o rearranjo.">
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-mono text-caption text-fg-muted">stats · 2×2 no celular, 4 no desktop</p>
            <Grid layout="stats">
              <Box h="h-12">1</Box>
              <Box h="h-12">2</Box>
              <Box h="h-12">3</Box>
              <Box h="h-12">4</Box>
            </Grid>
          </div>
          <div>
            <p className="mb-2 font-mono text-caption text-fg-muted">main-aside · principal 1.5fr + apoio 1fr a partir de lg</p>
            <Grid layout="main-aside">
              <Box>principal</Box>
              <Box>apoio</Box>
            </Grid>
          </div>
          <div>
            <p className="mb-2 font-mono text-caption text-fg-muted">three · 1 → 2 → 3 colunas</p>
            <Grid layout="three">
              <Box>a</Box>
              <Box>b</Box>
              <Box>c</Box>
            </Grid>
          </div>
        </div>
      </Spec>

      <Spec label="toque" note="o que os componentes já garantem. A página só precisa não desfazer.">
        <ul className="grid gap-x-8 gap-y-2 text-small sm:grid-cols-2">
          <li className="flex gap-2"><span className="text-success">✓</span> Alvo de 44px em botão, input, item de menu e linha tocável no celular (40px no desktop).</li>
          <li className="flex gap-2"><span className="text-success">✓</span> Input com 16px: o iOS não dá zoom ao focar.</li>
          <li className="flex gap-2"><span className="text-success">✓</span> Feedback do dedo é <code className="font-mono">active:</code>, não hover. Sem o flash cinza do WebKit.</li>
          <li className="flex gap-2"><span className="text-success">✓</span> Sem espera de 300ms no toque (<code className="font-mono">touch-action: manipulation</code>).</li>
          <li className="flex gap-2"><span className="text-success">✓</span> Safe areas: topbar, barra inferior, toast e rodapé do modal respeitam o notch e a barra home.</li>
          <li className="flex gap-2"><span className="text-success">✓</span> Trocar de seção volta ao topo; modal é folha que sobe; tabela vira lista; toast fica acima da barra.</li>
          <li className="flex gap-2"><span className="text-success">✓</span> Linha tocável tem chevron. Card tocável tem borda no toque. Nada é tocável sem parecer.</li>
          <li className="flex gap-2"><span className="text-success">✓</span> Página nunca rola de lado (<code className="font-mono">overflow-x: clip</code>). Só Tabs rola, até a borda.</li>
        </ul>
      </Spec>

      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2">
          <Rule><span><strong>Zona do polegar.</strong> Ação principal embaixo e à direita: barra de navegação no rodapé, primário por último no cabeçalho e no modal.</span></Rule>
          <Rule><span><strong>Uma ação principal por tela.</strong> No celular não cabe "escolha entre estes quatro botões". O resto vai para o menu ou para a seção seguinte.</span></Rule>
          <Rule><span><strong>Teclado aberto come metade da tela.</strong> Formulário longo: um campo por linha, botão Salvar depois do último campo (não fixo no rodapé, que o teclado cobre).</span></Rule>
          <Rule><span><strong>Rolagem só vertical.</strong> Horizontal apenas em Tabs e fileira de chips. Tabela não rola de lado — vira lista.</span></Rule>
        </ul>
        <ul className="space-y-2">
          <Rule><span><strong>Uma coluna no celular, sempre.</strong> Exceção: <code className="font-mono text-small">stats</code> em 2×2, porque quatro números empilhados viram uma parede.</span></Rule>
          <Rule><span><strong>Barra inferior: 3 a 5 itens</strong>, sempre com ícone. Mais que isso, a quinta vira "Mais".</span></Rule>
          <Rule><span><strong>Texto não encolhe abaixo de 16px.</strong> Títulos e números grandes descem um degrau; corpo fica.</span></Rule>
          <Rule><span><strong>Ordem no DOM = ordem no celular.</strong> Se o apoio precisa vir antes, use <code className="font-mono text-small">aside-main</code>, não <code className="font-mono text-small">order-*</code>.</span></Rule>
        </ul>
      </div>

      <Spec label="checklist antes de dizer que terminou" note="abra no celular de verdade, não só no DevTools.">
        <ol className="list-decimal space-y-1.5 pl-5 text-small">
          <li>390px de largura: nada corta, nada rola de lado, tudo dá para tocar com o polegar.</li>
          <li>Focar um input: a tela não dá zoom; o botão de enviar continua alcançável com o teclado aberto.</li>
          <li>Abrir um modal: sobe como folha, o conteúdo rola dentro, fecha pelo X e tocando fora.</li>
          <li>Trocar de seção pela barra inferior: volta ao topo; o item ativo está marcado.</li>
          <li>Tabela: virou lista; a linha tocável tem chevron e reage ao toque.</li>
          <li>Girar para paisagem: nada quebra; modal não passa de 90% da altura.</li>
          <li>iPhone com barra home: nada fica escondido atrás dela (barra inferior, toast, rodapé de modal).</li>
          <li>Ler à luz do dia: texto em <code className="font-mono">fg</code>, nunca em pastel.</li>
        </ol>
      </Spec>
    </Section>
  )
}

interface Row {
  id: string
  name: string
  cls: string
  value: number
  freq: number
  status: 'ok' | 'warn'
}
const ROWS: Row[] = [
  { id: '1', name: 'Primeiro item', cls: 'Grupo A', value: 8.1, freq: 94, status: 'ok' },
  { id: '2', name: 'Segundo item', cls: 'Grupo A', value: 6.2, freq: 81, status: 'warn' },
  { id: '3', name: 'Terceiro item', cls: 'Grupo B', value: 9.4, freq: 97, status: 'ok' },
]
const COLS: Column<Row>[] = [
  { key: 'name', header: 'Nome', primary: true, render: (r) => <span className="font-medium text-fg">{r.name}</span> },
  { key: 'cls', header: 'Grupo', hideOnMobile: true, render: (r) => r.cls },
  { key: 'value', header: 'Média', align: 'right', width: '6rem', render: (r) => r.value.toFixed(1).replace('.', ',') },
  { key: 'freq', header: 'Frequência', align: 'right', width: '7rem', render: (r) => `${r.freq}%` },
  {
    key: 'status',
    header: 'Situação',
    width: '8rem',
    render: (r) => (r.status === 'ok' ? <Badge tone="success" dot>Em dia</Badge> : <Badge tone="warning" dot>Atenção</Badge>),
  },
]

export function Receitas() {
  return (
    <Section id="receitas" title="Receitas de card" lead="Os seis tipos de card que aparecem no produto. Monte a partir deles em vez de inventar um sétimo.">
      <Spec label="1 · métricas" note='<Grid layout="stats"> com <Stat>. Rótulo curto; o detalhe diz a tendência em palavras, não só em cor.'>
        <Grid layout="stats">
          <Stat label="Total" value="28" />
          <Stat label="Média" value="7,6" detail="+0,3 vs. anterior" trend="up" />
          <Stat label="Frequência" value="92%" detail="estável" />
          <Stat label="Em atenção" value="4" detail="+1 esta semana" trend="down" />
        </Grid>
      </Spec>

      <Grid layout="two" stretch={false}>
        <Spec label="2 · lista" note="itens com divisória fina; valor à direita, tabular. Mais de 6 itens: paginar ou 'ver todos'.">
          <Card title="Lista" action={<Button variant="ghost" size="sm">Ver todos</Button>}>
            <ul className="divide-y divide-border text-small">
              {ROWS.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0 truncate">{r.name}</span>
                  <span className="shrink-0 text-fg-muted" data-numeric>
                    {r.value.toFixed(1).replace('.', ',')}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Spec>

        <Spec label="3 · progresso" note="um número grande + barra + uma frase. É o card da área do aluno.">
          <Card title="Progresso" action={<Badge tone="accent">+10</Badge>}>
            <p className="text-numeral font-semibold" data-numeric>
              340 <span className="text-h3 font-normal text-fg-muted">de 500</span>
            </p>
            <div className="mt-3">
              <ProgressBar value={340} max={500} label="Progresso" tone="accent" />
            </div>
            <p className="mt-3 text-small text-fg-muted">Faltam 160 para o próximo nível.</p>
          </Card>
        </Spec>

        <Spec label="4 · clicável" note="onClick no Card: o bloco inteiro abre o detalhe. Sem botão dentro — um alvo só.">
          <Card title="Item com detalhe" description="Toque para abrir." onClick={() => undefined} action={<Badge tone="warning" dot>Atenção</Badge>}>
            <p className="text-small text-fg-muted">Resumo em uma linha. A seta não é necessária: a borda no hover e o cursor já dizem.</p>
          </Card>
        </Spec>

        <Spec label="5 · vazio e carregando" note="mesmo lugar, forma diferente. Nunca um card em branco.">
          <div className="space-y-3">
            <CardSkeleton />
            <EmptyState title="Nada ainda" description="Aparece aqui quando existir." action={<Button size="sm">Criar</Button>} />
          </div>
        </Spec>
      </Grid>

      <Spec label="6 · tabela" note="<Card flush> + <Table>. Redimensione: no celular cada linha vira um bloco com rótulo/valor; colunas com hideOnMobile somem.">
        <Card title="Tabela" description="Coluna 'Grupo' some no celular; 'Nome' vira o título do bloco." flush>
          <Table columns={COLS} rows={ROWS} rowKey={(r) => r.id} onRowClick={() => undefined} />
        </Card>
      </Spec>
    </Section>
  )
}
