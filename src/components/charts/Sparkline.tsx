interface SparklineProps {
  values: number[]
  width?: number
  height?: number
}

export function Sparkline({ values, width = 120, height = 32 }: SparklineProps) {
  if (values.length < 2) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pad = 3
  const x = (i: number) => pad + (i / (values.length - 1)) * (width - pad * 2)
  const y = (v: number) => height - pad - ((v - min) / range) * (height - pad * 2)
  const points = values.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const last = values.length - 1

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline points={points} fill="none" stroke="var(--color-primary)" strokeWidth={2} strokeLinejoin="round" />
      <circle cx={x(last)} cy={y(values[last])} r={3} fill="var(--color-primary)" />
    </svg>
  )
}
