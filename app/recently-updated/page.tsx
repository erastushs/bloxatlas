'use client'

import GameCard from '@/components/cards/GameCard'
import { useRecentlyUpdated } from '@/hooks/useRecentlyUpdated'

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function RecentlyUpdatedPage() {
  const { games, isLoading, error } = useRecentlyUpdated()

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Collector Freshness</p>
        <h1 className="mt-2 text-4xl font-bold">Recently Updated Games</h1>
        <p className="mt-3 max-w-2xl text-content-muted">
          Games most recently refreshed by the BloxAtlas collection pipeline.
        </p>
      </section>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-card border border-border-default bg-surface shadow-card">
              <div className="aspect-video animate-pulse bg-surface-muted" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded-control bg-surface-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded-control bg-surface-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded-control bg-surface-muted" />
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
          <h2 className="text-xl font-semibold">No recently updated games yet</h2>
          <p className="mt-2 text-content-muted">Games will appear here after the collector writes sync timestamps.</p>
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div key={game.id} className="relative">
              <div className="absolute left-3 top-3 z-10 rounded-control border border-border-strong bg-background-elevated/90 px-2 py-1 text-sm font-semibold text-brand">
                #{game.rank}
              </div>

              <div className="absolute right-3 top-3 z-10 max-w-[70%] rounded-control border border-border-strong bg-background-elevated/90 px-2 py-1 text-xs font-medium text-content-muted">
                {formatUpdatedAt(game.lastSyncedAt)}
              </div>

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
    </main>
  )
}
