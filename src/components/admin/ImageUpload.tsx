'use client'

import { useState, useRef, useCallback } from 'react'

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  folder?: string
}

export function ImageUpload({ label, value, onChange, folder = 'uploads' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback(async (file: File) => {
    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Upload failed')
        return
      }

      onChange(data.url)
    } catch {
      setError('Upload failed. Check your connection.')
    } finally {
      setUploading(false)
    }
  }, [folder, onChange])

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-vernon-700">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`mt-1 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
          dragOver
            ? 'border-clinical-400 bg-clinical-50'
            : value
              ? 'border-vernon-200 bg-vernon-50'
              : 'border-vernon-300 bg-white hover:border-clinical-300'
        }`}
      >
        {uploading ? (
          <div className="flex items-center gap-2 py-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
            <span className="text-sm text-vernon-500">Uploading...</span>
          </div>
        ) : value ? (
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="mx-auto max-h-32 rounded-lg object-cover" />
            <p className="mt-2 text-center text-xs text-vernon-400">Click or drag to replace</p>
          </div>
        ) : (
          <>
            <svg className="h-8 w-8 text-vernon-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="mt-2 text-sm text-vernon-500">
              <span className="font-medium text-clinical-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-vernon-400">JPEG, PNG, WebP up to 5MB</p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileSelect}
        className="hidden"
      />
      {/* Also allow manual URL input */}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL..."
        className="mt-2 block w-full rounded-lg border border-vernon-200 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
