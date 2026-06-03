import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'brand' | 'neutral' | 'positive' | 'danger'

type Props = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  brand: 'border-border-strong bg-background-elevated/90 text-brand',
  neutral: 'border-border-strong bg-background-elevated/90 text-content-muted',
  positive: 'border-border-strong bg-background-elevated/90 text-positive',
  danger: 'border-danger-border bg-danger-surface text-danger',
}

export default function Badge({ children, variant = 'brand', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-control border px-2 py-1 text-sm font-semibold leading-none',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
