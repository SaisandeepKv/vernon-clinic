'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { TiltCard } from '@/components/ui/MotionPrimitives'

const differentiators = [
  {
    title: 'Surgeon, Not Just Dermatologist',
    description:
      'Dr. Reddy holds an MS in General Surgery before specializing in dermatology. This means hair transplants, cyst excisions, and vitiligo surgery are performed by a trained surgeon — not referred out.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M5.82 10.57l7.07-7.07a2.25 2.25 0 013.18 0l1.41 1.41a2.25 2.25 0 010 3.18l-7.07 7.07M7.5 11.25l-2.25 2.25m10.5-1.5H18M15 18h.008v.008H15V18zm2.25 0h.008v.008h-.008V18zm2.25 0h.008v.008h-.008V18z" />
      </svg>
    ),
    gradient: 'from-blue-500/5 to-transparent',
    iconColor: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'UK Training, Indian Expertise',
    description:
      'MSc Dermatology from the University of Hertfordshire, UK. British standards of clinical practice combined with 13+ years treating Indian skin types.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    gradient: 'from-emerald-500/5 to-transparent',
    iconColor: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: "The Trainer's Standard",
    description:
      "Official trainer for Menarini dermal fillers. Dr. Reddy teaches injection techniques to doctors across Southeast Asia. Your injector is the person who trains other doctors.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    gradient: 'from-purple-500/5 to-transparent',
    iconColor: 'text-purple-600 bg-purple-50',
  },
  {
    title: 'No Assembly Line',
    description:
      'Dr. Reddy personally performs or supervises every procedure. Unlike clinic chains where technicians handle the work, your treatment is in the hands of the person whose reputation depends on your result.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    gradient: 'from-amber-500/5 to-transparent',
    iconColor: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'Evidence Over Marketing',
    description:
      'US-FDA approved technologies and evidence-based protocols. No trending treatments without clinical backing. Every recommendation grounded in dermatological science.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    gradient: 'from-clinical-500/5 to-transparent',
    iconColor: 'text-clinical-600 bg-clinical-50',
  },
  {
    title: 'Three Convenient Locations',
    description:
      'Banjara Hills for premium consultations, Manikonda and Gachibowli for IT professionals seeking lunchtime procedures. Same doctor, same standards.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    gradient: 'from-rose-500/5 to-transparent',
    iconColor: 'text-rose-600 bg-rose-50',
  },
]

export function WhyVernon() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background accents */}
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-clinical-100/30 to-transparent blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-vernon-100/20 to-transparent blur-3xl" />

      <div className="section-max-width section-padding relative">
        <div ref={headingRef} className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label"
          >
            Why Vernon
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-2 mt-3"
          >
            The difference is{' '}
            <span className="text-shimmer">in the details</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-large mt-4"
          >
            In a city with hundreds of skin clinics, what makes Vernon different
            isn&apos;t marketing — it&apos;s the clinical reality behind every treatment.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => (
            <CardItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CardItem({
  item,
  index,
}: {
  item: (typeof differentiators)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const gradientRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = gradientRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
    >
    <TiltCard className="group relative h-full overflow-hidden rounded-2xl border border-vernon-100/60 bg-white p-6 transition-all duration-400 hover:border-vernon-200 card-elevated" tiltAmount={4}>
      {/* Cursor-following gradient accent on hover */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${item.gradient.includes('blue') ? 'rgba(59,130,246,0.06)' : item.gradient.includes('emerald') ? 'rgba(16,185,129,0.06)' : item.gradient.includes('purple') ? 'rgba(168,85,247,0.06)' : item.gradient.includes('amber') ? 'rgba(245,158,11,0.06)' : item.gradient.includes('clinical') ? 'rgba(13,148,136,0.06)' : 'rgba(244,63,94,0.06)'}, transparent 40%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          {/* Number */}
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-vernon-50 font-mono text-xs font-bold text-vernon-400">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Icon */}
          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}>
            {item.icon}
          </div>
        </div>

        <h3 className="mt-5 text-lg font-medium text-vernon-900">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-vernon-500">
          {item.description}
        </p>
      </div>
    </TiltCard>
    </motion.div>
  )
}
