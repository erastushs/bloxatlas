import { NextResponse } from 'next/server'
import { getRelatedGames } from '@/services/related.service'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const games = await getRelatedGames(Number(id))

  return NextResponse.json({
    success: true,
    games,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}