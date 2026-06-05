import { NextRequest, NextResponse } from 'next/server'
import { getTopActiveGames } from '@/services/top-active.service'

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
    const games = await getTopActiveGames(parseLimit(request))

    return NextResponse.json({
      success: true,
      games,
      ranking: {
        metric: 'playing',
        secondaryMetric: 'visits',
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=59',
      },
    })
  } catch (error) {
    console.error('Failed to load top active games', error)

    return NextResponse.json(
      {
        success: false,
        games: [],
        error: 'Failed to load top active games',
      },
      { status: 500 }
    )
  }
}
