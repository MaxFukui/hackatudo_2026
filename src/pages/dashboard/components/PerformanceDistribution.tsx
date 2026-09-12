import { DistributionBar } from '@/components/charts/DistributionBar'
import { Card } from '@/components/ui'
import type { ClassPerformance } from '@/types'

export function PerformanceDistribution({ performance }: { performance: ClassPerformance }) {
  return (
    <Card title="Distribuição de desempenho">
      <p className="mb-4 text-sm text-stone-600">
        Pontuação média <span className="font-semibold tabular-nums">{performance.averageScore}</span>
      </p>
      <DistributionBar distribution={performance.distribution} />
    </Card>
  )
}
