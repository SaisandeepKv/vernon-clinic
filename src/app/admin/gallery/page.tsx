'use client'

import { useEffect, useState, useCallback } from 'react'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { AdminShell } from '@/components/admin/AdminShell'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { SortableGalleryItem } from '@/components/admin/SortableGalleryItem'
import { BulkImageUpload } from '@/components/admin/BulkImageUpload'

interface GalleryItem {
  id: string
  title: string
  description: string | null
  category: string
  before_image: string
  after_image: string
  patient_age: string | null
  patient_gender: string | null
  sessions_count: string | null
  published: boolean
  sort_order: number
  created_at: string
}

const emptyForm = {
  title: '',
  description: '',
  category: 'Hair Transplant',
  before_image: '',
  after_image: '',
  patient_age: '',
  patient_gender: 'Male',
  sessions_count: '',
  published: true,
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showBulk, setShowBulk] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery?all=true')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setItems(data)
      }
    } catch { /* not configured */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadItems() }, [loadItems])

  function startEdit(item: GalleryItem) {
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      before_image: item.before_image,
      after_image: item.after_image,
      patient_age: item.patient_age || '',
      patient_gender: item.patient_gender || 'Male',
      sessions_count: item.sessions_count || '',
      published: item.published,
    })
    setEditingId(item.id)
    setShowForm(true)
    setShowBulk(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      const res = await fetch('/api/gallery', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setShowForm(false)
        setEditingId(null)
        setFormData(emptyForm)
        await loadItems()
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
    if (!confirm('Delete this gallery item?')) return
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      if (res.ok) await loadItems()
    } catch { /* ignore */ }
  }

  async function togglePublish(item: GalleryItem) {
    try {
      await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, published: !item.published }),
      })
      await loadItems()
    } catch { /* ignore */ }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)

    const reordered = arrayMove(items, oldIndex, newIndex)
    setItems(reordered)

    // Persist new sort_order
    const updates = reordered.map((item, i) => ({ id: item.id, sort_order: i }))
    try {
      await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updates }),
      })
    } catch { /* ignore */ }
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-vernon-900">Gallery</h1>
            <p className="mt-1 text-sm text-vernon-500">Manage before/after treatment images. Drag to reorder.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowBulk(!showBulk); setShowForm(false) }}
              className="btn-secondary"
            >
              {showBulk ? 'Cancel' : 'Bulk Upload'}
            </button>
            <button
              onClick={() => { showForm ? setShowForm(false) : (setFormData(emptyForm), setEditingId(null), setShowForm(true), setShowBulk(false)) }}
              className="btn-primary"
            >
              {showForm ? 'Cancel' : '+ Add Case'}
            </button>
          </div>
        </div>

        {showBulk && (
          <div className="mt-6">
            <BulkImageUpload
              folder="gallery"
              onComplete={(urls) => {
                alert(`${urls.length} images uploaded! Create gallery cases to pair before/after images.`)
              }}
            />
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-vernon-200 bg-white p-6">
            <h2 className="text-lg font-medium text-vernon-900">
              {editingId ? 'Edit Case' : 'Add Before/After Case'}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-vernon-700">Case Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="e.g., FUE Hair Transplant - 2800 grafts"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  <option>Hair Transplant</option>
                  <option>Acne Scar Treatment</option>
                  <option>Pigmentation / Melasma</option>
                  <option>Laser Treatment</option>
                  <option>Botox & Fillers</option>
                  <option>Skin Rejuvenation</option>
                  <option>Vitiligo Surgery</option>
                </select>
              </div>
              <ImageUpload
                label="Before Image"
                value={formData.before_image}
                onChange={(url) => setFormData({ ...formData, before_image: url })}
                folder="gallery/before"
              />
              <ImageUpload
                label="After Image"
                value={formData.after_image}
                onChange={(url) => setFormData({ ...formData, after_image: url })}
                folder="gallery/after"
              />
              <div>
                <label className="block text-sm font-medium text-vernon-700">Patient Age</label>
                <input
                  type="text"
                  value={formData.patient_age}
                  onChange={(e) => setFormData({ ...formData, patient_age: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="e.g., 32 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Patient Gender</label>
                <select
                  value={formData.patient_gender}
                  onChange={(e) => setFormData({ ...formData, patient_gender: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Sessions</label>
                <input
                  type="text"
                  value={formData.sessions_count}
                  onChange={(e) => setFormData({ ...formData, sessions_count: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="e.g., 5 sessions"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-vernon-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="Treatment details..."
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Saving...' : editingId ? 'Update Case' : 'Save Case'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Gallery list with DnD */}
        <div className="mt-8 rounded-xl border border-vernon-200 bg-white">
          <div className="border-b border-vernon-100 px-6 py-4">
            <h3 className="text-sm font-medium text-vernon-900">
              {items.length > 0 ? `${items.length} Case${items.length !== 1 ? 's' : ''}` : 'No gallery items yet'}
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
            </div>
          ) : items.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-vernon-500">No gallery items yet. Add your first before/after case above.</p>
            </div>
          ) : (
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <div className="divide-y divide-vernon-100">
                  {items.map((item) => (
                    <SortableGalleryItem
                      key={item.id}
                      item={item}
                      onTogglePublish={togglePublish}
                      onEdit={startEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
