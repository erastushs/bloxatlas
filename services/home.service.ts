import { supabase } from '@/lib/supabase'

export async function getPopularGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('playing', {
      ascending: false,
    })
    .limit(6)

  if (error) {
    throw error
  }

  return data
}
