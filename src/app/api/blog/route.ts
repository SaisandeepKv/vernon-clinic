import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') || '20')
  const all = searchParams.get('all') // admin: include drafts

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=60' },
    })
  }

  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  // Only filter by published for public requests
  if (all !== 'true') {
    query = query.eq('published', true)
  }

  if (category) {
    query = query.eq('category', category)
  }

  if (featured === 'true') {
    query = query.eq('featured', true)
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
    .from('blog_posts')
    .insert({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt || '',
      content: body.content || '',
      category: body.category || 'Clinical Dermatology',
      author: body.author || 'Dr. R. Brahmananda Reddy',
      cover_image: body.cover_image || null,
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.excerpt,
      published: body.published ?? false,
      featured: body.featured ?? false,
      read_time: body.read_time || '5 min read',
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
    .from('blog_posts')
    .update({
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.author !== undefined && { author: body.author }),
      ...(body.cover_image !== undefined && { cover_image: body.cover_image }),
      ...(body.meta_title !== undefined && { meta_title: body.meta_title }),
      ...(body.meta_description !== undefined && { meta_description: body.meta_description }),
      ...(body.published !== undefined && { published: body.published }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.read_time !== undefined && { read_time: body.read_time }),
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
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
