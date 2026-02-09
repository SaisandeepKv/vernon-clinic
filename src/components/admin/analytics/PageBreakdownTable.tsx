'use client'

import { useState } from 'react'

interface PageRow {
  path: string
  views: number
}

interface PageBreakdownTableProps {
  data: PageRow[]
}

export function PageBreakdownTable({ data }: PageBreakdownTableProps) {
  const [sortBy, setSortBy] = useState<'views' | 'path'>('views')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  function toggleSort(col: 'views' | 'path') {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(col)
      setSortDir('desc')
    }
  }

  const sorted = [...data].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1
    if (sortBy === 'views') return (a.views - b.views) * mul
    return a.path.localeCompare(b.path) * mul
  })

  if (!data.length) {
    return null
  }

  return (
    <div className="rounded-xl border border-vernon-200 bg-white">
      <div className="border-b border-vernon-100 px-6 py-4">
        <h3 className="text-sm font-medium text-vernon-900">Top Pages</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-vernon-100 text-left">
              <th
                className="cursor-pointer px-6 py-3 text-xs font-medium text-vernon-500 hover:text-vernon-700"
                onClick={() => toggleSort('path')}
              >
                Page {sortBy === 'path' && (sortDir === 'asc' ? '\u2191' : '\u2193')}
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-right text-xs font-medium text-vernon-500 hover:text-vernon-700"
                onClick={() => toggleSort('views')}
              >
                Views {sortBy === 'views' && (sortDir === 'asc' ? '\u2191' : '\u2193')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vernon-50">
            {sorted.slice(0, 20).map((row) => (
              <tr key={row.path} className="hover:bg-vernon-50/50">
                <td className="px-6 py-2.5 font-mono text-xs text-vernon-700">{row.path}</td>
                <td className="px-6 py-2.5 text-right text-vernon-600">
                  {row.views.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
