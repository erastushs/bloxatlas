import SearchBar from '@/components/search/SearchBar'
import PopularGames from '@/components/home/PopularGames'
import StatsBar from '@/components/home/StatsBar'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <section className="text-center">
        <h1 className="text-5xl font-bold">Explore Roblox Through Data</h1>

        <p className="mt-4 text-content-muted">Discover trending games, player activity, growth metrics, and more.</p>

        <SearchBar />
      </section>
      <StatsBar />
      <PopularGames />
    </main>
  )
}
