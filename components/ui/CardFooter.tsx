interface CardFooterProps {
  children: React.ReactNode
}

export function CardFooter({ children }: CardFooterProps) {
  return <div className="mt-4 pt-4 border-t border-border-default">{children}</div>
}
