import { progressColorFor } from './progressScale'

export function ScaledProgress({ value, label, showValue = false }: { value: number; label: string; showValue?: boolean }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="space-y-2">
      {showValue && (
        <div className="flex justify-between gap-3 text-small font-medium text-fg" data-numeric>
          <span>{label}</span>
          <span>{value} / 100</span>
        </div>
      )}
      <div
        className="h-2.5 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div className="h-full rounded-full transition-[width,background-color] duration-slow ease-enter" style={{ width: `${pct}%`, backgroundColor: progressColorFor(value) }} />
      </div>
    </div>
  )
}
