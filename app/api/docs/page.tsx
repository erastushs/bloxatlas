import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Documentation',
  description: 'BloxAtlas Public API — access Roblox game data, stats, rankings, and history programmatically.',
}

const endpoints = [
  {
    method: 'GET',
    path: '/api/v1/games',
    description: 'List or search indexed Roblox games.',
    params: [
      { name: 'q', type: 'string', desc: 'Search query (case-insensitive name match)' },
      { name: 'page', type: 'number', desc: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', desc: 'Results per page (max: 50, default: 20)' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/games/{id}',
    description: 'Get a single game by its BloxAtlas ID.',
    params: [
      { name: 'id', type: 'number', desc: 'Game ID' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/games/{id}/history',
    description: 'Get snapshot history for a game (player counts over time).',
    params: [
      { name: 'id', type: 'number', desc: 'Game ID' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/stats',
    description: 'Get platform-wide statistics.',
    params: [],
  },
  {
    method: 'GET',
    path: '/api/v1/rankings',
    description: 'Get game rankings by type.',
    params: [
      { name: 'type', type: 'string', desc: 'popular | trending | fastest-growing (default: popular)' },
      { name: 'limit', type: 'number', desc: 'Results limit (max: 25, default: 12)' },
    ],
  },
]

export default function ApiDocsPage() {
  return (
    <Container as="main" className="py-12">
      <h1 className="type-display mb-4">API Documentation</h1>
      <p className="mb-10 max-w-2xl text-content-muted">
        The BloxAtlas Public API provides free access to Roblox game data, player statistics,
        historical snapshots, and curated rankings. No authentication required for basic access.
      </p>

      <section className="mb-12">
        <h2 className="type-section-title mb-6">Rate Limits</h2>
        <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
          <p className="text-content-muted">
            <strong className="text-content">60 requests per minute</strong> per IP address.
            Response headers include <code className="rounded bg-surface-muted px-1.5 py-0.5 text-sm">X-RateLimit-Limit</code>,
            <code className="rounded bg-surface-muted px-1.5 py-0.5 text-sm">X-RateLimit-Remaining</code>, and
            <code className="rounded bg-surface-muted px-1.5 py-0.5 text-sm">X-RateLimit-Reset</code>.
          </p>
        </div>
      </section>

      <section>
        <h2 className="type-section-title mb-6">Endpoints</h2>
        <div className="space-y-6">
          {endpoints.map((ep) => (
            <div key={ep.path} className="rounded-card border border-border-default bg-surface shadow-card overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b border-border-default">
                <span className="rounded-control bg-brand px-2 py-0.5 text-xs font-semibold text-background">
                  {ep.method}
                </span>
                <code className="text-sm text-content">{ep.path}</code>
              </div>
              <div className="p-4">
                <p className="text-content-muted mb-3">{ep.description}</p>
                {ep.params.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-default text-left text-content-subtle">
                          <th className="pb-2 pr-4 font-medium">Parameter</th>
                          <th className="pb-2 pr-4 font-medium">Type</th>
                          <th className="pb-2 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ep.params.map((p) => (
                          <tr key={p.name} className="border-b border-border-default">
                            <td className="py-2 pr-4 text-content font-mono text-xs">{p.name}</td>
                            <td className="py-2 pr-4 text-content-muted">{p.type}</td>
                            <td className="py-2 text-content-muted">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="type-section-title mb-4">Response Format</h2>
        <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
          <p className="text-content-muted mb-3">All endpoints return JSON with a consistent envelope:</p>
          <pre className="rounded-control bg-surface-muted p-4 text-sm text-content overflow-x-auto">
{`{
  "success": true,
  "games": [...],
  "page": 1,
  "limit": 20,
  "total": 2500
}`}
          </pre>
        </div>
      </section>
    </Container>
  )
}