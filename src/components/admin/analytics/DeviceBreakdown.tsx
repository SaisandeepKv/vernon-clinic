'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

const COLORS = ['#0d9488', '#8b5cf6', '#f59e0b', '#ef4444', '#3b82f6']

interface DeviceBreakdownProps {
  devices: { name: string; value: number }[]
  browsers: { name: string; value: number }[]
}

export function DeviceBreakdown({ devices, browsers }: DeviceBreakdownProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Device type donut */}
      <div className="rounded-xl border border-vernon-200 bg-white p-6">
        <h3 className="text-sm font-medium text-vernon-900">Device Types</h3>
        {devices.length > 0 ? (
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={2}
                >
                  {devices.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3">
              {devices.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-vernon-600">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-vernon-400">No data</p>
        )}
      </div>

      {/* Browser breakdown */}
      <div className="rounded-xl border border-vernon-200 bg-white p-6">
        <h3 className="text-sm font-medium text-vernon-900">Browsers</h3>
        {browsers.length > 0 ? (
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={browsers.slice(0, 6)} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" name="Visitors" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-4 text-sm text-vernon-400">No data</p>
        )}
      </div>
    </div>
  )
}
