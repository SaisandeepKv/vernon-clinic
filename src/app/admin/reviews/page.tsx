'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'

interface Review {
  id: string
  author_name: string
  rating: number
  text: string
  source: 'google' | 'practo' | 'manual'
  treatment_category: string | null
  location: string | null
  approved: boolean
  featured: boolean
  created_at: string
}

const emptyForm = {
  author_name: '',
  rating: 5,
  text: '',
  source: 'manual' as 'google' | 'practo' | 'manual',
  treatment_category: '',
  location: 'Banjara Hills',
  featured: false,
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews?all=true')
      if (res.ok) {
        const data = await res.json()
        if (data.reviews) setReviews(data.reviews)
      }
    } catch { /* not configured */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadReviews() }, [loadReviews])

  function startEdit(review: Review) {
    setFormData({
      author_name: review.author_name,
      rating: review.rating,
      text: review.text,
      source: review.source,
      treatment_category: review.treatment_category || '',
      location: review.location || 'Banjara Hills',
      featured: review.featured,
    })
    setEditingId(review.id)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId
        ? { ...formData, id: editingId }
        : { ...formData, approved: true }

      const res = await fetch('/api/reviews', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setShowForm(false)
        setEditingId(null)
        setFormData(emptyForm)
        await loadReviews()
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
    if (!confirm('Delete this review?')) return
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' })
      if (res.ok) await loadReviews()
    } catch { /* ignore */ }
  }

  async function toggleApproval(review: Review) {
    try {
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: review.id, approved: !review.approved }),
      })
      await loadReviews()
    } catch { /* ignore */ }
  }

  async function toggleFeatured(review: Review) {
    try {
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: review.id, featured: !review.featured }),
      })
      await loadReviews()
    } catch { /* ignore */ }
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-vernon-900">Reviews</h1>
            <p className="mt-1 text-sm text-vernon-500">Manage and moderate patient reviews</p>
          </div>
          <button
            onClick={() => { showForm ? setShowForm(false) : (setFormData(emptyForm), setEditingId(null), setShowForm(true)) }}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add Review'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-vernon-200 bg-white p-6">
            <h2 className="text-lg font-medium text-vernon-900">
              {editingId ? 'Edit Review' : 'Add Patient Review'}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-vernon-700">Patient Name</label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{'★'.repeat(r)}{'☆'.repeat(5 - r)} ({r}/5)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Treatment Category</label>
                <select
                  value={formData.treatment_category}
                  onChange={(e) => setFormData({ ...formData, treatment_category: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option>Hair Restoration</option>
                  <option>Pigmentation</option>
                  <option>Acne Scars</option>
                  <option>Aesthetics</option>
                  <option>Laser</option>
                  <option>Clinical Dermatology</option>
                  <option>Pediatric</option>
                  <option>General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  <option>Banjara Hills</option>
                  <option>Manikonda</option>
                  <option>Gachibowli</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-vernon-700">Review Text</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  required
                />
              </div>
              <div className="lg:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-vernon-300 text-clinical-600 focus:ring-clinical-500"
                  />
                  <span className="text-sm text-vernon-700">Featured review (shown prominently)</span>
                </label>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Saving...' : editingId ? 'Update Review' : 'Save Review'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews list */}
        <div className="mt-8 rounded-xl border border-vernon-200 bg-white">
          <div className="border-b border-vernon-100 px-6 py-4">
            <h3 className="text-sm font-medium text-vernon-900">
              {reviews.length > 0 ? `${reviews.length} Review${reviews.length !== 1 ? 's' : ''}` : 'No reviews yet'}
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-vernon-500">No reviews yet. Reviews seeded by the migration will appear here once Supabase is configured.</p>
            </div>
          ) : (
            <div className="divide-y divide-vernon-100">
              {reviews.map((review) => (
                <div key={review.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-vernon-900">{review.author_name}</p>
                        <span className="text-xs text-amber-500">{'★'.repeat(review.rating)}</span>
                        <span className="rounded-full bg-vernon-50 px-2 py-0.5 text-2xs text-vernon-500">
                          {review.source}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-vernon-600 line-clamp-2">{review.text}</p>
                      <p className="mt-1 text-xs text-vernon-400">
                        {review.treatment_category && `${review.treatment_category} · `}
                        {review.location && `${review.location} · `}
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-2xs ${review.approved ? 'bg-clinical-50 text-clinical-700' : 'bg-red-50 text-red-700'}`}>
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                      {review.featured && (
                        <span className="rounded-full bg-purple-50 px-2 py-0.5 text-2xs text-purple-700">Featured</span>
                      )}
                      <button onClick={() => toggleApproval(review)} className="rounded px-2 py-1 text-xs text-vernon-500 hover:bg-vernon-50">
                        {review.approved ? 'Reject' : 'Approve'}
                      </button>
                      <button onClick={() => toggleFeatured(review)} className="rounded px-2 py-1 text-xs text-vernon-500 hover:bg-vernon-50">
                        {review.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button onClick={() => startEdit(review)} className="rounded px-2 py-1 text-xs text-clinical-600 hover:bg-clinical-50">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(review.id)} className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
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
