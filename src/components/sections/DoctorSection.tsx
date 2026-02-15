'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { primaryDoctor } from '@/data/doctors'

export function DoctorSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="mesh-blob-1 absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-earth-600/10 to-transparent blur-3xl" />
        <div className="mesh-blob-2 absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-brand-700/10 to-transparent blur-3xl" />
      </div>
      <div className="noise-overlay absolute inset-0" />

      <div className="section-max-width section-padding relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/doctors/dr-brahmananda-reddy.jpg"
                alt="Dr. R. Brahmananda Reddy - Dermatosurgeon and Founder of Vernon Skin and Hair Clinic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
            </motion.div>

            {/* Credential strips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -bottom-6 left-4 right-4 grid grid-cols-3 gap-2 sm:left-6 sm:right-6"
            >
              {[
                { label: 'MSc Dermatology', sub: 'University of Hertfordshire, UK' },
                { label: 'MS Gen. Surgery', sub: 'Surgical Background' },
                { label: 'Board Certified', sub: 'Aesthetic Medicine' },
              ].map((cred) => (
                <div key={cred.label} className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
                  <p className="text-xs font-medium text-white">{cred.label}</p>
                  <p className="mt-0.5 text-2xs text-white/50">{cred.sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content */}
          <div ref={headingRef}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-widest text-earth-400"
            >
              The Founder
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-light tracking-tight text-white sm:text-4xl"
            >
              Dr. R. Brahmananda Reddy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2 text-lg text-earth-400"
            >
              {primaryDoctor.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base leading-relaxed text-brand-400"
            >
              With a rare combination of surgical training (MS General Surgery)
              and UK-certified dermatology, Dr. Reddy doesn&apos;t just treat skin —
              he operates on it. This dual expertise is why Vernon handles
              everything from complex hair transplants to delicate filler
              placements under one roof.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-base leading-relaxed text-brand-400"
            >
              As an official trainer for Menarini dermal fillers, Dr. Reddy
              teaches injection techniques to physicians across Malaysia,
              Bangkok, and India. When doctors need to learn, they come to him.
            </motion.p>

            {/* Memberships */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 space-y-3"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-500">
                Professional Memberships
              </h3>
              {primaryDoctor.memberships.map((m) => (
                <div key={m} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-earth-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-brand-300">{m}</span>
                </div>
              ))}
            </motion.div>

            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {primaryDoctor.awards.map((award) => (
                <div key={award.title} className="rounded-full border border-earth-500/20 bg-earth-500/10 px-3 py-1 text-xs font-medium text-earth-300">
                  {award.title} ({award.year})
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                href="/about/dr-brahmananda-reddy"
                className="mt-8 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
              >
                Full Profile & Credentials
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
