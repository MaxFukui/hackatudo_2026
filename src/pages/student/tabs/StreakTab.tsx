import { PageHeader } from '@/components/layout/PageHeader'
import type { Student } from '@/types'
import { PetCreature } from '../components/PetCreature'
import { StreakCard } from '../components/StreakCard'

export function StreakTab({ student }: { student: Student }) {
  return (
    <>
      <PageHeader title="Streak" subtitle="Presença, participação e provas acima da média fortalecem seu bichinho." />
      <div className="grid gap-4 lg:grid-cols-2">
        <PetCreature level={student.streak.level} />
        <StreakCard streak={student.streak} />
      </div>
    </>
  )
}
