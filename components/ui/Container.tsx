import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props<T extends ElementType> = {
  as?: T
  children: ReactNode
  size?: 'md' | 'lg'
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

const sizes = {
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
}

export default function Container<T extends ElementType = 'div'>({ as, children, size = 'lg', className, ...props }: Props<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={cn('mx-auto w-full px-6', sizes[size], className)} {...props}>
      {children}
    </Component>
  )
}
