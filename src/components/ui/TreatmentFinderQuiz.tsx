'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const questions = [
  {
    question: 'What is your primary concern?',
    options: [
      { label: 'Hair loss or thinning', value: 'hair' },
      { label: 'Pigmentation or dark spots', value: 'pigmentation' },
      { label: 'Acne or acne scars', value: 'acne' },
      { label: 'Anti-aging or skin tightening', value: 'aging' },
      { label: 'Unwanted hair removal', value: 'hair-removal' },
      { label: 'General skin concern', value: 'general' },
    ],
  },
  {
    question: 'How long have you had this concern?',
    options: [
      { label: 'Less than 6 months', value: 'recent' },
      { label: '6 months to 2 years', value: 'moderate' },
      { label: 'More than 2 years', value: 'long' },
    ],
  },
  {
    question: 'Have you tried any treatments before?',
    options: [
      { label: 'No, this is my first time', value: 'first' },
      { label: 'Yes, topical creams or home remedies', value: 'topical' },
      { label: 'Yes, professional treatments elsewhere', value: 'professional' },
    ],
  },
]

const recommendations: Record<string, { title: string; description: string; link: string; treatments: string[] }> = {
  hair: {
    title: 'Hair Restoration',
    description: 'Based on your concerns, we recommend a hair assessment with Dr. Reddy to determine the best approach — from PRP/GFC therapy to surgical hair transplant.',
    link: '/treatments/hair-restoration',
    treatments: ['Hair Transplant (FUE/DHI)', 'PRP / GFC Therapy', 'Mesotherapy for Hair'],
  },
  pigmentation: {
    title: 'Pigmentation Treatment',
    description: 'Dr. Reddy specializes in treating Indian skin pigmentation with Pico laser technology, achieving results without the risks of traditional lasers.',
    link: '/treatments/laser-and-pico',
    treatments: ['Pico Laser Treatment', 'Q-Switched Laser', 'Chemical Peels'],
  },
  acne: {
    title: 'Acne & Scar Treatment',
    description: 'A multi-modal approach combining subcision, MNRF, and laser treatments tailored to your specific scar types.',
    link: '/treatments/clinical-dermatology/acne-scar-treatment',
    treatments: ['MNRF + Subcision', 'Pico Laser', 'Chemical Peels'],
  },
  aging: {
    title: 'Anti-Aging & Aesthetics',
    description: 'Dr. Reddy takes a conservative, natural-looking approach to anti-aging — enhancing your features without looking "done".',
    link: '/treatments/aesthetics',
    treatments: ['Botox & Fillers', 'HIFU Skin Tightening', 'Profhilo Skin Booster'],
  },
  'hair-removal': {
    title: 'Laser Hair Reduction',
    description: 'The Soprano ICE platform offers virtually painless laser hair removal suitable for all skin types.',
    link: '/treatments/laser-and-pico/laser-hair-reduction',
    treatments: ['Soprano ICE Laser', 'Full Body Options', 'Face & Neck'],
  },
  general: {
    title: 'General Dermatology',
    description: 'From eczema to psoriasis, Dr. Reddy provides evidence-based clinical dermatology for all skin conditions.',
    link: '/treatments/clinical-dermatology',
    treatments: ['Clinical Consultation', 'Diagnostic Assessment', 'Personalized Treatment Plan'],
  },
}

export function TreatmentFinderQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    }
  }

  const result = answers.length === questions.length ? recommendations[answers[0]] || recommendations.general : null

  const reset = () => {
    setCurrentQ(0)
    setAnswers([])
  }

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-40 hidden items-center gap-2 rounded-full bg-brand-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-brand-800 hover:shadow-xl lg:flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6, duration: 0.5 }}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
        Find My Treatment
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-24 left-6 z-40 hidden w-[380px] overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-2xl lg:block"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-100 bg-brand-50 px-5 py-3">
        <h3 className="text-sm font-medium text-brand-900">Treatment Finder</h3>
        <button onClick={() => setIsOpen(false)} className="text-brand-400 hover:text-brand-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-5">
        {/* Progress */}
        <div className="mb-4 flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
              i <= currentQ ? 'bg-earth-500' : 'bg-brand-100'
            }`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-sm font-medium text-brand-900">{questions[currentQ].question}</p>
              <div className="mt-3 space-y-2">
                {questions[currentQ].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full rounded-lg border border-brand-200 px-4 py-2.5 text-left text-sm text-brand-700 transition-all hover:border-earth-300 hover:bg-earth-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-xl bg-earth-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-earth-600">Recommended</p>
                <h4 className="mt-1 font-display text-lg text-brand-900">{result.title}</h4>
                <p className="mt-2 text-sm text-brand-600">{result.description}</p>
                <div className="mt-3 space-y-1">
                  {result.treatments.map((t) => (
                    <div key={t} className="flex items-center gap-1.5 text-xs text-brand-500">
                      <svg className="h-3 w-3 text-earth-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={result.link} className="btn-primary flex-1 text-center text-sm">
                  View Treatments
                </Link>
                <button onClick={reset} className="rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-600 hover:bg-brand-50">
                  Retake
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
