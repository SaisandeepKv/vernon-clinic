'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { treatmentCategories } from '@/data/treatments'
import { blurDataURL } from '@/lib/image-utils'

const categoryGradients: Record<string, { accent: string; badge: string }> = {
  hair: { accent: 'from-blue-600/80 to-blue-900/90', badge: 'bg-blue-500/20 text-blue-200' },
  laser: { accent: 'from-amber-600/80 to-amber-900/90', badge: 'bg-amber-500/20 text-amber-200' },
  clinical: { accent: 'from-emerald-600/80 to-emerald-900/90', badge: 'bg-emerald-500/20 text-emerald-200' },
  aesthetics: { accent: 'from-purple-600/80 to-purple-900/90', badge: 'bg-purple-500/20 text-purple-200' },
  wellness: { accent: 'from-rose-600/80 to-rose-900/90', badge: 'bg-rose-500/20 text-rose-200' },
}

// Bento grid layout — asymmetric for visual interest
// Row 1: [2-col span] [1-col]  |  Row 2: [1-col] [2-col span]  |  Row 3: [1-col centered]
const bentoClasses = [
  'lg:col-span-2',  // Hair Restoration — large
  'lg:col-span-1',  // Laser
  'lg:col-span-1',  // Clinical Dermatology
  'lg:col-span-2',  // Aesthetics — large
  'lg:col-span-1 lg:col-start-2',  // Wellness — centered
]

export function TreatmentsOverview() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="relative py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <div ref={headingRef} className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label"
          >
            Treatment Verticals
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-2 mt-3"
          >
            Surgeon-led care across{' '}
            <span className="text-shimmer">five disciplines</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-large mt-4"
          >
            Every procedure at Vernon is performed or directly supervised by
            Dr. Brahmananda Reddy. No delegation to technicians. No assembly-line
            treatments.
          </motion.p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatmentCategories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} bentoClass={bentoClasses[i] || ''} />
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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: index * 0.1,
      }}
      className={bentoClass}
    >
      <Link
        href={`/treatments/${category.slug}`}
        className="group relative block h-full overflow-hidden rounded-2xl"
      >
        {/* Background image */}
        <div className={`relative overflow-hidden ${isLarge ? 'h-[280px] sm:h-[360px]' : 'h-[280px] sm:h-[320px]'}`}>
          {category.image ? (
            <Image
              src={category.image}
              alt={`${category.name} treatment at Vernon Skin Clinic Hyderabad`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes={isLarge ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              placeholder="blur"
              blurDataURL={blurDataURL()}
            />
          ) : (
            <div className="h-full w-full bg-vernon-200" />
          )}

          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${colors.accent}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Badge */}
            <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-2xs font-medium backdrop-blur-sm ${colors.badge}`}>
              {category.description.split('.')[0].split(',')[0]}
            </span>

            <h3 className="mt-3 font-display text-2xl font-light text-white">
              {category.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/70 line-clamp-2">
              {category.description}
            </p>

            {/* Arrow CTA */}
            <div className="mt-4 flex items-center text-sm font-medium text-white/90">
              <span className="border-b border-white/30 pb-0.5 transition-all group-hover:border-white/70">
                Explore treatments
              </span>
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
