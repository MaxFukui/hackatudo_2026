import { ProgressBar, type ProgressTone } from '@/components/ui'

interface MetricLineProps {
  label: string
  value: number
  tone?: ProgressTone
}

export function MetricLine({ label, value, tone = 'primary' }: MetricLineProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3 text-caption text-fg-muted">
        <span>{label}</span>
        <span className="tabular-nums text-fg">{value}%</span>
      </div>
      <ProgressBar value={value} label={label} tone={tone} />
    </div>
  )
}
