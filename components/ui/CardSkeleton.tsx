export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-800 p-4 animate-pulse">
      <div className="h-4 bg-zinc-800 rounded w-2/3 mb-4" />
      <div className="h-3 bg-zinc-800 rounded w-full mb-2" />
      <div className="h-3 bg-zinc-800 rounded w-4/5" />
    </div>
  )
}
