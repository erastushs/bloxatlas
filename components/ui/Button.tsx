import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-brand text-[#07111f] shadow-[0_12px_36px_rgb(34_211_238/.25)] hover:bg-brand-strong hover:text-background',
  secondary: 'border-border-default bg-surface/70 text-content backdrop-blur hover:border-brand/70 hover:bg-surface-muted',
  ghost: 'border-transparent bg-transparent text-content-muted hover:bg-surface-muted hover:text-content',
}

export default function Button({ children, variant = 'primary', className, type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-control border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
        'active:scale-[0.98]',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
