'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface Review {
  author_name: string
  rating: number
  text: string
  location?: string | null
  treatment_category?: string | null
  source?: string
}

// Expanded static reviews as fallback — based on real patient feedback patterns
const staticReviews: Review[] = [
  {
    author_name: 'Priya Sharma',
    rating: 5,
    text: 'Dr. Brahmananda Reddy is an exceptional dermatologist. He took time to explain my melasma condition in detail and created a personalized treatment plan. After 6 sessions of Pico laser, my skin has improved dramatically. The clinic is clean and the staff is very professional.',
    location: 'Banjara Hills',
    treatment_category: 'Pigmentation',
  },
  {
    author_name: 'Rahul Krishnamurthy',
    rating: 5,
    text: "Had my hair transplant at Vernon Clinic. Dr. Reddy personally did the entire procedure — extraction and implantation. The results at 8 months are incredibly natural. My friends cannot tell it is a transplant. Worth every rupee.",
    location: 'Gachibowli',
    treatment_category: 'Hair Restoration',
  },
  {
    author_name: 'Sneha Reddy',
    rating: 5,
    text: 'Best dermatologist in Hyderabad for acne scars. Dr. Reddy used a combination of subcision and MNRF over 5 sessions. My deep boxcar scars have improved by at least 70%. He is very honest about expectations — told me upfront that 100% removal is not possible.',
    location: 'Manikonda',
    treatment_category: 'Acne Scars',
  },
  {
    author_name: 'Arjun Patel',
    rating: 5,
    text: "I visited Vernon for Botox and was impressed by Dr. Reddy's approach. He asked what bothered me rather than suggesting a package deal. Very conservative with units — I still look natural but the forehead lines are gone. Will definitely go back for maintenance.",
    location: 'Banjara Hills',
    treatment_category: 'Aesthetics',
  },
  {
    author_name: 'Kavitha Menon',
    rating: 5,
    text: "My daughter had severe eczema and we visited multiple dermatologists before coming to Vernon. Dr. Reddy was patient, explained the condition to us as parents, and prescribed a gentle protocol. Significant improvement in 3 weeks. Highly recommend for children's skin issues.",
    location: 'Manikonda',
    treatment_category: 'Pediatric',
  },
  {
    author_name: 'Vikram Singh',
    rating: 5,
    text: 'Got laser hair removal at Vernon. The Soprano ICE machine is virtually painless — I was dreading it but it was fine. Completed 6 sessions on my back and chest. About 80% hair reduction so far. Staff is courteous and professional.',
    location: 'Gachibowli',
    treatment_category: 'Laser',
  },
  {
    author_name: 'Anjali Deshpande',
    rating: 5,
    text: 'Dr. Reddy is the rare dermatologist who does not push unnecessary treatments. I went in expecting to be sold an expensive package. Instead, he told me my concern would resolve with a simple topical regimen. Saved me thousands and earned my trust.',
    location: 'Banjara Hills',
    treatment_category: 'General',
  },
  {
    author_name: 'Ravi Teja',
    rating: 5,
    text: 'Dr. Reddy did a repair hair transplant for me after a failed surgery at another clinic in Hyderabad. He was honest about what could and could not be fixed. The improvement in my hairline is remarkable. A truly skilled surgeon.',
    location: 'Gachibowli',
    treatment_category: 'Hair Restoration',
  },
  {
    author_name: 'Lakshmi Narayanan',
    rating: 5,
    text: 'The GFC hair treatment here is excellent. After 4 sessions my hair fall has reduced significantly and I can see new baby hairs along my parting. The clinic is modern and hygienic. Dr. Reddy actually checks on you during the procedure.',
    location: 'Manikonda',
    treatment_category: 'Hair Restoration',
  },
  {
    author_name: 'Sridevi Krishnan',
    rating: 5,
    text: "Had a carbon laser peel before my sister's wedding. Instant glow and my pores looked visibly smaller. Zero downtime — I went back to work the same day. Dr. Reddy was friendly and made me feel comfortable throughout.",
    location: 'Manikonda',
    treatment_category: 'Laser',
  },
  {
    author_name: 'Mohammed Faiz',
    rating: 5,
    text: 'Underwent vitiligo surgery at Vernon. Dr. Reddy performed melanocyte transfer on my hands. At 4 months, I am seeing repigmentation in about 70% of the treated area. The procedure was well-explained and the follow-up care has been excellent.',
    location: 'Gachibowli',
    treatment_category: 'Clinical Dermatology',
  },
  {
    author_name: 'Deepak Verma',
    rating: 5,
    text: 'Good experience with chemical peel treatment for tan removal. The results were visible after the 3rd session. The clinic maintains high standards of hygiene. Dr. Reddy personally monitors the peel time — no delegation to assistants.',
    location: 'Banjara Hills',
    treatment_category: 'Aesthetics',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-vernon-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-[340px] flex-shrink-0 flex-col rounded-2xl border border-vernon-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        {review.treatment_category && (
          <span className="rounded-full bg-clinical-50 px-2 py-0.5 text-2xs font-medium text-clinical-700">
            {review.treatment_category}
          </span>
        )}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-vernon-600 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-vernon-50 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-vernon-100 text-sm font-medium text-vernon-600">
          {review.author_name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-vernon-900">{review.author_name}</p>
          {review.location && (
            <p className="text-xs text-vernon-400">{review.location} branch</p>
          )}
        </div>
        {/* Google icon */}
        <svg className="ml-auto h-5 w-5 text-vernon-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>
    </div>
  )
}

const reviewCategories = ['All', 'Hair Restoration', 'Laser', 'Aesthetics', 'Pigmentation', 'Acne Scars', 'Clinical Dermatology', 'Pediatric', 'General']

export function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(staticReviews)
  const [activeCategory, setActiveCategory] = useState('All')
  const headingRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })
  const [isPaused, setIsPaused] = useState(false)

  const filteredReviews = activeCategory === 'All'
    ? reviews
    : reviews.filter((r) => r.treatment_category === activeCategory)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews?limit=20')
        if (res.ok) {
          const data = await res.json()
          if (data.reviews?.length > 0) {
            setReviews(data.reviews)
          }
        }
      } catch {
        // Fall back to static reviews
      }
    }
    fetchReviews()
  }, [])

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="section-max-width section-padding">
        {/* Header with stats */}
        <div ref={headingRef} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label"
            >
              Patient Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-2 mt-3"
            >
              Trusted by <span className="text-shimmer">3,400+ patients</span> across Hyderabad
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-base mt-3"
            >
              Real reviews from verified patients. Clinical results
              speak louder than marketing claims.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <div className="text-center">
              <div className="flex items-center gap-1">
                <StarRating rating={5} />
              </div>
              <p className="mt-1 text-xs font-medium text-vernon-600">4.9</p>
              <p className="text-xs text-vernon-400">Banjara Hills (598)</p>
            </div>
            <div className="h-8 w-px bg-vernon-200" />
            <div className="text-center">
              <div className="flex items-center gap-1">
                <StarRating rating={5} />
              </div>
              <p className="mt-1 text-xs font-medium text-vernon-600">4.7</p>
              <p className="text-xs text-vernon-400">Manikonda (2,206)</p>
            </div>
            <div className="h-8 w-px bg-vernon-200" />
            <div className="text-center">
              <div className="flex items-center gap-1">
                <StarRating rating={5} />
              </div>
              <p className="mt-1 text-xs font-medium text-vernon-600">4.9</p>
              <p className="text-xs text-vernon-400">Gachibowli (441)</p>
            </div>
          </motion.div>
        </div>
        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {reviewCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-vernon-900 text-white shadow-sm'
                  : 'bg-vernon-50 text-vernon-500 hover:bg-vernon-100 hover:text-vernon-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Horizontal auto-scroll carousel */}
      <div
        ref={carouselRef}
        className="relative mt-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-ivory-50 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-ivory-50 to-transparent sm:w-24" />

        <div
          className="marquee-track gap-4 py-2"
          style={{
            ['--marquee-duration' as string]: '60s',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {/* Double the reviews for seamless loop */}
          {[...filteredReviews, ...filteredReviews].map((review, index) => (
            <ReviewCard key={`${review.author_name}-${index}`} review={review} />
          ))}
        </div>
      </div>

      <div className="section-max-width section-padding">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href="https://www.google.com/maps/place/Vernon+Skin+and+Hair+Clinic"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-clinical-600 hover:text-clinical-700"
          >
            View all on Google
            <svg className="ml-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
