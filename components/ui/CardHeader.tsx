interface CardHeaderProps {
  children: React.ReactNode
}

export function CardHeader({ children }: CardHeaderProps) {
  return <div className="mb-3">{children}</div>
}
