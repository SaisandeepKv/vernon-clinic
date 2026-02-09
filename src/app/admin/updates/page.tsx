'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'

interface ClinicUpdate {
  id: string
  title: string
  content: string
  type: 'announcement' | 'offer' | 'news' | 'event'
  link: string | null
  active: boolean
  starts_at: string
  expires_at: string | null
  created_at: string
}

const emptyForm = {
  title: '',
  content: '',
  type: 'announcement' as 'announcement' | 'offer' | 'news' | 'event',
  link: '',
  starts_at: new Date().toISOString().split('T')[0],
  expires_at: '',
  active: true,
}

const typeColors: Record<string, string> = {
  announcement: 'bg-clinical-50 text-clinical-700',
  offer: 'bg-emerald-50 text-emerald-700',
  news: 'bg-vernon-100 text-vernon-700',
  event: 'bg-indigo-50 text-indigo-700',
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<ClinicUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const loadUpdates = useCallback(async () => {
    try {
      const res = await fetch('/api/updates?all=true')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setUpdates(data)
      }
    } catch { /* not configured */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadUpdates() }, [loadUpdates])

  function startEdit(update: ClinicUpdate) {
    setFormData({
      title: update.title,
      content: update.content,
      type: update.type,
      link: update.link || '',
      starts_at: update.starts_at.split('T')[0],
      expires_at: update.expires_at ? update.expires_at.split('T')[0] : '',
      active: update.active,
    })
    setEditingId(update.id)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId
        ? { ...formData, id: editingId, expires_at: formData.expires_at || null }
        : { ...formData, expires_at: formData.expires_at || null }

      const res = await fetch('/api/updates', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setShowForm(false)
        setEditingId(null)
        setFormData(emptyForm)
        await loadUpdates()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } catch {
      alert('Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this update?')) return
    try {
      const res = await fetch(`/api/updates?id=${id}`, { method: 'DELETE' })
      if (res.ok) await loadUpdates()
    } catch { /* ignore */ }
  }

  async function toggleActive(update: ClinicUpdate) {
    try {
      await fetch('/api/updates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: update.id, active: !update.active }),
      })
      await loadUpdates()
    } catch { /* ignore */ }
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-vernon-900">Clinic Updates</h1>
            <p className="mt-1 text-sm text-vernon-500">Manage announcements, offers, and news banners</p>
          </div>
          <button
            onClick={() => { showForm ? setShowForm(false) : (setFormData(emptyForm), setEditingId(null), setShowForm(true)) }}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ New Update'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-vernon-200 bg-white p-6">
            <h2 className="text-lg font-medium text-vernon-900">
              {editingId ? 'Edit Update' : 'Create Clinic Update'}
            </h2>
            <p className="mt-1 text-sm text-vernon-500">This will appear as a banner at the top of the website.</p>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-vernon-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as typeof formData.type })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  <option value="announcement">Announcement</option>
                  <option value="offer">Special Offer</option>
                  <option value="news">News</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-vernon-700">Description</label>
                <input
                  type="text"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="Additional details..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Link (optional)</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="/contact or https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Expires On (optional)</label>
                <input
                  type="date"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 rounded-lg border border-vernon-200 p-4">
              <p className="text-xs font-medium text-vernon-400">Banner Preview:</p>
              <div className={`mt-2 rounded-lg ${formData.type === 'offer' ? 'bg-emerald-600' : formData.type === 'event' ? 'bg-indigo-600' : 'bg-clinical-600'} px-4 py-2 text-sm font-medium text-white`}>
                {formData.title || 'Enter a title above...'}
                {formData.content && <span className="ml-2 font-normal opacity-80">— {formData.content}</span>}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Saving...' : editingId ? 'Update' : 'Publish Update'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Updates list */}
        <div className="mt-8 rounded-xl border border-vernon-200 bg-white">
          <div className="border-b border-vernon-100 px-6 py-4">
            <h3 className="text-sm font-medium text-vernon-900">
              {updates.length > 0 ? `${updates.length} Update${updates.length !== 1 ? 's' : ''}` : 'No updates yet'}
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
            </div>
          ) : updates.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-vernon-500">No clinic updates yet. Create your first announcement above.</p>
            </div>
          ) : (
            <div className="divide-y divide-vernon-100">
              {updates.map((update) => (
                <div key={update.id} className="flex items-center justify-between px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-2xs ${typeColors[update.type] || 'bg-vernon-50 text-vernon-600'}`}>
                        {update.type}
                      </span>
                      <p className="truncate text-sm font-medium text-vernon-900">{update.title}</p>
                    </div>
                    {update.content && <p className="mt-0.5 text-xs text-vernon-500 truncate">{update.content}</p>}
                    <p className="text-xs text-vernon-400">
                      Started {new Date(update.starts_at).toLocaleDateString()}
                      {update.expires_at && ` · Expires ${new Date(update.expires_at).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-2xs ${update.active ? 'bg-clinical-50 text-clinical-700' : 'bg-vernon-100 text-vernon-500'}`}>
                      {update.active ? 'Active' : 'Inactive'}
                    </span>
                    <button onClick={() => toggleActive(update)} className="rounded px-2 py-1 text-xs text-vernon-500 hover:bg-vernon-50">
                      {update.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => startEdit(update)} className="rounded px-2 py-1 text-xs text-clinical-600 hover:bg-clinical-50">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(update.id)} className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50">
                      Delete
                    </button>
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
