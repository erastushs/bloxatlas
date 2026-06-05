import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
}

export default function Card({ children, className = '', as: Tag = 'div', hover = false }: CardProps) {
  return (
    <Tag
      className={cn(
        'premium-panel overflow-hidden rounded-card',
        hover ? 'transition duration-300 hover:-translate-y-1 hover:border-brand/70 hover:shadow-[0_24px_80px_rgb(34_211_238/.12)]' : '',
        className
      )}
    >
      {children}
    </Tag>
  )
}
