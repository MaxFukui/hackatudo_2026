import { Grid } from '@/components/ui'
import { Rule, Section, Spec } from './shared'

const SPACE = [
  { n: 1, px: 4, use: 'ícone ↔ texto' },
  { n: 2, px: 8, use: 'entre badges, entre linhas de formulário compactas' },
  { n: 3, px: 12, use: 'entre itens de lista' },
  { n: 4, px: 16, use: 'entre cards (gap-4)' },
  { n: 5, px: 20, use: 'padding interno de card (p-5)' },
  { n: 6, px: 24, use: 'entre seções da página (space-y-6)' },
  { n: 8, px: 32, use: 'margem lateral no desktop (px-8)' },
]

export function Espaco() {
  return (
    <Section id="espaco" title="Espaço e grade" lead="Base 4px, escala padrão do Tailwind. Poucos valores, sempre os mesmos: o olho percebe o ritmo mesmo sem saber o porquê.">
      <Spec label="gap-1 … gap-8" note="os sete que você vai usar. Se precisar de outro, provavelmente é um erro de estrutura.">
        <ul className="space-y-2">
          {SPACE.map((s) => (
            <li key={s.n} className="flex items-center gap-4 text-small">
              <span className="w-12 font-mono text-caption text-fg-muted">{s.n} · {s.px}px</span>
              <span className="h-4 bg-fg" style={{ width: s.px * 3 }} />
              <span className="text-fg-muted">{s.use}</span>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec label='max-w-content · <Grid layout="main-aside">' note="conteúdo com 1152px de largura máxima. Celular: uma coluna. Desktop: principal mais largo que o apoio. Todos os grids estão em Telas.">
        <Grid layout="main-aside">
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border-strong text-caption text-fg-muted">principal · 1.5fr</div>
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border-strong text-caption text-fg-muted">apoio · 1fr</div>
        </Grid>
      </Spec>

      <ul className="max-w-prose space-y-2">
        <Rule><span>Alinhe pela esquerda. Centralize só título de estado vazio e conteúdo de modal curto.</span></Rule>
        <Rule><span>Cards na mesma linha têm a mesma altura (<code className="font-mono text-small">grid</code> faz isso). Se um fica muito vazio, o conteúdo está no card errado.</span></Rule>
        <Rule><span>Sem valor arbitrário: <code className="font-mono text-small">p-[18px]</code>, <code className="font-mono text-small">mt-[7px]</code> não existem aqui.</span></Rule>
      </ul>
    </Section>
  )
}

export function Forma() {
  return (
    <Section id="forma" title="Forma e elevação" lead="Raio cresce com o tamanho do elemento. Sombra só no que flutua sobre a página.">
      <Spec label="rounded-sm · rounded-md · rounded-lg · rounded-full" note="4 · 8 · 12px · pill. Checkbox → botão/input → card/modal → avatar/badge.">
        <div className="flex flex-wrap items-end gap-6 text-caption text-fg-muted">
          <div className="flex flex-col items-center gap-2"><span className="size-6 rounded-sm border border-border-strong bg-surface" />sm</div>
          <div className="flex flex-col items-center gap-2"><span className="flex h-10 w-24 items-center justify-center rounded-md border border-border-strong bg-surface">md</span></div>
          <div className="flex flex-col items-center gap-2"><span className="flex h-16 w-32 items-center justify-center rounded-lg border border-border bg-surface">lg</span></div>
          <div className="flex flex-col items-center gap-2"><span className="flex h-8 w-20 items-center justify-center rounded-full bg-surface-muted">full</span></div>
        </div>
      </Spec>

      <Spec label="border-border · shadow-raised · shadow-overlay" note="card: só borda. Dropdown/popover: raised. Modal/toast: overlay. Nunca sombra em card de conteúdo.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex h-24 items-center justify-center rounded-lg border border-border bg-surface text-caption text-fg-muted">card · borda</div>
          <div className="flex h-24 items-center justify-center rounded-lg border border-border bg-surface text-caption text-fg-muted shadow-raised">popover · raised</div>
          <div className="flex h-24 items-center justify-center rounded-lg bg-surface text-caption text-fg-muted shadow-overlay">modal · overlay</div>
        </div>
      </Spec>
    </Section>
  )
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export function Icones() {
  return (
    <Section id="icones" title="Ícones" lead="Um estilo só: traço 1.75px, 20px, cantos redondos. Sem preenchimento, sem duotone, sem emoji em UI.">
      <Spec label="stroke=1.75 · 20×20 · aria-hidden" note="ícone sempre acompanha texto ou tem aria-label. Cor herda do texto (currentColor).">
        <div className="flex flex-wrap gap-5 text-fg-muted">
          <Icon d="M4 12h16M12 4v16" />
          <Icon d="m5 12 5 5L20 7" />
          <Icon d="M6 6l12 12M18 6 6 18" />
          <Icon d="M3 12h18M3 6h18M3 18h18" />
          <Icon d="M12 20V10M18 20V4M6 20v-4" />
          <Icon d="M21 12a9 9 0 1 1-6.2-8.6" />
          <Icon d="M12 3v18M3 12h18" />
          <Icon d="M20 6 9 17l-5-5" />
        </div>
      </Spec>
      <p className="max-w-prose text-small text-fg-muted">
        Biblioteca sugerida: <span className="font-medium text-fg">Lucide</span> (mesmo estilo dos exemplos). Instale só quando houver um segundo ícone
        repetido; até lá, SVG inline no próprio componente.
      </p>
    </Section>
  )
}

export function Escrita() {
  return (
    <Section id="escrita" title="Escrita" lead="A interface fala como uma professora boa: direta, calma, sem enrolar.">
      <div className="grid gap-4 md:grid-cols-2">
        <Spec label="assim">
          <ul className="space-y-2 text-small">
            <li>Marcar presença</li>
            <li>Nenhuma atividade ainda. Quando a professora criar uma, ela aparece aqui.</li>
            <li>Não foi possível salvar. Tente de novo.</li>
            <li>3 alunos precisam de atenção</li>
          </ul>
        </Spec>
        <Spec label="assim não">
          <ul className="space-y-2 text-small text-fg-muted line-through decoration-danger/60">
            <li>Clique aqui para realizar o registro da sua presença!</li>
            <li>Ops! Parece que não há nada por aqui… 😅</li>
            <li>Erro 500: Internal Server Error</li>
            <li>ATENÇÃO: 3 ALUNOS EM SITUAÇÃO CRÍTICA!!!</li>
          </ul>
        </Spec>
      </div>
      <ul className="max-w-prose space-y-2">
        <Rule><span>Botão começa com verbo no infinitivo: Salvar, Enviar, Criar atividade. Nunca "OK" ou "Clique aqui".</span></Rule>
        <Rule><span>Caixa de frase (só a primeira maiúscula). Nada em CAIXA ALTA, nada em Título Com Todas Maiúsculas.</span></Rule>
        <Rule><span>Erro diz o que aconteceu e o que fazer. Estado vazio diz o que vai aparecer ali.</span></Rule>
        <Rule><span>Sem ponto de exclamação em UI. Sem emoji. Entusiasmo vem do conteúdo, não da pontuação.</span></Rule>
      </ul>
    </Section>
  )
}

export function Acessibilidade() {
  return (
    <Section id="acessibilidade" title="Acessibilidade" lead="Não é uma etapa depois. Os componentes daqui já cumprem isto; páginas precisam manter.">
      <ul className="max-w-prose space-y-2">
        <Rule><span>Contraste mínimo 4,5:1 em texto (os três níveis de <code className="font-mono text-small">fg</code> passam sobre <code className="font-mono text-small">surface</code>). Verifique de novo quando a paleta entrar.</span></Rule>
        <Rule><span>Tudo que clica é <code className="font-mono text-small">&lt;button&gt;</code> ou <code className="font-mono text-small">&lt;a&gt;</code>. Nunca <code className="font-mono text-small">div onClick</code>.</span></Rule>
        <Rule><span>Alvo de toque de 40px (o <code className="font-mono text-small">base.css</code> garante em botões). Ícone sozinho tem <code className="font-mono text-small">aria-label</code>.</span></Rule>
        <Rule><span>Cor nunca é o único sinal: badge tem texto, gráfico tem legenda, erro tem mensagem.</span></Rule>
        <Rule><span>Input tem <code className="font-mono text-small">&lt;label&gt;</code> visível. Placeholder não substitui label.</span></Rule>
        <Rule><span>Teste com Tab: dá para chegar em tudo e o anel de foco aparece? Se não, está errado.</span></Rule>
      </ul>
    </Section>
  )
}
