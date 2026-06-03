'use client'

import GameCard from '@/components/cards/GameCard'
import { useRecentlyUpdated } from '@/hooks/useRecentlyUpdated'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Skeleton from '@/components/ui/Skeleton'

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function RecentlyUpdatedPage() {
  const { games, isLoading, error } = useRecentlyUpdated()

  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Collector Freshness"
        title="Recently Updated Games"
        description="Games most recently refreshed by the BloxAtlas collection pipeline."
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-card border border-border-default bg-surface shadow-card">
              <Skeleton className="aspect-video rounded-none" />
              <div className="space-y-3 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
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
          <h2 className="type-card-title">No recently updated games yet</h2>
          <p className="mt-2 text-content-muted">Games will appear here after the collector writes sync timestamps.</p>
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div key={game.id} className="relative">
              <Badge className="absolute left-3 top-3 z-10">#{game.rank}</Badge>

              <Badge variant="neutral" className="absolute right-3 top-3 z-10 max-w-[70%] text-xs font-medium">
                {formatUpdatedAt(game.lastSyncedAt)}
              </Badge>

              <GameCard
                id={game.id}
                name={game.name}
                creator={game.creator}
                playing={game.playing}
                visits={game.visits}
                thumbnail={game.thumbnail}
              />
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  )
}
