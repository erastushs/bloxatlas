export function CardSkeleton() {
  return (
    <div className="rounded-card border border-border-default bg-surface p-4 animate-pulse">
      <div className="h-4 bg-surface-muted rounded w-2/3 mb-4" />
      <div className="h-3 bg-surface-muted rounded w-full mb-2" />
      <div className="h-3 bg-surface-muted rounded w-4/5" />
    </div>
  )
}