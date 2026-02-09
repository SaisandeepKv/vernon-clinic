'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface GeographyChartProps {
  data: { city: string; visitors: number }[]
}

export function GeographyChart({ data }: GeographyChartProps) {
  if (!data.length) return null

  return (
    <div className="rounded-xl border border-vernon-200 bg-white p-6">
      <h3 className="text-sm font-medium text-vernon-900">Top Locations</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 10)} layout="vertical">
            <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis
              type="category"
              dataKey="city"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="visitors" name="Visitors" fill="#0d9488" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
