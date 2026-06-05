'use client'

import RankingCard from '@/components/cards/RankingCard'
import RankingCardSkeleton from '@/components/cards/RankingCardSkeleton'
import { useFastestGrowing } from '@/hooks/useFastestGrowing'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import type { FastestGrowingGame } from '@/types/game'

export default function FastestGrowingPage() {
  const { games, isLoading, error } = useFastestGrowing()

  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Growth Ranking"
        title="Fastest Growing Games"
        description="Games with the strongest player growth rate across recent collected snapshots."
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <RankingCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-card border border-danger-border bg-danger-surface shadow-card p-6 text-sm text-danger">{error}</div>
      ) : null}

      {!isLoading && !error && games.length === 0 ? (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">No growing games yet</h2>
          <p className="mt-2 text-content-muted">Collect at least two snapshots per game to calculate growth rate.</p>
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="space-y-4">
          {games.map((game) => (
            <RankingCard key={game.id} game={game as FastestGrowingGame} variant="fastest-growing" />
          ))}
        </div>
      ) : null}
    </Container>
  )
}