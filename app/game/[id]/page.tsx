import StatCard from '@/components/cards/StatCard'
type Props = {
  params: Promise<{
    id: string
  }>
}
import Image from 'next/image'
import PlayerChart from '@/components/charts/PlayerChart'
import Container from '@/components/ui/Container'

export default async function GamePage({ params }: Props) {
  const { id } = await params

  const response = await fetch(`http://localhost:3000/api/game/${id}`, {
    cache: 'no-store',
  })

  const data = await response.json()

  const growthResponse = await fetch(`http://localhost:3000/api/game/${id}/growth`, {
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
      <div className="mb-10">
        <h1 className="type-display">{game.name}</h1>

        <p className="mt-3 text-content-muted">by {game.creator}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard title="Active Players" value={game.playing.toLocaleString()} />

        <StatCard title="Visits" value={game.visits.toLocaleString()} />

        <StatCard title="Creator" value={game.creator} />
        <section className="mt-8">
          <h2 className="type-card-title mb-4">Player Activity</h2>

          <PlayerChart data={growthData.growth} />
        </section>
      </div>

      <section className="mt-10">
        <h2 className="type-card-title mb-3">Description</h2>

        <p className="text-content-muted">{game.description || 'No description available.'}</p>
      </section>
    </Container>
  )
}
