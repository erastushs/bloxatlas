import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { GENRE_SLUGS } from '@/services/genre.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Genres',
  description: 'Browse Roblox games by genre — Adventure, Fighting, FPS, Horror, Obby, Roleplay, Simulator, Tycoon.',
}

export default function GenresPage() {
  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Discover"
        title="Genres"
        description="Explore Roblox games by genre. Find the best games in each category."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(GENRE_SLUGS).map(([slug, label]) => (
          <Link key={slug} href={`/genre/${slug}`}>
            <div className="rounded-card border border-border-default bg-surface shadow-card p-6 transition hover:border-brand text-center">
              <h2 className="type-card-title">{label}</h2>
              <p className="mt-2 text-sm text-content-muted">Browse {label.toLowerCase()} games</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}