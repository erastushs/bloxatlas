interface CardContentProps {
  children: React.ReactNode
}

export function CardContent({ children }: CardContentProps) {
  return <div>{children}</div>
}
