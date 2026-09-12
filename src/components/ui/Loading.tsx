// Spinner para ações curtas (botão, envio). Skeleton para conteúdo que vai aparecer no lugar.
export function Spinner({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div role="status" className="inline-flex items-center gap-2 text-small text-fg-muted">
      <span className="size-4 animate-spin rounded-full border-2 border-border-strong border-t-fg" />
      {label}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-shimmer rounded-md bg-[linear-gradient(90deg,var(--color-surface-muted)_25%,var(--color-border)_50%,var(--color-surface-muted)_75%)] bg-[length:200%_100%] ${className}`}
    />
  )
}

// Esqueleto de um card típico: título + três linhas.
export function CardSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Carregando" className="space-y-3 rounded-lg border border-border bg-surface p-5">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}
