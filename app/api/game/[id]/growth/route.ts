import { NextResponse } from 'next/server'

import { getGameGrowth } from '@/services/growth.service'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  },
) {
  const { id } = await params

  const growth = await getGameGrowth(Number(id))

  return NextResponse.json({
    success: true,
    growth,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  })
}
