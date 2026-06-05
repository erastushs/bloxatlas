import dynamic from 'next/dynamic'
import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
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
    <Container as="main" className="py-8 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createOrganizationSchema()),
        }}
      />
      <section className="relative overflow-hidden rounded-[28px] border border-border-default bg-background-elevated/40 px-4 py-14 shadow-card backdrop-blur md:px-8 md:py-20">
        <div className="mesh-grid absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="type-label text-brand">Roblox Discovery Intelligence</p>
            <h1 className="type-display mx-auto mt-4 max-w-4xl">
              Find the next breakout Roblox game through <span className="gradient-text">live analytics</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-content-muted">
              Track active players, growth momentum, visits, creators, and category signals in one fast gaming analytics workspace.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <SearchBar />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/trending" className="rounded-control border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-background">
                View Trending
              </Link>
              <Link href="/fastest-growing" className="rounded-control border border-border-default bg-surface/60 px-4 py-2 text-sm font-semibold text-content-muted transition hover:border-border-strong hover:text-content">
                Fastest Growth
              </Link>
              <Link href="/collections" className="rounded-control border border-border-default bg-surface/60 px-4 py-2 text-sm font-semibold text-content-muted transition hover:border-border-strong hover:text-content">
                Browse Collections
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBar />

      <section className="mt-24 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="premium-panel rounded-card p-6 md:p-8">
          <p className="type-label text-brand">Analytics cockpit</p>
          <h2 className="type-section-title mt-2">Signals built for discovery, comparison, and timing.</h2>
          <p className="mt-4 max-w-2xl text-content-muted">
            BloxAtlas turns changing Roblox activity into readable market intelligence: player movement, growth rates, visits, creators, genres, and related games.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Momentum', 'Demand', 'Creator'].map((label) => (
              <div key={label} className="rounded-control border border-border-default bg-background/45 p-4">
                <p className="text-xs font-semibold uppercase text-content-subtle">{label}</p>
                <div className="mt-4 h-2 rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand to-accent" style={{ width: label === 'Demand' ? '78%' : label === 'Creator' ? '64%' : '88%' }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="premium-panel rounded-card p-6 md:p-8">
          <p className="type-label text-positive">Live workflow</p>
          <div className="mt-5 space-y-3">
            {[
              ['Discover', 'Search and scan games by category or live activity.'],
              ['Analyze', 'Open a dashboard for player trends and demand context.'],
              ['Compare', 'Jump between similar and related experiences.'],
            ].map(([title, description], index) => (
              <div key={title} className="flex gap-4 rounded-control border border-border-default bg-background/45 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-brand/10 text-sm font-bold text-brand">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-content-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <PopularGames />
    </Container>
  )
}
