'use client'

import TrendingCard from '@/components/cards/TrendingCard'
import { useTrending } from '@/hooks/useTrending'

export default function TrendingPage() {
  const { games, isLoading, error } = useTrending()

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">Snapshot Momentum</p>
        <h1 className="mt-2 text-4xl font-bold">Trending Games</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Games gaining the most player momentum across recent collected snapshots.
        </p>
      </section>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:grid-cols-[160px_1fr]">
              <div className="aspect-video animate-pulse rounded-lg bg-zinc-800 sm:aspect-square" />
              <div className="space-y-4">
                <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-800" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-800" />
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="h-12 animate-pulse rounded bg-zinc-800" />
                  <div className="h-12 animate-pulse rounded bg-zinc-800" />
                  <div className="h-12 animate-pulse rounded bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-xl border border-red-950 bg-red-950/20 p-6 text-sm text-red-200">{error}</div>
      ) : null}

      {!isLoading && !error && games.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <h2 className="text-xl font-semibold">No trending games yet</h2>
          <p className="mt-2 text-zinc-400">Collect at least two snapshots per game to calculate momentum.</p>
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="space-y-4">
          {games.map((game) => (
            <TrendingCard key={game.id} game={game} />
          ))}
        </div>
      ) : null}
    </main>
  )
}
