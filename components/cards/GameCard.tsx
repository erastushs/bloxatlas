import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import { CardContent } from '@/components/ui/CardContent'
import { CardFooter } from '@/components/ui/CardFooter'

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
    <Link href={`/game/${id}`} prefetch={false}>
      <Card hover>
        <div className="relative aspect-video">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-surface-muted">
              <span className="text-sm text-content-subtle">Roblox Game</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="type-card-title">{name}</h3>
          <p className="mt-1 text-sm text-content-muted">{creator}</p>
        </CardContent>

        <CardFooter>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <p className="text-brand">{playing.toLocaleString()} Playing</p>
            {visits !== undefined ? <p className="text-content-subtle">{visits.toLocaleString()} Visits</p> : null}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}