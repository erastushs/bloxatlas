import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'

type Props = {
  id: number
  name: string
  creator: string
  playing: number
  visits?: number
  thumbnail?: string
}

export default function GameCard({ id, name, creator, playing, visits, thumbnail }: Props) {
  return (
    <Link href={`/game/${id}`} prefetch={false} aria-label={name} className="group block">
      <Card hover>
        <div className="relative aspect-video overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-surface-muted">
              <span className="text-sm text-content-subtle">Roblox Game</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute right-3 top-3 rounded-full border border-border-default bg-background/70 px-3 py-1 text-xs font-semibold text-content backdrop-blur">
            Live
          </div>
        </div>

        <div className="p-4">
          <h3 className="type-card-title line-clamp-2">{name}</h3>
          <p className="mt-1 text-sm text-content-muted">{creator}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-control border border-border-default bg-background/45 p-3">
              <p className="text-xs text-content-subtle">Playing</p>
              <p className="mt-1 font-semibold text-brand">{playing.toLocaleString()}</p>
            </div>
            {visits !== undefined ? (
              <div className="rounded-control border border-border-default bg-background/45 p-3">
                <p className="text-xs text-content-subtle">Visits</p>
                <p className="mt-1 font-semibold text-content">{visits.toLocaleString()}</p>
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </Link>
  )
}
