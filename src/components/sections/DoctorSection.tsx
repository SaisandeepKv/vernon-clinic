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
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-night-950 py-24 lg:py-32"
    >
      {/* Simplified mesh gradient — fewer, more subtle blobs */}
      <div className="absolute inset-0">
        <div className="absolute -right-60 top-20 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-clinical-600/6 to-transparent blur-[120px]" />
      </div>
      <div className="noise-overlay absolute inset-0" />

      <div className="section-max-width section-padding relative">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image — parallax, no credential strip overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/doctors/dr-brahmananda-reddy.jpg"
                alt="Dr. R. Brahmananda Reddy - Dermatosurgeon and Founder of Vernon Skin and Hair Clinic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/40 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div ref={headingRef}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-widest text-clinical-400"
            >
              The Founder
            </motion.span>

            {/* Bigger, more editorial headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-display text-4xl font-light tracking-tight text-white sm:text-5xl"
              style={{ lineHeight: 1.08, textWrap: 'balance' }}
            >
              Dr. R. Brahmananda Reddy
            </motion.h2>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-lg text-clinical-400"
            >
              {primaryDoctor.title}
            </motion.p>

            {/* Inline credentials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-vernon-400"
            >
              <span>MSc Dermatology, UK</span>
              <span className="text-vernon-700">/</span>
              <span>MS General Surgery</span>
              <span className="text-vernon-700">/</span>
              <span>Board Certified Aesthetic Medicine</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 text-base leading-relaxed text-vernon-400"
            >
              With a rare combination of surgical training (MS General Surgery)
              and UK-certified dermatology, Dr.&nbsp;Reddy doesn&apos;t just treat
              skin — he operates on it. This dual expertise is why Vernon handles
              everything from complex hair transplants to delicate filler
              placements under one roof.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-base leading-relaxed text-vernon-400"
            >
              As an official trainer for Menarini dermal fillers, Dr.&nbsp;Reddy
              teaches injection techniques to physicians across Malaysia,
              Bangkok, and India. When doctors need to learn, they come to him.
            </motion.p>

            {/* Memberships — minimal list style */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-xs font-medium uppercase tracking-wider text-vernon-600">
                Memberships
              </h3>
              <ul className="mt-3 space-y-2">
                {primaryDoctor.memberships.map((m) => (
                  <li key={m} className="flex items-start gap-2.5">
                    <span className="mt-2 block h-1 w-1 flex-shrink-0 rounded-full bg-clinical-500" />
                    <span className="text-sm text-vernon-300">{m}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Awards — minimal pill style */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {primaryDoctor.awards.map((award) => (
                <span
                  key={award.title}
                  className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-vernon-400"
                >
                  {award.title} ({award.year})
                </span>
              ))}
            </motion.div>

            {/* CTA — cleaner styling */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                href="/about/dr-brahmananda-reddy"
                className="mt-10 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
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
