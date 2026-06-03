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
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-cyan-500">
        <div className="relative aspect-video">
          {thumbnail ? (
            <Image src={thumbnail} alt={name} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-zinc-800">
              <span className="text-sm text-zinc-500">Roblox Game</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold">{name}</h3>

          <p className="mt-1 text-sm text-zinc-400">{creator}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <p className="text-cyan-400">{playing.toLocaleString()} Playing</p>
            {visits !== undefined ? <p className="text-zinc-500">{visits.toLocaleString()} Visits</p> : null}
          </div>
        </div>
      </div>
    </Link>
  )
}
