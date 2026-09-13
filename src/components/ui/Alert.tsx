import type { ReactNode } from 'react'
import { TONE_SOFT, type Tone } from './tones'

interface AlertProps {
  tone?: Extract<Tone, 'neutral' | 'success' | 'warning' | 'danger' | 'info'>
  title?: string
  /** Entra com fade-up: para alerta que aparece em resposta a uma ação, não para o que já estava na página. */
  animate?: boolean
  children: ReactNode
}

// Mensagem no fluxo da página (não é toast). Uma frase, no máximo duas.
export function Alert({ tone = 'neutral', title, animate = false, children }: AlertProps) {
  return (
    <div role={tone === 'danger' ? 'alert' : 'status'} className={`rounded-md px-4 py-3 text-small ${TONE_SOFT[tone]} ${animate ? 'animate-rise' : ''}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? 'mt-0.5 opacity-90' : ''}>{children}</div>
    </div>
  )
}
