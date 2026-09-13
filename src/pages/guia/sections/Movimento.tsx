import { useState } from 'react'
import { Badge, Button, Card, CardSkeleton, Grid, ProgressBar, Stat, Tabs } from '@/components/ui'
import { Rule, Section, Spec } from './shared'

const DURATIONS = [
  ['fast', '120ms', 'cor, opacidade, escala de toque — hover, active, foco'],
  ['base', '180ms', 'troca de estado no lugar — aba, seleção, linha'],
  ['enter', '240ms', 'algo que aparece — card, toast, seção'],
  ['exit', '160ms', 'algo que some — sempre mais rápido do que entrou'],
  ['slow', '320ms', 'folha do modal, barra de progresso, deslocamento grande'],
]

const EASES = [
  ['standard', 'cubic-bezier(0.2, 0, 0, 1)', 'muda no lugar'],
  ['enter', 'cubic-bezier(0.05, 0.7, 0.1, 1)', 'chega rápido, assenta devagar'],
  ['exit', 'cubic-bezier(0.3, 0, 0.8, 0.15)', 'sai sem cerimônia'],
  ['spring', 'cubic-bezier(0.34, 1.4, 0.64, 1)', 'passa um pouco e volta — recompensa, seleção'],
]

const TABS = [
  { id: 'a', label: 'Início' },
  { id: 'b', label: 'Atividades', count: 3 },
  { id: 'c', label: 'Desempenho' },
  { id: 'd', label: 'Histórico' },
]

function Replay({ label, children }: { label: string; children: (key: number) => React.ReactNode }) {
  const [key, setKey] = useState(0)
  return (
    <div className="space-y-3">
      <div key={key}>{children(key)}</div>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)}>
        {label}
      </Button>
    </div>
  )
}

export function Movimento() {
  const [tab, setTab] = useState('a')
  const [points, setPoints] = useState(0)

  return (
    <Section
      id="movimento"
      title="Movimento"
      lead="Movimento responde a um toque ou mostra de onde algo veio. Cada um tem duração e curva pelo que faz — não pelo gosto de quem programou. Tudo desliga com prefers-reduced-motion."
    >
      <Spec label="duration-fast … duration-slow" note="pelo tamanho do que muda. Nada acima de 320ms; nada abaixo de 120ms (parece bug).">
        <ul className="divide-y divide-border text-small">
          {DURATIONS.map(([n, ms, use]) => (
            <li key={n} className="grid grid-cols-[5rem_4rem_1fr] items-baseline gap-3 py-2">
              <code className="font-mono text-fg">{n}</code>
              <span className="text-fg-muted" data-numeric>{ms}</span>
              <span className="text-fg-muted">{use}</span>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec label="ease-standard · ease-enter · ease-exit · ease-spring" note="pelo tipo de mudança. Linear nunca (só em shimmer e spinner).">
        <ul className="divide-y divide-border text-small">
          {EASES.map(([n, bez, use]) => (
            <li key={n} className="grid grid-cols-[5rem_1fr] items-baseline gap-3 py-2 sm:grid-cols-[5rem_15rem_1fr]">
              <code className="font-mono text-fg">{n}</code>
              <code className="hidden font-mono text-caption text-fg-muted sm:block">{bez}</code>
              <span className="text-fg-muted">{use}</span>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec label="toque" note="pressione. Botão comprime 3% e muda de cor; card comprime 1% e perde a elevação; linha escurece. Solte: volta em 120ms.">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Pressione</Button>
          <Button variant="accent">Pressione</Button>
          <Button variant="secondary">Pressione</Button>
          <Card onClick={() => undefined} className="w-56">
            <p className="text-small font-medium">Card tocável</p>
            <p className="text-caption text-fg-muted">hover eleva, toque comprime</p>
          </Card>
        </div>
      </Spec>

      <Spec label="animate-pop · ease-spring" note="recompensa: nasce em 60%, passa para 108%, assenta em 100%. Só para o que acabou de acontecer.">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="accent" size="sm" onClick={() => setPoints((p) => p + 10)}>
            Ganhar pontos
          </Button>
          {points > 0 && (
            <Badge key={points} tone="accent" pop>
              +{points} pontos
            </Badge>
          )}
        </div>
      </Spec>

      <Spec label="<Tabs>" note="o sublinhado é um só e desliza (180ms, standard). Troque de aba e acompanhe.">
        <Tabs items={TABS} active={tab} onChange={setTab} aria-label="Exemplo de movimento" />
      </Spec>

      <Spec label='<Grid stagger> · <ProgressBar>' note="entrada: cada filho sobe 8px e aparece, um a cada 40ms (máx. 9). Barra enche do zero em 320ms com ease-enter.">
        <Replay label="Repetir entrada">
          {() => (
            <div className="space-y-4">
              <Grid layout="stats" stagger>
                <Stat label="Total" value="28" />
                <Stat label="Média" value="7,6" detail="+0,3" trend="up" />
                <Stat label="Frequência" value="92%" />
                <Stat label="Atenção" value="4" detail="+1" trend="down" />
              </Grid>
              <ProgressBar value={340} max={500} label="Progresso" tone="accent" showValue />
            </div>
          )}
        </Replay>
      </Spec>

      <Spec label="<Skeleton>" note="brilho que atravessa (1,6s, linear): diz 'está vindo' sem piscar. Nunca mais de 3 esqueletos empilhados.">
        <div className="max-w-sm">
          <CardSkeleton />
        </div>
      </Spec>

      <Spec label="<Modal> · <Toast> · troca de seção" note="modal: folha sobe em 320ms no celular, cresce do centro em 240ms no desktop; sai em 160ms pelo caminho inverso. Toast sobe e some. Seção nova faz fade-up de 240ms. Veja em Progresso e estados.">
        <p className="text-small text-fg-muted">Saída sempre mais curta que a entrada: quem fechou já decidiu, não quer esperar.</p>
      </Spec>

      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2">
          <Rule><span><strong>Só <code className="font-mono text-small">opacity</code> e <code className="font-mono text-small">transform</code>.</strong> Largura, altura e margem não animam — travam o scroll do celular.</span></Rule>
          <Rule><span><strong>Entrada uma vez.</strong> <code className="font-mono text-small">stagger</code> e <code className="font-mono text-small">pop</code> são para a primeira pintura ou para o que acabou de acontecer. Lista que atualiza não reanima.</span></Rule>
          <Rule><span><strong>Nada em loop</strong> além de shimmer e spinner. Bichinho respirando é a única exceção — e para quando a tela não está visível.</span></Rule>
        </ul>
        <ul className="space-y-2">
          <Rule><span><strong>Movimento tem direção.</strong> Folha sobe do rodapé e desce para o rodapé. Toast sobe. Seção entra de baixo. Nada "aparece do nada".</span></Rule>
          <Rule><span><strong>Toque responde em 120ms</strong> ou parece travado. Hover pode ser mais lento; toque não.</span></Rule>
          <Rule><span><strong><code className="font-mono text-small">prefers-reduced-motion</code></strong> zera tudo no <code className="font-mono text-small">base.css</code>. Não trate caso a caso; não crie exceção.</span></Rule>
        </ul>
      </div>
    </Section>
  )
}
