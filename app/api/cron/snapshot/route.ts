import { NextResponse } from 'next/server'
import { snapshotGames } from '@/collector/jobs/snapshot-games'

export async function GET() {
  try {
    await snapshotGames()

    return NextResponse.json({
      success: true,
      message: 'Snapshot completed',
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
