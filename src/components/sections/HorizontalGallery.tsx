'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const galleryItems = [
  { category: 'Hair Transplant', title: 'FUE — 2,800 grafts', detail: '12-month result', gradient: 'from-blue-900/80' },
  { category: 'Pico Laser', title: 'Melasma treatment', detail: '4 sessions', gradient: 'from-emerald-900/80' },
  { category: 'Acne Scars', title: 'Subcision + MNRF', detail: '8-month result', gradient: 'from-purple-900/80' },
  { category: 'Hair Transplant', title: 'Repair case', detail: '14-month result', gradient: 'from-amber-900/80' },
  { category: 'Botox & Fillers', title: 'Natural refresh', detail: 'Immediate result', gradient: 'from-rose-900/80' },
  { category: 'Vitiligo', title: 'Melanocyte transfer', detail: '6-month result', gradient: 'from-earth-900/80' },
]

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

  return (
    <section ref={containerRef} className="overflow-hidden py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <span className="label">Results Gallery</span>
        <h2 className="heading-2 mt-3">
          Real patients, <span className="text-shimmer">real outcomes</span>
        </h2>
      </div>

      <motion.div
        style={{ x }}
        className="mt-10 flex gap-5 px-6"
      >
        {galleryItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex-shrink-0 w-[300px] sm:w-[360px] aspect-[3/4] overflow-hidden rounded-3xl bg-brand-200"
          >
            {/* Placeholder for actual before/after images */}
            <div className="absolute inset-0 flex items-center justify-center bg-brand-100">
              <div className="grid h-full w-full grid-cols-2">
                <div className="flex items-center justify-center border-r border-brand-200/50 bg-brand-100">
                  <span className="text-xs font-medium text-brand-400 [writing-mode:vertical-lr]">BEFORE</span>
                </div>
                <div className="flex items-center justify-center bg-brand-100">
                  <span className="text-xs font-medium text-brand-400 [writing-mode:vertical-lr]">AFTER</span>
                </div>
              </div>
            </div>

            {/* Info overlay */}
            <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${item.gradient} to-transparent p-5 pt-20`}>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-2xs font-medium text-white backdrop-blur-sm">
                {item.category}
              </span>
              <h3 className="mt-2 text-base font-medium text-white">{item.title}</h3>
              <p className="mt-0.5 text-sm text-white/70">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="section-max-width section-padding mt-6">
        <a href="/gallery" className="btn-ghost text-earth-600 hover:text-earth-700">
          View full gallery →
        </a>
      </div>
    </section>
  )
}
