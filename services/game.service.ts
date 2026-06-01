import { supabase } from '@/lib/supabase'

export async function getGameById(id: number) {
  const { data, error } = await supabase.from('games').select('*').eq('id', id).single()

  if (error) {
    throw error
  }
  if (!data) {
    throw new Error('Game not found')
  }

  return data
}
