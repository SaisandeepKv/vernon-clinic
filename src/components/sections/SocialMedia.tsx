'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const socialLinks = {
  instagram: 'https://www.instagram.com/vernonskinclinic/',
  youtube: 'https://www.youtube.com/@VERNONSKINCLINIC',
  linkedin: 'https://in.linkedin.com/company/vernon-skin-clinic',
  practo: 'https://www.practo.com/hyderabad/clinic/vernon-skin-and-hair-clinic-banjara-hills',
  google: 'https://g.page/VernonSkinClinic',
}

// Curated Instagram post highlights (represents real content types from @vernonskinclinic)
const instagramPosts = [
  {
    id: 1,
    type: 'result' as const,
    caption: 'Hair transplant — 8 month follow-up. 3200 grafts FUE technique.',
    likes: 342,
    gradient: 'from-vernon-800 via-vernon-700 to-vernon-600',
    icon: '💇',
    tag: 'Before & After',
  },
  {
    id: 2,
    type: 'education' as const,
    caption: 'Pico laser vs Q-switch — which one suits your pigmentation?',
    likes: 518,
    gradient: 'from-clinical-700 via-clinical-600 to-clinical-500',
    icon: '🔬',
    tag: 'Education',
  },
  {
    id: 3,
    type: 'result' as const,
    caption: 'Melasma clearing — 6 sessions. Combination peel + laser protocol.',
    likes: 287,
    gradient: 'from-amber-700 via-amber-600 to-amber-500',
    icon: '✨',
    tag: 'Results',
  },
  {
    id: 4,
    type: 'tip' as const,
    caption: 'The 3 sunscreen mistakes that are worsening your pigmentation.',
    likes: 1204,
    gradient: 'from-emerald-700 via-emerald-600 to-emerald-500',
    icon: '☀️',
    tag: 'Skin Tips',
  },
  {
    id: 5,
    type: 'result' as const,
    caption: 'Acne scar revision — subcision + MNRF combo. 5 sessions done.',
    likes: 456,
    gradient: 'from-purple-700 via-purple-600 to-purple-500',
    icon: '🎯',
    tag: 'Before & After',
  },
  {
    id: 6,
    type: 'education' as const,
    caption: 'PRP vs GFC for hair — which growth factor therapy works best?',
    likes: 891,
    gradient: 'from-rose-700 via-rose-600 to-rose-500',
    icon: '🧬',
    tag: 'Education',
  },
  {
    id: 7,
    type: 'tip' as const,
    caption: 'Night routine for acne-prone skin — dermatologist approved.',
    likes: 763,
    gradient: 'from-indigo-700 via-indigo-600 to-indigo-500',
    icon: '🌙',
    tag: 'Skin Tips',
  },
  {
    id: 8,
    type: 'result' as const,
    caption: 'Chin filler transformation — non-surgical profile enhancement.',
    likes: 932,
    gradient: 'from-pink-700 via-pink-600 to-pink-500',
    icon: '💎',
    tag: 'Aesthetics',
  },
]

