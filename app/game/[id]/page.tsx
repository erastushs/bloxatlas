import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import StatCard from '@/components/cards/StatCard'
import SimilarGames from '@/components/game/SimilarGames'
import RelatedGames from '@/components/game/RelatedGames'
import Reveal from '@/components/motion/Reveal'
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

  const growth = growthData.growth ?? []
  const latestPlaying = growth.at(-1)?.playing ?? game.playing
  const firstPlaying = growth.at(0)?.playing ?? latestPlaying
  const playerDelta = latestPlaying - firstPlaying

  return (
    <Container as="main" className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="overflow-hidden rounded-[24px] border border-border-default bg-background-elevated/50 shadow-card">
          {game.thumbnail ? (
            <div className="relative aspect-[16/10] lg:aspect-[4/3]">
              <Image src={game.thumbnail} alt={game.name} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-border-default bg-background/70 px-3 py-1 text-xs font-semibold text-content backdrop-blur">
                Live game profile
              </div>
            </div>
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-surface">
              <span className="text-content-subtle">Game Thumbnail</span>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.08} className="premium-panel flex flex-col justify-between rounded-[24px] p-6 md:p-8">
          <header>
            <p className="type-label text-brand">Game analytics</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">{game.name}</h1>

            <p className="mt-4 text-content-muted">
              by{' '}
              <Link href={`/creator/${encodeURIComponent(game.creator)}`} className="text-brand transition hover:text-brand-strong">
                {game.creator}
              </Link>
            </p>
          </header>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-control border border-border-default bg-background/45 p-4">
              <p className="text-xs font-semibold uppercase text-content-subtle">Snapshot Delta</p>
              <p className={`mt-2 text-2xl font-bold ${playerDelta >= 0 ? 'text-positive' : 'text-danger'}`}>
                {playerDelta >= 0 ? '+' : ''}{playerDelta.toLocaleString()}
              </p>
            </div>
            <div className="rounded-control border border-border-default bg-background/45 p-4">
              <p className="text-xs font-semibold uppercase text-content-subtle">Data Points</p>
              <p className="mt-2 text-2xl font-bold">{growth.length.toLocaleString()}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Active Players" value={game.playing.toLocaleString()} tone="brand" />
        <StatCard title="Visits" value={game.visits.toLocaleString()} tone="positive" />
        <StatCard title="Creator" value={game.creator} tone="neutral" />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <Reveal className="premium-panel rounded-card p-5 md:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="type-label text-brand">Player Activity</p>
              <h2 className="type-card-title mt-1">Recent live player trend</h2>
            </div>
            <p className="text-sm text-content-muted">Auto-refreshes from cached snapshots.</p>
          </div>
          <PlayerChart data={growth} />
        </Reveal>

        <Reveal delay={0.08} className="premium-panel rounded-card p-5 md:p-6">
          <p className="type-label text-positive">Profile context</p>
          <h2 className="type-card-title mt-2">Discovery notes</h2>
          <p className="mt-4 text-sm leading-6 text-content-muted">{game.description || 'No description available.'}</p>
          <div className="mt-6 grid gap-3">
            {['Similar games', 'Related experiences', 'Creator profile'].map((label) => (
              <div key={label} className="rounded-control border border-border-default bg-background/45 p-3 text-sm text-content-muted">
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="mt-10">
        <SimilarGames gameId={game.id} />
      </div>

      <div className="mt-10">
        <RelatedGames gameId={game.id} />
      </div>
    </Container>
  )
}
