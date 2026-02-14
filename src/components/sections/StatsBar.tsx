'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SpringCounter } from '@/components/ui/MotionPrimitives'

const stats = [
  {
    value: 13,
    suffix: '+',
    label: 'Years of Practice',
    sub: 'Established 2012',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    value: 15,
    suffix: 'k+',
    label: 'Procedures Performed',
    sub: 'Across all locations',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    value: 3,
    suffix: '',
    label: 'Clinic Locations',
    sub: 'Across Hyderabad',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    value: 4.9,
    suffix: '',
    label: 'Google Rating',
    sub: '3,400+ reviews',
    decimals: 1,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
]

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-vernon-950">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-vernon-950 via-vernon-900 to-vernon-950" />
      <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-clinical-500/20 to-transparent" />

      {/* Subtle animated glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-40 w-96 rounded-full bg-clinical-600/5 blur-3xl pulse-soft" />
      </div>

      {/* Noise overlay for texture */}
      <div className="noise-overlay absolute inset-0 opacity-50" />

      <div className="section-max-width section-padding relative">
        <div className="grid grid-cols-2 gap-6 py-16 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className={`group text-center ${i < 3 ? 'lg:border-r lg:border-white/10' : ''}`}
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-500/10 text-clinical-400 transition-colors group-hover:bg-clinical-500/15">
                {stat.icon}
              </div>
              <p className="font-display text-4xl font-light tabular-nums text-white lg:text-5xl">
                <SpringCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-vernon-300">
                {stat.label}
              </p>
              <p className="text-xs text-vernon-500">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-clinical-500/20 to-transparent" />
    </section>
  )
}
