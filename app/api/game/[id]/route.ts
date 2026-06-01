import { NextResponse } from 'next/server'
import { fetchTrendingGames } from '@/services/game.service'

export async function GET() {
  try {
    const games = await fetchTrendingGames()

    return NextResponse.json(games)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
  }
}
