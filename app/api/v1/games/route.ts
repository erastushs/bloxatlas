import { NextRequest, NextResponse } from 'next/server'
import { searchGames } from '@/services/search.service'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const query = sp.get('q') || undefined
  const page = Math.max(1, Number(sp.get('page')) || 1)
  const limit = Math.min(Number(sp.get('limit')) || 20, 50)

  const result = await searchGames({ query, page, limit })

  return NextResponse.json({
    success: true,
    ...result,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      'X-RateLimit-Limit': '60',
      'X-RateLimit-Remaining': '59',
    },
  })
}