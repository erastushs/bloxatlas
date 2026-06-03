import { NextResponse } from 'next/server'
import { syncGames } from '@/collector/jobs/sync-games'

export async function GET() {
  try {
    await syncGames()

    return NextResponse.json({
      success: true,
      message: 'Sync completed',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    )
  }
}
