import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') || '12')
  const all = searchParams.get('all')

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ reviews: [], source: 'static' }, {
      headers: { 'Cache-Control': 'public, s-maxage=60' },
    })
  }

  try {
    let query = supabase
      .from('reviews')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (all !== 'true') {
      query = query.eq('approved', true)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ reviews: [], source: 'error' }, { status: 500 })
    }

    return NextResponse.json(
      { reviews: data || [], source: 'supabase' },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch {
    return NextResponse.json({ reviews: [], source: 'error' }, { status: 500 })
  }
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
    .from('reviews')
    .insert({
      author_name: body.author_name,
      rating: body.rating || 5,
      text: body.text,
      source: body.source || 'manual',
      source_url: body.source_url || null,
      treatment_category: body.treatment_category || null,
      location: body.location || null,
      approved: body.approved ?? true,
      featured: body.featured ?? false,
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
    .from('reviews')
    .update({
      ...(body.author_name !== undefined && { author_name: body.author_name }),
      ...(body.rating !== undefined && { rating: body.rating }),
      ...(body.text !== undefined && { text: body.text }),
      ...(body.source !== undefined && { source: body.source }),
      ...(body.treatment_category !== undefined && { treatment_category: body.treatment_category }),
      ...(body.location !== undefined && { location: body.location }),
      ...(body.approved !== undefined && { approved: body.approved }),
      ...(body.featured !== undefined && { featured: body.featured }),
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
    .from('reviews')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
