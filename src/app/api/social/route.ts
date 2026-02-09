import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET() {
  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=3600' },
    })
  }

  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  })
}

export async function PUT(request: Request) {
  const isAdmin = await verifyAdminAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const body = await request.json()
  if (!body.id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('social_links')
    .update({
      ...(body.url !== undefined && { url: body.url }),
      ...(body.display_name !== undefined && { display_name: body.display_name }),
      ...(body.enabled !== undefined && { enabled: body.enabled }),
    })
    .eq('id', body.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
