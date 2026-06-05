import { NextRequest, NextResponse } from 'next/server'
import { getTrendingGames } from '@/services/trending.service'
import { getFastestGrowingGames } from '@/services/fastest-growing.service'
import { getPopularGames } from '@/services/home.service'

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type') || 'popular'
  const limit = Math.min(Number(request.nextUrl.searchParams.get('limit')) || 12, 25)

  let games

  switch (type) {
    case 'trending':
      games = await getTrendingGames(limit)
      break
    case 'fastest-growing':
      games = await getFastestGrowingGames(limit)
      break
    default:
      games = await getPopularGames(limit)
  }

  return NextResponse.json({
    success: true,
    type,
    games,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=59',
      'X-RateLimit-Limit': '60',
      'X-RateLimit-Remaining': '59',
    },
  })
}