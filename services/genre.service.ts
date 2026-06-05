import { supabase } from '@/lib/supabase'

export const GENRE_SLUGS: Record<string, string> = {
  adventure: 'Adventure',
  fighting: 'Fighting',
  fps: 'FPS',
  horror: 'Horror',
  obby: 'Obby',
  roleplay: 'Roleplay',
  simulator: 'Simulator',
  tycoon: 'Tycoon',
}

export function getGenreLabel(slug: string): string | null {
  return GENRE_SLUGS[slug] ?? null
}

export async function getGamesByGenre(slug: string, limit = 24) {
  const keyword = GENRE_SLUGS[slug]
  if (!keyword) return []

  const { data } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, thumbnail')
    .ilike('description', `%${keyword}%`)
    .order('playing', { ascending: false })
    .limit(limit)

  return data ?? []
}