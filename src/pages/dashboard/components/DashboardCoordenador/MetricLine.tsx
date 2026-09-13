import { ScaledProgress } from './ScaledProgress'

interface MetricLineProps {
  label: string
  value: number
}

export function MetricLine({ label, value }: MetricLineProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3 text-caption text-fg-muted">
        <span>{label}</span>
        <span className="tabular-nums text-fg">{value}%</span>
      </div>
      <ScaledProgress value={value} label={label} />
    </div>
  )
}
