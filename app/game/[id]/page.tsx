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
        <div className="rounded-xl border border-zinc-800 p-4">
          <p>Playing</p>
          <h2>{game.playing.toLocaleString()}</h2>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4">
          <p>Visits</p>
          <h2>{game.visits.toLocaleString()}</h2>
        </div>
      </div>
    </main>
  )
}
