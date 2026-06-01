import { supabase } from '@/lib/supabase'

export async function getGameById(id: number) {
  const { data, error } = await supabase.from('games').select('*').eq('id', id).single()

  if (error) {
    throw error
  }

  return data
}
