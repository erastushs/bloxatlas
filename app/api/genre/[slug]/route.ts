import { NextRequest, NextResponse } from 'next/server'
import { getGamesByGenre } from '@/services/genre.service'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const games = await getGamesByGenre(slug)

  return NextResponse.json({
    success: true,
    games,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}