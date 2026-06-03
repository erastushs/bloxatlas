import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <Container as="main" size="md" className="py-6">
      <Skeleton className="mb-8 aspect-[3/1] w-full rounded-card" />

      <div className="mb-10 space-y-3">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-1/4" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-24 rounded-card" />
        <Skeleton className="h-24 rounded-card" />
        <Skeleton className="h-24 rounded-card" />
      </div>

      <div className="mt-8">
        <Skeleton className="mb-4 h-6 w-48" />
        <Skeleton className="h-64 rounded-card" />
      </div>

      <div className="mt-10 space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Container>
  )
}
