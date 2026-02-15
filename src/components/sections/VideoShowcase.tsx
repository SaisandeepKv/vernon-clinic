'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getFeaturedVideos, youtubeChannelUrl } from '@/data/youtube-videos'

export function VideoShowcase() {
  const featured = getFeaturedVideos()
  const [activeVideo, setActiveVideo] = useState(featured[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="mesh-blob-1 absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-red-600/5 to-transparent blur-3xl" />
        <div className="mesh-blob-3 absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-earth-600/5 to-transparent blur-3xl" />
      </div>
      <div className="noise-overlay absolute inset-0" />

      <div className="section-max-width section-padding relative">
        <div ref={headingRef} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-earth-400"
            >
              Watch & Learn
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 text-3xl font-light tracking-tight text-white lg:text-4xl"
            >
              Videos from <span className="text-shimmer-light">Dr. Brahmananda Reddy</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-base text-brand-400"
            >
              Educational videos explaining treatments, procedures, and skincare
              — directly from our clinic.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 hover:scale-105 active:scale-[0.98]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </motion.a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main video player */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/50">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0&modestbranding=1&autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group absolute inset-0 flex items-center justify-center"
                  aria-label={`Play video: ${activeVideo.title}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${activeVideo.id}/maxresdefault.jpg`}
                    alt={activeVideo.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-2xl transition-transform group-hover:scale-110">
                    <svg className="ml-1 h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">
              {activeVideo.title}
            </h3>
          </motion.div>

          {/* Video playlist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
              Featured Videos
            </p>
            {featured.map((video, index) => (
              <motion.button
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                onClick={() => { setActiveVideo(video); setIsPlaying(false); }}
                className={`group flex items-start gap-3 rounded-lg p-3 text-left transition-all duration-200 ${
                  activeVideo.id === video.id
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-28 flex-shrink-0 overflow-hidden rounded-md bg-brand-800">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <svg className="h-6 w-6 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium leading-snug ${
                    activeVideo.id === video.id ? 'text-white' : 'text-brand-300 group-hover:text-white'
                  }`}>
                    {video.title}
                  </p>
                  <p className="mt-1 text-xs text-brand-500">
                    {video.language === 'telugu' ? 'Telugu' : video.language === 'bilingual' ? 'Telugu & English' : 'English'}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
