'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { AdminShell } from '@/components/admin/AdminShell'
import { TiptapEditor } from '@/components/admin/TiptapEditor'
import { BlogSeoFields } from '@/components/admin/BlogSeoFields'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  cover_image: string | null
  published: boolean
  featured: boolean
  read_time: string
  created_at: string
}

const emptyForm = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Clinical Dermatology',
  author: 'Dr. R. Brahmananda Reddy',
  cover_image: '',
  read_time: '5 min read',
  meta_title: '',
  meta_description: '',
  featured: false,
  published: true,
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/blog?all=true')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setPosts(data)
      }
    } catch { /* Supabase not configured */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadPosts() }, [loadPosts])

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  function startEdit(post: BlogPost) {
    setFormData({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      cover_image: post.cover_image || '',
      read_time: post.read_time,
      meta_title: '',
      meta_description: '',
      featured: post.featured,
      published: post.published,
    })
    setEditingId(post.id)
    setShowForm(true)
  }

  function startNew() {
    setFormData(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      const res = await fetch('/api/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setShowForm(false)
        setEditingId(null)
        setFormData(emptyForm)
        await loadPosts()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save')
      }
    } catch {
      alert('Failed to save. Check your connection.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' })
      if (res.ok) await loadPosts()
    } catch { /* ignore */ }
  }

  async function togglePublish(post: BlogPost) {
    try {
      await fetch('/api/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, published: !post.published }),
      })
      await loadPosts()
    } catch { /* ignore */ }
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-vernon-900">Blog Posts</h1>
            <p className="mt-1 text-sm text-vernon-500">Create and manage blog articles</p>
          </div>
          <button onClick={() => showForm ? setShowForm(false) : startNew()} className="btn-primary">
            {showForm ? 'Cancel' : '+ New Post'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-vernon-200 bg-white p-6">
            <h2 className="text-lg font-medium text-vernon-900">
              {editingId ? 'Edit Post' : 'Create New Post'}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-vernon-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: editingId ? formData.slug : generateSlug(e.target.value),
                  })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 bg-vernon-50 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                >
                  <option>Clinical Dermatology</option>
                  <option>Hair Restoration</option>
                  <option>Laser Technology</option>
                  <option>Aesthetics</option>
                  <option>Skin Science</option>
                  <option>Patient Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-vernon-700">Read Time</label>
                <input
                  type="text"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-vernon-700">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full rounded-lg border border-vernon-200 px-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none"
                  placeholder="Brief description for listing pages..."
                />
              </div>
              <div className="lg:col-span-2">
                <ImageUpload
                  label="Cover Image"
                  value={formData.cover_image}
                  onChange={(url) => setFormData({ ...formData, cover_image: url })}
                  folder="blog"
                />
              </div>
              <div className="lg:col-span-2">
                <TiptapEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write your article content here..."
                />
              </div>
              <div className="lg:col-span-2">
                <BlogSeoFields
                  metaTitle={formData.meta_title}
                  metaDescription={formData.meta_description}
                  onMetaTitleChange={(v) => setFormData({ ...formData, meta_title: v })}
                  onMetaDescriptionChange={(v) => setFormData({ ...formData, meta_description: v })}
                />
              </div>
              <div className="flex gap-6 lg:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-vernon-300 text-clinical-600 focus:ring-clinical-500"
                  />
                  <span className="text-sm text-vernon-700">Featured (homepage)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="h-4 w-4 rounded border-vernon-300 text-clinical-600 focus:ring-clinical-500"
                  />
                  <span className="text-sm text-vernon-700">Published</span>
                </label>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Posts list */}
        <div className="mt-8 rounded-xl border border-vernon-200 bg-white">
          <div className="border-b border-vernon-100 px-6 py-4">
            <h3 className="text-sm font-medium text-vernon-900">
              {posts.length > 0 ? `${posts.length} Post${posts.length !== 1 ? 's' : ''}` : 'No posts yet'}
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
            </div>
          ) : posts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-vernon-500">No dynamic posts yet. Create your first blog post above.</p>
              <p className="mt-2 text-xs text-vernon-400">
                Static blog posts from the codebase are still displayed on the site.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-vernon-100">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-vernon-900">{post.title}</p>
                    <p className="text-xs text-vernon-400">
                      {post.category} &middot; {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-2xs ${post.published ? 'bg-clinical-50 text-clinical-700' : 'bg-amber-50 text-amber-700'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.featured && (
                      <span className="rounded-full bg-purple-50 px-2 py-0.5 text-2xs text-purple-700">Featured</span>
                    )}
                    <button
                      onClick={() => togglePublish(post)}
                      className="rounded px-2 py-1 text-xs text-vernon-500 hover:bg-vernon-50"
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => startEdit(post)}
                      className="rounded px-2 py-1 text-xs text-clinical-600 hover:bg-clinical-50"
                    >
                      Edit
                    </button>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="rounded px-2 py-1 text-xs text-vernon-500 hover:bg-vernon-50"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50"
                    >
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
