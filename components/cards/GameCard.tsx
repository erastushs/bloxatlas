import Link from 'next/link'

type Props = {
  id: number
  name: string
  creator: string
  playing: number
}

export default function GameCard({ id, name, creator, playing }: Props) {
  return (
    <Link href={`/game/${id}`}>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-cyan-500">
        <h3 className="font-semibold">{name}</h3>

        <p className="mt-1 text-sm text-zinc-400">{creator}</p>

        <p className="mt-3 text-cyan-400">{playing.toLocaleString()} Playing</p>
      </div>
    </Link>
  )
}
