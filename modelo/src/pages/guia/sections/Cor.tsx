import { Badge, Button, Card, Grid } from '@/components/ui'
import { Rule, Section, Spec, Swatch } from './shared'

const PALETA = [
  { cls: 'bg-branco border border-border-strong text-fg', name: 'branco', note: '#FFFFFF' },
  { cls: 'bg-verde-agua text-fg', name: 'verde-agua', note: '#D8F1DD' },
  { cls: 'bg-verde-esc text-fg', name: 'verde-esc', note: '#C3DAB9' },
  { cls: 'bg-rosa-claro text-fg', name: 'rosa-claro', note: '#F4D4E4' },
  { cls: 'bg-rosa-esc text-fg', name: 'rosa-esc', note: '#E0B6CB' },
  { cls: 'bg-azul-claro text-fg', name: 'azul-claro', note: '#A6CBDE' },
  { cls: 'bg-azul-esc text-fg', name: 'azul-esc', note: '#88AEC2' },
  { cls: 'bg-amarelo-claro text-fg', name: 'amarelo-claro', note: '#FFFED4' },
  { cls: 'bg-amarelo text-fg', name: 'amarelo', note: '#FFFCAD' },
  { cls: 'bg-laranja text-ink-950', name: 'laranja', note: '#ED9458' },
  { cls: 'bg-escuro text-branco', name: 'escuro', note: '#4A4B52' },
]

const PAPEIS = [
  { cls: 'bg-primary text-primary-fg', name: 'primary', note: 'escuro · ação principal' },
  { cls: 'bg-primary-soft text-primary-soft-fg', name: 'primary-soft', note: 'azul claro · selecionado' },
  { cls: 'bg-accent text-accent-fg', name: 'accent', note: 'laranja · destaque' },
  { cls: 'bg-accent-soft text-accent-soft-fg', name: 'accent-soft', note: 'derivado · chip de pontos' },
]

const ESTADOS = [
  { cls: 'bg-success text-branco', name: 'success', note: 'derivado' },
  { cls: 'bg-success-soft text-success-soft-fg', name: 'success-soft', note: 'verde água' },
  { cls: 'bg-warning text-branco', name: 'warning', note: 'derivado' },
  { cls: 'bg-warning-soft text-warning-soft-fg', name: 'warning-soft', note: 'amarelo' },
  { cls: 'bg-danger text-branco', name: 'danger', note: 'derivado' },
  { cls: 'bg-danger-soft text-danger-soft-fg', name: 'danger-soft', note: 'rosa claro' },
  { cls: 'bg-info text-branco', name: 'info', note: 'derivado' },
  { cls: 'bg-info-soft text-info-soft-fg', name: 'info-soft', note: 'azul esc.' },
]

const SUPERFICIES = [
  { cls: 'bg-canvas border border-border-strong text-fg', name: 'canvas', note: 'fundo da página' },
  { cls: 'bg-surface border border-border-strong text-fg', name: 'surface', note: 'card, topbar' },
  { cls: 'bg-surface-muted border border-border-strong text-fg', name: 'surface-muted', note: 'trilho, hover' },
  { cls: 'bg-border text-fg', name: 'border', note: 'divisória' },
  { cls: 'bg-border-strong text-fg', name: 'border-strong', note: 'input' },
]

const CONTRASTE = [
  ['branco sobre primary', '8,7'],
  ['escuro sobre accent (laranja)', '7,0'],
  ['fg sobre surface', '13,3'],
  ['fg-muted sobre surface', '8,7'],
  ['fg-subtle sobre surface', '5,2'],
  ['fg sobre azul claro', '7,8'],
  ['success-soft-fg sobre verde água', '6,7'],
  ['warning-soft-fg sobre amarelo', '7,0'],
  ['danger-soft-fg sobre rosa claro', '6,8'],
  ['info-soft-fg sobre azul esc.', '4,8'],
]

