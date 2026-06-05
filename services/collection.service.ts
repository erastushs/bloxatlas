import { supabase } from '@/lib/supabase'

export interface Collection {
  slug: string
  title: string
  description: string
}

export const collections: Collection[] = [
  {
    slug: 'most-visited',
    title: 'Most Visited',
    description: 'Games with the highest total visit counts on Roblox.',
  },
  {
    slug: 'hidden-gems',
    title: 'Hidden Gems',
    description: 'Games with high visit counts but fewer active players — beloved classics worth rediscovering.',
  },
  {
    slug: 'all-time-favorites',
    title: 'All-Time Favorites',
    description: 'The most favorited games across the entire Roblox platform.',
  },
  {
    slug: 'rising-stars',
    title: 'Rising Stars',
    description: 'Recently updated games with strong player momentum.',
  },
  {
    slug: 'best-adventure',
    title: 'Best Adventure',
    description: 'Top adventure games on Roblox.',
  },
  {
    slug: 'best-simulator',
    title: 'Best Simulator',
    description: 'Top simulator games on Roblox.',
  },
  {
    slug: 'best-obby',
    title: 'Best Obby',
    description: 'Top obby (obstacle course) games on Roblox.',
  },
  {
    slug: 'best-tycoon',
    title: 'Best Tycoon',
    description: 'Top tycoon games on Roblox.',
  },
]

export function getCollection(slug: string): Collection | null {
  return collections.find((c) => c.slug === slug) ?? null
}

export async function getCollectionGames(slug: string, limit = 24) {
  const select = 'id, name, creator, playing, visits, thumbnail'

  switch (slug) {
    case 'most-visited': {
      const { data } = await supabase.from('games').select(select).order('visits', { ascending: false }).limit(limit)
      return data ?? []
    }
    case 'hidden-gems': {
      const { data } = await supabase.from('games').select(select).gte('visits', 1000000).order('playing', { ascending: true }).limit(limit)
      return data ?? []
    }
    case 'all-time-favorites': {
      const { data } = await supabase.from('games').select(select).order('favorites', { ascending: false }).limit(limit)
      return data ?? []
    }
    case 'rising-stars': {
      const { data } = await supabase.from('games').select(select).order('last_synced_at', { ascending: false }).order('playing', { ascending: false }).limit(limit)
      return data ?? []
    }
    case 'best-adventure': {
      const { data } = await supabase.from('games').select(select).ilike('description', '%adventure%').order('playing', { ascending: false }).limit(limit)
      return data ?? []
    }
    case 'best-simulator': {
      const { data } = await supabase.from('games').select(select).ilike('description', '%simulator%').order('playing', { ascending: false }).limit(limit)
      return data ?? []
    }
    case 'best-obby': {
      const { data } = await supabase.from('games').select(select).ilike('description', '%obby%').order('playing', { ascending: false }).limit(limit)
      return data ?? []
    }
    case 'best-tycoon': {
      const { data } = await supabase.from('games').select(select).ilike('description', '%tycoon%').order('playing', { ascending: false }).limit(limit)
      return data ?? []
    }
    default:
      return []
  }
}