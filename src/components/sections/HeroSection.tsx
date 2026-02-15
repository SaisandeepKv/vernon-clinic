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

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08])

  const scrollToContent = useCallback(() => {
    const nextSection = containerRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] overflow-hidden bg-sand-50">
      {/* Subtle warm gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand-50 via-sand-100/50 to-earth-50/30" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-earth-100/30 blur-[120px]" />
      <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-sand-200/40 blur-[100px]" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-main relative flex min-h-[100dvh] items-center"
      >
        <div className="grid w-full grid-cols-1 items-center gap-12 py-24 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          {/* Content — left side */}
          <div className="max-w-2xl">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="h-px w-8 bg-earth-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-earth-600">
                Hyderabad&apos;s Surgeon-Led Dermatology Center
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="mt-7 font-display text-display-md font-normal leading-[1.05] tracking-tight text-brand-950 lg:text-display-xl"
            >
              <KineticHeadline text="Precision" delay={0.4} staggerDelay={0.035} />
              <br />
              <KineticHeadline text="Dermatology." delay={0.6} staggerDelay={0.035} />
              <br />
              <span className="italic text-earth-600">
                <KineticHeadline text="Natural Results." delay={0.9} staggerDelay={0.035} />
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-brand-500"
            >
              Founded by Dr. R. Brahmananda Reddy — UK-trained, ISHRS-certified
              dermatosurgeon trusted by physicians across Asia.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.15}>
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Book a Consultation
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </Magnetic>
              <a
                href="tel:+919100017567"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91 91000 17567
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-14 flex items-center gap-10 border-t border-brand-100 pt-8"
            >
              <div>
                <p className="font-display text-4xl tabular-nums text-brand-950">
                  <SpringCounter value={13} suffix="+" />
                </p>
                <p className="mt-1 text-xs text-brand-400">Years of Practice</p>
              </div>
              <div className="h-10 w-px bg-brand-100" />
              <div>
                <p className="font-display text-4xl tabular-nums text-brand-950">
                  <SpringCounter value={15} suffix="k+" />
                </p>
                <p className="mt-1 text-xs text-brand-400">Procedures</p>
              </div>
              <div className="h-10 w-px bg-brand-100" />
              <div>
                <p className="font-display text-4xl tabular-nums text-brand-950">
                  <TextScramble value="4.9" />
                </p>
                <p className="mt-1 text-xs text-brand-400">Google Rating</p>
              </div>
            </motion.div>
          </div>

          {/* Visual — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ scale: imageScale }}
              className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/10"
            >
              <Image
                src="/images/doctors/dr-brahmananda-reddy.jpg"
                alt="Dr. R. Brahmananda Reddy - Founder and Chief Dermatosurgeon at Vernon Skin and Hair Clinic"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 45vw"
                placeholder="blur"
                blurDataURL={blurDataURLDark()}
              />
              {/* Warm gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />

              {/* Name card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-base font-medium text-white">Dr. R. Brahmananda Reddy</p>
                  <p className="text-sm text-white/70">Founder & Chief Dermatosurgeon</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-earth-500/20 px-2.5 py-0.5 text-2xs font-medium text-earth-200">ISHRS</span>
                    <span className="rounded-full bg-earth-500/20 px-2.5 py-0.5 text-2xs font-medium text-earth-200">MSc UK</span>
                    <span className="rounded-full bg-earth-500/20 px-2.5 py-0.5 text-2xs font-medium text-earth-200">13+ Years</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating credential cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute -left-10 bottom-40"
            >
              <SpotlightCard className="rounded-2xl border border-brand-100 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-50">
                    <svg className="h-5 w-5 text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-900">University of Hertfordshire</p>
                    <p className="text-xs text-brand-400">MSc Dermatology, UK</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -right-6 top-24"
            >
              <SpotlightCard className="rounded-2xl border border-brand-100 bg-white p-4 shadow-xl" glowColor="rgba(75,139,87,0.08)">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-900">ISHRS Member</p>
                    <p className="text-xs text-brand-400">Hair Restoration Surgery</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
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
          <span className="text-2xs uppercase tracking-widest text-brand-400">Scroll</span>
          <svg className="h-4 w-4 text-brand-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}
