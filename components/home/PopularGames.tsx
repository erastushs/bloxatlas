'use client'

import GameCard from '@/components/cards/GameCard'
import { usePopularGames } from '@/hooks/usePopularGames'
import type { Game } from '@/types/game'

export default function PopularGames() {
  const { games } = usePopularGames()

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-3xl font-bold">Popular Games</h2>

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
    </section>
  )
}
