import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // jalankan snapshot

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
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
