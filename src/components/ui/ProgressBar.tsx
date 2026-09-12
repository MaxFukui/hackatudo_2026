interface ProgressBarProps {
  value: number
  max?: number
  label?: string
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
    >
      <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
