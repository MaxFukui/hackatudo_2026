import { Logo } from '@/components/brand/Logo'
import { Rule, Section, Spec } from './shared'

const LETRAS = [
  ['G', 'azul-esc', '#88AEC2'],
  ['I', 'verde-esc', '#C3DAB9'],
  ['Z', 'rosa-esc', '#E0B6CB'],
  ['Z', 'azul-claro', '#A6CBDE'],
  ['I', 'rosa-claro', '#F4D4E4'],
]

export function Marca() {
  return (
    <Section
      id="marca"
      title="Marca"
      lead="Gizzi: um giz que pisca. O giz é laranja (o accent do sistema); as letras são os pastéis da paleta, uma por letra. Tudo que a marca usa já é token — a interface e a logo saem da mesma caixa de cor."
    >
      <Spec label='<Logo variant="full | mark | wordmark" height>' note="SVG com as cores em var(--color-*): muda a paleta, muda a logo. Reconstruída da arte oficial; o vetor original substitui só o arquivo Logo.tsx.">
        <div className="flex flex-wrap items-end gap-10">
          <Logo height={64} />
          <Logo variant="mark" height={64} />
          <Logo variant="wordmark" height={64} />
        </div>
      </Spec>

      <Spec label="onde cada versão entra" note="full: landing, tela de login, rodapé. mark: favicon, topbar no celular, avatar do sistema, carregando. wordmark: topbar no desktop, documento impresso.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex h-24 items-center justify-center rounded-lg border border-border bg-surface">
            <Logo height={40} />
          </div>
          <div className="flex h-24 items-center justify-center gap-3 rounded-lg border border-border bg-surface">
            <Logo variant="mark" height={28} />
            <span className="text-caption text-fg-muted">topbar · celular</span>
          </div>
          <div className="flex h-24 items-center justify-center rounded-lg border border-border bg-surface">
            <Logo variant="wordmark" height={28} />
          </div>
        </div>
      </Spec>

      <Spec label="fundos" note="branco e canvas sempre. Sobre pastel só o mark, e só onde o giz laranja não briga com a cor (verde água, amarelo claro). Nunca sobre laranja, nunca sobre escuro.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="flex h-20 items-center justify-center rounded-lg border border-border bg-surface"><Logo variant="mark" height={44} /></div>
          <div className="flex h-20 items-center justify-center rounded-lg bg-verde-agua"><Logo variant="mark" height={44} /></div>
          <div className="flex h-20 items-center justify-center rounded-lg bg-amarelo-claro"><Logo variant="mark" height={44} /></div>
          <div className="relative flex h-20 items-center justify-center rounded-lg bg-escuro opacity-60">
            <Logo variant="mark" height={44} />
            <span className="absolute right-2 bottom-1 text-caption text-branco">não</span>
          </div>
        </div>
      </Spec>

      <Spec label="letras → tokens" note="a mesma ordem da arte. Se precisar de uma sequência de cores (categorias, séries de gráfico), use esta — é a ordem que a pessoa já viu na logo.">
        <ul className="flex flex-wrap gap-3">
          {LETRAS.map(([l, token, hex]) => (
            <li key={token} className="flex items-center gap-2 rounded-md border border-border bg-surface py-1.5 pr-3 pl-1.5 text-small">
              <span className="flex size-8 items-center justify-center rounded-sm font-display text-h2 font-semibold text-fg" style={{ background: hex }}>
                {l}
              </span>
              <span className="font-mono text-caption text-fg-muted">{token}</span>
            </li>
          ))}
        </ul>
      </Spec>

      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2">
          <Rule><span><strong>Tamanho mínimo:</strong> full 24px de altura, mark 16px. Abaixo disso o rosto some — use o wordmark.</span></Rule>
          <Rule><span><strong>Respiro:</strong> ao redor da logo, um espaço igual à altura do "I". Nada encosta.</span></Rule>
          <Rule><span><strong>Não recolorir, não girar, não esticar.</strong> O giz já está inclinado; é o único ângulo.</span></Rule>
        </ul>
        <ul className="space-y-2">
          <Rule><span><strong>O nome se escreve Gizzi</strong> em texto corrido (só a primeira maiúscula). GIZZI é só na logo.</span></Rule>
          <Rule><span><strong>O giz é o accent.</strong> Laranja na interface = mesma cor do mascote: pontos, streak, recompensa. Por isso é raro.</span></Rule>
          <Rule><span><strong>Fredoka é a fonte da logo</strong> e por isso é o display da área do aluno — e de mais nada.</span></Rule>
        </ul>
      </div>
    </Section>
  )
}
