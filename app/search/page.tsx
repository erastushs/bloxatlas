'use client'

import { useSearchParams } from 'next/navigation'

import GameCard from '@/components/cards/GameCard'
import { useSearch } from '@/hooks/useSearch'
import type { Game } from '@/types/game'

export default function SearchPage() {
  const params = useSearchParams()

  const query = params.get('q') || ''

  const { games } = useSearch(query)

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Search Results</h1>

      <p className="mb-6 text-zinc-400">Query: {query}</p>

      {games.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game: Game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              creator={game.creator}
              playing={game.playing}
              thumbnail={game.thumbnail}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <h2 className="text-xl font-semibold">No games found</h2>

          <p className="mt-2 text-zinc-400">Try another search keyword.</p>
        </div>
      )}
    </main>
  )
}
