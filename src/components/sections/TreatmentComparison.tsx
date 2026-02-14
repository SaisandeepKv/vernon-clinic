'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const comparisonData = [
  {
    feature: 'Technique',
    fue: 'Individual follicle extraction',
    fut: 'Strip harvesting',
    dhi: 'Direct implant with Choi pen',
  },
  {
    feature: 'Scarring',
    fue: 'Minimal dot scars',
    fut: 'Linear scar (hidden by hair)',
    dhi: 'Minimal dot scars',
  },
  {
    feature: 'Recovery Time',
    fue: '7–10 days',
    fut: '10–14 days',
    dhi: '7–10 days',
  },
  {
    feature: 'Graft Survival',
    fue: '90–95%',
    fut: '95–98%',
    dhi: '90–95%',
  },
  {
    feature: 'Max Grafts/Session',
    fue: '4,000–5,000',
    fut: '3,000–4,000',
    dhi: '3,000–4,000',
  },
  {
    feature: 'Best For',
    fue: 'Most cases, short hair',
    fut: 'Large coverage needed',
    dhi: 'Precise hairline work',
  },
  {
    feature: 'Shaving Required',
    fue: 'Donor area only',
    fut: 'Strip area only',
    dhi: 'Partial or no shaving',
  },
  {
    feature: 'Session Duration',
    fue: '6–8 hours',
    fut: '4–6 hours',
    dhi: '6–10 hours',
  },
]

export function TreatmentComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <div ref={ref}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label"
          >
            Compare Techniques
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-2 mt-3"
          >
            Hair transplant methods <span className="text-shimmer">compared</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-base mt-3 max-w-2xl"
          >
            Dr. Reddy selects the optimal technique based on your hair loss pattern, donor quality, and goals — not a one-size-fits-all approach.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="border-b border-vernon-200 pb-4 pr-6 text-left text-sm font-medium text-vernon-500">
                  Feature
                </th>
                <th className="border-b border-vernon-200 pb-4 px-4 text-left text-sm font-medium text-vernon-900">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-clinical-50 px-3 py-1 text-clinical-700">
                    FUE
                  </span>
                </th>
                <th className="border-b border-vernon-200 pb-4 px-4 text-left text-sm font-medium text-vernon-900">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-vernon-100 px-3 py-1 text-vernon-700">
                    FUT
                  </span>
                </th>
                <th className="border-b border-vernon-200 pb-4 px-4 text-left text-sm font-medium text-vernon-900">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                    DHI
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="group"
                >
                  <td className="border-b border-vernon-100 py-4 pr-6 text-sm font-medium text-vernon-700">
                    {row.feature}
                  </td>
                  <td className="border-b border-vernon-100 py-4 px-4 text-sm text-vernon-600 group-hover:text-vernon-900 transition-colors">
                    {row.fue}
                  </td>
                  <td className="border-b border-vernon-100 py-4 px-4 text-sm text-vernon-600 group-hover:text-vernon-900 transition-colors">
                    {row.fut}
                  </td>
                  <td className="border-b border-vernon-100 py-4 px-4 text-sm text-vernon-600 group-hover:text-vernon-900 transition-colors">
                    {row.dhi}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 text-center text-sm text-vernon-400"
        >
          The right technique is determined during consultation based on your specific needs.
          <a href="/contact" className="ml-1 text-clinical-600 hover:underline">Book an assessment →</a>
        </motion.p>
      </div>
    </section>
  )
}
