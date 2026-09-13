import { useEffect, useState } from 'react'
import { Logo } from '@/components/brand/Logo'

const LINKS = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#tv-da-sala', label: 'TV da sala' },
  { href: '#perguntas', label: 'Perguntas' },
]

// Transparente sobre o vídeo do topo; ganha fundo quando a página rola.
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-base ease-standard ${
        scrolled ? 'border-b border-border bg-canvas/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 md:px-8">
        <a href="/" aria-label="gizzi, página inicial" className="flex items-center">
          <Logo onDark height={30} />
        </a>
        <nav aria-label="Principal" className="flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden h-10 items-center rounded-full px-4 text-small font-medium text-fg-muted no-underline hover:text-fg md:inline-flex"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#entrar"
            className="button inline-flex h-11 items-center rounded-full bg-primary px-5 text-small font-semibold text-primary-fg no-underline hover:bg-primary-hover md:h-10"
          >
            Entrar
          </a>
        </nav>
      </div>
    </header>
  )
}
