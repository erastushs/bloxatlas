'use client'

import GameCard from '@/components/cards/GameCard'
import { useTopActive } from '@/hooks/useTopActive'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Skeleton from '@/components/ui/Skeleton'

export default function TopActivePage() {
  const { games, isLoading, error } = useTopActive()

  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Live Activity"
        title="Top Active Games"
        description="Roblox games with the highest current active player counts in the BloxAtlas index."
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-card border border-border-default bg-surface shadow-card">
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
        <div className="rounded-card border border-danger-border bg-danger-surface shadow-card p-6 text-sm text-danger">{error}</div>
      ) : null}

      {!isLoading && !error && games.length === 0 ? (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">No active games yet</h2>
          <p className="mt-2 text-content-muted">Indexed games will appear here after player counts are collected.</p>
        </div>
      ) : null}

      {!isLoading && !error && games.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div key={game.id} className="relative">
              <Badge className="absolute left-3 top-3 z-10">#{game.rank}</Badge>

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
    </Container>
  )
}
