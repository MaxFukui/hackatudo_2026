import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

// hover: só desktop (o Tailwind já ignora em tela de toque). active: é o feedback do dedo.
const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-hover',
  // Laranja: só o CTA da área do aluno ou a ação de recompensa. Um por tela.
  accent: 'bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-hover',
  secondary: 'bg-surface text-fg border border-border-strong hover:bg-surface-muted active:bg-surface-muted',
  ghost: 'text-fg-muted hover:bg-surface-muted hover:text-fg active:bg-surface-muted',
  danger: 'bg-danger text-branco hover:opacity-90 active:opacity-90',
}

// Celular: 44px (Apple) no md. Desktop: 40px. sm nunca vai em tela de toque como ação principal.
const SIZE: Record<ButtonSize, string> = {
  sm: 'h-9 md:h-8 px-3 text-small gap-1.5',
  md: 'h-11 md:h-10 px-4 text-small gap-2',
  lg: 'h-12 md:h-11 px-5 text-body gap-2',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Ícone à esquerda do texto (20px, stroke 1.75). */
  icon?: ReactNode
  loading?: boolean
}

// Um botão primário por área. O resto é secondary ou ghost. Accent é o laranja: raro.
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled,
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap select-none transition-[background-color,color,transform,opacity,box-shadow] duration-fast ease-standard active:scale-97 disabled:pointer-events-none disabled:opacity-50 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...props}
    >
      {loading ? <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent animate-fade-in" /> : icon}
      {children}
    </button>
  )
}
