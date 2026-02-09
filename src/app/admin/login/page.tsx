'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasSupabase, setHasSupabase] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if Supabase is configured for email/password auth
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setHasSupabase(!!(url && key))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Try Supabase Auth first if configured
      if (hasSupabase) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(url, key)

        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (!authError) {
          router.push('/admin')
          return
        }
        // If Supabase login fails, fall through to HMAC
      }

      // Fall back to HMAC login (username/password)
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        setError('Invalid credentials')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-vernon-950">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-vernon-900">
            <span className="font-display text-2xl font-semibold text-white">V</span>
          </div>
          <h1 className="mt-4 font-display text-2xl font-medium text-vernon-900">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-vernon-500">
            Vernon Skin & Hair Clinic
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-vernon-700">
              {hasSupabase ? 'Email' : 'Username'}
            </label>
            <input
              id="email"
              type={hasSupabase ? 'email' : 'text'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm text-vernon-900 placeholder-vernon-400 focus:border-clinical-500 focus:outline-none focus:ring-2 focus:ring-clinical-500/20"
              placeholder={hasSupabase ? 'admin@vernonskinclinic.com' : 'admin'}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-vernon-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm text-vernon-900 placeholder-vernon-400 focus:border-clinical-500 focus:outline-none focus:ring-2 focus:ring-clinical-500/20"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
