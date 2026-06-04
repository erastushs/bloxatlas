import SearchBar from '@/components/search/SearchBar'
import PopularGames from '@/components/home/PopularGames'
import StatsBar from '@/components/home/StatsBar'
import Container from '@/components/ui/Container'
import { createOrganizationSchema } from '@/lib/seo'

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
      <div className="mt-12">
        <StatsBar />
      </div>
      <PopularGames />
    </Container>
  )
}
