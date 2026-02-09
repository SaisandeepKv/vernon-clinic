'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Book a Consultation',
    description:
      'Schedule via WhatsApp, phone, or the website. Walk-ins welcome at any of our three locations.',
    detail: 'Consultation fee: ₹400',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Expert Assessment',
    description:
      'Dr. Reddy personally evaluates your concern using dermatoscopy, Wood\'s lamp, or trichoscopy as needed. No delegation.',
    detail: 'Thorough 20-30 min evaluation',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Personalized Treatment Plan',
    description:
      'A clear treatment plan with realistic expectations, timeline, and transparent pricing. No surprise costs.',
    detail: 'Options discussed, not pushed',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Treatment & Follow-Up',
    description:
      'Procedures performed by Dr. Reddy personally. Structured follow-up protocol ensures optimal outcomes.',
    detail: 'Ongoing care & maintenance plan',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="relative flex flex-col lg:text-center"
    >
      {/* Connecting line - desktop only */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="absolute left-[calc(50%+1.5rem)] right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-vernon-200 to-vernon-100 lg:block"
        />
      )}

      <div className="relative flex items-start gap-4 lg:flex-col lg:items-center">
        {/* Number circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: index * 0.2 + 0.1,
          }}
          className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-vernon-900 shadow-lg shadow-vernon-900/20"
        >
          <span className="font-mono text-sm font-bold text-white">{step.number}</span>
        </motion.div>

        <div className="flex-1 lg:mt-4">
          <h3 className="text-lg font-medium text-vernon-900">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-vernon-500">
            {step.description}
          </p>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            className="mt-3 inline-block rounded-full bg-clinical-50 px-3 py-1 text-xs font-medium text-clinical-700"
          >
            {step.detail}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export function PatientJourney() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section className="py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <div ref={headingRef} className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label"
          >
            Your Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-2 mt-3"
          >
            What to expect at <span className="text-shimmer">Vernon</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-base mx-auto mt-3 max-w-2xl"
          >
            From your first consultation to follow-up care, every step is
            designed around transparency and clinical excellence.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
