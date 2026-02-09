'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Update {
  id: string
  title: string
  content: string
  type: 'announcement' | 'offer' | 'news' | 'event'
  link: string | null
}

const typeConfig = {
  announcement: { bg: 'bg-clinical-600', icon: '📢' },
  offer: { bg: 'bg-emerald-600', icon: '🎉' },
  news: { bg: 'bg-vernon-800', icon: '📰' },
  event: { bg: 'bg-indigo-600', icon: '📅' },
}

export function ClinicUpdates() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const res = await fetch('/api/updates')
        if (res.ok) {
          const data = await res.json()
          if (data?.length > 0) {
            setUpdates(data)
          }
        }
      } catch {
        // No updates available
      }
    }
    fetchUpdates()
  }, [])

  // Auto-rotate through updates
  useEffect(() => {
    if (updates.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % updates.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [updates.length])

  if (updates.length === 0 || dismissed) return null

  const update = updates[currentIndex]
  const config = typeConfig[update.type] || typeConfig.announcement

  return (
    <div className={`${config.bg} text-white`}>
      <div className="section-max-width section-padding flex items-center justify-between py-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex-shrink-0 text-sm">{config.icon}</span>
          <p className="truncate text-sm font-medium">
            {update.title}
            {update.content && (
              <span className="ml-2 hidden font-normal opacity-80 sm:inline">
                — {update.content}
              </span>
            )}
          </p>
          {update.link && (
            <Link
              href={update.link}
              className="flex-shrink-0 text-sm font-semibold underline underline-offset-2 hover:no-underline"
            >
              Learn more
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-4 flex-shrink-0 rounded p-1 text-white/60 hover:text-white"
          aria-label="Dismiss announcement"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
