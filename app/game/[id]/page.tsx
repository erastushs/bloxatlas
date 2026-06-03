import StatCard from '@/components/cards/StatCard'
type Props = {
  params: Promise<{
    id: string
  }>
}
import Image from 'next/image'

export default async function GamePage({ params }: Props) {
  const { id } = await params

  const response = await fetch(`http://localhost:3000/api/game/${id}`, {
    cache: 'no-store',
  })

  const data = await response.json()

  const game = data.game

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-800">
        {game.thumbnail ? (
          <div className="relative aspect-[3/1]">
            <Image src={game.thumbnail} alt={game.name} fill sizes="100vw" className="object-cover" priority />
          </div>
        ) : (
          <div className="flex aspect-[3/1] items-center justify-center bg-zinc-900">
            <span className="text-zinc-500">Game Thumbnail</span>
          </div>
        )}
      </div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold">{game.name}</h1>

        <p className="mt-3 text-zinc-400">by {game.creator}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard title="Active Players" value={game.playing.toLocaleString()} />

        <StatCard title="Visits" value={game.visits.toLocaleString()} />

        <StatCard title="Creator" value={game.creator} />
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">Description</h2>

        <p className="text-zinc-400">{game.description || 'No description available.'}</p>
      </section>
    </main>
  )
}
