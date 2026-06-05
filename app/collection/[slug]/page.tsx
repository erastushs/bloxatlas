import GameCard from '@/components/cards/GameCard'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { getCollection, getCollectionGames } from '@/services/collection.service'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollection(slug)
  return {
    title: collection?.title ?? slug,
    description: collection?.description,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const collection = getCollection(slug)
  const games = await getCollectionGames(slug)

  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Collection"
        title={collection?.title ?? slug}
        description={collection?.description}
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
          <p className="mt-2 text-content-muted">This collection has no games yet.</p>
        </div>
      )}
    </Container>
  )
}