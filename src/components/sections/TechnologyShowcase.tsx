'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const technologies = [
  {
    name: 'PicoWay Laser',
    category: 'Pigmentation & Tattoo Removal',
    description:
      'Tri-wavelength picosecond laser (532nm, 785nm, 1064nm). Photoacoustic technology shatters pigment without heat damage — the safest laser for Indian skin.',
    href: '/treatments/laser-and-pico/pico-laser-pigmentation',
    badge: 'US-FDA Approved',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    name: 'Soprano ICE',
    category: 'Laser Hair Reduction',
    description:
      'Triple-wavelength diode laser with IN-Motion SHR technology. Virtually painless — treats all skin types and hair colors simultaneously.',
    href: '/treatments/laser-and-pico/laser-hair-reduction',
    badge: 'US-FDA Approved',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    name: 'MNRF',
    category: 'Acne Scar Treatment',
    description:
      'Insulated microneedle radiofrequency. Delivers energy below the epidermis — stimulates collagen without triggering hyperpigmentation in dark skin.',
    href: '/treatments/clinical-dermatology/acne-scar-revision',
    badge: 'Safe for Indian Skin',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: 'HIFU',
    category: 'Non-Surgical Face Lift',
    description:
      'High-Intensity Focused Ultrasound reaches the SMAS layer — the same tissue layer addressed in surgical facelifts. Single-session treatment.',
    href: '/treatments/aesthetics/hifu-skin-tightening',
    badge: 'US-FDA Approved',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
  },
]

function TechCard({ tech, index }: { tech: typeof technologies[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link
        href={tech.href}
        className="group flex h-full flex-col rounded-3xl border border-brand-800 bg-brand-900/50 p-6 transition-all duration-300 hover:border-earth-700 hover:bg-brand-900 hover:-translate-y-1 hover:shadow-xl hover:shadow-earth-500/5 lg:p-8"
      >
        <div className="flex items-start justify-between">
          <div className="rounded-2xl bg-brand-800 p-3 text-earth-400 transition-all duration-300 group-hover:bg-earth-900 group-hover:text-earth-300 group-hover:scale-110">
            {tech.icon}
          </div>
          <span className="rounded-full border border-earth-800 bg-earth-950 px-2.5 py-1 text-2xs font-medium text-earth-400">
            {tech.badge}
          </span>
        </div>
        <h3 className="mt-5 text-xl font-medium text-white transition-colors group-hover:text-earth-300">
          {tech.name}
        </h3>
        <p className="mt-1 text-sm text-brand-500">
          {tech.category}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-400">
          {tech.description}
        </p>
        <div className="mt-4 flex items-center text-sm font-medium text-earth-500 group-hover:text-earth-400">
          Learn more
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

export function TechnologyShowcase() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="mesh-blob-2 absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-earth-600/8 to-transparent blur-3xl" />
        <div className="mesh-blob-3 absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-brand-600/8 to-transparent blur-3xl" />
      </div>
      <div className="noise-overlay absolute inset-0" />

      <div className="section-max-width section-padding relative">
        <div ref={headingRef} className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-earth-400"
          >
            Our Technology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-display text-3xl font-light text-white sm:text-4xl lg:text-5xl"
          >
            US-FDA approved platforms,{' '}
            <span className="text-shimmer-light">calibrated for Indian skin</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-brand-400"
          >
            Every device at Vernon is selected for safety on Fitzpatrick IV–VI skin types.
            We do not use generic settings — Dr. Reddy calibrates parameters for each patient.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
