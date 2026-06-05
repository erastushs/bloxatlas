import { supabase } from '@/lib/supabase'

const GENRE_KEYWORDS = [
  'adventure', 'fighting', 'fps', 'horror', 'obby', 'obbie',
  'roleplay', 'rpg', 'simulator', 'tycoon',
]

export type SortOption = 'relevance' | 'playing' | 'visits' | 'name'

export async function searchGames(params: {
  query?: string
  sort?: SortOption
  genre?: string
  page?: number
  limit?: number
}) {
  const { query, sort = 'relevance', genre, page = 1, limit = 24 } = params

  let builder = supabase
    .from('games')
    .select('id, name, creator, playing, visits, thumbnail', { count: 'estimated' })

  if (genre) {
    builder = builder.ilike('description', `%${genre}%`)
  }

  if (query) {
    builder = builder.ilike('name', `%${query}%`)
  }

  switch (sort) {
    case 'playing':
      builder = builder.order('playing', { ascending: false })
      break
    case 'visits':
      builder = builder.order('visits', { ascending: false })
      break
    case 'name':
      builder = builder.order('name', { ascending: true })
      break
    default:
      if (query) {
        builder = builder.order('playing', { ascending: false })
      } else {
        builder = builder.order('playing', { ascending: false })
      }
  }

  const offset = (page - 1) * limit
  builder = builder.range(offset, offset + limit - 1)

  const { data, error, count } = await builder

  if (error) throw error

  return {
    games: data ?? [],
    total: count ?? 0,
    page,
    limit,
    hasMore: (data?.length ?? 0) === limit,
  }
}

export function getGenreOptions() {
  return GENRE_KEYWORDS.map((k) => ({ value: k, label: k.charAt(0).toUpperCase() + k.slice(1) }))
}