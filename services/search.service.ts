import { supabase } from '@/lib/supabase'

export async function searchGames(query?: string) {
  let builder = supabase.from('games').select('*')

  if (query) {
    builder = builder.ilike('name', `%${query}%`)
  }

  const { data, error } = await builder

  if (error) {
    throw error
  }

  return data
}
