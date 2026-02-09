'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'

const cases = [
  {
    treatment: 'Hair Transplant',
    description: 'FUE procedure, 2800 grafts — 12-month result',
    category: 'Hair Restoration',
  },
  {
    treatment: 'Acne Scar Revision',
    description: 'Subcision + MNRF, 5 sessions — 8-month result',
    category: 'Clinical Dermatology',
  },
  {
    treatment: 'Pico Laser Pigmentation',
    description: 'PicoWay, 4 sessions — melasma improvement',
    category: 'Laser & Pico',
  },
]

function CaseCard({ item, index }: { item: typeof cases[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group overflow-hidden rounded-2xl border border-vernon-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-vernon-900/5 hover:-translate-y-1"
    >
      {/* Interactive Before/After slider */}
      <BeforeAfterSlider
        beforeLabel="Before"
        afterLabel="After"
        className="rounded-t-2xl"
      />
      <div className="p-5">
        <span className="badge-clinical text-2xs">{item.category}</span>
        <h3 className="mt-2 text-base font-medium text-vernon-900 transition-colors group-hover:text-clinical-700">
          {item.treatment}
        </h3>
        <p className="mt-1 text-sm text-vernon-500">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export function BeforeAfterPreview() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <div ref={headingRef} className="flex items-end justify-between">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label"
            >
              Clinical Results
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-2 mt-3"
            >
              Real results, <span className="text-shimmer">documented outcomes</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-base mt-3"
            >
              Every treatment outcome at Vernon is documented and tracked.
              These are representative cases from our clinical portfolio.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/gallery"
              className="btn-ghost hidden text-clinical-600 hover:text-clinical-700 sm:flex"
            >
              View full gallery
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cases.map((item, index) => (
            <CaseCard key={item.treatment} item={item} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/gallery" className="btn-ghost text-clinical-600">
            View full gallery &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
