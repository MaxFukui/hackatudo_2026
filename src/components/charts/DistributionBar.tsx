import { PERFORMANCE_COLOR, PERFORMANCE_LABEL, PERFORMANCE_ORDER } from '@/lib/format'
import type { PerformanceLevel } from '@/types'

// Barra empilhada com a quantidade de alunos por nível de desempenho.
export function DistributionBar({ distribution }: { distribution: Record<PerformanceLevel, number> }) {
  const total = PERFORMANCE_ORDER.reduce((sum, level) => sum + distribution[level], 0)

  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-muted">
        {PERFORMANCE_ORDER.map((level) => (
          <div
            key={level}
            className={PERFORMANCE_COLOR[level]}
            style={{ width: total ? `${(distribution[level] / total) * 100}%` : 0 }}
            title={`${PERFORMANCE_LABEL[level]}: ${distribution[level]}`}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
        {PERFORMANCE_ORDER.map((level) => (
          <li key={level} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${PERFORMANCE_COLOR[level]}`} />
            {PERFORMANCE_LABEL[level]} <span className="tabular-nums text-fg-subtle">{distribution[level]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
