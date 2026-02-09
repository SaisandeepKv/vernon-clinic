'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminShell } from '@/components/admin/AdminShell'
import { useAdminAuth } from '@/components/admin/AdminAuthProvider'

interface Stats {
  blogPosts: number
  reviews: number
  gallery: number
  updates: number
  supabaseConfigured: boolean
}

interface RecentItem {
  type: 'blog' | 'review' | 'update'
  title: string
  date: string
}

const navItems = [
  {
    name: 'Blog Posts',
    href: '/admin/blog',
    description: 'Create, edit, and manage blog articles',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    name: 'Reviews',
    href: '/admin/reviews',
    description: 'Manage and moderate patient reviews',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    name: 'Gallery',
    href: '/admin/gallery',
    description: 'Upload before/after treatment images',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6.75v10.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
  },
  {
    name: 'Clinic Updates',
    href: '/admin/updates',
    description: 'Manage announcement banners and offers',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    description: 'View website traffic and engagement',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    description: 'Logo, contact info, and addresses',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function AdminDashboardPage() {
  const { user } = useAdminAuth()
  const [stats, setStats] = useState<Stats>({
    blogPosts: 0,
    reviews: 0,
    gallery: 0,
    updates: 0,
    supabaseConfigured: false,
  })
  const [recent, setRecent] = useState<RecentItem[]>([])

  useEffect(() => {
    async function loadStats() {
      const items: RecentItem[] = []
      let supabaseConfigured = false

      try {
        const [blogRes, reviewsRes, galleryRes, updatesRes] = await Promise.allSettled([
          fetch('/api/blog?all=true'),
          fetch('/api/reviews?all=true'),
          fetch('/api/gallery?all=true'),
          fetch('/api/updates?all=true'),
        ])

        let blogCount = 0
        let reviewCount = 0
        let galleryCount = 0
        let updateCount = 0

        if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
          const data = await blogRes.value.json()
          if (Array.isArray(data)) {
            blogCount = data.length
            supabaseConfigured = true
            data.slice(0, 3).forEach((p: { title: string; created_at: string }) => {
              items.push({ type: 'blog', title: p.title, date: p.created_at })
            })
          }
        }

        if (reviewsRes.status === 'fulfilled' && reviewsRes.value.ok) {
          const data = await reviewsRes.value.json()
          if (data.reviews) {
            reviewCount = data.reviews.length
            if (data.source === 'supabase') supabaseConfigured = true
            data.reviews.slice(0, 3).forEach((r: { author_name: string; created_at: string }) => {
              items.push({ type: 'review', title: `Review by ${r.author_name}`, date: r.created_at })
            })
          }
        }

        if (galleryRes.status === 'fulfilled' && galleryRes.value.ok) {
          const data = await galleryRes.value.json()
          if (Array.isArray(data)) galleryCount = data.length
        }

        if (updatesRes.status === 'fulfilled' && updatesRes.value.ok) {
          const data = await updatesRes.value.json()
          if (Array.isArray(data)) {
            updateCount = data.length
            data.slice(0, 2).forEach((u: { title: string; created_at: string }) => {
              items.push({ type: 'update', title: u.title, date: u.created_at })
            })
          }
        }

        setStats({ blogPosts: blogCount, reviews: reviewCount, gallery: galleryCount, updates: updateCount, supabaseConfigured })
      } catch { /* ignore */ }

      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setRecent(items.slice(0, 5))
    }

    loadStats()
  }, [])

  const greeting = user?.displayName
    ? `Welcome back, ${user.displayName.split(' ')[0]}`
    : 'Dashboard'

  const statCards = [
    { label: 'Blog Posts', value: stats.blogPosts || '16', sublabel: stats.supabaseConfigured ? 'In Supabase' : 'Static' },
    { label: 'Reviews', value: stats.reviews || '12', sublabel: stats.supabaseConfigured ? 'In Supabase' : 'Static' },
    { label: 'Gallery', value: stats.gallery || '6', sublabel: stats.supabaseConfigured ? 'Cases' : 'Static' },
    { label: 'Updates', value: stats.updates || '0', sublabel: 'Active' },
  ]

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-vernon-900">{greeting}</h2>
          <p className="mt-1 text-sm text-vernon-500">
            Manage your clinic&apos;s website content, blog posts, reviews, and more.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-vernon-200 bg-white p-5">
              <p className="text-2xl font-medium text-vernon-900">{stat.value}</p>
              <p className="text-sm text-vernon-600">{stat.label}</p>
              <p className="text-xs text-vernon-400">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-4 rounded-xl border border-vernon-200 bg-white p-6 transition-all hover:border-clinical-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-vernon-50 text-vernon-600 transition-colors group-hover:bg-clinical-50 group-hover:text-clinical-600">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-medium text-vernon-900 group-hover:text-clinical-700">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-vernon-500">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        {recent.length > 0 && (
          <div className="mt-10 rounded-xl border border-vernon-200 bg-white">
            <div className="border-b border-vernon-100 px-6 py-4">
              <h3 className="text-sm font-medium text-vernon-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-vernon-100">
              {recent.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-2xs ${
                    item.type === 'blog' ? 'bg-clinical-50 text-clinical-700' :
                    item.type === 'review' ? 'bg-amber-50 text-amber-700' :
                    'bg-indigo-50 text-indigo-700'
                  }`}>
                    {item.type}
                  </span>
                  <p className="flex-1 truncate text-sm text-vernon-700">{item.title}</p>
                  <span className="text-xs text-vernon-400">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supabase Setup Info */}
        {!stats.supabaseConfigured && (
          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="flex items-center gap-2 text-sm font-medium text-amber-800">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              Supabase Setup Required for Dynamic Content
            </h3>
            <p className="mt-2 text-sm text-amber-700">
              To enable dynamic blog posts, reviews, gallery, and clinic updates:
            </p>
            <ol className="mt-3 space-y-1 text-sm text-amber-700">
              <li>1. Create a Supabase project at supabase.com (Mumbai region)</li>
              <li>2. Run <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">supabase/migrations/001_initial_schema.sql</code> then <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">002_admin_auth_analytics.sql</code></li>
              <li>3. Add your keys to <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">.env.local</code></li>
            </ol>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
