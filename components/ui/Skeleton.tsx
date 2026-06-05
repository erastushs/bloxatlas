type Props = {
  className?: string
}

export default function Skeleton({ className = '' }: Props) {
  return (
    <div
      className={`
        animate-pulse
        animate-shimmer
        rounded-md
        bg-surface-muted
        ${className}
      `}
    />
  )
}
