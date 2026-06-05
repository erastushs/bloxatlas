import Image from 'next/image'
import dynamic from 'next/dynamic'
import StatCard from '@/components/cards/StatCard'
import SimilarGames from '@/components/game/SimilarGames'
import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'
import { Metadata } from 'next'

const PlayerChart = dynamic(() => import('@/components/charts/PlayerChart'), {
  loading: () => <Skeleton className="h-[300px] w-full rounded-card" />,
})

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const response = await fetch(`${baseUrl}/api/game/${id}`, {
    next: { revalidate: 300 },
  })

  const data = await response.json()
  const game = data.game

  return {
    title: game.name,
    description: game.description,
    openGraph: {
      title: game.name,
      description: game.description,
      images: game.thumbnail ? [game.thumbnail] : [],
    },
  }
}

export default async function GamePage({ params }: Props) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const response = await fetch(`${baseUrl}/api/game/${id}`, {
    next: { revalidate: 300 },
  })

  const data = await response.json()

  const growthResponse = await fetch(`${baseUrl}/api/game/${id}/growth`, {
    next: { revalidate: 60 },
  })

  const growthData = await growthResponse.json()

  const game = data.game

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: game.description,
    image: game.thumbnail,
    url: `${baseUrl}/game/${game.id}`,
    author: {
      '@type': 'Person',
      name: game.creator,
    },
  }

  return (
    <Container as="main" size="md" className="py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <SimilarGames gameId={game.id} />
    </Container>
  )
}