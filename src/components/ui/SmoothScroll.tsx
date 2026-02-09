'use client'

import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null

    async function initLenis() {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
        })

        function raf(time: number) {
          lenis?.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch {
        // Lenis not installed — graceful fallback
      }
    }

    initLenis()

    return () => {
      lenis?.destroy()
    }
  }, [])

  return null
}
