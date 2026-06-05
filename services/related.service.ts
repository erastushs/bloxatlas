import { supabase } from '@/lib/supabase'

function pearson(a: number[], b: number[]): number {
  const n = a.length
  if (n < 3) return 0

  let sumA = 0, sumB = 0, sumAB = 0, sumA2 = 0, sumB2 = 0
  for (let i = 0; i < n; i++) {
    sumA += a[i]
    sumB += b[i]
    sumAB += a[i] * b[i]
    sumA2 += a[i] * a[i]
    sumB2 += b[i] * b[i]
  }

  const num = n * sumAB - sumA * sumB
  const den = Math.sqrt((n * sumA2 - sumA * sumA) * (n * sumB2 - sumB * sumB))

  return den === 0 ? 0 : num / den
}

export async function getRelatedGames(gameId: number, limit = 6) {
  const { data: target } = await supabase
    .from('games')
    .select('playing')
    .eq('id', gameId)
    .single()

  if (!target) return []

  const { data: targetSnapshots } = await supabase
    .from('snapshots')
    .select('playing, created_at')
    .eq('game_id', gameId)
    .order('created_at', { ascending: true })
    .limit(50)

  if (!targetSnapshots || targetSnapshots.length < 3) return []

  const targetPlaying = targetSnapshots.map((s) => s.playing)

  const minPlaying = Math.max(0, Math.floor(target.playing * 0.3))
  const maxPlaying = Math.ceil(target.playing * 3)

  const { data: candidates } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, thumbnail')
    .neq('id', gameId)
    .gte('playing', minPlaying)
    .lte('playing', maxPlaying)
    .order('playing', { ascending: false })
    .limit(30)

  if (!candidates || candidates.length === 0) return []

  const candidateIds = candidates.map((c) => c.id)

  const { data: candidateSnapshots } = await supabase
    .from('snapshots')
    .select('game_id, playing, created_at')
    .in('game_id', candidateIds)
    .order('created_at', { ascending: true })
    .limit(1500)

  if (!candidateSnapshots) return []

  const snapshotsByGame = new Map<number, number[]>()
  for (const s of candidateSnapshots) {
    const list = snapshotsByGame.get(s.game_id) ?? []
    list.push(s.playing)
    snapshotsByGame.set(s.game_id, list)
  }

  const scores: { game: (typeof candidates)[number]; score: number }[] = []

  for (const candidate of candidates) {
    const candidatePlaying = snapshotsByGame.get(candidate.id)
    if (!candidatePlaying || candidatePlaying.length < 3) continue

    const minLen = Math.min(targetPlaying.length, candidatePlaying.length)
    const a = targetPlaying.slice(-minLen)
    const b = candidatePlaying.slice(-minLen)

    const corr = pearson(a, b)
    if (corr > 0.3) {
      scores.push({ game: candidate, score: corr })
    }
  }

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.game)
}