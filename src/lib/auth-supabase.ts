import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

interface AuthResult {
  authenticated: boolean
  userId: string | null
  email: string | null
  role: 'super_admin' | 'admin' | null
  displayName: string | null
}

/**
 * Verify admin auth using Supabase Auth session tokens.
 * Reads the sb-*-auth-token cookie that Supabase client sets.
 */
export async function verifySupabaseAuth(): Promise<AuthResult> {
  const fail: AuthResult = { authenticated: false, userId: null, email: null, role: null, displayName: null }

  if (!supabaseUrl || !supabaseServiceKey) return fail

  try {
    const cookieStore = await cookies()
    // Supabase stores auth in sb-<project-ref>-auth-token
    const allCookies = cookieStore.getAll()
    const authCookie = allCookies.find(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

    if (!authCookie) return fail

    let accessToken: string
    try {
      // Cookie value is a JSON array: [access_token, refresh_token]
      const parsed = JSON.parse(authCookie.value)
      accessToken = Array.isArray(parsed) ? parsed[0] : parsed.access_token || parsed
    } catch {
      accessToken = authCookie.value
    }

    if (!accessToken) return fail

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)

    if (error || !user) return fail

    // Get admin profile with role
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role, display_name')
      .eq('id', user.id)
      .single()

    if (!profile) return fail

    return {
      authenticated: true,
      userId: user.id,
      email: user.email || null,
      role: profile.role as 'super_admin' | 'admin',
      displayName: profile.display_name || user.email || null,
    }
  } catch {
    return fail
  }
}
