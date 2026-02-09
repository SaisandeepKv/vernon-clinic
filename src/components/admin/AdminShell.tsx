'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'
import { AdminAuthProvider } from './AdminAuthProvider'

interface AdminShellProps {
  children: React.ReactNode
}

function AdminShellInner({ children }: AdminShellProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/verify')
        if (res.ok) {
          setAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      } catch {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vernon-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
      </div>
    )
  }

  if (!authenticated) return null

  return (
    <div className="flex min-h-screen bg-vernon-50">
      <AdminSidebar onLogout={handleLogout} />
      <main className="ml-60 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <AdminAuthProvider>
      <AdminShellInner>{children}</AdminShellInner>
    </AdminAuthProvider>
  )
}
