import type { ClassStatus } from './coordinatorData'

const STATUS_CLASS: Record<ClassStatus, string> = {
  priority: 'director-status-pill-priority',
  watch: 'director-status-pill-watch',
  steady: 'director-status-pill-steady',
}

export function StatusPill({ status, children }: { status: ClassStatus; children: string | number }) {
  return (
    <span className={`director-status-pill ${STATUS_CLASS[status]}`}>
      <span className="director-status-dot" aria-hidden="true" />
      {children}
    </span>
  )
}
