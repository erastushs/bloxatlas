import { NextResponse } from 'next/server'
import { getSiteStats } from '@/services/analytics.service'

export async function GET() {
  const stats = await getSiteStats()

  return NextResponse.json({
    success: true,
    stats,
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
