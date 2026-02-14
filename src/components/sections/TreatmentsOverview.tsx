'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { treatmentCategories } from '@/data/treatments'
import { blurDataURL } from '@/lib/image-utils'

const categoryGradients: Record<string, { accent: string; badge: string }> = {
  hair: { accent: 'from-blue-900/60 to-blue-950/70', badge: 'bg-white/10 text-white/90' },
  laser: { accent: 'from-amber-900/60 to-amber-950/70', badge: 'bg-white/10 text-white/90' },
  clinical: { accent: 'from-emerald-900/60 to-emerald-950/70', badge: 'bg-white/10 text-white/90' },
  aesthetics: { accent: 'from-purple-900/60 to-purple-950/70', badge: 'bg-white/10 text-white/90' },
  wellness: { accent: 'from-rose-900/60 to-rose-950/70', badge: 'bg-white/10 text-white/90' },
}

// Bento grid layout — asymmetric for visual interest
// Row 1: [2-col span] [1-col]  |  Row 2: [1-col] [2-col span]  |  Row 3: [1-col centered]
const bentoClasses = [
  'lg:col-span-2',              // Hair Restoration — large
  'lg:col-span-1',              // Laser
  'lg:col-span-1',              // Clinical Dermatology
  'lg:col-span-2',              // Aesthetics — large
  'lg:col-span-1 lg:col-start-2', // Wellness — centered
]

export function TreatmentsOverview() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="relative py-24 lg:py-32">
      <div className="section-max-width section-padding">
        {/* Heading — no label, just headline and subtext */}
        <div ref={headingRef} className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="heading-2"
          >
            Surgeon-led care across{' '}
            <span className="text-shimmer">five disciplines</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="body-large mt-5"
          >
            Every procedure at Vernon is performed or directly supervised by
            Dr.&nbsp;Brahmananda Reddy. No delegation to technicians. No
            assembly-line treatments.
          </motion.p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatmentCategories.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={i}
              bentoClass={bentoClasses[i] || ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({
  category,
  index,
  bentoClass,
}: {
  category: (typeof treatmentCategories)[number]
  index: number
  bentoClass: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const colors = categoryGradients[category.icon] || categoryGradients.clinical
  const isLarge = bentoClass.includes('col-span-2')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
        delay: index * 0.08,
      }}
      className={bentoClass}
    >
      <Link
        href={`/treatments/${category.slug}`}
        className="group relative block h-full overflow-hidden rounded-2xl"
      >
        {/* Background image */}
        <div
          className={`relative overflow-hidden ${
            isLarge ? 'h-[280px] sm:h-[360px]' : 'h-[280px] sm:h-[320px]'
          }`}
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={`${category.name} treatment at Vernon Skin Clinic Hyderabad`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes={
                isLarge
                  ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
              placeholder="blur"
              blurDataURL={blurDataURL()}
            />
          ) : (
            <div className="h-full w-full bg-vernon-200" />
          )}

          {/* Gradient overlay — reduced opacity for image visibility */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${colors.accent}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
            {/* Minimal badge */}
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur-sm ${colors.badge}`}
            >
              {category.description.split('.')[0].split(',')[0]}
            </span>

            <h3 className="mt-3 font-display text-2xl font-light tracking-tight text-white">
              {category.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/70">
              {category.description}
            </p>

            {/* Arrow CTA */}
            <div className="mt-4 flex items-center text-sm font-medium text-white/90">
              <span className="border-b border-white/25 pb-0.5 transition-all duration-300 group-hover:border-white/60">
                Explore treatments
              </span>
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
