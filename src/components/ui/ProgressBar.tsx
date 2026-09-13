import { useEffect, useState } from 'react'

export type ProgressTone = 'primary' | 'accent' | 'success' | 'warning' | 'danger'

const FILL: Record<ProgressTone, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

interface ProgressBarProps {
  value: number
  max?: number
  label: string
  tone?: ProgressTone
  /** Mostra "value / max" à direita do label. */
  showValue?: boolean
}

// A barra nasce vazia e enche: o olho lê "quanto" pelo movimento, não só pelo tamanho final.
export function ProgressBar({ value, max = 100, label, tone = 'primary', showValue = false }: ProgressBarProps) {
  const target = Math.max(0, Math.min(100, (value / max) * 100))
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const id = requestAnimationFrame(() => setPct(target))
    return () => cancelAnimationFrame(id)
  }, [target])
  return (
    <div className="space-y-1.5">
      {showValue && (
        <div className="flex justify-between text-caption text-fg-muted" data-numeric>
          <span>{label}</span>
          <span>
            {value} / {max}
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-muted"
      >
        <div className={`h-full rounded-full transition-[width] duration-slow ease-enter ${FILL[tone]}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
