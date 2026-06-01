import { NextRequest, NextResponse } from 'next/server'
import { searchGames } from '@/services/search.service'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  const games = await searchGames(query || undefined)

  return NextResponse.json({
    success: true,
    games,
  })
}
