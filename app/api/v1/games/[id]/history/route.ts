import { NextResponse } from 'next/server'
import { getGameGrowth } from '@/services/growth.service'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const history = await getGameGrowth(Number(id))

  return NextResponse.json({
    success: true,
    history,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      'X-RateLimit-Limit': '60',
      'X-RateLimit-Remaining': '59',
    },
  })
}