import StatCard from '@/components/cards/StatCard'
type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function GamePage({ params }: Props) {
  const { id } = await params

  const response = await fetch(`http://localhost:3000/api/game/${id}`, {
    cache: 'no-store',
  })

  const data = await response.json()

  const game = data.game

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">{game.name}</h1>

      <p className="mt-4 text-zinc-400">{game.creator}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard title="Active Players" value={game.playing.toLocaleString()} />

        <StatCard title="Visits" value={game.visits.toLocaleString()} />

        <StatCard title="Creator" value={game.creator} />
      </div>
    </main>
  )
}
