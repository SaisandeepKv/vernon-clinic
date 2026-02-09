import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '30')
  const all = searchParams.get('all')

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=60' },
    })
  }

  let query = supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (all !== 'true') {
    query = query.eq('published', true)
  }

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
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
    .from('gallery_items')
    .insert({
      title: body.title,
      description: body.description || null,
      category: body.category,
      before_image: body.before_image,
      after_image: body.after_image,
      treatment_slug: body.treatment_slug || null,
      patient_age: body.patient_age || null,
      patient_gender: body.patient_gender || null,
      sessions_count: body.sessions_count || null,
      published: body.published ?? true,
      sort_order: body.sort_order ?? 0,
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
    .from('gallery_items')
    .update({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.before_image !== undefined && { before_image: body.before_image }),
      ...(body.after_image !== undefined && { after_image: body.after_image }),
      ...(body.treatment_slug !== undefined && { treatment_slug: body.treatment_slug }),
      ...(body.patient_age !== undefined && { patient_age: body.patient_age }),
      ...(body.patient_gender !== undefined && { patient_gender: body.patient_gender }),
      ...(body.sessions_count !== undefined && { sessions_count: body.sessions_count }),
      ...(body.published !== undefined && { published: body.published }),
      ...(body.sort_order !== undefined && { sort_order: body.sort_order }),
    })
    .eq('id', body.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const isAdmin = await verifyAdminAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const { items } = await request.json()
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: 'Items array required' }, { status: 400 })
  }

  const errors: string[] = []
  for (const item of items) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('gallery_items')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id)

    if (error) errors.push(error.message)
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join('; ') }, { status: 500 })
  }

  return NextResponse.json({ success: true })
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
    .from('gallery_items')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