export function Cor() {
  return (
    <Section
      id="cor"
      title="Cor"
      lead="Paleta pastel com dois pontos fortes. O escuro faz a ação; o laranja faz o destaque; os pastéis fazem fundo, nunca letra. Onde a paleta não segura texto, há um tom derivado da mesma cor, testado em contraste."
    >
      <Spec label="paleta · 11 cores" note="como recebida. Tokens com o nome original (bg-verde-agua, bg-laranja…). Nas páginas, prefira os papéis abaixo.">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {PALETA.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </Spec>

      <Spec label="primary · accent" note="escuro é a ação principal (calmo, funciona em qualquer área). Laranja é o destaque — pontos, streak, o botão do aluno. Uma vez por tela.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PAPEIS.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button>Ação principal</Button>
          <Button variant="accent">Marcar presença</Button>
          <Button variant="secondary">Secundária</Button>
          <Badge tone="primary">selecionado</Badge>
          <Badge tone="accent">+10 pontos</Badge>
        </div>
      </Spec>

      <Spec label="success · warning · danger · info" note="fundo suave vem direto da paleta (verde água, amarelo, rosa claro, azul esc.). O tom forte é derivado — sem ele, não há como escrever 'Atenção' que se leia.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {ESTADOS.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </Spec>

      <Spec label="canvas · surface · border · fg" note="neutros derivados do escuro. Página em canvas (branco quente), card em surface (branco): o card aparece sem sombra.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {SUPERFICIES.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
        <ul className="mt-4 space-y-1 text-body">
          <li className="text-fg">
            <span className="font-mono text-small">fg</span> — texto principal (escuro fechado, 13:1)
          </li>
          <li className="text-fg-muted">
            <span className="font-mono text-small">fg-muted</span> — secundário, legenda (= escuro, 8,7:1)
          </li>
          <li className="text-fg-subtle">
            <span className="font-mono text-small">fg-subtle</span> — placeholder, ícone inativo, rótulo terciário (5,2:1)
          </li>
        </ul>
      </Spec>

      <Spec label='<Card tone="verde | rosa | azul | amarelo">' note="os pares claro/escuro da paleta viram fundo + borda de card. Para a área do aluno e um destaque no professor. Máximo dois por tela; nunca em tabela ou formulário.">
        <Grid layout="stats">
          <Card tone="verde" title="Verde">
            <p className="text-small text-fg-muted">verde água + verde esc.</p>
          </Card>
          <Card tone="rosa" title="Rosa">
            <p className="text-small text-fg-muted">rosa claro + rosa esc.</p>
          </Card>
          <Card tone="azul" title="Azul">
            <p className="text-small text-fg-muted">azul claro + azul esc.</p>
          </Card>
          <Card tone="amarelo" title="Amarelo">
            <p className="text-small text-fg-muted">amarelo claro + amarelo</p>
          </Card>
        </Grid>
      </Spec>

      <Spec label="contraste (WCAG AA ≥ 4,5:1)" note="medido, não estimado. Se mudar um hex em tokens.css, meça de novo.">
        <ul className="grid gap-x-8 gap-y-1 text-small sm:grid-cols-2">
          {CONTRASTE.map(([par, v]) => (
            <li key={par} className="flex justify-between border-b border-border py-1.5">
              <span className="text-fg-muted">{par}</span>
              <span className="font-mono text-fg" data-numeric>
                {v}:1
              </span>
            </li>
          ))}
        </ul>
      </Spec>

      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2">
          <Rule><span><strong>Pastel é fundo.</strong> Nenhum texto em verde água, rosa ou amarelo. Texto vai em <code className="font-mono text-small">fg</code> por cima.</span></Rule>
          <Rule><span><strong>Laranja é raro.</strong> Um botão accent ou um chip de pontos por tela. Se aparecer três vezes, deixou de destacar.</span></Rule>
          <Rule><span><strong>Branco sobre laranja não existe</strong> (2,6:1). Sobre laranja, texto escuro.</span></Rule>
        </ul>
        <ul className="space-y-2">
          <Rule><span><strong>Estado é o par forte + suave.</strong> Badge e Alert já fazem; não monte <code className="font-mono text-small">bg-verde-agua text-green-800</code> na mão.</span></Rule>
          <Rule><span><strong>Professor e diretor são quase monocromáticos.</strong> Cor pastel entra lá só em Card de destaque ou gráfico.</span></Rule>
          <Rule><span><strong>Gráfico usa os pares.</strong> Série principal em azul esc., comparação em verde esc., alerta em laranja. Nunca as quatro cores juntas por decoração.</span></Rule>
        </ul>
      </div>
    </Section>
  )
}
