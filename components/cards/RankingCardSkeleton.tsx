import Skeleton from '@/components/ui/Skeleton'

export default function RankingCardSkeleton() {
  return (
    <div className="premium-panel grid gap-4 rounded-card p-4 sm:grid-cols-[172px_1fr]">
      <Skeleton className="aspect-video sm:aspect-square" />

      <div className="space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/3" />

        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>
    </div>
  )
}
