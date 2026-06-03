import Link from 'next/link'
import Image from 'next/image'
import type { FastestGrowingGame } from '@/types/game'

type Props = {
  game: FastestGrowingGame
}

function formatDelta(value: number) {
  const sign = value > 0 ? '+' : ''

  return `${sign}${value.toLocaleString()}`
}

export default function FastestGrowingCard({ game }: Props) {
  return (
    <Link href={`/game/${game.id}`}>
      <article className="grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-cyan-500 sm:grid-cols-[160px_1fr]">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-800 sm:aspect-square">
          {game.thumbnail ? (
            <Image src={game.thumbnail} alt={game.name} fill sizes="160px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">Roblox Game</div>
          )}

          <div className="absolute left-2 top-2 rounded-md border border-zinc-700 bg-zinc-950/90 px-2 py-1 text-sm font-semibold text-cyan-300">
            #{game.rank}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">{game.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">by {game.creator}</p>
            </div>

            <p className="text-sm font-semibold text-emerald-400">{game.growthPercent.toFixed(1)}% growth</p>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="text-zinc-500">Players Delta</p>
              <p className="mt-1 font-semibold text-white">{formatDelta(game.playerDelta)}</p>
            </div>

            <div>
              <p className="text-zinc-500">Active</p>
              <p className="mt-1 font-semibold text-white">{game.playing.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-zinc-500">Snapshots</p>
              <p className="mt-1 font-semibold text-white">{game.snapshotCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
