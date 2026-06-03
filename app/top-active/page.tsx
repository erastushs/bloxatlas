'use client'

import GameCard from '@/components/cards/GameCard'
import { useTopActive } from '@/hooks/useTopActive'

export default function TopActivePage() {
  const { games, isLoading, error } = useTopActive()

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">Live Activity</p>
        <h1 className="mt-2 text-4xl font-bold">Top Active Games</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Roblox games with the highest current active player counts in the BloxAtlas index.
        </p>
      </section>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              <div className="aspect-video animate-pulse bg-zinc-800" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800" />
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
          <h2 className="text-xl font-semibold">No active games yet</h2>
          <p className="mt-2 text-zinc-400">Indexed games will appear here after player counts are collected.</p>
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div key={game.id} className="relative">
              <div className="absolute left-3 top-3 z-10 rounded-md border border-zinc-700 bg-zinc-950/90 px-2 py-1 text-sm font-semibold text-cyan-300">
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
    </main>
  )
}
