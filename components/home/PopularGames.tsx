'use client'

import GameCard from '@/components/cards/GameCard'
import { usePopularGames } from '@/hooks/usePopularGames'

export default function PopularGames() {
  const { games, isLoading, error } = usePopularGames()

  return (
    <section className="mt-20">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Live Ranking</p>
          <h2 className="mt-1 text-3xl font-bold">Popular Games</h2>
        </div>

        <p className="text-sm text-content-muted">Ranked by active players, with visits as tie-breaker.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
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
        <div className="rounded-card border border-border-default bg-surface shadow-card p-6 text-sm text-content-muted">
          No popular games have been indexed yet.
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div key={game.id} className="relative">
              <div className="absolute left-3 top-3 z-10 rounded-control border border-border-strong bg-background-elevated/90 px-2 py-1 text-sm font-semibold text-brand">
                #{game.rank}
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
    </section>
  )
}
