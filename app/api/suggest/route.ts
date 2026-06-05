import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')

  if (!q || q.length < 2) {
    return NextResponse.json({ success: true, suggestions: [] })
  }

  const { data } = await supabase
    .from('games')
    .select('id, name')
    .ilike('name', `${q}%`)
    .order('playing', { ascending: false })
    .limit(8)

  return NextResponse.json({
    success: true,
    suggestions: data ?? [],
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}