'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { blogPosts } from '@/data/blog-posts'

export function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="border-t border-brand-100 bg-brand-50/50 py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <div ref={headingRef} className="flex items-end justify-between">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label"
            >
              Dr. Reddy&apos;s Clinical Notes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-2 mt-3"
            >
              Evidence-based{' '}
              <span className="text-shimmer">insights</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-base mt-3"
            >
              No marketing fluff — just the science and clinical reality behind
              modern dermatology.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="btn-ghost hidden text-earth-600 hover:text-earth-700 sm:flex"
            >
              View all articles
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="btn-ghost text-earth-600">
            View all articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

function BlogCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-100/80 bg-white transition-all duration-300 hover:border-brand-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 ${
          index === 0 ? 'md:col-span-2 md:flex-row' : ''
        }`}
      >
        {/* Post image */}
        <div className={`relative overflow-hidden ${
          index === 0 ? 'md:w-2/5 h-[200px] md:h-auto' : 'h-[180px]'
        }`}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={index === 0 ? '(max-width: 768px) 100vw, 40vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-900 to-brand-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block rounded-full bg-white/20 px-2.5 py-1 text-2xs font-medium text-white backdrop-blur-sm">
              {post.category}
            </span>
            <p className="mt-1 text-xs text-white/70">{post.readTime}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="flex-1 text-lg font-medium leading-snug text-brand-900 transition-colors group-hover:text-earth-700">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-brand-500 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 border-t border-brand-50 pt-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-100 text-2xs font-medium text-earth-700">
              BR
            </div>
            <span className="text-xs text-brand-500">{post.author}</span>
            <svg className="ml-auto h-4 w-4 text-brand-300 transition-transform group-hover:translate-x-1 group-hover:text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
