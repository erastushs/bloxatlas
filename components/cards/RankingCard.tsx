import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import type { TrendingGame, FastestGrowingGame } from '@/types/game'

type RankingVariant = 'trending' | 'fastest-growing'
type RankingGame = TrendingGame | FastestGrowingGame

type Props = {
  game: RankingGame
  variant: RankingVariant
}

function formatDelta(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toLocaleString()}`
}

const variantConfig: Record<RankingVariant, { label: (g: RankingGame) => string; stats: { label: string; value: (g: RankingGame) => string }[] }> = {
  'trending': {
    label: (g) => `${formatDelta((g as TrendingGame).playerDelta)} players`,
    stats: [
      { label: 'Growth', value: (g) => `${(g as TrendingGame).growthPercent.toFixed(1)}%` },
      { label: 'Active', value: (g) => `${g.playing.toLocaleString()}` },
      { label: 'Visits Delta', value: (g) => `${formatDelta((g as TrendingGame).visitDelta)}` },
    ],
  },
  'fastest-growing': {
    label: (g) => `${(g as FastestGrowingGame).growthPercent.toFixed(1)}% growth`,
    stats: [
      { label: 'Players Delta', value: (g) => `${formatDelta((g as FastestGrowingGame).playerDelta)}` },
      { label: 'Active', value: (g) => `${g.playing.toLocaleString()}` },
      { label: 'Snapshots', value: (g) => `${(g as FastestGrowingGame).snapshotCount.toLocaleString()}` },
    ],
  },
}

export default function RankingCard({ game, variant }: Props) {
  const config = variantConfig[variant]
  const label = typeof config.label === 'function' ? config.label(game) : ''

  return (
    <Link href={`/game/${game.id}`} prefetch={false} aria-label={game.name}>
      <article className="grid gap-4 rounded-card border border-border-default bg-surface shadow-card p-4 transition hover:border-brand sm:grid-cols-[160px_1fr]">
        <div className="relative aspect-video overflow-hidden rounded-control bg-surface-muted sm:aspect-square">
          {game.thumbnail ? (
            <Image src={game.thumbnail} alt={game.name} fill sizes="160px" className="object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-content-subtle">Roblox Game</div>
          )}
          <Badge className="absolute left-2 top-2">#{game.rank}</Badge>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="type-card-title truncate">{game.name}</h2>
              <p className="mt-1 text-sm text-content-muted">by {game.creator}</p>
            </div>
            <p className="text-sm font-semibold text-positive">{label}</p>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            {config.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-content-subtle">{stat.label}</p>
                <p className="mt-1 font-semibold text-content">{stat.value(game)}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}