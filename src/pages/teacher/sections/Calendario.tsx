import { SchoolCalendar } from '@/pages/shared/calendar/SchoolCalendar'
export function Calendario() {
  return (
    <SchoolCalendar
      role="teacher"
      title="Calendário do Professor"
      description="Compromissos da turma, eventos enviados pela direção e lembretes próprios."
      teacherName="Professor 7"
    />
  )
}
