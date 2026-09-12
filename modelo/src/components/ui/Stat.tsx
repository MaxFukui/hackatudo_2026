import type { ReactNode } from 'react'

interface StatProps {
  label: string
  value: ReactNode
  /** Variação ou contexto: "+3 vs. semana passada", "de 28 alunos". */
  detail?: string
  trend?: 'up' | 'down' | 'flat'
}

const TREND: Record<NonNullable<StatProps['trend']>, string> = {
  up: 'text-success',
  down: 'text-danger',
  flat: 'text-fg-muted',
}

// Métrica: rótulo pequeno, número grande, contexto. Em <Grid layout="stats">: 2×2 no celular, fileira no desktop.
export function Stat({ label, value, detail, trend = 'flat' }: StatProps) {
  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface px-4 py-3 md:px-5 md:py-4">
      <p className="truncate text-caption font-medium text-fg-muted">{label}</p>
      <p data-numeric className="mt-1 truncate text-numeral font-semibold text-fg">
        {value}
      </p>
      {detail && <p className={`mt-1 truncate text-caption ${TREND[trend]}`}>{detail}</p>}
    </div>
  )
}
