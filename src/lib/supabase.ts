import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let _supabase: SupabaseClient<Database> | null = null

// Client-side Supabase client (uses anon key, respects RLS)
// Returns null if env vars are not configured
export function getSupabase(): SupabaseClient<Database> | null {
  if (!supabaseUrl || !supabaseAnonKey) return null
  if (!_supabase) {
    _supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

// Server-side Supabase client (uses service role key, bypasses RLS)
// Only use in API routes and server components
// Returns null if env vars are not configured
export function createServerClient(): SupabaseClient<Database> | null {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  if (!supabaseUrl || !serviceRoleKey) return null
  return createClient<Database>(supabaseUrl, serviceRoleKey)
}
