'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { SpringCounter, Magnetic } from '@/components/ui/MotionPrimitives'
import { blurDataURLDark } from '@/lib/image-utils'

// Spring config — Apple-grade physics
const spring = { type: 'spring' as const, stiffness: 100, damping: 30 }

// Stagger helper
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { ...spring, delay },
})

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08])

  const scrollToContent = useCallback(() => {
    const nextSection = containerRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] overflow-hidden bg-night-950"
    >
      {/* Ambient texture — noise + faint grid */}
      <div className="noise-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      {/* Subtle warm radial glow — anchored behind the image */}
      <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(ellipse_70%_60%_at_70%_45%,rgba(45,212,191,0.04),transparent_70%)]" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="section-max-width section-padding relative flex min-h-[100dvh] items-center"
      >
        <div className="grid w-full grid-cols-1 items-center gap-16 py-24 lg:grid-cols-2 lg:gap-24">
          {/* ── Content column ── */}
          <div className="max-w-xl">
            {/* Trust badge — minimal */}
            <motion.div {...fadeUp(0.1)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clinical-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clinical-400" />
                </span>
                <span className="text-xs font-medium tracking-wide text-vernon-400">
                  UK-Trained Dermatosurgeon
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="mt-10 font-display text-5xl font-light leading-[1.05] text-white sm:text-7xl lg:text-8xl"
              style={{ letterSpacing: '-0.035em', textWrap: 'balance' }}
            >
              Your skin deserves
              <br />
              <span className="text-shimmer-light italic">
                a surgeon&apos;s touch.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              {...fadeUp(0.3)}
              className="mt-7 max-w-md text-lg leading-relaxed text-vernon-400 sm:text-xl"
              style={{ textWrap: 'balance' }}
            >
              Surgeon-led dermatology in Hyderabad. Founded by
              Dr.&nbsp;R.&nbsp;Brahmananda&nbsp;Reddy&nbsp;&mdash; UK&#8209;trained,
              ISHRS&#8209;certified.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              {...fadeUp(0.4)}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.12}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-vernon-950 shadow-lg shadow-white/10 transition-all hover:bg-ivory-50 hover:shadow-xl hover:shadow-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-night-950"
                >
                  Book Consultation
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                </Link>
              </Magnetic>

              <Link
                href="/about/dr-brahmananda-reddy"
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] px-6 py-3.5 text-sm font-medium text-white/80 transition-all hover:border-white/25 hover:text-white"
              >
                Meet the Doctor
              </Link>
            </motion.div>

            {/* Availability line */}
            <motion.a
              href="tel:+919100017567"
              {...fadeUp(0.5)}
              className="mt-6 inline-flex items-center gap-2 text-sm text-vernon-400/70 transition-colors hover:text-clinical-400"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clinical-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clinical-400" />
              </span>
              Available now &middot; +91 91000 17567
            </motion.a>

            {/* Stats row — simplified, just numbers */}
            <motion.div
              {...fadeUp(0.6)}
              className="mt-14 flex items-center gap-10 border-t border-white/[0.06] pt-8"
            >
              <div>
                <p className="font-display text-2xl font-light tabular-nums text-white/90">
                  <SpringCounter value={13} suffix="+" />
                </p>
                <p className="mt-0.5 text-xs text-vernon-400/60">Years</p>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div>
                <p className="font-display text-2xl font-light tabular-nums text-white/90">
                  <SpringCounter value={15} suffix="k+" />
                </p>
                <p className="mt-0.5 text-xs text-vernon-400/60">Procedures</p>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div>
                <p className="font-display text-2xl font-light tabular-nums text-white/90">
                  <SpringCounter value={4.9} decimals={1} />
                </p>
                <p className="mt-0.5 text-xs text-vernon-400/60">Google</p>
              </div>
            </motion.div>
          </div>

          {/* ── Image column — cinematic portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ scale: imageScale }}
              className="relative aspect-[3/4] overflow-hidden rounded-[2rem]"
            >
              <Image
                src="/images/doctors/dr-brahmananda-reddy.jpg"
                alt="Dr. R. Brahmananda Reddy — Founder and Chief Dermatosurgeon at Vernon Skin and Hair Clinic"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
                placeholder="blur"
                blurDataURL={blurDataURLDark()}
              />

              {/* Cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-night-950/50 via-transparent to-transparent" />

              {/* Bottom caption — clean, no card chrome */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-base font-medium text-white">
                  Dr. R. Brahmananda Reddy
                </p>
                <p className="mt-0.5 text-sm text-white/50">
                  Founder &amp; Chief Dermatosurgeon
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory-50 to-transparent" />

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer border-0 bg-transparent"
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-vernon-400/40">
            Scroll
          </span>
          <svg
            className="h-3.5 w-3.5 text-vernon-400/40"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}
