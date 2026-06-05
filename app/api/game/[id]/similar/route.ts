import { NextResponse } from 'next/server'
import { getSimilarGames } from '@/services/similar.service'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const games = await getSimilarGames(Number(id))

  return NextResponse.json({
    success: true,
    games,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}