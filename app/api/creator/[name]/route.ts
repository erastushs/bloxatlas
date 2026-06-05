import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params
  const creator = decodeURIComponent(name)

  const { data: games } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, thumbnail')
    .ilike('creator', creator)
    .order('playing', { ascending: false })
    .limit(50)

  return NextResponse.json({
    success: true,
    creator,
    games: games ?? [],
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}