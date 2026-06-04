import { siteConfig } from '@/constants/site'

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  }
}
export function createGameSchema(game: { id: number; name: string; description: string; thumbnail: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: game.description,
    image: game.thumbnail,
    url: `${siteConfig.url}/game/${game.id}`,
  }
}
