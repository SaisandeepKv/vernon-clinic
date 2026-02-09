'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { locations } from '@/data/locations'

interface BookingCTAProps {
  treatment?: string
  location?: string
  variant?: 'inline' | 'floating' | 'full'
  className?: string
}

export function BookingCTA({
  treatment,
  location,
  variant = 'inline',
  className = '',
}: BookingCTAProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: treatment || '',
    location: location || '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  const treatmentOptions = [
    'Hair Transplant',
    'DHI Hair Transplant',
    'Repair Hair Transplant',
    'Women Hair Transplant',
    'Body Hair Transplant',
    'PRP / GFC Therapy',
    'Mesotherapy for Hair',
    'Beard / Eyebrow Transplant',
    'Pico Laser - Tattoo Removal',
    'Pico Laser - Pigmentation',
    'Q-Switched Laser',
    'Laser Hair Reduction',
    'Carbon Laser Peel',
    'Acne & Scar Treatment',
    'Wart / Mole Removal',
    'Vitiligo Surgery',
    'Botox & Fillers',
    'Profhilo Skin Booster',
    'HIFU Skin Tightening',
    'Medi-Facial / HydraFacial',
    'Thread Lift',
    'Vampire Lift (PRP Facial)',
    'Body Contouring',
    'Derma Peels',
    'General Consultation',
    'Pediatric Dermatology',
    'Other',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: POST to API route -> WhatsApp webhook
    const message = `New Consultation Request%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ATreatment: ${formData.treatment}%0ALocation: ${formData.location}%0AMessage: ${formData.message}`
    window.open(`https://wa.me/919100017567?text=${message}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl border border-clinical-200 bg-clinical-50 p-8 text-center ${className}`}
      >
        <svg className="mx-auto h-12 w-12 text-clinical-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 font-display text-xl text-vernon-900">Request Received</h3>
        <p className="mt-2 text-sm text-vernon-600">
          Our care coordinator will contact you within 30 minutes during working hours.
        </p>
      </motion.div>
    )
  }

  if (variant === 'floating') {
    return (
      <div className={`sticky top-24 rounded-xl border border-vernon-100 bg-white p-6 shadow-lg ${className}`}>
        <h3 className="font-display text-lg text-vernon-900">Book a Consultation</h3>
        <p className="mt-1 text-sm text-vernon-500">
          Speak with Dr. Reddy&apos;s team
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="sr-only" htmlFor="booking-name-float">Your name</label>
          <input
            id="booking-name-float"
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-vernon-200 px-3 py-2.5 text-sm text-vernon-900 placeholder:text-vernon-400 focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500"
          />
          <label className="sr-only" htmlFor="booking-phone-float">Phone number</label>
          <input
            id="booking-phone-float"
            type="tel"
            placeholder="Phone number"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border border-vernon-200 px-3 py-2.5 text-sm text-vernon-900 placeholder:text-vernon-400 focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500"
          />
          <label className="sr-only" htmlFor="booking-treatment-float">Treatment</label>
          <select
            id="booking-treatment-float"
            value={formData.treatment}
            onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            className="w-full rounded-lg border border-vernon-200 px-3 py-2.5 text-sm text-vernon-900 focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500"
          >
            <option value="">Select treatment</option>
            {treatmentOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="booking-location-float">Location</label>
          <select
            id="booking-location-float"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full rounded-lg border border-vernon-200 px-3 py-2.5 text-sm text-vernon-900 focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500"
          >
            <option value="">Select location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.name}>{l.name}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary w-full">
            Request Appointment
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-vernon-400">
          Or call directly: <a href="tel:+919100017567" className="text-clinical-600 hover:underline">+91 91000 17567</a>
        </p>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className={`relative overflow-hidden rounded-xl bg-vernon-950 p-8 sm:p-12 ${className}`}>
      {/* Subtle mesh gradient */}
      <div className="absolute inset-0">
        <div className="mesh-blob-1 absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-gradient-to-bl from-clinical-600/10 to-transparent blur-3xl" />
        <div className="mesh-blob-2 absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-vernon-600/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="label text-vernon-400"
        >
          Schedule a Consultation
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 font-display text-3xl text-white sm:text-4xl"
        >
          Begin with an Expert Assessment
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-vernon-400"
        >
          Every treatment at Vernon begins with a thorough evaluation by
          Dr. Brahmananda Reddy. No pressure, no upselling — just an honest
          clinical assessment and a clear treatment plan.
        </motion.p>
      </div>
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="relative mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div>
          <label className="sr-only" htmlFor="booking-name">Your name</label>
          <input
            id="booking-name"
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-vernon-700 bg-vernon-900 px-4 py-3 text-sm text-white placeholder:text-vernon-500 focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500 transition-colors"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="booking-phone">Phone number</label>
          <input
            id="booking-phone"
            type="tel"
            placeholder="Phone number"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border border-vernon-700 bg-vernon-900 px-4 py-3 text-sm text-white placeholder:text-vernon-500 focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500 transition-colors"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="booking-treatment">Treatment</label>
          <select
            id="booking-treatment"
            value={formData.treatment}
            onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            className="w-full rounded-lg border border-vernon-700 bg-vernon-900 px-4 py-3 text-sm text-white focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500 transition-colors"
          >
            <option value="">Select treatment</option>
            {treatmentOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="sr-only" htmlFor="booking-location">Preferred location</label>
          <select
            id="booking-location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full rounded-lg border border-vernon-700 bg-vernon-900 px-4 py-3 text-sm text-white focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500 transition-colors"
          >
            <option value="">Preferred location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.name}>{l.name}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="sr-only" htmlFor="booking-message">Description of your concern</label>
          <textarea
            id="booking-message"
            placeholder="Brief description of your concern (optional)"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-vernon-700 bg-vernon-900 px-4 py-3 text-sm text-white placeholder:text-vernon-500 focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500 transition-colors"
          />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full bg-clinical-600 hover:bg-clinical-700 active:scale-[0.98] transition-all">
            Request Consultation
          </button>
        </div>
      </motion.form>
    </div>
  )
}
