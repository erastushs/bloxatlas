import { NextResponse } from 'next/server'
import { getPopularGames } from '@/services/home.service'

export async function GET() {
  const games = await getPopularGames()

  return NextResponse.json({
    success: true,
    games,
  })
}
