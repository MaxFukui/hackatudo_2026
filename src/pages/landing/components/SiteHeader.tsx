import { Pet } from './Pet'

const LINKS = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#tv-da-sala', label: 'TV da sala' },
  { href: '#perguntas', label: 'Perguntas' },
]

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
      <a href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
        <Pet stage={3} size={36} />
        Educa
      </a>
      <nav aria-label="Principal" className="flex items-center gap-1 text-sm font-semibold">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hidden rounded-full px-3 py-2 text-ink/80 hover:bg-accent/30 md:inline">
            {link.label}
          </a>
        ))}
        <a href="#entrar" className="rounded-full bg-ink px-4 py-2 text-surface hover:bg-ink/90">
          Entrar
        </a>
      </nav>
    </header>
  )
}
