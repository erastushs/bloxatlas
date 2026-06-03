'use client'

import TrendingCard from '@/components/cards/TrendingCard'
import { useTrending } from '@/hooks/useTrending'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Skeleton from '@/components/ui/Skeleton'

export default function TrendingPage() {
  const { games, isLoading, error } = useTrending()

  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Snapshot Momentum"
        title="Trending Games"
        description="Games gaining the most player momentum across recent collected snapshots."
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="grid gap-4 rounded-card border border-border-default bg-surface shadow-card p-4 sm:grid-cols-[160px_1fr]">
              <Skeleton className="aspect-video sm:aspect-square" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Skeleton className="h-12" />
                  <Skeleton className="h-12" />
                  <Skeleton className="h-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-card border border-danger-border bg-danger-surface shadow-card p-6 text-sm text-danger">{error}</div>
      ) : null}

      {!isLoading && !error && games.length === 0 ? (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">No trending games yet</h2>
          <p className="mt-2 text-content-muted">Collect at least two snapshots per game to calculate momentum.</p>
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="space-y-4">
          {games.map((game) => (
            <TrendingCard key={game.id} game={game} />
          ))}
        </div>
      ) : null}
    </Container>
  )
}
