import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'brand' | 'neutral' | 'positive' | 'danger'

type Props = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  brand: 'border-brand/30 bg-brand/10 text-brand',
  neutral: 'border-border-strong bg-background-elevated/80 text-content-muted',
  positive: 'border-positive/30 bg-positive/10 text-positive',
  danger: 'border-danger-border bg-danger-surface text-danger',
}

export default function Badge({ children, variant = 'brand', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-control border px-2.5 py-1.5 text-xs font-semibold leading-none shadow-[inset_0_1px_0_rgb(255_255_255/.08)] backdrop-blur',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
