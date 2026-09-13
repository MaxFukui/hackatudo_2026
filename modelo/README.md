# modelo — base de estilo do Gizzi

Kit que todas as áreas (landing, aluno, professor, diretor) usam como ponto de partida.
Não tem feature nenhuma: só tokens, componentes, casca de layout e o guia.

```bash
cd modelo
npm install
npm run dev      # http://localhost:5173/  guia de estilo
npm run build    # tsc + vite
npm run lint     # oxlint
```

## Onde está cada coisa

```
src/
├── styles/
│   ├── tokens.css     ← cor, tipografia, raio, sombra, medidas. O ÚNICO arquivo a editar para trocar a paleta.
│   └── base.css       ← reset mínimo: fonte, foco de teclado, alvo de toque, reduced-motion
├── components/
│   ├── brand/Logo.tsx ← a logo em SVG (full · mark · wordmark), cores em tokens
│   ├── ui/            ← Button, Badge, Alert, Card, Grid, Stat, Tabs, Table, ProgressBar, Avatar,
│   │                     Spinner/Skeleton, EmptyState, Modal, Toast
│   │                     formulário: Field, Input, Textarea, Select, Checkbox, ChoiceGroup, Switch, Stepper,
│   │                     Form, FormSection, FormRow, FormActions, FormErrorSummary
│   └── layout/        ← AppShell (Topbar + Sidebar + conteúdo), PageHeader
├── hooks/useTab.ts    ← seção ativa na URL (?tab=)
└── pages/guia/        ← o guia: cada exemplo é o componente real
```

## Marca

**Gizzi** — um giz laranja que pisca; letras GIZZI nos pastéis da paleta. `<Logo variant="full|mark|wordmark" height>` em `src/components/brand/`, SVG com `var(--color-*)`: a logo e a interface saem da mesma caixa de cor. É uma reconstrução da arte; quando o vetor oficial existir, substitui só `Logo.tsx`. Regras (tamanho mínimo, respiro, fundos) na seção **Marca** do guia.

## Paleta

Onze cores, em `src/styles/tokens.css` com o nome original (`bg-verde-agua`, `bg-laranja`, `bg-escuro`…). Nas páginas, use os **papéis**, não a cor:

| Papel | Cor | Onde |
|---|---|---|
| `primary` | escuro `#4A4B52` | botão principal, link, seleção — calmo, serve qualquer área |
| `primary-soft` | azul claro `#A6CBDE` | aba ativa, item de menu, avatar, chip |
| `accent` | laranja `#ED9458` | pontos, streak, o CTA do aluno. **Uma vez por tela.** Texto escuro por cima (branco não passa no contraste) |
| `success / warning / danger / info` + `-soft` | verde água · amarelo · rosa claro · azul esc. como fundo; tom forte **derivado** da mesma cor para texto | Badge, Alert, validação |
| `canvas / surface / border / fg` | neutros derivados do escuro | página, card, divisórias, texto |
| `<Card tone="verde\|rosa\|azul\|amarelo">` | os pares claro/escuro | cards da área do aluno, um destaque no professor |

Pastel é fundo, nunca letra. Todo par texto/fundo foi medido: ≥ 4,5:1 (tabela na seção **Cor** do guia). Mudou um hex, meça de novo.

## Fontes

Três faces, carregadas do Google Fonts no `index.html` (só os pesos usados):

| Slot | Fonte | Onde | Por quê |
|---|---|---|---|
| `font-sans` | **Atkinson Hyperlegible Next** 400–700 | interface e texto, todas as áreas | desenhada para baixa visão: I/l/1, O/0, b/d/p/q não se confundem. Serve a criança em alfabetização e a professora lendo tabela |
| `font-display` | **Fredoka** 500–700 | só título e número grande na área do aluno e na landing | amigável sem ser infantil demais. Nunca em texto corrido, nunca no professor/diretor |
| `font-mono` | Atkinson Hyperlegible Mono | código, identificadores | mesma família, não destoa |

Texto que a criança lê usa `text-reading` (17px, linha 1.65) em `max-w-reading` (60 caracteres). Nunca abaixo de 16px, sem itálico, sem caixa alta, sem justificado. Detalhes e a prova de legibilidade estão na seção **Fontes** do guia.

## Celular e desktop

Mobile primeiro. Alguns componentes mudam de forma, não só de tamanho:

| | celular (< 768px) | desktop |
|---|---|---|
| Navegação | barra fixa no rodapé, ícone + rótulo (máx. 5) | sidebar à esquerda |
| PageHeader | ações em largura total, primário por último | ações ao lado do título |
| Card | padding 16px | padding 20px |
| Stat | `Grid stats` em 2×2 | fileira de 4 |
| Table | cada linha vira um bloco rótulo/valor (`primary`, `hideOnMobile`) | tabela |
| Modal | folha que sobe do rodapé, botões empilhados | centralizado, 448px |
| display / h1 / numeral | um degrau menor | tamanho cheio |

| Toast | acima da barra inferior | canto inferior direito |

