import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all')

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=60' },
    })
  }

  let query = supabase
    .from('clinic_updates')
    .select('*')
    .order('starts_at', { ascending: false })
    .limit(20)

  if (all !== 'true') {
    query = query
      .eq('active', true)
      .lte('starts_at', new Date().toISOString())
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  })
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const body = await request.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('clinic_updates')
    .insert({
      title: body.title,
      content: body.content || '',
      type: body.type || 'announcement',
      link: body.link || null,
      active: body.active ?? true,
      starts_at: body.starts_at || new Date().toISOString(),
      expires_at: body.expires_at || null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
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
    .from('clinic_updates')
    .update({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.link !== undefined && { link: body.link }),
      ...(body.active !== undefined && { active: body.active }),
      ...(body.starts_at !== undefined && { starts_at: body.starts_at }),
      ...(body.expires_at !== undefined && { expires_at: body.expires_at }),
    })
    .eq('id', body.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const isAdmin = await verifyAdminAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('clinic_updates')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
