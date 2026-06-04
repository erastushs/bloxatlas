import type { MetadataRoute } from 'next'
import { siteConfig } from '@/constants/site'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: games, error } = await supabase.from('games').select('id, last_synced_at')

  if (error) {
    console.error(error)
  }
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/trending`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/fastest-growing`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/top-active`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
  ]

  const gameRoutes = (games ?? []).map((game) => ({
    url: `${siteConfig.url}/game/${game.id}`,
    lastModified: game.last_synced_at ? new Date(game.last_synced_at) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...gameRoutes]
}
