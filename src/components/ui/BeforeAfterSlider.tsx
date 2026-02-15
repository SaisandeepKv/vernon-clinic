'use client'

import { useRef, useState, useCallback } from 'react'

interface BeforeAfterSliderProps {
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) updatePosition(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className={`group relative cursor-col-resize select-none overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
    >
      {/* After (full width background) */}
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-earth-50 to-earth-100">
        <div className="flex h-full items-center justify-center">
          <span className="text-sm font-medium text-earth-600">{afterLabel}</span>
        </div>
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="flex h-full items-center justify-center">
          <span className="text-sm font-medium text-brand-600">{beforeLabel}</span>
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white p-1.5 shadow-lg transition-transform group-hover:scale-110">
          <svg className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 rounded-md bg-brand-900/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute bottom-3 right-3 rounded-md bg-earth-600/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  )
}
