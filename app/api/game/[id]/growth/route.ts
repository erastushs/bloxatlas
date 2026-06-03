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
  })
}
