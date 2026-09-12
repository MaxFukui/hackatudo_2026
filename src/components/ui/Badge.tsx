import type { ReactNode } from 'react'

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

const TONE: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-indigo-100 text-indigo-800',
}

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${TONE[tone]}`}>{children}</span>
}
