'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { locations } from '@/data/locations'

const treatmentOptions = [
  { category: 'Hair Restoration', items: ['Hair Transplant', 'DHI Hair Transplant', 'Repair Hair Transplant', 'PRP / GFC Therapy'] },
  { category: 'Laser & Pico', items: ['Pico Laser - Pigmentation', 'Pico Laser - Tattoo Removal', 'Laser Hair Reduction', 'Carbon Laser Peel'] },
  { category: 'Aesthetics', items: ['Botox & Fillers', 'HIFU Skin Tightening', 'Thread Lift', 'Medi-Facial'] },
  { category: 'Clinical', items: ['Acne & Scar Treatment', 'Vitiligo Surgery', 'General Consultation', 'Pediatric Dermatology'] },
]

const steps = [
  { label: 'Treatment', icon: '01' },
  { label: 'Location', icon: '02' },
  { label: 'Details', icon: '03' },
]

export function BookingWizard({ className = '' }: { className?: string }) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    treatment: '',
    location: '',
    name: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    const message = `New Consultation Request%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ATreatment: ${formData.treatment}%0ALocation: ${formData.location}`
    window.open(`https://wa.me/919100017567?text=${message}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-3xl border border-earth-200 bg-earth-50 p-8 text-center ${className}`}
      >
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto h-16 w-16 text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </motion.svg>
        <h3 className="mt-4 font-display text-xl text-brand-900">You&apos;re All Set!</h3>
        <p className="mt-2 text-sm text-brand-600">
          Our care coordinator will contact you within 30 minutes during working hours.
        </p>
      </motion.div>
    )
  }

  return (
    <div className={`overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-lg ${className}`}>
      {/* Progress bar */}
      <div className="border-b border-brand-100 px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i <= step ? 'bg-earth-600 text-white' : 'bg-brand-100 text-brand-400'
              }`}>
                {i < step ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : s.icon}
              </div>
              <span className={`ml-2 hidden text-xs font-medium sm:block ${
                i <= step ? 'text-brand-900' : 'text-brand-400'
              }`}>{s.label}</span>
              {i < steps.length - 1 && (
                <div className={`mx-3 h-px w-8 sm:w-12 ${i < step ? 'bg-earth-400' : 'bg-brand-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-lg text-brand-900">What treatment are you interested in?</h3>
              <div className="mt-4 space-y-4">
                {treatmentOptions.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-400">{group.category}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => { setFormData({ ...formData, treatment: item }); setStep(1) }}
                          className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                            formData.treatment === item
                              ? 'bg-earth-600 text-white shadow-sm'
                              : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-lg text-brand-900">Which location works for you?</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => { setFormData({ ...formData, location: loc.name }); setStep(2) }}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      formData.location === loc.name
                        ? 'border-earth-400 bg-earth-50 shadow-sm'
                        : 'border-brand-200 hover:border-brand-300 hover:bg-brand-50'
                    }`}
                  >
                    <p className="text-sm font-medium text-brand-900">{loc.name}</p>
                    <p className="mt-1 text-xs text-brand-500">Hyderabad</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(0)} className="mt-4 text-sm text-brand-500 hover:text-brand-700">
                &larr; Back
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-lg text-brand-900">Almost there — your details</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <label htmlFor="wizard-name" className="sr-only">Name</label>
                  <input
                    id="wizard-name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-brand-200 px-4 py-3 text-sm text-brand-900 placeholder:text-brand-400 focus:border-earth-500 focus:outline-none focus:ring-1 focus:ring-earth-500"
                  />
                </div>
                <div>
                  <label htmlFor="wizard-phone" className="sr-only">Phone</label>
                  <input
                    id="wizard-phone"
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-brand-200 px-4 py-3 text-sm text-brand-900 placeholder:text-brand-400 focus:border-earth-500 focus:outline-none focus:ring-1 focus:ring-earth-500"
                  />
                </div>

                {/* Summary */}
                <div className="rounded-lg bg-brand-50 p-3">
                  <p className="text-xs text-brand-500">Your selection:</p>
                  <p className="mt-1 text-sm font-medium text-brand-900">{formData.treatment}</p>
                  <p className="text-xs text-brand-500">{formData.location}</p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book My Assessment
                </button>
              </div>
              <button onClick={() => setStep(1)} className="mt-4 text-sm text-brand-500 hover:text-brand-700">
                &larr; Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
