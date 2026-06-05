import { NextResponse } from 'next/server'
import { getGameById } from '@/services/game.service'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const game = await getGameById(Number(id))

  return NextResponse.json({
    success: true,
    game,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
