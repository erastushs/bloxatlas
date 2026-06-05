import { supabase } from '@/lib/supabase'
import GameCard from '@/components/cards/GameCard'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  const creator = decodeURIComponent(name)
  return {
    title: `${creator} - Creator Profile`,
    description: `Games created by ${creator} on Roblox. Browse their most popular games.`,
  }
}

export default async function CreatorPage({ params }: Props) {
  const { name } = await params
  const creator = decodeURIComponent(name)

  const { data: games } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, thumbnail')
    .ilike('creator', creator)
    .order('playing', { ascending: false })
    .limit(50)

  const gameList = games ?? []

  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Creator"
        title={creator}
        description={`${gameList.length} game${gameList.length !== 1 ? 's' : ''} by ${creator} indexed on BloxAtlas.`}
      />

      {gameList.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gameList.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} creator={game.creator} playing={game.playing} visits={game.visits} thumbnail={game.thumbnail} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">No games found</h2>
          <p className="mt-2 text-content-muted">No games by {creator} have been indexed yet.</p>
        </div>
      )}
    </Container>
  )
}