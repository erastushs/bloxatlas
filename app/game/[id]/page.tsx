import Image from 'next/image'

import StatCard from '@/components/cards/StatCard'
import PlayerChart from '@/components/charts/PlayerChart'
import Container from '@/components/ui/Container'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function GamePage({ params }: Props) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const response = await fetch(`${baseUrl}/api/game/${id}`, {
    cache: 'no-store',
  })

  const data = await response.json()

  const growthResponse = await fetch(`${baseUrl}/api/game/${id}/growth`, {
    cache: 'no-store',
  })

  const growthData = await growthResponse.json()

  const game = data.game

  return (
    <Container as="main" size="md" className="py-6">
      <div className="mb-8 overflow-hidden rounded-card border border-border-default">
        {game.thumbnail ? (
          <div className="relative aspect-[3/1]">
            <Image src={game.thumbnail} alt={game.name} fill sizes="100vw" className="object-cover" priority />
          </div>
        ) : (
          <div className="flex aspect-[3/1] items-center justify-center bg-surface">
            <span className="text-content-subtle">Game Thumbnail</span>
          </div>
        )}
      </div>

      <header className="mb-10">
        <h1 className="type-display">{game.name}</h1>

        <p className="mt-3 text-content-muted">by {game.creator}</p>
      </header>

      <section>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Active Players" value={game.playing.toLocaleString()} />

          <StatCard title="Visits" value={game.visits.toLocaleString()} />

          <StatCard title="Creator" value={game.creator} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 type-card-title">Player Activity</h2>

        <PlayerChart data={growthData.growth} />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 type-card-title">Description</h2>

        <p className="text-content-muted">{game.description || 'No description available.'}</p>
      </section>
    </Container>
  )
}
