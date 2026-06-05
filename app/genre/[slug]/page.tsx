import GameCard from '@/components/cards/GameCard'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { getGamesByGenre, getGenreLabel, GENRE_SLUGS } from '@/services/genre.service'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(GENRE_SLUGS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = getGenreLabel(slug)
  return {
    title: `${label ?? slug} Games`,
    description: `Browse the most popular ${label ?? slug} games on Roblox.`,
  }
}

export default async function GenrePage({ params }: Props) {
  const { slug } = await params
  const label = getGenreLabel(slug) ?? slug
  const games = await getGamesByGenre(slug)

  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Genre"
        title={`${label} Games`}
        description={`The most popular ${label.toLowerCase()} games on Roblox, ranked by active players.`}
      />

      {games.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} creator={game.creator} playing={game.playing} visits={game.visits} thumbnail={game.thumbnail} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">No games found</h2>
          <p className="mt-2 text-content-muted">No {label.toLowerCase()} games discovered yet.</p>
        </div>
      )}
    </Container>
  )
}