'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'

interface AdminProfile {
  id: string
  email: string
  display_name: string
  role: string
  avatar_url: string | null
  created_at: string
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteName, setInviteName] = useState('')
  const [inviteRole, setInviteRole] = useState('admin')
  const [saving, setSaving] = useState(false)

  const loadAdmins = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/verify')
      if (!res.ok) return
      const verifyData = await res.json()
      if (verifyData.role !== 'super_admin') return

      // Fetch admin profiles via a dedicated endpoint or directly
      // For now we'll load from the verify endpoint's context
      // In production, you'd add a GET /api/admin/admins route
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadAdmins() }, [loadAdmins])

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inviteEmail,
          displayName: inviteName,
          role: inviteRole,
        }),
      })
      if (res.ok) {
        setShowInvite(false)
        setInviteEmail('')
        setInviteName('')
        setInviteRole('admin')
        await loadAdmins()
        alert('Invitation sent!')
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to invite')
      }
    } catch {
      alert('Failed to send invite')
    }
    setSaving(false)
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-vernon-900">Admin Users</h1>
            <p className="mt-1 text-sm text-vernon-500">Manage who has access to this admin panel</p>
          </div>
          <button onClick={() => setShowInvite(!showInvite)} className="btn-primary">
            {showInvite ? 'Cancel' : '+ Invite Admin'}
          </button>
        </div>

        {showInvite && (
          <form onSubmit={handleInvite} className="mt-6 rounded-xl border border-vernon-200 bg-white p-6">
            <h2 className="text-lg font-medium text-vernon-900">Invite New Admin</h2>
            <p className="mt-1 text-sm text-vernon-500">They will receive an email to set their password.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-vernon-700">Email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="admin@vernonskinclinic.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Display Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="Dr. Reddy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </form>
        )}

        {/* Admin list */}
        <div className="mt-8 rounded-xl border border-vernon-200 bg-white">
          <div className="border-b border-vernon-100 px-6 py-4">
            <h3 className="text-sm font-medium text-vernon-900">Active Admins</h3>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
            </div>
          ) : admins.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-vernon-500">
                Admin profiles will appear here once Supabase Auth is configured and admins are invited.
              </p>
              <p className="mt-2 text-xs text-vernon-400">
                Currently using HMAC authentication. Set up Supabase Auth to enable multi-admin.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-vernon-100">
              {admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clinical-100 text-sm font-medium text-clinical-700">
                      {admin.display_name[0]?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vernon-900">{admin.display_name}</p>
                      <p className="text-xs text-vernon-400">{admin.email}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-2xs font-medium ${
                    admin.role === 'super_admin'
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-clinical-50 text-clinical-700'
                  }`}>
                    {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
