'use client'

import { useSearchParams } from 'next/navigation'

import GameCard from '@/components/cards/GameCard'
import { useSearch } from '@/hooks/useSearch'
import Container from '@/components/ui/Container'
import type { Game } from '@/types/game'

export default function SearchPage() {
  const params = useSearchParams()

  const query = params.get('q') || ''

  const { games } = useSearch(query)

  return (
    <Container as="main" className="py-6">
      <h1 className="type-section-title mb-6">Search Results</h1>

      <p className="mb-6 text-content-muted">Query: {query}</p>

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
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">No games found</h2>

          <p className="mt-2 text-content-muted">Try another search keyword.</p>
        </div>
      )}
    </Container>
  )
}
