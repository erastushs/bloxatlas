'use client'

import { useEffect, useState } from 'react'
import GameCard from '@/components/cards/GameCard'
import Skeleton from '@/components/ui/Skeleton'
import type { Game } from '@/types/game'

type Props = {
  gameId: number
}

export default function RelatedGames({ gameId }: Props) {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/game/${gameId}/related`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setGames(data.games ?? []))
      .catch(() => {})
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [gameId])

  if (isLoading) {
    return (
      <section className="mt-12">
        <h2 className="mb-4 type-section-title">Related Games</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-card" />
          ))}
        </div>
      </section>
    )
  }

  if (games.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="mb-4 type-section-title">Related Games</h2>
      <p className="mb-4 text-sm text-content-muted">Games with similar player activity patterns.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            creator={game.creator}
            playing={game.playing}
            visits={game.visits}
            thumbnail={game.thumbnail}
          />
        ))}
      </div>
    </section>
  )
}