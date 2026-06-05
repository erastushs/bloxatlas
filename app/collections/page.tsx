import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { collections } from '@/services/collection.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Curated collections of Roblox games — Most Visited, Hidden Gems, All-Time Favorites, Best by genre, and more.',
}

export default function CollectionsPage() {
  return (
    <Container as="main" className="py-12">
      <PageHeader
        eyebrow="Discover"
        title="Collections"
        description="Curated groups of Roblox games hand-picked by different criteria."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link key={collection.slug} href={`/collection/${collection.slug}`}>
            <div className="rounded-card border border-border-default bg-surface shadow-card p-6 transition hover:border-brand">
              <h2 className="type-card-title">{collection.title}</h2>
              <p className="mt-2 text-sm text-content-muted">{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}