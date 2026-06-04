import SearchBar from '@/components/search/SearchBar'
import PopularGames from '@/components/home/PopularGames'
import StatsBar from '@/components/home/StatsBar'
import Container from '@/components/ui/Container'
import { createOrganizationSchema } from '@/lib/seo'

;<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(createOrganizationSchema()),
  }}
/>
export default function HomePage() {
  return (
    <Container as="main" className="py-20">
      <section className="text-center">
        <h1 className="type-display">Explore Roblox Through Data</h1>

        <p className="mt-4 text-content-muted">Discover trending games, player activity, growth metrics, and more.</p>

        <SearchBar />
      </section>
      <StatsBar />
      <PopularGames />
    </Container>
  )
}
