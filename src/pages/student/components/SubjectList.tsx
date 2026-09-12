import { Card } from '@/components/ui'
import { db } from '@/services/client'

export function SubjectList() {
  return (
    <Card title="Matérias">
      <ul className="divide-y divide-border">
        {db.academicContext.subjects.map((subject) => (
          <li key={subject.id} className="py-2 text-sm">
            {subject.name}
          </li>
        ))}
      </ul>
    </Card>
  )
}
