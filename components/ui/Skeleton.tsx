import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export default function Skeleton({ className }: Props) {
  return <div className={cn('animate-pulse rounded-control bg-surface-muted', className)} />
}
