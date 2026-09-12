import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANT: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100',
  ghost: 'text-slate-600 hover:bg-slate-100',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${VARIANT[variant]} ${className}`}
      {...props}
    />
  )
}
