import { NextResponse } from 'next/server'
import { getCollectionGames } from '@/services/collection.service'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const games = await getCollectionGames(slug)

  return NextResponse.json({
    success: true,
    games,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}