function InstagramCard({ post, index }: { post: typeof instagramPosts[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      href={socialLinks.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square overflow-hidden rounded-xl"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-all duration-500 group-hover:scale-110`} />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
        <span className="text-2xl transition-transform duration-300 group-hover:scale-125">{post.icon}</span>
        <span className="mt-2 text-2xs font-medium leading-tight text-white/80 line-clamp-3">
          {post.caption}
        </span>
        <span className="mt-1.5 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm">
          {post.tag}
        </span>
      </div>

      {/* Hover overlay with likes */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-1.5 text-white">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-sm font-semibold">{post.likes.toLocaleString()}</span>
        </div>
      </div>
    </motion.a>
  )
}

function PlatformCard({
  href,
  gradient,
  icon,
  name,
  description,
  badge,
  action,
  index,
}: {
  href: string
  gradient: string
  icon: React.ReactNode
  name: string
  description: string
  badge: React.ReactNode
  action: string
  index: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-2xl ${gradient} p-5 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-center justify-between">
          {icon}
          {badge}
        </div>
        <h3 className="mt-3 text-base font-semibold">{name}</h3>
        <p className="mt-1 text-xs text-white/70">{description}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium">
          {action}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  )
}

export function SocialMedia() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })
  const reviewBarRef = useRef<HTMLDivElement>(null)
  const reviewBarInView = useInView(reviewBarRef, { once: true, margin: '-30px' })

  return (
    <section className="bg-vernon-50/50 py-20 lg:py-28">
      <div className="section-max-width section-padding">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-clinical-600"
            >
              Stay Connected
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 text-3xl font-light tracking-tight text-vernon-900 lg:text-4xl"
            >
              Follow Vernon for{' '}
              <span className="text-shimmer">
                daily skincare insights
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base text-vernon-500"
            >
              Treatment results, educational reels, skincare tips, and behind-the-scenes
              — directly from Dr. Brahmananda Reddy.
            </motion.p>
          </div>

          {/* Quick social stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <div className="text-center">
              <span className="block font-display text-2xl text-vernon-900">14K+</span>
              <span className="text-xs text-vernon-400">Followers</span>
            </div>
            <div className="h-8 w-px bg-vernon-200" />
            <div className="text-center">
              <span className="block font-display text-2xl text-vernon-900">790+</span>
              <span className="text-xs text-vernon-400">Posts</span>
            </div>
            <div className="h-8 w-px bg-vernon-200" />
            <div className="text-center">
              <span className="block font-display text-2xl text-vernon-900">48+</span>
              <span className="text-xs text-vernon-400">Videos</span>
            </div>
          </motion.div>
        </div>

        {/* Instagram feed grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <span className="text-xs font-bold text-vernon-900">V</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-vernon-900">vernonskinclinic</p>
                <p className="text-xs text-vernon-400">Vernon Skin and Hair Clinic</p>
              </div>
            </div>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-pink-500/25"
            >
              Follow on Instagram
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {instagramPosts.map((post, index) => (
              <InstagramCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* "See more on Instagram" link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-4 text-center"
          >
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-vernon-500 transition-colors hover:text-vernon-900"
            >
              See all 790+ posts on Instagram
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Platform cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PlatformCard
            index={0}
            href={socialLinks.youtube}
            gradient="bg-gradient-to-br from-red-600 to-red-700"
            icon={
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            }
            name="YouTube"
            description="Educational videos & procedure walkthroughs by Dr. Reddy"
            badge={
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-2xs font-medium backdrop-blur-sm">
                48+ videos
              </span>
            }
            action="Subscribe"
          />

          <PlatformCard
            index={1}
            href={socialLinks.linkedin}
            gradient="bg-gradient-to-br from-blue-700 to-blue-800"
            icon={
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
            name="LinkedIn"
            description="Professional updates & clinic milestones"
            badge={
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-2xs font-medium backdrop-blur-sm">
                Professional
              </span>
            }
            action="Connect"
          />

          <PlatformCard
            index={2}
            href={socialLinks.google}
            gradient="bg-gradient-to-br from-vernon-800 to-vernon-900"
            icon={
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            }
            name="Google Reviews"
            description="3,400+ verified patient reviews"
            badge={
              <div className="flex items-center gap-1">
                <span className="text-base font-bold text-amber-400">4.9</span>
                <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            }
            action="Read reviews"
          />

          <PlatformCard
            index={3}
            href={socialLinks.practo}
            gradient="bg-gradient-to-br from-clinical-600 to-clinical-700"
            icon={
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            }
            name="Practo"
            description="Book appointments & view profile"
            badge={
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-2xs font-medium backdrop-blur-sm">
                Online booking
              </span>
            }
            action="Book now"
          />
        </div>

        {/* Google Reviews bar */}
        <motion.div
          ref={reviewBarRef}
          initial={{ opacity: 0, y: 20 }}
          animate={reviewBarInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-8 flex items-center justify-between rounded-xl border border-vernon-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-vernon-900">4.9 on Google Reviews</p>
              <p className="text-xs text-vernon-400">3,400+ verified patient reviews — among the highest rated in Hyderabad</p>
            </div>
          </div>
          <a
            href={socialLinks.google}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 rounded-full bg-vernon-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-vernon-800"
          >
            Read Reviews
          </a>
        </motion.div>
      </div>
    </section>
  )
}