O que os componentes já garantem no toque (a página só não pode desfazer): alvo de 44px · input com 16px (iOS não dá zoom) · feedback por `active:`, não hover · sem espera de 300ms · safe areas do iPhone (topbar, barra inferior, toast, rodapé do modal) · trocar de seção volta ao topo · linha tocável tem chevron · a página nunca rola de lado.

Grids têm nome — use `<Grid layout="stats | two | three | main-aside | aside-main">` e nada de `grid-cols-*` solto na página.
Teste em 390, 768 e 1280px **e num celular de verdade**. A seção **Telas** do guia tem o checklist de 8 itens antes de dizer que terminou; **Receitas de card** mostra os seis cards do produto.

## Movimento

Sistema, não enfeite. Tokens em `tokens.css`: `duration-fast/base/enter/exit/slow` (120–320ms) e `ease-standard/enter/exit/spring`. Animações prontas: `animate-rise`, `fade-in/out`, `scale-in/out`, `sheet-up/down`, `pop`, `shimmer`.

O que já se move sozinho: botão comprime 3% no toque · card tocável eleva no hover e comprime no toque · input ganha anel no foco · sublinhado das Tabs desliza · barra de progresso enche do zero · skeleton tem brilho que atravessa · modal sobe como folha (celular) ou cresce do centro (desktop) e **sai pelo caminho inverso, mais rápido** · toast sobe e some · seção nova faz fade-up · `<Grid stagger>` entra um filho por vez · `<Badge pop>` para o que acabou de acontecer.

Regras: só `opacity` e `transform`; saída mais curta que entrada; entrada uma vez (lista que atualiza não reanima); nada em loop além de shimmer e spinner; `prefers-reduced-motion` zera tudo no `base.css`.

## Formulário

Cada campo já faz o trabalho chato: `type="email|tel|number|password|search"` abre o teclado certo no celular (inputMode, autoCapitalize, autoComplete); senha tem mostrar/ocultar; `maxLength` mostra contador; `optional` marca "(opcional)" (o padrão é obrigatório, sem asterisco); `hint` diz o formato antes do erro; `error` substitui a dica, com ícone e `role="alert"`.

Controles: `Input` `Textarea` `Select` (nativo, seta padronizada) `Checkbox` · `ChoiceGroup` (2–5 opções em blocos grandes — é assim que se pergunta para a criança) · `Switch` (vale na hora) · `Stepper` (número num intervalo: nota, minutos).
Estrutura: `Form` (noValidate) → `FormSection` (a partir de 5 campos) → `FormRow` (dois curtos lado a lado no desktop) → `FormActions` (depois do último campo, nunca fixo) + `FormErrorSummary` (no submit: resumo com link para cada campo).

Validar no blur, não a cada tecla; depois de corrigido, o erro some na hora. No submit: resumo no topo + foco no primeiro erro. Botão com `loading` para não enviar duas vezes. Exemplo completo funcionando na seção **Formulário** do guia.

## Verificação

Antes de dizer que terminou, o que já foi checado nesta base e vale repetir em cada tela:

- `npm run build` e `npm run lint` limpos.
- axe-core (WCAG 2.1 AA + best-practice): zero violações no guia, desktop e iPhone.
- Contraste medido em todo par texto/fundo dos tokens (≥ 4,5:1).
- Teclado: Tab preso dentro do modal e foco devolvido a quem abriu; setas nas Tabs; Enter/Espaço em card e linha clicáveis.
- HTML válido: nenhum `<button>` com bloco dentro (card e linha clicáveis usam `usePressable`).
- Celular: nenhum alvo abaixo de 44px, input a 16px, sem rolagem lateral, `scrollY` volta a 0 ao trocar seção.

## Regras curtas

1. **Só token.** `bg-primary`, `text-fg-muted`, `rounded-lg`, `text-small`. Nunca `bg-indigo-600`, `text-[13px]`, `p-[18px]`.
2. **Um primário por área.** Um botão primário, um número grande, um título.
3. **Borda antes de sombra.** Card tem borda. Sombra só em modal e popover.
4. **Nada em branco.** Carregando → `Skeleton`. Vazio → `EmptyState`. Erro → `Alert danger` dizendo o que fazer.
5. **Label visível, alvo de 40px, tudo no teclado.** Os componentes já fazem; a página mantém.
6. **Componente novo só sobe para `ui/` quando duas páginas precisam.** E aí entra no guia.

O resto está no guia, com exemplo ao lado de cada regra.

## Para começar uma tela

Cada área monta a própria página com a casca e os componentes daqui:

```
AppShell (Topbar + Sidebar; no celular a Sidebar vira barra no rodapé)
└── PageHeader          ← o único h1
    └── Grid + Card …   ← o conteúdo da área
```

Seções da área viram `?tab=` com `useTab` — sem rota aninhada, sem mexer em arquivo compartilhado. `Sidebar` precisa de `icon` em cada item para a barra inferior do celular.

## Para levar ao app principal

Copiar `src/styles/`, `src/components/`, `src/hooks/useTab.ts` e o `index.css`. Manter `src/pages/guia` numa rota interna (`/estilo`) ajuda durante o hackathon.
