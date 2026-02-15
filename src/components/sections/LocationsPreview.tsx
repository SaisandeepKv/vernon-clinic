'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { locations } from '@/data/locations'

const locationDetails = [
  {
    slug: 'banjara-hills',
    tagline: 'The Flagship',
    description: 'Our primary surgical center in the heart of Hyderabad. Full procedure suite including hair transplant OT, Pico laser, and complete aesthetic services. Dr. Reddy\'s primary practice.',
    highlights: ['Hair Transplant Surgery', 'Pico Laser Suite', 'Botox & Filler Clinic', 'Surgical Dermatology'],
  },
  {
    slug: 'manikonda',
    tagline: 'IT Corridor Access',
    description: 'Strategically located for professionals in the Manikonda–Gachibowli tech corridor. Designed for efficient consultations and lunchtime procedures without disrupting your workday.',
    highlights: ['Quick Consultations', 'Laser Hair Reduction', 'Acne Treatment', 'PRP Therapy'],
  },
  {
    slug: 'gachibowli',
    tagline: 'Financial District',
    description: 'Near the Financial District and major IT parks. General dermatology, laser treatments, and skincare consultations for the Gachibowli–Nanakramguda corridor.',
    highlights: ['General Dermatology', 'Medi-Facials', 'Laser Treatments', 'Skin Consultations'],
  },
]

function LocationCard({ detail, index }: { detail: typeof locationDetails[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const location = locations.find((l) => l.slug === detail.slug)
  if (!location) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link
        href={`/locations/${detail.slug}`}
        className="group card card-lift flex h-full flex-col bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-earth-600">
              {detail.tagline}
            </span>
            <h3 className="mt-1 text-xl font-medium text-brand-900 transition-colors group-hover:text-earth-700">
              {location.name}
            </h3>
          </div>
          <svg className="h-5 w-5 text-brand-300 transition-transform group-hover:translate-x-1 group-hover:text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        <p className="mt-3 flex-1 text-sm text-brand-500">
          {detail.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {detail.highlights.map((h) => (
            <span key={h} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs text-brand-600 transition-colors group-hover:bg-earth-50 group-hover:text-earth-700">
              {h}
            </span>
          ))}
        </div>

        <div className="mt-4 border-t border-brand-50 pt-4">
          <p className="text-xs text-brand-400 line-clamp-2">
            {location.address}
          </p>
          <div className="mt-2 flex items-center gap-4">
            {location.timings.map((t) => (
              <span key={t.days} className="text-xs text-brand-500">
                {t.days}: <span className="text-brand-700">{t.hours}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function LocationsPreview() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="border-t border-brand-100 bg-brand-50 py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <div ref={headingRef} className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label"
          >
            Locations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-2 mt-3"
          >
            Three locations across <span className="text-shimmer">Hyderabad</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-base mt-3"
          >
            Same doctor, same standards. Choose the location most convenient for you.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {locationDetails.map((detail, index) => (
            <LocationCard key={detail.slug} detail={detail} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
