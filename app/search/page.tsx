'use client'

import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/search/SearchBar'
import GameCard from '@/components/cards/GameCard'
import { useSearch } from '@/hooks/useSearch'
import Container from '@/components/ui/Container'
import type { Game } from '@/types/game'

export default function SearchPage() {
  const params = useSearchParams()
  const query = params.get('q') || ''
  const { games, isLoading, error } = useSearch(query)

  return (
    <Container as="main" className="py-6">
      <div className="mb-8">
        <SearchBar />
      </div>

      {!query ? (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">Search BloxAtlas</h2>
          <p className="mt-2 text-content-muted">Enter a game name to find Roblox games.</p>
        </div>
      ) : isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-card border border-border-default bg-surface p-4">
              <div className="aspect-video rounded-md bg-surface-muted" />
              <div className="mt-3 h-4 w-3/4 rounded bg-surface-muted" />
              <div className="mt-2 h-3 w-1/2 rounded bg-surface-muted" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">Search failed</h2>
          <p className="mt-2 text-content-muted">{error}</p>
        </div>
      ) : games.length > 0 ? (
        <>
          <p className="mb-4 text-content-muted">
            {games.length} result{games.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
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
        </>
      ) : (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">No games found</h2>
          <p className="mt-2 text-content-muted">Try another search keyword.</p>
        </div>
      )}
    </Container>
  )
}
