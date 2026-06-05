'use client'

import { motion } from 'framer-motion'
import GameCard from '@/components/cards/GameCard'
import { usePopularGames } from '@/hooks/usePopularGames'
import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'

export default function PopularGames() {
  const { games, isLoading, error } = usePopularGames()

  return (
    <section className="mt-24">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="type-label text-brand">Live Ranking</p>
          <h2 className="type-section-title mt-1">Popular Games</h2>
        </div>

        <p className="text-sm text-content-muted">Ranked by active players, with visits as tie-breaker.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="premium-panel overflow-hidden rounded-card">
              <Skeleton className="aspect-video rounded-none" />
              <div className="space-y-3 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-card border border-danger-border bg-danger-surface p-6 text-sm text-danger shadow-card">{error}</div>
      ) : null}

      {!isLoading && !error && games.length === 0 ? (
        <div className="premium-panel rounded-card p-6 text-sm text-content-muted">
          No popular games have been indexed yet.
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              className="relative"
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.42 }}
            >
              <Badge className="absolute left-3 top-3 z-10">#{game.rank}</Badge>

              <GameCard
                id={game.id}
                name={game.name}
                creator={game.creator}
                playing={game.playing}
                visits={game.visits}
                thumbnail={game.thumbnail}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </section>
  )
}
