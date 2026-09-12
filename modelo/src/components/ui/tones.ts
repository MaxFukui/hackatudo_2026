export type Tone = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

// Fundo suave + texto: base de Badge e Alert. Um mapa só, para as duas coisas ficarem iguais.
export const TONE_SOFT: Record<Tone, string> = {
  neutral: 'bg-surface-muted text-fg-muted',
  primary: 'bg-primary-soft text-primary-soft-fg',
  accent: 'bg-accent-soft text-accent-soft-fg',
  success: 'bg-success-soft text-success-soft-fg',
  warning: 'bg-warning-soft text-warning-soft-fg',
  danger: 'bg-danger-soft text-danger-soft-fg',
  info: 'bg-info-soft text-info-soft-fg',
}

export const TONE_DOT: Record<Tone, string> = {
  neutral: 'bg-fg-subtle',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
}
