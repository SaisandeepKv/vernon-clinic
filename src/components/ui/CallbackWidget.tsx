'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CallbackWidget() {
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return
    const message = encodeURIComponent(`Callback request from website. Phone: ${phone}`)
    window.open(`https://wa.me/919100017567?text=${message}`, '_blank')
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
      setPhone('')
    }, 3000)
  }

  return (
    <div className="fixed bottom-20 left-4 z-40 lg:bottom-6 lg:left-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-72 rounded-2xl border border-brand-100 bg-white p-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-brand-900">Request a callback</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-400 hover:text-brand-600"
                aria-label="Close callback form"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex items-center gap-2 text-sm text-earth-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                We&apos;ll call you shortly!
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                <label className="sr-only" htmlFor="callback-phone">Phone number</label>
                <input
                  id="callback-phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 placeholder:text-brand-400 focus:border-earth-500 focus:outline-none focus:ring-1 focus:ring-earth-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-brand-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-800"
                >
                  Call me
                </button>
              </form>
            )}
            <p className="mt-2 text-2xs text-brand-400">
              Response within 30 minutes during working hours
            </p>
          </motion.div>
        ) : (
          <motion.button
            key="trigger"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 4 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 shadow-lg transition-all hover:shadow-xl hover:border-brand-300"
            aria-label="Request a callback"
          >
            <svg className="h-4 w-4 text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-sm font-medium text-brand-700">Call me back</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
