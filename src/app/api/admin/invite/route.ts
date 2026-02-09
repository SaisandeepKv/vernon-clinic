import { NextResponse } from 'next/server'
import { verifyAdminAuthUnified } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const auth = await verifyAdminAuthUnified()
  if (!auth.authenticated || auth.role !== 'super_admin') {
    return NextResponse.json({ error: 'Super admin access required' }, { status: 403 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const { email, displayName, role } = await request.json()
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  // Invite user via Supabase Auth (sends email)
  const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email)

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 500 })
  }

  if (inviteData.user) {
    // Create admin profile
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('admin_profiles').insert({
      id: inviteData.user.id,
      email,
      display_name: displayName || email.split('@')[0],
      role: role || 'admin',
    })
  }

  return NextResponse.json({ success: true, userId: inviteData.user?.id })
}
