import { supabase } from '@/lib/supabase'
import { getCachedOrFetch } from '@/lib/cache'
import type { Game, TrendingGame } from '@/types/game'

import { loadAllSnapshots } from '@/lib/load-all-snapshots'

const DEFAULT_TRENDING_LIMIT = 12

type SnapshotRow = {
  game_id: number
  playing: number
  visits: number
  created_at: string
}

type SnapshotWindow = {
  first: SnapshotRow
  latest: SnapshotRow
  count: number
}

type TrendCandidate = {
  gameId: number
  playerDelta: number
  visitDelta: number
  growthPercent: number
  trendScore: number
  snapshotCount: number
  measuredFrom: string
  measuredTo: string
}

function getGrowthPercent(firstPlaying: number, playerDelta: number) {
  if (firstPlaying <= 0) {
    return playerDelta > 0 ? 100 : 0
  }

  return (playerDelta / firstPlaying) * 100
}

function getTrendScore(playerDelta: number, visitDelta: number, growthPercent: number) {
  const positivePlayers = Math.max(playerDelta, 0)
  const positiveVisits = Math.max(visitDelta, 0)
  const positiveGrowthPercent = Math.max(growthPercent, 0)

  return positivePlayers * 10 + positiveGrowthPercent + positiveVisits / 1000
}

function getSnapshotWindows(snapshots: SnapshotRow[]) {
  const windows = new Map<number, SnapshotWindow>()

  for (const snapshot of snapshots) {
    const existing = windows.get(snapshot.game_id)

    if (!existing) {
      windows.set(snapshot.game_id, {
        first: snapshot,
        latest: snapshot,
        count: 1,
      })
      continue
    }

    existing.count += 1

    if (new Date(snapshot.created_at) < new Date(existing.first.created_at)) {
      existing.first = snapshot
    }

    if (new Date(snapshot.created_at) > new Date(existing.latest.created_at)) {
      existing.latest = snapshot
    }
  }

  return windows
}

function getTrendCandidates(snapshots: SnapshotRow[]) {
  return Array.from(getSnapshotWindows(snapshots).entries())
    .filter(([, window]) => window.count >= 2)
    .map(([gameId, window]) => {
      const playerDelta = window.latest.playing - window.first.playing
      const visitDelta = window.latest.visits - window.first.visits
      const growthPercent = getGrowthPercent(window.first.playing, playerDelta)

      return {
        gameId,
        playerDelta,
        visitDelta,
        growthPercent,
        trendScore: getTrendScore(playerDelta, visitDelta, growthPercent),
        snapshotCount: window.count,
        measuredFrom: window.first.created_at,
        measuredTo: window.latest.created_at,
      }
    })
    .filter((candidate) => candidate.trendScore > 0)
    .sort((first, second) => second.trendScore - first.trendScore)
}

function toTrendingGame(game: Game, candidate: TrendCandidate, rank: number): TrendingGame {
  return {
    ...game,
    rank,
    playerDelta: candidate.playerDelta,
    visitDelta: candidate.visitDelta,
    growthPercent: candidate.growthPercent,
    trendScore: candidate.trendScore,
    snapshotCount: candidate.snapshotCount,
    measuredFrom: candidate.measuredFrom,
    measuredTo: candidate.measuredTo,
  }
}

export async function getTrendingGames(limit = DEFAULT_TRENDING_LIMIT): Promise<TrendingGame[]> {
  return getCachedOrFetch(`trending:${limit}`, async () => {
    const snapshots = await loadAllSnapshots()

  const candidates = getTrendCandidates(snapshots).slice(0, limit)

  const gameIds = candidates.map((candidate) => candidate.gameId)

  if (gameIds.length === 0) {
    return []
  }

  const { data: games, error: gamesError } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, description, thumbnail')
    .in('id', gameIds)

  if (gamesError) {
    throw gamesError
  }

  const gamesById = new Map((games ?? []).map((game) => [game.id, game as Game]))

  return candidates
    .map((candidate, index) => {
      const game = gamesById.get(candidate.gameId)

      return game ? toTrendingGame(game, candidate, index + 1) : null
    })
    .filter((game): game is TrendingGame => game !== null)
  }, 60)
}
