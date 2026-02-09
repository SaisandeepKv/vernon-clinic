'use client'

import { useState, useRef, useEffect } from 'react'
import { useAdminAuth } from './AdminAuthProvider'

export function AdminUserMenu() {
  const { user, signOut } = useAdminAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const initials = user.displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-vernon-50"
      >
        {user.avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={user.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-clinical-100 text-xs font-medium text-clinical-700">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-vernon-900">{user.displayName}</p>
          <p className="truncate text-2xs text-vernon-400">{user.role === 'super_admin' ? 'Super Admin' : 'Admin'}</p>
        </div>
        <svg className={`h-4 w-4 text-vernon-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 rounded-lg border border-vernon-200 bg-white py-1 shadow-lg">
          <div className="border-b border-vernon-100 px-4 py-2">
            <p className="truncate text-sm font-medium text-vernon-900">{user.displayName}</p>
            <p className="truncate text-xs text-vernon-400">{user.email}</p>
          </div>
          <button
            onClick={() => { setOpen(false); signOut() }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
