import { NextResponse } from 'next/server'
import { verifyAdminAuth } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase'
import { getAllSettings } from '@/lib/settings'

export async function GET() {
  const settings = await getAllSettings()
  return NextResponse.json(settings, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
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

  const updates: Record<string, string> = await request.json()

  const errors: string[] = []
  for (const [key, value] of Object.entries(updates)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('site_settings')
      .upsert({
        key,
        value,
        updated_at: new Date().toISOString(),
      })

    if (error) errors.push(`${key}: ${error.message}`)
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join('; ') }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
