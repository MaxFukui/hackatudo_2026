import { Card } from '@/components/ui'

interface KpiCardProps {
  label: string
  value: string
  hint?: string
}

export function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-fg-muted">{hint}</p>}
    </Card>
  )
}
