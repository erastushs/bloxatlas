import dynamic from 'next/dynamic'
import SearchBar from '@/components/search/SearchBar'
import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'
import { createOrganizationSchema } from '@/lib/seo'

const StatsBar = dynamic(() => import('@/components/home/StatsBar'), {
  loading: () => <SkeletonGrid count={3} />,
})
const PopularGames = dynamic(() => import('@/components/home/PopularGames'), {
  loading: () => <SkeletonGrid count={6} />,
})

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-card" />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <Container as="main" className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createOrganizationSchema()),
        }}
      />
      <section className="text-center">
        <h1 className="type-display mx-auto max-w-4xl">Explore Roblox Through Data</h1>

        <p className="mx-auto mt-4 max-w-2xl text-content-muted">
          Discover trending games, player activity, growth metrics, and more.
        </p>

        <div className="mt-8">
          <SearchBar />
        </div>
      </section>
      <StatsBar />
      <PopularGames />
    </Container>
  )
}