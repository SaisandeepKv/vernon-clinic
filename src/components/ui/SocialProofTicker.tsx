'use client'

import { motion } from 'framer-motion'

const proofItems = [
  { name: 'Priya', location: 'Banjara Hills', action: 'booked a Hair Transplant consultation' },
  { name: 'Rahul', location: 'Gachibowli', action: 'completed PRP therapy session' },
  { name: 'Sneha', location: 'Manikonda', action: 'booked Pico Laser treatment' },
  { name: 'Arjun', location: 'Jubilee Hills', action: 'completed acne scar revision' },
  { name: 'Kavitha', location: 'Hitech City', action: 'booked Botox consultation' },
  { name: 'Vikram', location: 'Kondapur', action: 'completed laser hair removal' },
  { name: 'Anjali', location: 'Banjara Hills', action: 'booked skin consultation' },
  { name: 'Ravi', location: 'Manikonda', action: 'completed hair transplant follow-up' },
]

export function SocialProofTicker() {
  return (
    <div className="overflow-hidden border-y border-vernon-100 bg-vernon-50/50 py-2.5">
      <div className="marquee-track gap-8" style={{ ['--marquee-duration' as string]: '40s' }}>
        {[...proofItems, ...proofItems].map((item, i) => (
          <div key={i} className="flex flex-shrink-0 items-center gap-2 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-clinical-400" />
            <span className="text-vernon-500">
              <span className="font-medium text-vernon-700">{item.name}</span>
              {' from '}
              <span className="text-vernon-600">{item.location}</span>
              {' '}
              {item.action}
            </span>
            <span className="mx-4 text-vernon-200">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}
