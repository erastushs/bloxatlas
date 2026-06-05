import { NextRequest, NextResponse } from 'next/server'
import { getTrendingGames } from '@/services/trending.service'

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
    const games = await getTrendingGames(parseLimit(request))

    return NextResponse.json({
      success: true,
      games,
      ranking: {
        metric: 'trendScore',
        window: 'recent snapshots',
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Failed to load trending games', error)

    return NextResponse.json(
      {
        success: false,
        games: [],
        error: 'Failed to load trending games',
      },
      { status: 500 }
    )
  }
}
