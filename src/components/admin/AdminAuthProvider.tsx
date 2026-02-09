'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'

interface AdminUser {
  id: string
  email: string
  role: 'super_admin' | 'admin'
  displayName: string
  avatarUrl?: string
  method: 'supabase' | 'hmac'
}

interface AdminAuthContextType {
  user: AdminUser | null
  loading: boolean
  supabase: SupabaseClient | null
  signOut: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  supabase: null,
  signOut: async () => {},
})

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase] = useState<SupabaseClient | null>(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    return createClient(url, key)
  })

  const loadSupabaseUser = useCallback(async (sbUser: User) => {
    if (!supabase) return
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role, display_name, avatar_url')
      .eq('id', sbUser.id)
      .single()

    if (profile) {
      setUser({
        id: sbUser.id,
        email: sbUser.email || '',
        role: profile.role as 'super_admin' | 'admin',
        displayName: profile.display_name || sbUser.email || '',
        avatarUrl: profile.avatar_url || undefined,
        method: 'supabase',
      })
    }
  }, [supabase])

  useEffect(() => {
    async function init() {
      // Try Supabase Auth
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          await loadSupabaseUser(session.user)
          setLoading(false)
          return
        }
      }

      // Fall back to HMAC verify
      try {
        const res = await fetch('/api/admin/verify')
        if (res.ok) {
          const data = await res.json()
          setUser({
            id: '',
            email: data.email || '',
            role: data.role || 'admin',
            displayName: data.displayName || 'Admin',
            method: 'hmac',
          })
        }
      } catch {
        // Not authenticated
      }
      setLoading(false)
    }

    init()

    // Listen for Supabase auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadSupabaseUser(session.user)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      })
      return () => subscription.unsubscribe()
    }
  }, [supabase, loadSupabaseUser])

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    await fetch('/api/admin/logout', { method: 'POST' })
    setUser(null)
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, supabase, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  )
}
