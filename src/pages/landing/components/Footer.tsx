import { Logo } from '@/components/brand/Logo'

export function Footer() {
  return (
    <footer className="border-t border-border bg-canvas">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2 px-4 py-6 text-small text-fg-muted md:px-8">
        <div className="flex items-center gap-3">
          <Logo onDark height={24} className="logo-escuro" />
          <Logo height={24} className="logo-sol" />
          <p>Cuide do seu monstrinho, cuide do seu aprendizado.</p>
        </div>
        <p>Hackathon HACKTUDO 2026</p>
      </div>
    </footer>
  )
}
