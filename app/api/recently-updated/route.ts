import { NextRequest, NextResponse } from 'next/server'
import { getRecentlyUpdatedGames } from '@/services/recently-updated.service'

const DEFAULT_LIMIT = 12
const MAX_LIMIT = 50

function parseLimit(request: NextRequest) {
  const value = Number(request.nextUrl.searchParams.get('limit') ?? DEFAULT_LIMIT)

  if (!Number.isFinite(value)) {
    return DEFAULT_LIMIT
  }

  return Math.min(Math.max(Math.trunc(value), 1), MAX_LIMIT)
}

export async function GET(request: NextRequest) {
  try {
    const games = await getRecentlyUpdatedGames(parseLimit(request))

    return NextResponse.json({
      success: true,
      games,
      ranking: {
        metric: 'last_synced_at',
        secondaryMetric: 'playing',
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Failed to load recently updated games', error)

    return NextResponse.json(
      {
        success: false,
        games: [],
        error: 'Failed to load recently updated games',
      },
      { status: 500 }
    )
  }
}
