'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const affiliations = [
  {
    name: 'ISHRS',
    full: 'International Society of Hair Restoration Surgery',
  },
  {
    name: 'AAAM',
    full: 'American Academy of Aesthetic Medicine',
  },
  {
    name: 'IADVL',
    full: 'Indian Association of Dermatologists',
  },
  {
    name: 'UoH',
    full: 'University of Hertfordshire, UK',
  },
  {
    name: 'Menarini',
    full: 'Official Filler Trainer',
  },
  {
    name: 'US-FDA',
    full: 'FDA Approved Technologies',
  },
]

// Duplicate for seamless loop
const allItems = [...affiliations, ...affiliations]

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-8">
      {/* Top gradient line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-vernon-200 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-center text-2xs font-semibold uppercase tracking-[0.2em] text-vernon-400">
          Affiliated with & certified by
        </p>

        {/* Marquee container */}
        <div className="relative mt-6">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

          <div className="overflow-hidden">
            <div className="marquee-track" style={{ '--marquee-duration': '30s' } as React.CSSProperties}>
              {allItems.map((org, i) => (
                <div
                  key={`${org.name}-${i}`}
                  className="mx-6 flex flex-shrink-0 items-center gap-2 rounded-full bg-vernon-50/60 px-5 py-2"
                >
                  <span className="font-mono text-sm font-bold tracking-tight text-vernon-700">
                    {org.name}
                  </span>
                  <span className="hidden whitespace-nowrap text-2xs text-vernon-400 sm:inline">
                    {org.full}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vernon-200 to-transparent" />
    </section>
  )
}
