import { NextRequest, NextResponse } from 'next/server'
import { getPopularGames } from '@/services/home.service'

const DEFAULT_LIMIT = 9
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
    const games = await getPopularGames(parseLimit(request))

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
    console.error('Failed to load popular games ranking', error)

    return NextResponse.json(
      {
        success: false,
        games: [],
        error: 'Failed to load popular games ranking',
      },
      { status: 500 }
    )
  }
}
