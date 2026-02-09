'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { SchemaOrg } from '@/components/schema/SchemaOrg'

const faqs = [
  {
    question: 'How long does a hair transplant take?',
    answer:
      'A typical FUE hair transplant at Vernon takes 6-8 hours for 2000-3000 grafts, performed in a single session under local anesthesia. Dr. Reddy personally performs the extraction and implantation. You can go home the same day.',
  },
  {
    question: 'Is Pico laser safe for Indian skin?',
    answer:
      'Yes. Our PicoWay laser uses photoacoustic technology (not photothermal), which shatters pigment without heat damage. This makes it significantly safer for Fitzpatrick IV-VI skin types compared to traditional Q-switched lasers, with minimal risk of post-inflammatory hyperpigmentation.',
  },
  {
    question: 'How much does a consultation cost?',
    answer:
      'The consultation fee is ₹400 across all three locations. This includes a thorough 20-30 minute evaluation by Dr. Reddy using dermatoscopy, Wood\'s lamp, or trichoscopy as needed. The fee is applicable towards any treatment you proceed with.',
  },
  {
    question: 'Do you accept walk-in patients?',
    answer:
      'Yes, walk-ins are welcome at all three locations. However, we recommend booking in advance (via WhatsApp, phone, or the website) to minimize wait times, especially at our Banjara Hills clinic.',
  },
  {
    question: 'Does Dr. Reddy personally do the procedures?',
    answer:
      'Yes. Unlike clinic chains where procedures are delegated to technicians, Dr. Reddy personally performs or directly supervises every treatment at Vernon. This is a non-negotiable standard at our clinic.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between py-5 text-left text-base font-medium text-vernon-900 transition-colors hover:text-clinical-700">
          <span className="pr-4">{faq.question}</span>
          <svg
            className="h-5 w-5 flex-shrink-0 text-vernon-400 transition-transform duration-200 group-open:rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </summary>
        <div className="pb-5 text-sm leading-relaxed text-vernon-600">
          {faq.answer}
        </div>
      </details>
    </motion.div>
  )
}

export function HomepageFAQ() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="border-t border-vernon-100 bg-vernon-50/50 py-20 lg:py-28">
      <SchemaOrg schema={faqSchema} />
      <div className="section-max-width section-padding">
        <div className="mx-auto max-w-3xl">
          <div ref={headingRef} className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label"
            >
              Common Questions
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-2 mt-3"
            >
              Frequently asked <span className="text-shimmer">questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-base mt-3"
            >
              Quick answers to the most common questions from our patients.
            </motion.p>
          </div>

          <div className="mt-12 divide-y divide-vernon-200">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Link href="/faq" className="btn-ghost text-clinical-600 hover:text-clinical-700">
              View all FAQs
              <svg className="ml-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
