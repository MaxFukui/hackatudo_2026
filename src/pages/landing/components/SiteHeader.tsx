import { Pet } from './Pet'

const LINKS = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#tv-da-sala', label: 'TV da sala' },
  { href: '#perguntas', label: 'Perguntas' },
]

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-topbar max-w-content items-center justify-between gap-4 px-4 md:px-8">
        <a href="/" className="flex items-center gap-2 font-display text-h2 font-semibold text-fg no-underline">
          <Pet stage={3} size={32} />
          gizzi
        </a>
        <nav aria-label="Principal" className="flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden h-10 items-center rounded-md px-3 text-small font-medium text-fg-muted no-underline hover:bg-surface-muted hover:text-fg md:inline-flex"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#entrar"
            className="button inline-flex h-11 items-center rounded-md border border-border-strong bg-surface px-4 text-small font-medium text-fg no-underline hover:bg-surface-muted active:bg-surface-muted md:h-10"
          >
            Entrar
          </a>
        </nav>
      </div>
    </header>
  )
}
