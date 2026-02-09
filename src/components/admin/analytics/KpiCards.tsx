'use client'

import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface KpiCardProps {
  label: string
  value: string | number
  change?: string
  sparklineData?: number[]
  icon: React.ReactNode
}

function KpiCard({ label, value, change, sparklineData, icon }: KpiCardProps) {
  const isPositive = change && !change.startsWith('-')

  return (
    <div className="rounded-xl border border-vernon-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-50 text-clinical-600">
          {icon}
        </div>
        {sparklineData && sparklineData.length > 1 && (
          <div className="h-8 w-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData.map((v, i) => ({ v, i }))}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#0d9488"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold text-vernon-900">{value}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm text-vernon-500">{label}</span>
        {change && (
          <span className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  )
}

interface KpiCardsProps {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgTime: string
  sparklines?: {
    views?: number[]
    visitors?: number[]
  }
}

export function KpiCards({ pageViews, uniqueVisitors, bounceRate, avgTime, sparklines }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KpiCard
        label="Page Views"
        value={pageViews.toLocaleString()}
        sparklineData={sparklines?.views}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />
      <KpiCard
        label="Unique Visitors"
        value={uniqueVisitors.toLocaleString()}
        sparklineData={sparklines?.visitors}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        }
      />
      <KpiCard
        label="Bounce Rate"
        value={`${bounceRate}%`}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
          </svg>
        }
      />
      <KpiCard
        label="Avg. Time on Page"
        value={avgTime}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  )
}
