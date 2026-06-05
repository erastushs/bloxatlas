import { NextRequest, NextResponse } from 'next/server'
import { searchGames, type SortOption } from '@/services/search.service'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const query = sp.get('q') || undefined
  const sort = (sp.get('sort') as SortOption) || undefined
  const genre = sp.get('genre') || undefined
  const page = Number(sp.get('page')) || 1
  const limit = Math.min(Number(sp.get('limit')) || 24, 50)

  const result = await searchGames({ query, sort, genre, page, limit })

  return NextResponse.json({
    success: true,
    ...result,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}