import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    games: [
      {
        id: 1,
        name: 'Grow A Garden',
        creator: 'The Garden Game',
        playing: 1200000,
        visits: 5000000000,
        thumbnail: '',
      },
      {
        id: 2,
        name: 'Blue Lock Rivals',
        creator: 'Blue Lock Community',
        playing: 350000,
        visits: 1000000000,
        thumbnail: '',
      },
    ],
  })
}
