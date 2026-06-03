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
      <article className="grid gap-4 rounded-card border border-border-default bg-surface shadow-card p-4 transition hover:border-brand sm:grid-cols-[160px_1fr]">
        <div className="relative aspect-video overflow-hidden rounded-control bg-surface-muted sm:aspect-square">
          {game.thumbnail ? (
            <Image src={game.thumbnail} alt={game.name} fill sizes="160px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-content-subtle">Roblox Game</div>
          )}

          <div className="absolute left-2 top-2 rounded-control border border-border-strong bg-background-elevated/90 px-2 py-1 text-sm font-semibold text-brand">
            #{game.rank}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">{game.name}</h2>
              <p className="mt-1 text-sm text-content-muted">by {game.creator}</p>
            </div>

            <p className="text-sm font-semibold text-positive">{game.growthPercent.toFixed(1)}% growth</p>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="text-content-subtle">Players Delta</p>
              <p className="mt-1 font-semibold text-content">{formatDelta(game.playerDelta)}</p>
            </div>

            <div>
              <p className="text-content-subtle">Active</p>
              <p className="mt-1 font-semibold text-content">{game.playing.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-content-subtle">Snapshots</p>
              <p className="mt-1 font-semibold text-content">{game.snapshotCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
