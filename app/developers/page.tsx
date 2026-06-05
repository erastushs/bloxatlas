import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Dashboard',
  description: 'BloxAtlas Developer Dashboard — API access, rate limits, and documentation.',
}

export default function DevelopersPage() {
  return (
    <Container as="main" className="py-12">
      <h1 className="type-display mb-4">Developers</h1>
      <p className="mb-10 max-w-2xl text-content-muted">
        Build with BloxAtlas data. Access Roblox game statistics, historical data, and rankings
        through our free Public API.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
          <h2 className="type-card-title mb-3">Public API</h2>
          <p className="text-content-muted mb-4">
            Free access to indexed Roblox game data. Search games, get stats, view history,
            and browse curated rankings.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-content-subtle">Base URL</span>
              <code className="rounded bg-surface-muted px-2 py-0.5 text-content">{process.env.NEXT_PUBLIC_SITE_URL}/api/v1</code>
            </div>
            <div className="flex justify-between">
              <span className="text-content-subtle">Rate Limit</span>
              <span className="text-content">60 req/min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-content-subtle">Auth</span>
              <span className="text-positive">None required</span>
            </div>
          </div>
          <a
            href="/api/docs"
            className="mt-4 inline-block rounded-control bg-brand px-4 py-2 text-sm font-semibold text-background transition hover:bg-brand-strong"
          >
            View API Docs
          </a>
        </div>

        <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
          <h2 className="type-card-title mb-3">Data Coverage</h2>
          <p className="text-content-muted mb-4">
            Our collector indexes thousands of Roblox games and tracks player counts over time.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-content-subtle">Games Indexed</span>
              <span className="text-content">2,300+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-content-subtle">Snapshots Collected</span>
              <span className="text-content">12,000+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-content-subtle">Update Frequency</span>
              <span className="text-content">Hourly</span>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
          <h2 className="type-card-title mb-3">Endpoints</h2>
          <div className="space-y-3 text-sm">
            {[
              { method: 'GET', path: '/api/v1/games', desc: 'List or search games' },
              { method: 'GET', path: '/api/v1/games/{id}', desc: 'Get game details' },
              { method: 'GET', path: '/api/v1/games/{id}/history', desc: 'Player count history' },
              { method: 'GET', path: '/api/v1/stats', desc: 'Platform statistics' },
              { method: 'GET', path: '/api/v1/rankings', desc: 'Curated rankings' },
            ].map((ep) => (
              <div key={ep.path} className="flex items-center gap-3">
                <span className="rounded bg-brand px-1.5 py-0.5 text-xs font-semibold text-background min-w-[32px] text-center">
                  {ep.method}
                </span>
                <code className="text-xs text-content">{ep.path}</code>
                <span className="text-content-subtle ml-auto hidden sm:inline">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
          <h2 className="type-card-title mb-3">Response Format</h2>
          <p className="text-content-muted mb-3 text-sm">
            Consistent JSON envelope with rate limit headers.
          </p>
          <pre className="rounded-control bg-surface-muted p-3 text-xs text-content overflow-x-auto">
{`{
  "success": true,
  "games": [...],
  "total": 2500,
  "page": 1,
  "limit": 20
}`}
          </pre>
        </div>
      </div>
    </Container>
  )
}