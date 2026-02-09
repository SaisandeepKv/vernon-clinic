'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const tableRows = [
  { param: 'Pulse Speed', old: 'Nanosecond (10⁻⁹)', new: 'Picosecond (10⁻¹²)' },
  { param: 'Mechanism', old: 'Photothermal (Heat)', new: 'Photoacoustic (Impact)' },
  { param: 'Particle Size', old: '"Pebbles"', new: '"Dust"' },
  { param: 'Sessions', old: '10–15+', new: '4–8' },
  { param: 'Indian Skin Safety', old: 'Moderate risk', new: 'Highest safety' },
  { param: 'All Colors', old: 'Limited', new: 'Full spectrum' },
  { param: 'Downtime', old: '3–7 days', new: '24–48 hours' },
  { param: 'Pain Level', old: 'Moderate–High', new: 'Mild' },
]

export function PicoComparison() {
  const headingRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-50px' })
  const tableInView = useInView(tableRef, { once: true, margin: '-40px' })

  return (
    <section className="border-y border-vernon-100 bg-white py-20 lg:py-28">
      <div className="section-max-width section-padding">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div ref={headingRef}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label"
            >
              Featured Technology
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-2 mt-3"
            >
              The Physics of <span className="text-shimmer">Pico Laser</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-base mt-4"
            >
              Picosecond laser technology represents a fundamental shift in how
              laser energy interacts with pigment. Understanding the science helps
              you understand why it&apos;s the safest option for Indian skin.
            </motion.p>

            <div className="mt-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-xl border border-vernon-100 p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="flex items-center gap-2 text-base font-medium text-vernon-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-600">
                    OLD
                  </span>
                  Traditional Q-Switch (Nanosecond)
                </h3>
                <p className="mt-2 text-sm text-vernon-500">
                  Fires in nanoseconds (10⁻⁹ seconds). Relies on <strong className="text-vernon-700">photothermal</strong> energy
                  — heat — to break pigment. On Indian skin (Fitzpatrick IV–VI),
                  this heat is absorbed by surrounding melanocytes, causing burns
                  and post-inflammatory hyperpigmentation. Breaks ink into
                  &ldquo;pebble-sized&rdquo; fragments that the body clears slowly.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700">10–15+ sessions</span>
                  <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700">Higher burn risk</span>
                  <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700">Struggles with green/blue</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="rounded-xl border-2 border-clinical-200 bg-clinical-50/30 p-5 transition-shadow hover:shadow-md hover:shadow-clinical-100"
              >
                <h3 className="flex items-center gap-2 text-base font-medium text-vernon-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-clinical-100 text-xs font-bold text-clinical-700">
                    NEW
                  </span>
                  Pico Laser (Picosecond) — Used at Vernon
                </h3>
                <p className="mt-2 text-sm text-vernon-600">
                  Fires in picoseconds (10⁻¹² seconds) — <strong className="text-vernon-800">1,000× faster</strong>.
                  The dominant mechanism shifts to <strong className="text-vernon-800">photoacoustic</strong>:
                  shockwaves shatter pigment through mechanical force, not heat.
                  Energy is spent on particle destruction before thermal diffusion
                  can damage surrounding tissue. Breaks ink into &ldquo;dust-sized&rdquo;
                  particles that macrophages clear rapidly.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded bg-clinical-100 px-2 py-0.5 text-xs text-clinical-800">4–8 sessions</span>
                  <span className="rounded bg-clinical-100 px-2 py-0.5 text-xs text-clinical-800">Safest for Indian skin</span>
                  <span className="rounded bg-clinical-100 px-2 py-0.5 text-xs text-clinical-800">All ink colors</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/treatments/laser-and-pico/pico-laser-pigmentation"
                className="btn-primary mt-8"
              >
                Learn more about Pico at Vernon
              </Link>
            </motion.div>
          </div>

          {/* Comparison table */}
          <motion.div
            ref={tableRef}
            initial={{ opacity: 0, y: 40 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="sticky top-24"
          >
            <div className="overflow-hidden rounded-xl border border-vernon-100 bg-white shadow-lg shadow-vernon-900/5">
              <div className="bg-vernon-950 px-6 py-4">
                <h3 className="text-sm font-semibold text-white">
                  Technical Comparison
                </h3>
                <p className="text-xs text-vernon-400">
                  Q-Switch vs Pico Laser
                </p>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-vernon-100">
                    <th className="px-4 py-3 text-left text-xs font-medium text-vernon-400">
                      Parameter
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-red-500">
                      Q-Switch
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-clinical-600">
                      Pico (Vernon)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vernon-50 text-sm">
                  {tableRows.map((row, index) => (
                    <motion.tr
                      key={row.param}
                      initial={{ opacity: 0, x: 20 }}
                      animate={tableInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.06,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                    >
                      <td className="px-4 py-2.5 text-xs font-medium text-vernon-700">
                        {row.param}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-vernon-500">
                        {row.old}
                      </td>
                      <td className="px-4 py-2.5 text-xs font-medium text-clinical-700">
                        {row.new}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
