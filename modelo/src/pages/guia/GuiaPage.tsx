import { Botoes, Cartoes, Feedback, Navegacao, Rotulos } from './sections/Componentes'
import { Formulario } from './sections/Formulario'
import { Fontes } from './sections/Fontes'
import { Cor } from './sections/Cor'
import { Principios } from './sections/Fundamentos'
import { Receitas, Telas } from './sections/Layout'
import { Movimento } from './sections/Movimento'
import { Acessibilidade, Escrita, Espaco, Forma, Icones } from './sections/Sistema'

const INDEX = [
  { group: 'Fundamentos', items: [['principios', 'Princípios'], ['cor', 'Cor'], ['fontes', 'Fontes'], ['espaco', 'Espaço e grade'], ['forma', 'Forma e elevação'], ['movimento', 'Movimento'], ['icones', 'Ícones'], ['escrita', 'Escrita'], ['acessibilidade', 'Acessibilidade'], ['layout', 'Telas: celular e desktop']] },
  { group: 'Componentes', items: [['button', 'Button'], ['badge', 'Badge e Alert'], ['card', 'Card e Stat'], ['field', 'Formulário'], ['tabs', 'Tabs e Table'], ['feedback', 'Progresso e estados'], ['receitas', 'Receitas de card']] },
]

// Guia vivo: cada exemplo é o componente real. Mudou o componente, mudou o guia.
export function GuiaPage() {
  return (
    <div className="mx-auto flex max-w-content gap-12 px-4 py-10 md:px-8">
      <aside className="hidden w-44 shrink-0 lg:block">
        <nav aria-label="Índice" className="sticky top-10 space-y-5 text-small">
          {INDEX.map((g) => (
            <div key={g.group}>
              <p className="mb-1.5 text-caption font-medium text-fg-subtle">{g.group}</p>
              <ul className="space-y-0.5">
                {g.items.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="block rounded-sm py-0.5 text-fg-muted hover:text-fg">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 space-y-8">
        {/* Celular: índice vira um select nativo (o melhor "menu" que existe no toque). */}
        <label className="block lg:hidden">
          <span className="sr-only">Ir para a seção</span>
          <select
            className="h-11 w-full rounded-md border border-border-strong bg-surface px-3 text-body"
            defaultValue=""
            onChange={(e) => {
              document.getElementById(e.target.value)?.scrollIntoView({ block: 'start' })
              e.target.value = ''
            }}
          >
            <option value="" disabled>
              Ir para a seção…
            </option>
            {INDEX.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.items.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <header className="space-y-3">
          <p className="text-caption font-medium text-fg-muted">Educa · modelo</p>
          <h1 className="text-display font-semibold">Guia de estilo</h1>
          <p className="max-w-prose text-body text-fg-muted">
            Base comum das quatro áreas do produto. Tokens em <code className="font-mono text-small text-fg">src/styles/tokens.css</code>, componentes em{' '}
            <code className="font-mono text-small text-fg">src/components/ui</code>, casca em <code className="font-mono text-small text-fg">src/components/layout</code>.
          </p>
        </header>

        <Principios />
        <Cor />
        <Fontes />
        <Espaco />
        <Forma />
        <Movimento />
        <Icones />
        <Escrita />
        <Acessibilidade />
        <Telas />
        <Botoes />
        <Rotulos />
        <Cartoes />
        <Formulario />
        <Navegacao />
        <Feedback />
        <Receitas />

        <footer className="border-t border-border pt-6 text-caption text-fg-subtle">
          Componente novo só entra em <code className="font-mono">ui/</code> quando duas páginas precisam dele — e aí entra aqui também.
        </footer>
      </main>
    </div>
  )
}
