import { Rule, Section, Spec } from './shared'

const FACES = [
  {
    name: 'Atkinson Hyperlegible Next',
    role: 'sans',
    cls: 'font-sans',
    use: 'Interface e texto, em todas as áreas. Único uso obrigatório.',
    why: 'Desenhada pelo Braille Institute para quem enxerga pouco: cada letra tem forma própria. É o que uma criança em alfabetização e uma pessoa com dislexia precisam — e não custa nada ao professor.',
    weights: '400 texto · 500 rótulo, botão · 600 título · 700 só número de destaque',
  },
  {
    name: 'Fredoka',
    role: 'display',
    cls: 'font-display',
    use: 'Só título e número grande na área do aluno e na landing.',
    why: 'Arredondada e amigável sem virar “fonte de festa infantil”. Dá o tom para a criança. Nunca em texto corrido, nunca no professor/diretor.',
    weights: '500 · 600 · 700',
  },
  {
    name: 'Atkinson Hyperlegible Mono',
    role: 'mono',
    cls: 'font-mono',
    use: 'Código, identificadores, valores técnicos.',
    why: 'Mesma família do texto, então não destoa. Raro na UI — aparece mais neste guia do que no produto.',
    weights: '400',
  },
]

// Pares que mais se confundem em fontes comuns. A fonte certa resolve isso sozinha.
const PROOF = ['Il1', 'O0', 'bd pq', 'a g', '5S 2Z 8B', 'rn m']

const SCALE = [
  { cls: 'text-display font-display', name: 'display', px: '40', use: 'número ou título de impacto: landing, recompensa do aluno. Sempre em Fredoka.' },
  { cls: 'text-h1 font-semibold', name: 'h1', px: '24', use: 'título da página (PageHeader)' },
  { cls: 'text-h2 font-semibold', name: 'h2', px: '18', use: 'título de seção, de modal' },
  { cls: 'text-h3 font-semibold', name: 'h3', px: '15', use: 'título de card' },
  { cls: 'text-reading', name: 'reading', px: '17', use: 'texto que o aluno lê: enunciado, explicação do tutor, feedback' },
  { cls: 'text-body', name: 'body', px: '16', use: 'texto corrido, inputs. Mínimo para qualquer coisa que a criança lê' },
  { cls: 'text-small font-medium', name: 'small', px: '14', use: 'botão, tabela, item de lista' },
  { cls: 'text-caption', name: 'caption', px: '12', use: 'rótulo e legenda em dashboard de adulto. Nunca para o aluno' },
]

