interface ScoreDonutProps {
  value: number
  max?: number
  size?: number
  label?: string
}

export function ScoreDonut({ value, max = 100, size = 96, label }: ScoreDonutProps) {
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(1, value / max))

  return (
    <figure className="inline-flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label ?? 'Pontuação'}: ${value}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" className="stroke-surface-muted" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-primary"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="fill-fg text-lg font-semibold">
          {value}
        </text>
      </svg>
      {label && <figcaption className="text-xs text-fg-muted">{label}</figcaption>}
    </figure>
  )
}
