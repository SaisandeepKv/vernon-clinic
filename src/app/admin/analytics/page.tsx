'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { DateRangePicker } from '@/components/admin/analytics/DateRangePicker'
import { KpiCards } from '@/components/admin/analytics/KpiCards'
import { PageViewsChart } from '@/components/admin/analytics/PageViewsChart'
import { PageBreakdownTable } from '@/components/admin/analytics/PageBreakdownTable'
import { GeographyChart } from '@/components/admin/analytics/GeographyChart'
import { DeviceBreakdown } from '@/components/admin/analytics/DeviceBreakdown'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTrendData(result: any) {
  if (!result?.results?.[0]) return []
  const series = result.results[0]
  const labels = series.labels ?? series.days ?? []
  const data = series.data ?? []
  return labels.map((label: string, i: number) => ({
    date: label,
    value: data[i] ?? 0,
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractBreakdownData(result: any): { name: string; value: number }[] {
  if (!result?.results) return []
  return result.results
    .map((r: { label: string; data: number[] }) => ({
      name: r.label || 'Unknown',
      value: (r.data ?? []).reduce((a: number, b: number) => a + b, 0),
    }))
    .sort((a: { value: number }, b: { value: number }) => b.value - a.value)
}

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState('-7d')
  const [loading, setLoading] = useState(true)
  const [configured, setConfigured] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null)

  const loadAnalytics = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics?dateFrom=${dateRange}`)
      const json = await res.json()
      if (json.configured === false) {
        setConfigured(false)
      } else {
        setConfigured(true)
        setData(json)
      }
    } catch {
      /* ignore */
    }
    setLoading(false)
  }, [dateRange])

  useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  // Transform PostHog data
  const viewsTimeline = data ? extractTrendData(data.pageViews) : []
  const visitorsTimeline = data ? extractTrendData(data.visitors) : []

  const chartData = viewsTimeline.map((v: { date: string; value: number }, i: number) => ({
    date: new Date(v.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    views: v.value,
    visitors: visitorsTimeline[i]?.value ?? 0,
  }))

  const totalViews = viewsTimeline.reduce((s: number, v: { value: number }) => s + v.value, 0)
  const totalVisitors = visitorsTimeline.reduce((s: number, v: { value: number }) => s + v.value, 0)

  const topPages = data
    ? extractBreakdownData(data.topPages).map((p: { name: string; value: number }) => {
        try {
          return { path: new URL(p.name).pathname, views: p.value }
        } catch {
          return { path: p.name, views: p.value }
        }
      })
    : []

  const devices = data ? extractBreakdownData(data.devices) : []
  const browsers = data ? extractBreakdownData(data.browsers) : []
  const geography = data
    ? extractBreakdownData(data.geography).map((g: { name: string; value: number }) => ({
        city: g.name,
        visitors: g.value,
      }))
    : []

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium text-vernon-900">Analytics</h1>
            <p className="mt-1 text-sm text-vernon-500">Website traffic and engagement metrics</p>
          </div>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>

        {!configured ? (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
            <svg className="mx-auto h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <h3 className="mt-4 text-base font-medium text-amber-800">PostHog Not Configured</h3>
            <p className="mt-2 text-sm text-amber-700">
              Add the following environment variables to enable analytics:
            </p>
            <div className="mx-auto mt-4 max-w-md rounded-lg bg-amber-100 p-4 text-left font-mono text-xs text-amber-800">
              <p>NEXT_PUBLIC_POSTHOG_KEY=phc_your_key</p>
              <p>NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com</p>
              <p>POSTHOG_PERSONAL_API_KEY=phx_your_key</p>
              <p>POSTHOG_PROJECT_ID=your_project_id</p>
            </div>
          </div>
        ) : loading ? (
          <div className="mt-12 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-vernon-300 border-t-clinical-600" />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <KpiCards
              pageViews={totalViews}
              uniqueVisitors={totalVisitors}
              bounceRate={0}
              avgTime="--"
              sparklines={{
                views: viewsTimeline.map((v: { value: number }) => v.value),
                visitors: visitorsTimeline.map((v: { value: number }) => v.value),
              }}
            />
            <PageViewsChart data={chartData} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <PageBreakdownTable data={topPages} />
              <GeographyChart data={geography} />
            </div>
            <DeviceBreakdown devices={devices} browsers={browsers} />
          </div>
        )}
      </div>
    </AdminShell>
  )
}
