'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { SpringCounter, Magnetic, KineticHeadline, SpotlightCard, TextScramble } from '@/components/ui/MotionPrimitives'
import { blurDataURLDark } from '@/lib/image-utils'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15])

  const scrollToContent = useCallback(() => {
    const nextSection = containerRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] overflow-hidden bg-night-950">
      {/* Aurora gradient background — single pass, lighter GPU load */}
      <div className="absolute inset-0 aurora-bg aurora-animate" />

      {/* Ambient video shimmer — CSS-only, simulates motion texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 animate-[heroShimmer_8s_ease-in-out_infinite] bg-[length:200%_200%] bg-gradient-to-br from-transparent via-white/20 to-transparent" />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient line accents */}
      <div className="absolute left-0 top-1/3 h-px w-2/3 bg-gradient-to-r from-transparent via-clinical-500/20 to-transparent" />
      <div className="absolute bottom-1/4 right-0 h-px w-1/2 bg-gradient-to-l from-transparent via-clinical-500/10 to-transparent" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="section-max-width section-padding relative flex min-h-[100dvh] items-center"
      >
        <div className="grid w-full grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="max-w-2xl">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clinical-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clinical-400" />
              </span>
              <span className="text-xs font-medium text-vernon-300">
                UK-Trained Dermatosurgeon &middot; ISHRS Member
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="mt-8 font-display text-[2.75rem] font-light leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: '-0.025em' }}
            >
              <KineticHeadline text="Clinical precision." delay={0.4} staggerDelay={0.035} />
              <br />
              <span className="text-shimmer-light italic">
                <KineticHeadline text="Visible results." delay={0.9} staggerDelay={0.035} />
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-vernon-400 sm:text-xl"
            >
              Hyderabad&apos;s surgeon-led dermatology center. Founded by
              Dr. R. Brahmananda Reddy — UK-trained, ISHRS-certified,
              and trusted by physicians across Asia.
            </motion.p>

            {/* Treatment pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {[
                'Hair Transplant',
                'Pico Laser',
                'Botox & Fillers',
                'Clinical Dermatology',
              ].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-vernon-300 backdrop-blur-sm transition-colors hover:border-clinical-500/30 hover:text-clinical-300"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.15}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-vernon-950 shadow-lg shadow-white/10 transition-all hover:bg-clinical-50 hover:shadow-xl hover:shadow-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-night-950"
                >
                  Book a Consultation
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </Magnetic>
              <Link
                href="/about/dr-brahmananda-reddy"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
              >
                Meet Dr. Reddy
              </Link>
            </motion.div>

            {/* Availability */}
            <motion.a
              href="tel:+919100017567"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-5 inline-flex items-center gap-2 text-sm text-vernon-500 transition-colors hover:text-clinical-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clinical-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clinical-400" />
              </span>
              Available now: +91 91000 17567
            </motion.a>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8"
            >
              <div>
                <p className="font-display text-3xl font-light tabular-nums text-white">
                  <SpringCounter value={13} suffix="+" />
                </p>
                <p className="text-xs text-vernon-500">Years of Practice</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="font-display text-3xl font-light tabular-nums text-white">
                  <SpringCounter value={15} suffix="k+" />
                </p>
                <p className="text-xs text-vernon-500">Procedures</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="font-display text-3xl font-light tabular-nums text-white">
                  <TextScramble value="4.9" />
                </p>
                <p className="text-xs text-vernon-500">Google Rating</p>
              </div>
            </motion.div>
          </div>

          {/* Visual — Image with cinematic treatment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ scale: imageScale }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/doctors/dr-brahmananda-reddy.jpg"
                alt="Dr. R. Brahmananda Reddy - Founder and Chief Dermatosurgeon at Vernon Skin and Hair Clinic"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
                placeholder="blur"
                blurDataURL={blurDataURLDark()}
              />
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-night-950/40 to-transparent" />

              {/* Name card */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-base font-medium text-white">Dr. R. Brahmananda Reddy</p>
                  <p className="text-sm text-white/60">Founder & Chief Dermatosurgeon</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-clinical-500/20 px-2.5 py-0.5 text-2xs font-medium text-clinical-300">ISHRS</span>
                    <span className="rounded-full bg-clinical-500/20 px-2.5 py-0.5 text-2xs font-medium text-clinical-300">MSc UK</span>
                    <span className="rounded-full bg-clinical-500/20 px-2.5 py-0.5 text-2xs font-medium text-clinical-300">13+ Years</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating credential cards with spotlight effect */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute -left-8 bottom-36"
            >
              <SpotlightCard className="rounded-2xl border border-white/10 bg-vernon-900/80 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinical-500/10">
                    <svg className="h-5 w-5 text-clinical-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">University of Hertfordshire</p>
                    <p className="text-xs text-vernon-400">MSc Dermatology, UK</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -right-4 top-20"
            >
              <SpotlightCard className="rounded-2xl border border-white/10 bg-vernon-900/80 p-4 shadow-2xl backdrop-blur-xl" glowColor="rgba(245,158,11,0.12)">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                    <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">ISHRS Member</p>
                    <p className="text-xs text-vernon-400">Hair Restoration Surgery</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory-50 to-transparent" />

      {/* Scroll indicator — clicks to scroll via Lenis */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer border-0 bg-transparent"
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-2xs uppercase tracking-widest text-vernon-500">Scroll</span>
          <svg className="h-4 w-4 text-vernon-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}
