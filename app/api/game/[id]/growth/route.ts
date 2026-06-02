import { NextResponse } from 'next/server'
import { getGrowth } from '@/services/stats.service'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const growth = await getGrowth(Number(id))

  return NextResponse.json({
    success: true,
    growth,
  })
}
