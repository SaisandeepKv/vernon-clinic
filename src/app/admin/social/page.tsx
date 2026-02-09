'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'

interface SocialLink {
  id: string
  platform: string
  url: string
  display_name: string | null
  enabled: boolean
  sort_order: number
}

const platformIcons: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  practo: 'Practo',
  google: 'Google Business',
  facebook: 'Facebook',
  twitter: 'X (Twitter)',
}

export default function AdminSocialPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  const loadLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/social')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setLinks(data)
      }
    } catch { /* not configured */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadLinks() }, [loadLinks])

  async function updateLink(link: SocialLink, updates: Partial<SocialLink>) {
    setSaving(link.id)
    try {
      const res = await fetch('/api/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: link.id, ...updates }),
      })
      if (res.ok) await loadLinks()
    } catch { /* ignore */ }
    setSaving(null)
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-3xl">
        <div>
          <h1 className="text-2xl font-medium text-vernon-900">Social Media Links</h1>
          <p className="mt-1 text-sm text-vernon-500">
            Manage your clinic&apos;s social media profiles. These links appear across the website.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-vernon-200 bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
            </div>
          ) : links.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-vernon-500">
                Social links will appear here after running the Supabase migration.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-vernon-100">
              {links.map((link) => (
                <div key={link.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-vernon-900">
                        {platformIcons[link.platform] || link.platform}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-2xs ${link.enabled ? 'bg-clinical-50 text-clinical-700' : 'bg-vernon-100 text-vernon-500'}`}>
                        {link.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <button
                      onClick={() => updateLink(link, { enabled: !link.enabled })}
                      disabled={saving === link.id}
                      className="rounded px-3 py-1 text-xs text-vernon-500 hover:bg-vernon-50 disabled:opacity-50"
                    >
                      {link.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                  <div className="mt-2">
                    <input
                      type="url"
                      defaultValue={link.url}
                      onBlur={(e) => {
                        if (e.target.value !== link.url) {
                          updateLink(link, { url: e.target.value })
                        }
                      }}
                      className="block w-full rounded-lg border border-vernon-200 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
                      placeholder={`https://${link.platform}.com/...`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
