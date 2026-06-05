import { supabase } from '@/lib/supabase'

const CATEGORY_KEYWORDS = [
  'adventure', 'fighting', 'fps', 'horror', 'obby', 'obbie',
  'roleplay', 'rpg', 'simulator', 'tycoon', 'shooter', 'survival',
  'racing', 'parkour', 'escape', 'tower', 'defense', 'tds',
  'anime', 'clicker', 'mining', 'fishing', 'grinding',
]

function extractKeywords(text: string | null | undefined): string[] {
  if (!text) return []
  const words = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
  return CATEGORY_KEYWORDS.filter((kw) => words.includes(kw))
}

export async function getSimilarGames(gameId: number, limit = 6) {
  const { data: target } = await supabase
    .from('games')
    .select('id, name, creator, playing, description')
    .eq('id', gameId)
    .single()

  if (!target) return []

  const results = new Map<number, { game: Record<string, unknown>; score: number }>()

  const addGames = (games: Record<string, unknown>[], baseScore: number) => {
    for (const g of games) {
      const gid = g.id as number
      if (gid === gameId) continue
      const existing = results.get(gid)
      if (!existing || existing.score < baseScore) {
        results.set(gid, { game: g, score: baseScore })
      }
    }
  }

  const { data: sameCreator } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, thumbnail')
    .eq('creator', target.creator)
    .neq('id', gameId)
    .order('playing', { ascending: false })
    .limit(limit)

  if (sameCreator) addGames(sameCreator, 3)

  const keywords = extractKeywords(target.description)
  if (keywords.length > 0 && results.size < limit) {
    const { data: keywordGames } = await supabase
      .from('games')
      .select('id, name, creator, playing, visits, thumbnail')
      .neq('id', gameId)
      .neq('creator', target.creator)
      .or(keywords.map((k) => `description.ilike.%${k}%`).join(','))
      .order('playing', { ascending: false })
      .limit(limit)

    if (keywordGames) addGames(keywordGames, 2)
  }

  if (results.size < limit) {
    const range = target.playing * 0.5
    const { data: similarPlaying } = await supabase
      .from('games')
      .select('id, name, creator, playing, visits, thumbnail')
      .neq('id', gameId)
      .neq('creator', target.creator)
      .gte('playing', Math.max(0, target.playing - range))
      .lte('playing', target.playing + range)
      .order('playing', { ascending: false })
      .limit(limit)

    if (similarPlaying) addGames(similarPlaying, 1)
  }

  return Array.from(results.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.game)
}