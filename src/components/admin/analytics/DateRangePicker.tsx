'use client'

const presets = [
  { label: '24h', value: '-1d' },
  { label: '3d', value: '-3d' },
  { label: '7d', value: '-7d' },
  { label: '30d', value: '-30d' },
  { label: '90d', value: '-90d' },
  { label: '6mo', value: '-6m' },
  { label: '12mo', value: '-12m' },
  { label: 'All', value: 'all' },
]

interface DateRangePickerProps {
  value: string
  onChange: (value: string) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-vernon-200 bg-white p-1">
      {presets.map((preset) => (
        <button
          key={preset.value}
          onClick={() => onChange(preset.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === preset.value
              ? 'bg-clinical-50 text-clinical-700'
              : 'text-vernon-500 hover:bg-vernon-50 hover:text-vernon-700'
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
