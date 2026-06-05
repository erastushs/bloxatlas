import type { ElementType, ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
}

export default function Card({ children, className = '', as: Tag = 'div', hover = false }: CardProps) {
  return (
    <Tag
      className={`
        rounded-card
        border
        border-border-default
        bg-surface
        shadow-card
        overflow-hidden
        ${hover ? 'transition hover:border-brand' : ''}
        ${className}
      `}
    >
      {children}
    </Tag>
  )
}