import type { PerformanceLevel } from '@/types'

export const PERFORMANCE_LABEL: Record<PerformanceLevel, string> = {
  critical: 'Crítico',
  attention: 'Atenção',
  regular: 'Regular',
  good: 'Bom',
  excellent: 'Excelente',
}

export const PERFORMANCE_ORDER: PerformanceLevel[] = ['critical', 'attention', 'regular', 'good', 'excellent']

// Classes Tailwind por nível — mantém a mesma cor em badges e gráficos.
export const PERFORMANCE_COLOR: Record<PerformanceLevel, string> = {
  critical: 'bg-danger',
  attention: 'bg-warning',
  regular: 'bg-ink-300',
  good: 'bg-success',
  excellent: 'bg-info',
}

export function formatPercent(value: number): string {
  return `${value}%`
}

export function formatGrade(value: number): string {
  return value.toFixed(1).replace('.', ',')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}
