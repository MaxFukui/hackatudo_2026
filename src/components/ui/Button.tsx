import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANT: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-strong',
  secondary: 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-100',
  ghost: 'text-stone-600 hover:bg-stone-100',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${VARIANT[variant]} ${className}`}
      {...props}
    />
  )
}
