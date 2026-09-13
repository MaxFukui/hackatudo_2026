import type { ReactNode } from 'react'
import { TONE_DOT, TONE_SOFT, type Tone } from './tones'

interface BadgeProps {
  tone?: Tone
  /** Ponto colorido antes do texto: útil para status. */
  dot?: boolean
  /** Entra com um "pop": para o que acabou de acontecer (+10 pontos, Novo). Não para status parado. */
  pop?: boolean
  children: ReactNode
}

// Estado ou categoria em uma palavra. Nunca clicável — para isso use Button ou Tabs.
export function Badge({ tone = 'neutral', dot = false, pop = false, children }: BadgeProps) {
  return (
    <span className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2 text-caption font-medium ${TONE_SOFT[tone]} ${pop ? 'animate-pop' : ''}`}>
      {dot && <span className={`size-1.5 rounded-full ${TONE_DOT[tone]}`} aria-hidden="true" />}
      {children}
    </span>
  )
}
