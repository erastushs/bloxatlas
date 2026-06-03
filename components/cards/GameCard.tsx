import Link from 'next/link'
import Image from 'next/image'

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
    <Link href={`/game/${id}`}>
      <div className="overflow-hidden rounded-card border border-border-default bg-surface shadow-card transition hover:border-brand">
        <div className="relative aspect-video">
          {thumbnail ? (
            <Image src={thumbnail} alt={name} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-surface-muted">
              <span className="text-sm text-content-subtle">Roblox Game</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="type-card-title">{name}</h3>

          <p className="mt-1 text-sm text-content-muted">{creator}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <p className="text-brand">{playing.toLocaleString()} Playing</p>
            {visits !== undefined ? <p className="text-content-subtle">{visits.toLocaleString()} Visits</p> : null}
          </div>
        </div>
      </div>
    </Link>
  )
}