export function Fontes() {
  return (
    <Section
      id="fontes"
      title="Fontes"
      lead="Um produto, três leitores: a criança de 9 anos que ainda tropeça em b e d, a professora lendo 28 linhas de tabela, o diretor olhando um número. A fonte que serve o primeiro serve os outros — o contrário não é verdade."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {FACES.map((f) => (
          <div key={f.name} className="flex flex-col rounded-lg border border-border bg-surface">
            <div className={`border-b border-border px-5 py-6 ${f.cls}`}>
              <p className={`text-display ${f.role === 'display' ? 'font-semibold' : ''}`}>Aa</p>
              <p className={`mt-3 text-body ${f.role === 'display' ? 'font-medium' : ''}`}>O rato roeu a roupa do rei de Roma</p>
              <p className="text-body" data-numeric>
                0123456789 · 7,6 · 92%
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 px-5 py-4 text-small">
              <p className="font-semibold text-fg">
                {f.name} <span className="ml-1 font-mono text-caption font-normal text-fg-muted">font-{f.role}</span>
              </p>
              <p className="text-fg">{f.use}</p>
              <p className="text-fg-muted">{f.why}</p>
              <p className="mt-auto pt-2 font-mono text-caption text-fg-muted">{f.weights}</p>
            </div>
          </div>
        ))}
      </div>

      <Spec label="prova de legibilidade" note="os pares que uma criança (e qualquer pessoa cansada) mais troca. Compare com a fonte do sistema ao lado.">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-caption font-medium text-fg-muted">Atkinson Hyperlegible Next</p>
            <p className="flex flex-wrap gap-x-8 gap-y-1 text-display">
              {PROOF.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </p>
          </div>
          <div style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
            <p className="mb-2 text-caption font-medium text-fg-muted">fonte do sistema</p>
            <p className="flex flex-wrap gap-x-8 gap-y-1 text-display text-fg-muted">
              {PROOF.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </p>
          </div>
        </div>
      </Spec>

      <Spec label="text-display … text-caption" note="cada classe já traz altura de linha e tracking. Não combine com leading-* ou tracking-*.">
        <ul className="divide-y divide-border">
          {SCALE.map((s) => (
            <li key={s.name} className="grid gap-1 py-3 md:grid-cols-[1fr_16rem] md:items-baseline md:gap-6">
              <span className={s.cls}>Aprender com atenção</span>
              <span className="text-caption text-fg-muted">
                <code className="font-mono text-fg">{s.name}</code> · {s.px}px · {s.use}
              </span>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec label="text-reading · max-w-reading" note="texto para a criança: 17px, linha 1.65, no máximo 60 caracteres por linha, alinhado à esquerda. É assim que o enunciado e a resposta do tutor aparecem.">
        <div className="max-w-reading space-y-3 text-reading">
          <p>
            Uma fração equivalente é outra forma de escrever a mesma quantidade. <strong className="font-semibold">Metade</strong> de uma pizza pode ser 1/2, 2/4 ou 4/8 — é sempre o mesmo tanto de pizza.
          </p>
          <p>Se você multiplicar o número de cima e o de baixo pelo mesmo número, a fração continua igual.</p>
        </div>
      </Spec>

      <Spec label="font-display" note="onde o Fredoka entra: cabeçalho da área do aluno, contagem de pontos, nome do bichinho. Um por tela, no máximo dois.">
        <div className="flex flex-wrap items-end gap-10">
          <div>
            <p className="text-caption font-medium text-fg-muted">título do aluno</p>
            <p className="font-display text-h1 font-semibold">Olá, Lucas</p>
          </div>
          <div>
            <p className="text-caption font-medium text-fg-muted">número de destaque</p>
            <p className="font-display text-display font-semibold" data-numeric>
              1.240 <span className="text-h2 text-fg-muted">pontos</span>
            </p>
          </div>
          <div>
            <p className="text-caption font-medium text-fg-muted">o mesmo, no professor</p>
            <p className="text-numeral font-semibold" data-numeric>
              7,6 <span className="text-h3 font-normal text-fg-muted">média</span>
            </p>
          </div>
        </div>
      </Spec>

      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2">
          <Rule><span><strong>Nunca abaixo de 16px para o aluno.</strong> <code className="font-mono text-small">caption</code> é para rótulo de dashboard de adulto.</span></Rule>
          <Rule><span><strong>Sem itálico, sem CAIXA ALTA, sem texto justificado</strong> em nada que a criança lê. Os três atrapalham quem está aprendendo a ler.</span></Rule>
          <Rule><span><strong>Ênfase é negrito (600)</strong>, não cor nem sublinhado. Sublinhado é link.</span></Rule>
          <Rule><span><strong>Linha curta.</strong> Texto corrido em <code className="font-mono text-small">max-w-prose</code>; para o aluno, <code className="font-mono text-small">max-w-reading</code>.</span></Rule>
        </ul>
        <ul className="space-y-2">
          <Rule><span><strong>Pesos: 400, 500, 600.</strong> 700 só em número de destaque. Nada abaixo de 400 — cinza fino some para quem enxerga mal.</span></Rule>
          <Rule><span><strong>Números em coluna são tabulares.</strong> <code className="font-mono text-small">&lt;table&gt;</code> já é; fora dela, <code className="font-mono text-small">data-numeric</code>.</span></Rule>
          <Rule><span><strong>Português:</strong> 7,6 · 1.248 · 92% · 12 de set. Nunca 7.6 ou 12/09 sem contexto.</span></Rule>
          <Rule><span><strong>Só esses pesos no <code className="font-mono text-small">index.html</code>.</strong> Cada peso a mais é um download a mais na escola com internet ruim.</span></Rule>
        </ul>
      </div>
    </Section>
  )
}
