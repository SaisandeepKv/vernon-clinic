'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const affiliations = [
  { name: 'ISHRS', full: 'International Society of Hair Restoration Surgery' },
  { name: 'AAAM', full: 'American Academy of Aesthetic Medicine' },
  { name: 'IADVL', full: 'Indian Association of Dermatologists' },
  { name: 'UoH', full: 'University of Hertfordshire, UK' },
  { name: 'Menarini', full: 'Official Filler Trainer' },
  { name: 'US-FDA', full: 'FDA Approved Technologies' },
]

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="border-y border-brand-100 bg-white py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container-main"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="text-2xs font-medium uppercase tracking-[0.15em] text-brand-400">
            Affiliated with
          </span>
          <span className="hidden h-4 w-px bg-brand-200 sm:block" />
          {affiliations.map((org, i) => (
            <div key={org.name} className="flex items-center gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-sm font-bold tracking-tight text-brand-700">
                  {org.name}
                </span>
                <span className="hidden text-2xs text-brand-400 lg:inline">
                  {org.full}
                </span>
              </div>
              {i < affiliations.length - 1 && (
                <span className="hidden h-3 w-px bg-brand-200 sm:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
