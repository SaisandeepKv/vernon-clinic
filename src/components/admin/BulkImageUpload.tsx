'use client'

import { useState, useRef } from 'react'

interface UploadItem {
  file: File
  status: 'pending' | 'uploading' | 'done' | 'error'
  url?: string
  error?: string
}

interface BulkImageUploadProps {
  folder: string
  onComplete: (urls: string[]) => void
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_SIZE = 5 * 1024 * 1024

export function BulkImageUpload({ folder, onComplete }: BulkImageUploadProps) {
  const [items, setItems] = useState<UploadItem[]>([])
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList) {
    const newItems: UploadItem[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!ALLOWED_TYPES.includes(file.type)) {
        newItems.push({ file, status: 'error', error: 'Invalid type' })
      } else if (file.size > MAX_SIZE) {
        newItems.push({ file, status: 'error', error: 'Too large (>5MB)' })
      } else {
        newItems.push({ file, status: 'pending' })
      }
    }
    setItems((prev) => [...prev, ...newItems])
  }

  async function uploadAll() {
    setUploading(true)
    const urls: string[] = []

    for (let i = 0; i < items.length; i++) {
      if (items[i].status !== 'pending') continue

      setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, status: 'uploading' } : it))

      try {
        const formData = new FormData()
        formData.append('file', items[i].file)
        formData.append('folder', folder)

        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        if (res.ok) {
          const { url } = await res.json()
          urls.push(url)
          setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, status: 'done', url } : it))
        } else {
          const err = await res.json()
          setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, status: 'error', error: err.error } : it))
        }
      } catch {
        setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, status: 'error', error: 'Upload failed' } : it))
      }
    }

    setUploading(false)
    if (urls.length > 0) onComplete(urls)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
  }

  const pendingCount = items.filter((i) => i.status === 'pending').length

  return (
    <div className="rounded-xl border border-vernon-200 bg-white p-6">
      <h3 className="text-sm font-medium text-vernon-900">Bulk Upload</h3>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-3 flex min-h-[8rem] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-vernon-300 bg-vernon-50 p-6 text-center hover:border-clinical-400"
        onClick={() => inputRef.current?.click()}
      >
        <div>
          <svg className="mx-auto h-8 w-8 text-vernon-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="mt-2 text-sm text-vernon-500">Drop images here or click to select</p>
          <p className="mt-1 text-xs text-vernon-400">JPEG, PNG, WebP, AVIF. Max 5MB each.</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <div className="mt-4 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-vernon-50 px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-xs text-vernon-700">{item.file.name}</span>
              <span className="text-xs text-vernon-400">{(item.file.size / 1024).toFixed(0)}KB</span>
              {item.status === 'pending' && <span className="text-2xs text-vernon-400">Ready</span>}
              {item.status === 'uploading' && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
              )}
              {item.status === 'done' && <span className="text-2xs text-emerald-600">Done</span>}
              {item.status === 'error' && <span className="text-2xs text-red-500">{item.error}</span>}
            </div>
          ))}

          {pendingCount > 0 && (
            <button
              onClick={uploadAll}
              disabled={uploading}
              className="btn-primary mt-2 w-full disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : `Upload ${pendingCount} file${pendingCount !== 1 ? 's' : ''}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
