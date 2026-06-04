import { supabase } from '@/lib/supabase'
import type { FastestGrowingGame, Game } from '@/types/game'

import { loadAllSnapshots } from '@/lib/load-all-snapshots'

const DEFAULT_FASTEST_GROWING_LIMIT = 12

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

type GrowthCandidate = {
  gameId: number
  playerDelta: number
  visitDelta: number
  growthPercent: number
  growthScore: number
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

function getGrowthCandidates(snapshots: SnapshotRow[]) {
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
        growthScore: growthPercent,
        snapshotCount: window.count,
        measuredFrom: window.first.created_at,
        measuredTo: window.latest.created_at,
      }
    })
    .filter((candidate) => candidate.playerDelta > 0 && candidate.growthPercent > 0)
    .sort((first, second) => {
      if (second.growthPercent !== first.growthPercent) {
        return second.growthPercent - first.growthPercent
      }

      return second.playerDelta - first.playerDelta
    })
}

function toFastestGrowingGame(game: Game, candidate: GrowthCandidate, rank: number): FastestGrowingGame {
  return {
    ...game,
    rank,
    playerDelta: candidate.playerDelta,
    visitDelta: candidate.visitDelta,
    growthPercent: candidate.growthPercent,
    growthScore: candidate.growthScore,
    snapshotCount: candidate.snapshotCount,
    measuredFrom: candidate.measuredFrom,
    measuredTo: candidate.measuredTo,
  }
}

export async function getFastestGrowingGames(limit = DEFAULT_FASTEST_GROWING_LIMIT): Promise<FastestGrowingGame[]> {
  const snapshots = await loadAllSnapshots()

  const candidates = getGrowthCandidates(snapshots).slice(0, limit)
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

      return game ? toFastestGrowingGame(game, candidate, index + 1) : null
    })
    .filter((game): game is FastestGrowingGame => game !== null)
}
