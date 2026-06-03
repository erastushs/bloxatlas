type CardProps = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`
        rounded-card
        border
        border-border-default
        bg-surface
        shadow-card
        ${className}
      `}
    >
      {children}
    </div>
  )
}
