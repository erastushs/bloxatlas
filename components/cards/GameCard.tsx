import Link from 'next/link'
import Image from 'next/image'

type Props = {
  id: number
  name: string
  creator: string
  playing: number
  thumbnail?: string
}

export default function GameCard({ id, name, creator, playing, thumbnail }: Props) {
  return (
    <Link href={`/game/${id}`}>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-cyan-500">
        <div className="relative aspect-video">
          <Image
            src={thumbnail || 'https://placehold.co/600x400?text=BloxAtlas'}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold">{name}</h3>

          <p className="mt-1 text-sm text-zinc-400">{creator}</p>

          <p className="mt-3 text-cyan-400">{playing.toLocaleString()} Playing</p>
        </div>
      </div>
    </Link>
  )
}
