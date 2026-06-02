import { NextResponse } from 'next/server'
import { getSnapshots } from '@/services/stats.service'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const snapshots = await getSnapshots(Number(id))

  return NextResponse.json({
    success: true,
    snapshots,
  })
}
