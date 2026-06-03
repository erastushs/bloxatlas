import { NextRequest, NextResponse } from 'next/server'
import { getFastestGrowingGames } from '@/services/fastest-growing.service'

const DEFAULT_LIMIT = 12
const MAX_LIMIT = 25

function parseLimit(request: NextRequest) {
  const value = Number(request.nextUrl.searchParams.get('limit') ?? DEFAULT_LIMIT)

  if (!Number.isFinite(value)) {
    return DEFAULT_LIMIT
  }

  return Math.min(Math.max(Math.trunc(value), 1), MAX_LIMIT)
}

export async function GET(request: NextRequest) {
  try {
    const games = await getFastestGrowingGames(parseLimit(request))

    return NextResponse.json({
      success: true,
      games,
      ranking: {
        metric: 'growthPercent',
        secondaryMetric: 'playerDelta',
        window: 'recent snapshots',
      },
    })
  } catch (error) {
    console.error('Failed to load fastest growing games', error)

    return NextResponse.json(
      {
        success: false,
        games: [],
        error: 'Failed to load fastest growing games',
      },
      { status: 500 }
    )
  }
}
