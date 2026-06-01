'use client'

import { useSearchParams } from 'next/navigation'

import GameCard from '@/components/cards/GameCard'
import { useSearch } from '@/hooks/useSearch'

export default function SearchPage() {
  const params = useSearchParams()

  const query = params.get('q') || ''

  const { games } = useSearch(query)

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Search Results</h1>

      <p className="mb-6 text-zinc-400">Query: {query}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game: any) => (
          <GameCard key={game.id} id={game.id} name={game.name} creator={game.creator} playing={game.playing} />
        ))}
      </div>
    </main>
  )
}
