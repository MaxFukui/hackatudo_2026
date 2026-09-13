import { SchoolCalendar } from '@/pages/shared/calendar/SchoolCalendar'
import { COORDINATOR_TEACHERS } from './coordinatorData'

export function CoordinatorCalendar() {
  return (
    <SchoolCalendar
      role="coordinator"
      title="Calendário"
      description="Agenda da direção para reuniões, retomadas, combinados pedagógicos e acompanhamento das turmas."
      teacherOptions={COORDINATOR_TEACHERS.map((teacher) => ({ id: teacher.id, name: teacher.name }))}
      allowDelete
    />
  )
}
