'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { motion, AnimatePresence } from 'framer-motion'
import type { UIMessage } from 'ai'
import imageCompression from 'browser-image-compression'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent {
  error: string
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
}

type WidgetSize = 'default' | 'expanded'

interface SkinConcern {
  name: string
  severity: 'mild' | 'moderate' | 'severe'
  area: string
  description: string
}

interface SkinAnalysisResult {
  overallScore: number
  estimatedSkinAge?: number
  imageType: string
  summary: string
  strengths: string[]
  concerns: SkinConcern[]
  skinType?: string
  hairAnalysis?: {
    density: string
    scalpVisibility: string
    pattern?: string
    stage?: string
  }
  personalizedMessage?: string
}

interface AnalysisApiResponse {
  success: boolean
  error?: string
  analysis?: SkinAnalysisResult
  disclaimer?: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY_CHAT_ID = 'vernon_chat_id'
const STORAGE_KEY_TIMESTAMP = 'vernon_chat_ts'
const STORAGE_KEY_PROACTIVE = 'vernon_proactive_shown'
const STORAGE_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours
const WHATSAPP_NUMBER = '919100017565'
const CLINIC_PHONE = '+91-9100017565'

// Default welcome suggestions
const defaultSuggestions = [
  { icon: 'skin', label: 'Scan Your Skin', message: '__SKIN_SCAN__' },
  { icon: 'hair', label: 'Hair Concerns', message: 'I have hair loss. What are my treatment options?' },
  { icon: 'cost', label: 'Treatment Costs', message: 'What are the prices for your most popular treatments?' },
  { icon: 'book', label: 'Book Free Consult', message: '__BOOK__' },
]

// Treatment-page-specific suggestions
const treatmentSuggestionMap: Record<string, { icon: string; label: string; message: string }[]> = {
  'hair': [
    { icon: 'skin', label: 'Scan Your Hair', message: '__SKIN_SCAN__' },
    { icon: 'cost', label: 'Cost Estimate', message: 'How much does a hair transplant cost at Vernon?' },
    { icon: 'hair', label: 'FUE vs DHI', message: 'What is the difference between FUE and DHI hair transplant?' },
    { icon: 'book', label: 'Book with Dr. Brahmananda Reddy', message: '__BOOK__' },
  ],
  'pico': [
    { icon: 'skin', label: 'Scan Your Skin', message: '__SKIN_SCAN__' },
    { icon: 'cost', label: 'Cost & Sessions', message: 'How much does Pico Laser cost and how many sessions do I need?' },
    { icon: 'hair', label: 'Safe for Dark Skin?', message: 'Is Pico Laser safe for Indian skin tones?' },
    { icon: 'book', label: 'Book Consultation', message: '__BOOK__' },
  ],
  'acne': [
    { icon: 'skin', label: 'Scan Your Skin', message: '__SKIN_SCAN__' },
    { icon: 'cost', label: 'Cost Estimate', message: 'How much do acne treatments cost?' },
    { icon: 'hair', label: 'Chemical Peel vs Laser', message: 'Which is better for acne scars - chemical peel or laser?' },
    { icon: 'book', label: 'Book Consultation', message: '__BOOK__' },
  ],
  'botox': [
    { icon: 'skin', label: 'Scan Your Skin', message: '__SKIN_SCAN__' },
    { icon: 'cost', label: 'Cost Per Area', message: 'How much does Botox cost per area?' },
    { icon: 'hair', label: 'How Long Does It Last?', message: 'How long do Botox results last?' },
    { icon: 'book', label: 'Book Consultation', message: '__BOOK__' },
  ],
}

// Contextual follow-up suggestions based on response content
function getContextualSuggestions(text: string, hasBooking: boolean): { label: string; message: string }[] {
  if (hasBooking) {
    return [
      { label: 'Preparation tips', message: 'How should I prepare for my consultation?' },
      { label: 'Clinic directions', message: 'How do I reach your clinic?' },
    ]
  }

  const lower = text.toLowerCase()
  const chips: { label: string; message: string }[] = []

  // Hair-related
  if (lower.includes('hair transplant') || lower.includes('fue') || lower.includes('dhi') || lower.includes('hair loss')) {
    chips.push({ label: 'Cost estimate', message: 'How much would this cost?' })
    chips.push({ label: 'See results', message: 'Can you show me before/after results?' })
    chips.push({ label: 'Book consultation', message: "I'd like to book a consultation for this" })
  }
  // Skin-related
  else if (lower.includes('pico') || lower.includes('laser') || lower.includes('pigmentation') || lower.includes('melasma')) {
    chips.push({ label: 'Sessions needed', message: 'How many sessions will I need?' })
    chips.push({ label: 'Safe for my skin?', message: 'Is this safe for Indian skin?' })
    chips.push({ label: 'Book consultation', message: "I'd like to book a consultation" })
  }
  // Acne
  else if (lower.includes('acne') || lower.includes('scar')) {
    chips.push({ label: 'Best treatment for me', message: 'Which treatment would be best for my case?' })
    chips.push({ label: 'Cost estimate', message: 'How much does this treatment cost?' })
    chips.push({ label: 'Book consultation', message: "I'd like to consult about this" })
  }
  // Cost mentioned
  else if (lower.includes('cost') || lower.includes('price') || lower.includes('₹') || lower.includes('range')) {
    chips.push({ label: 'Book free consult', message: 'I want to book a free consultation for exact pricing' })
    chips.push({ label: 'Payment options', message: 'Do you offer EMI or payment plans?' })
  }
  // Location / clinic info
  else if (lower.includes('banjara') || lower.includes('manikonda') || lower.includes('gachibowli') || lower.includes('location')) {
    chips.push({ label: 'Book at this location', message: "I'd like to book at this location" })
    chips.push({ label: 'Opening hours', message: 'What are your opening hours?' })
  }
  // Doctor mentioned
  else if (lower.includes('dr.') || lower.includes('doctor') || lower.includes('brahmananda') || lower.includes('asritha')) {
    chips.push({ label: 'Book with doctor', message: "I'd like to book a consultation with the doctor" })
    chips.push({ label: 'Qualifications', message: "What are the doctor's qualifications?" })
  }
  // Generic fallback
  else {
    chips.push({ label: 'Tell me more', message: 'Can you tell me more about this?' })
    chips.push({ label: 'Book consultation', message: "I'd like to book a free consultation" })
  }

  return chips.slice(0, 3)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getPersistedChatId(): string {
  if (typeof window === 'undefined') return generateUUID()
  const stored = localStorage.getItem(STORAGE_KEY_CHAT_ID)
  const timestamp = localStorage.getItem(STORAGE_KEY_TIMESTAMP)

  // Check if existing chat is still fresh (within 24 hours)
  if (stored && timestamp) {
    const age = Date.now() - parseInt(timestamp, 10)
    if (age < STORAGE_EXPIRY_MS) return stored
  }

  // Create new chat session
  const id = generateUUID()
  localStorage.setItem(STORAGE_KEY_CHAT_ID, id)
  localStorage.setItem(STORAGE_KEY_TIMESTAMP, String(Date.now()))
  return id
}

function generateIcsContent(details: Record<string, string>): string {
  const now = new Date()
  const start = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vernon Clinic//Booking//EN',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Vernon Clinic - ${details.treatment || 'Consultation'}`,
    `DESCRIPTION:Appointment at ${details.location || 'Vernon Clinic'}. Patient: ${details.name || ''}. Phone: ${details.phone || ''}.`,
    `LOCATION:${details.location || 'Vernon Skin & Hair Clinic, Hyderabad'}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadIcs(details: Record<string, string>) {
  const content = generateIcsContent(details)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'vernon-appointment.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function getTreatmentFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const path = window.location.pathname
  if (!path.includes('/treatments/')) return null
  const slug = path.split('/treatments/')[1]?.split('/')[0]?.split('?')[0]
  if (!slug) return null
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function getTreatmentCategory(): string | null {
  if (typeof window === 'undefined') return null
  const path = window.location.pathname.toLowerCase()
  if (path.includes('hair')) return 'hair'
  if (path.includes('pico')) return 'pico'
  if (path.includes('acne')) return 'acne'
  if (path.includes('botox') || path.includes('filler')) return 'botox'
  return null
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  if (score >= 40) return 'text-orange-500'
  return 'text-red-500'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Needs Attention'
  return 'Needs Care'
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'mild': return 'bg-yellow-400'
    case 'moderate': return 'bg-orange-400'
    case 'severe': return 'bg-red-500'
    default: return 'bg-gray-400'
  }
}

function getSeverityWidth(severity: string): string {
  switch (severity) {
    case 'mild': return 'w-1/3'
    case 'moderate': return 'w-2/3'
    case 'severe': return 'w-full'
    default: return 'w-1/4'
  }
}

// Simple markdown-like renderer for assistant messages
function renderMessageText(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []

  lines.forEach((line, i) => {
    if (!line.trim()) {
      elements.push(<br key={`br-${i}`} />)
      return
    }

    const processInline = (str: string): React.ReactNode[] => {
      const parts: React.ReactNode[] = []
      const regex = /(\*\*(.+?)\*\*)|(\[(.+?)\]\((.+?)\))|(`(.+?)`)|(\bhttps?:\/\/[^\s<]+)/g
      let lastIndex = 0
      let match: RegExpExecArray | null

      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          parts.push(str.slice(lastIndex, match.index))
        }
        if (match[1]) {
          parts.push(<strong key={`b-${match.index}`} className="font-semibold text-brand-900">{match[2]}</strong>)
        } else if (match[3]) {
          parts.push(
            <a key={`a-${match.index}`} href={match[5]} target="_blank" rel="noopener noreferrer" className="font-medium text-earth-600 underline decoration-earth-300 underline-offset-2 transition-colors hover:text-earth-700">
              {match[4]}
            </a>
          )
        } else if (match[6]) {
          parts.push(<code key={`c-${match.index}`} className="rounded bg-earth-50 px-1 py-0.5 text-[13px] text-earth-700">{match[7]}</code>)
        } else if (match[8]) {
          parts.push(
            <a key={`u-${match.index}`} href={match[8]} target="_blank" rel="noopener noreferrer" className="font-medium text-earth-600 underline decoration-earth-300 underline-offset-2 transition-colors hover:text-earth-700">
              {match[8].length > 40 ? match[8].slice(0, 40) + '...' : match[8]}
            </a>
          )
        }
        lastIndex = match.index + match[0].length
      }
      if (lastIndex < str.length) {
        parts.push(str.slice(lastIndex))
      }
      return parts.length > 0 ? parts : [str]
    }

    if (/^[-•]\s/.test(line.trim())) {
      elements.push(
        <div key={`li-${i}`} className="flex gap-2 py-0.5 pl-1">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-earth-400" />
          <span>{processInline(line.trim().replace(/^[-•]\s/, ''))}</span>
        </div>
      )
    } else if (/^\d+[.)]\s/.test(line.trim())) {
      const num = line.trim().match(/^(\d+)[.)]\s/)?.[1]
      elements.push(
        <div key={`ol-${i}`} className="flex gap-2 py-0.5 pl-1">
          <span className="mt-0.5 shrink-0 text-xs font-semibold text-earth-500">{num}.</span>
          <span>{processInline(line.trim().replace(/^\d+[.)]\s/, ''))}</span>
        </div>
      )
    } else {
      elements.push(<p key={`p-${i}`} className="py-0.5">{processInline(line)}</p>)
    }
  })

  return elements
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SuggestionIcon({ type }: { type: string }) {
  const iconClass = 'h-4 w-4'
  switch (type) {
    case 'hair':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      )
    case 'skin':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )
    case 'acne':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )
    case 'book':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      )
    case 'cost':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    default:
      return null
  }
}

function BookingCard({ data }: { data: Record<string, string> }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="my-2 overflow-hidden rounded-2xl border border-earth-200/80 bg-gradient-to-br from-earth-50 to-white shadow-sm"
    >
      <div className="flex items-center gap-2.5 border-b border-earth-100 bg-earth-50/50 px-4 py-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.2 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-earth-500"
        >
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-earth-800">Consultation Booked!</p>
          <p className="text-[11px] text-earth-600">We&apos;ll confirm within 30 minutes</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-0.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-earth-500">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-[13px] font-medium text-brand-900">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-earth-100 bg-earth-50/30 px-4 py-3">
        <button
          onClick={() => downloadIcs(data)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-earth-200 bg-white py-2 text-[12px] font-medium text-earth-700 transition-all hover:border-earth-300 hover:shadow-sm active:scale-[0.98]"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          Add to Calendar
        </button>
        <button
          onClick={() => {
            const text = encodeURIComponent(`Hi, I just booked a consultation for ${data.treatment || 'a consultation'} at ${data.location || 'Vernon Clinic'}. My name is ${data.name || ''}.`)
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
          }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 text-[12px] font-medium text-white transition-all hover:bg-[#20bd5a] active:scale-[0.98]"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </button>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2.5 py-1"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-earth-500 to-earth-600 shadow-sm">
        <span className="text-[10px] font-bold text-white">V</span>
      </div>
      <div className="flex gap-1.5 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
        <span className="h-2 w-2 animate-bounce rounded-full bg-earth-400 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-earth-300 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-earth-200" />
      </div>
    </motion.div>
  )
}

function ImagePreview({ src, onRemove }: { src: string; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative inline-block"
    >
      <img src={src} alt="Upload preview" className="h-20 w-20 rounded-xl object-cover ring-2 ring-earth-200" />
      <button
        onClick={onRemove}
        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-950 text-white shadow-md transition-transform hover:scale-110"
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Scan Lead Form — collects name + phone before opening camera
// ---------------------------------------------------------------------------

function ScanLeadForm({ onSubmit, onClose }: { onSubmit: (name: string, phone: string) => void; onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const isValid = name.trim().length >= 2 && phone.replace(/\D/g, '').length >= 10

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="mx-2 mb-3 overflow-hidden rounded-2xl border border-earth-200/80 bg-gradient-to-br from-earth-50 to-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-earth-100 bg-earth-50/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-900">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-earth-800">Skin & Hair Analysis</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-earth-400 hover:bg-earth-100 hover:text-earth-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-2.5 p-4">
        <p className="text-[12px] text-earth-600">Enter your details to get a free AI-powered skin or hair analysis. Your report will be ready in seconds.</p>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        />
        <input
          type="tel"
          placeholder="Phone number (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        />
        <button
          onClick={() => isValid && onSubmit(name.trim(), phone.trim())}
          disabled={!isValid}
          className="w-full rounded-xl bg-brand-950 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-brand-800 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-brand-950"
        >
          Take Photo & Analyze
        </button>
        <p className="text-center text-[10px] text-gray-400">Your privacy is protected. We only use your photo for analysis.</p>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Callback Form — POSTs to /api/callback → saves to Notion
// ---------------------------------------------------------------------------

function CallbackForm({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (name.trim().length < 2 || phone.replace(/\D/g, '').length < 10) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      })
      const data = await res.json()
      if (data.success) {
        onSuccess()
      } else {
        setError(data.error || 'Failed to submit. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="mx-2 mb-3 overflow-hidden rounded-2xl border border-earth-200/80 bg-gradient-to-br from-earth-50 to-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-earth-100 bg-earth-50/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-500">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-earth-800">Request a Callback</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-earth-400 hover:bg-earth-100 hover:text-earth-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-2.5 p-4">
        <p className="text-[12px] text-earth-600">We&apos;ll call you back within 30 minutes during working hours (11 AM - 9 PM).</p>
        {error && <p className="text-[12px] text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        />
        <input
          type="tel"
          placeholder="Phone number (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        />
        <button
          onClick={handleSubmit}
          disabled={name.trim().length < 2 || phone.replace(/\D/g, '').length < 10 || submitting}
          className="w-full rounded-xl bg-brand-950 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-brand-800 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-brand-950"
        >
          {submitting ? 'Submitting...' : 'Request Callback'}
        </button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Booking Form — POSTs to /api/book → saves to Notion
// ---------------------------------------------------------------------------

function BookingForm({ onSuccess, onClose }: { onSuccess: (details: Record<string, string>) => void; onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [treatment, setTreatment] = useState('General Consultation')
  const [location, setLocation] = useState('Banjara Hills')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const treatments = [
    'General Consultation', 'Hair Transplant', 'PRP & GFC Therapy', 'DHI Hair Transplant',
    'Pico Laser', 'Chemical Peel', 'Botox', 'Dermal Fillers', 'Laser Hair Removal',
    'Acne Treatment', 'Skin Consultation', 'Other',
  ]

  const handleSubmit = async () => {
    if (name.trim().length < 2 || phone.replace(/\D/g, '').length < 10) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: name.trim(),
          phone: phone.trim(),
          treatment,
          location,
        }),
      })
      const data = await res.json()
      if (data.success) {
        onSuccess(data.bookingDetails || { name: name.trim(), phone: phone.trim(), treatment, location })
      } else {
        setError(data.error || 'Failed to book. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="mx-2 mb-3 overflow-hidden rounded-2xl border border-earth-200/80 bg-gradient-to-br from-earth-50 to-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-earth-100 bg-earth-50/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-500">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-earth-800">Book Free Consultation</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-earth-400 hover:bg-earth-100 hover:text-earth-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-2.5 p-4">
        {error && <p className="text-[12px] text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        />
        <input
          type="tel"
          placeholder="Phone number (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        />
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        >
          {treatments.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-xl border border-earth-200 bg-white px-3 py-2 text-[13px] text-gray-900 focus:border-earth-400 focus:outline-none focus:ring-1 focus:ring-earth-300"
        >
          <option value="Banjara Hills">Banjara Hills</option>
          <option value="Manikonda">Manikonda</option>
          <option value="Gachibowli">Gachibowli</option>
        </select>
        <button
          onClick={handleSubmit}
          disabled={name.trim().length < 2 || phone.replace(/\D/g, '').length < 10 || submitting}
          className="w-full rounded-xl bg-brand-950 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-brand-800 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-brand-950"
        >
          {submitting ? 'Booking...' : 'Book Consultation'}
        </button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Skin Analysis Card — Clara-inspired results display
// ---------------------------------------------------------------------------

function SkinAnalysisCard({
  result,
  disclaimer,
  onBookConsult,
}: {
  result: SkinAnalysisResult
  disclaimer: string
  onBookConsult: () => void
}) {
  const scoreLabel = getScoreLabel(result.overallScore)
  const isHairReport = result.imageType === 'scalp' || result.imageType === 'hair'
  const scoreHexColor = result.overallScore >= 80 ? '#4ade80' : result.overallScore >= 60 ? '#fbbf24' : result.overallScore >= 40 ? '#fb923c' : '#f87171'
  const scoreBgColor = result.overallScore >= 80 ? 'rgba(74,222,128,0.15)' : result.overallScore >= 60 ? 'rgba(251,191,36,0.15)' : result.overallScore >= 40 ? 'rgba(251,146,60,0.15)' : 'rgba(248,113,113,0.15)'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="my-2 overflow-hidden rounded-2xl border border-earth-200/80 bg-white shadow-sm"
    >
      {/* Score Header */}
      <div className="bg-gradient-to-br from-brand-950 to-brand-800 px-4 py-4 text-white">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-white/60">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
          {isHairReport ? 'Hair Analysis Report' : 'Skin Analysis Report'}
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div className="flex items-end gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold" style={{ color: scoreHexColor }}>
                {result.overallScore}
              </span>
              <span className="text-lg text-white/60">/100</span>
            </div>
            <span className="mb-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: scoreBgColor, color: scoreHexColor }}>
              {scoreLabel}
            </span>
          </div>
          {result.estimatedSkinAge && !isHairReport && (
            <div className="mb-1 text-right">
              <span className="text-[10px] text-white/50">Skin Age</span>
              <p className="text-xl font-bold text-white/90">{result.estimatedSkinAge}<span className="text-[11px] font-normal text-white/50"> yrs</span></p>
            </div>
          )}
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-white/80">{result.summary}</p>
      </div>

      {/* Skin Type */}
      {result.skinType && result.skinType !== 'unknown' && (
        <div className="flex items-center gap-1.5 border-b border-earth-100 px-4 py-2.5">
          <svg className="h-3.5 w-3.5 text-earth-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          </svg>
          <span className="text-[11px] text-gray-500">Skin Type:</span>
          <span className="text-[13px] font-medium capitalize text-gray-800">{result.skinType}</span>
        </div>
      )}

      {/* Strengths */}
      {result.strengths.length > 0 && (
        <div className="border-b border-earth-100 px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-green-600">What&apos;s Looking Good</p>
          <div className="space-y-1.5">
            {result.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Concerns */}
      {result.concerns.length > 0 && (
        <div className="border-b border-earth-100 px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-orange-600">Your Concerns</p>
          <div className="space-y-3">
            {result.concerns.map((concern, i) => (
              <div key={i}>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-gray-800">{concern.name}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">{concern.area}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${getSeverityColor(concern.severity)} ${getSeverityWidth(concern.severity)} transition-all`} />
                  </div>
                  <span className="text-[10px] font-medium capitalize text-gray-500">{concern.severity}</span>
                </div>
                <p className="mt-0.5 text-[12px] text-gray-500">{concern.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hair Analysis with staging */}
      {result.hairAnalysis && (
        <div className="border-b border-earth-100 px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-earth-600">Hair Analysis</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <span className="text-[10px] font-medium text-gray-500">Density</span>
              <p className="text-[13px] font-medium capitalize text-gray-800">{result.hairAnalysis.density.replace('_', ' ')}</p>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <span className="text-[10px] font-medium text-gray-500">Scalp Visibility</span>
              <p className="text-[13px] font-medium capitalize text-gray-800">{result.hairAnalysis.scalpVisibility}</p>
            </div>
          </div>
          {result.hairAnalysis.stage && (
            <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">Hair Loss Stage</span>
              <p className="mt-0.5 text-[14px] font-semibold text-amber-900">{result.hairAnalysis.stage}</p>
            </div>
          )}
          {result.hairAnalysis.pattern && (
            <p className="mt-2 text-[12px] text-gray-600">
              <span className="font-medium">Pattern:</span> {result.hairAnalysis.pattern}
            </p>
          )}
        </div>
      )}

      {/* Personalized message — encourage meeting the doctor */}
      {result.personalizedMessage && (
        <div className="border-b border-earth-100 bg-gradient-to-br from-earth-50 to-white px-4 py-3">
          <p className="text-[12px] leading-relaxed text-gray-700">{result.personalizedMessage}</p>
        </div>
      )}

      {/* Disclaimer + Book Appointment CTA */}
      <div className="px-4 py-3">
        <p className="mb-3 text-[11px] italic text-gray-400">{disclaimer}</p>
        <button
          onClick={onBookConsult}
          className="w-full rounded-xl bg-brand-950 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-brand-800 active:scale-[0.98]"
        >
          Book Appointment with Dr. Brahmananda Reddy
        </button>
      </div>
    </motion.div>
  )
}

function ErrorBanner({ onRetry, onWhatsApp }: { onRetry: () => void; onWhatsApp: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-4 mb-3 overflow-hidden rounded-xl border border-red-100 bg-red-50 p-3"
    >
      <p className="mb-2 text-[12px] text-red-700">Something went wrong. Please try again or chat with us on WhatsApp.</p>
      <div className="flex gap-2">
        <button onClick={onRetry} className="flex-1 rounded-lg border border-red-200 bg-white py-1.5 text-[11px] font-medium text-red-700 transition-all hover:bg-red-50 active:scale-[0.98]">
          Try Again
        </button>
        <button onClick={onWhatsApp} className="flex-1 rounded-lg bg-[#25D366] py-1.5 text-[11px] font-medium text-white transition-all hover:bg-[#20bd5a] active:scale-[0.98]">
          WhatsApp Instead
        </button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [widgetSize, setWidgetSize] = useState<WidgetSize>('default')
  const [input, setInput] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false)
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null)
  const [showCallbackForm, setShowCallbackForm] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  // Skin analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [skinAnalysis, setSkinAnalysis] = useState<AnalysisApiResponse | null>(null)
  const [showScanLeadForm, setShowScanLeadForm] = useState(false)
  const [showPhotoSourcePicker, setShowPhotoSourcePicker] = useState(false)
  const [scanLead, setScanLead] = useState<{ name: string; phone: string } | null>(null)
  const [callbackSuccess, setCallbackSuccess] = useState(false)
  const [bookingResult, setBookingResult] = useState<Record<string, string> | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scanInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const proactiveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const chatId = useMemo(() => getPersistedChatId(), [])

  // Treatment-aware welcome message + suggestions
  const treatmentContext = useMemo(() => {
    if (typeof window === 'undefined') return null
    return getTreatmentFromUrl()
  }, [])

  const treatmentCategory = useMemo(() => {
    if (typeof window === 'undefined') return null
    return getTreatmentCategory()
  }, [])

  const activeSuggestions = useMemo(() => {
    if (treatmentCategory && treatmentSuggestionMap[treatmentCategory]) {
      return treatmentSuggestionMap[treatmentCategory]
    }
    return defaultSuggestions
  }, [treatmentCategory])

  const welcomeMessages: UIMessage[] = useMemo(() => {
    const welcomeText = treatmentContext
      ? `Hi! I see you're looking at ${treatmentContext}. I can answer your questions, analyze your skin/hair with AI, or book a free consultation with Dr. Brahmananda Reddy.`
      : "Hi! I'm Vernon, your AI skin & hair care assistant. Upload a photo for a free AI skin analysis, ask about treatments, or book a free consultation."

    return [{
      id: 'welcome',
      role: 'assistant' as const,
      parts: [{ type: 'text' as const, text: welcomeText }],
    }]
  }, [treatmentContext])

  const { messages, sendMessage, status, regenerate } = useChat({
    id: chatId,
    messages: welcomeMessages,
    onError: (error) => {
      console.error('Chat error:', error)
      setChatError(error.message || 'Connection failed')
    },
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Clear error when new message succeeds
  useEffect(() => {
    if (status === 'ready' && messages.length > 1) {
      setChatError(null)
    }
  }, [status, messages.length])

  // Check speech support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      setHasSpeechSupport(true)
    }
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, skinAnalysis, isAnalyzing, callbackSuccess, bookingResult])

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 640
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Proactive engagement on treatment pages
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (hasOpened) return
    if (localStorage.getItem(STORAGE_KEY_PROACTIVE)) return

    const treatment = getTreatmentFromUrl()
    if (!treatment) return

    proactiveTimerRef.current = setTimeout(() => {
      if (localStorage.getItem(STORAGE_KEY_PROACTIVE)) return
      localStorage.setItem(STORAGE_KEY_PROACTIVE, 'true')
      setIsOpen(true)
      setHasOpened(true)
    }, 30000)

    return () => {
      if (proactiveTimerRef.current) clearTimeout(proactiveTimerRef.current)
    }
  }, [hasOpened])

  const handleOpen = () => {
    setIsOpen(true)
    setHasOpened(true)
  }

  const handleSend = useCallback((text: string) => {
    setChatError(null)
    sendMessage({ text })
  }, [sendMessage])

  // Handle skin scan photo selection — requires scanLead (name+phone) to be set first
  const handleScanSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !scanLead) return

    let dataUrl: string
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true })
      dataUrl = await imageCompression.getDataUrlFromFile(compressed)
    } catch {
      dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (ev) => resolve(ev.target?.result as string)
        reader.readAsDataURL(file)
      })
    }

    if (scanInputRef.current) scanInputRef.current.value = ''
    if (galleryInputRef.current) galleryInputRef.current.value = ''

    // Start skin analysis with lead data
    setIsAnalyzing(true)
    setSkinAnalysis(null)

    try {
      const res = await fetch('/api/analyze-skin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: dataUrl,
          mediaType: file.type || 'image/jpeg',
          name: scanLead.name,
          phone: scanLead.phone,
        }),
      })
      const data: AnalysisApiResponse = await res.json()
      setSkinAnalysis(data)
    } catch {
      setSkinAnalysis({ success: false, error: 'Failed to analyze. Please try again with a clearer photo.' })
    } finally {
      setIsAnalyzing(false)
    }
  }, [scanLead])

  const handleImageSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true })
      const dataUrl = await imageCompression.getDataUrlFromFile(compressed)
      setImagePreview(dataUrl)
      setImageFile(compressed)
    } catch {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string)
        setImageFile(file)
      }
      reader.readAsDataURL(file)
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const startRecording = useCallback(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionClass) return
    const recognition = new SpeechRecognitionClass()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-IN'
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setInput(transcript)
    }
    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [])

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }, [])

  const speakMessage = useCallback((msgId: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel()
      setSpeakingMsgId(null)
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-IN'
    utterance.rate = 1.0
    utterance.onend = () => setSpeakingMsgId(null)
    utterance.onerror = () => setSpeakingMsgId(null)
    setSpeakingMsgId(msgId)
    window.speechSynthesis.speak(utterance)
  }, [speakingMsgId])

  const handleCallbackSuccess = useCallback(() => {
    setShowCallbackForm(false)
    setCallbackSuccess(true)
  }, [])

  const handleBookingSuccess = useCallback((details: Record<string, string>) => {
    setShowBookingForm(false)
    setBookingResult(details)
  }, [])

  // Handle scan lead form submission — user provided name+phone, now show photo source picker
  const handleScanLeadSubmit = useCallback((name: string, phone: string) => {
    setScanLead({ name, phone })
    setShowScanLeadForm(false)
    setShowPhotoSourcePicker(true)
  }, [])

  // Handle suggestion click — intercept special actions
  const handleSuggestionClick = useCallback((message: string) => {
    if (message === '__SKIN_SCAN__') {
      setShowScanLeadForm(true) // Show lead form first, camera opens after
    } else if (message === '__BOOK__') {
      setShowBookingForm(true)
    } else {
      handleSend(message)
    }
  }, [handleSend])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if ((!text && !imagePreview) || isLoading) return

    setChatError(null)

    if (imagePreview && imageFile) {
      const dataUrl = imagePreview
      const mediaType = imageFile.type || 'image/jpeg'
      setImagePreview(null)
      setImageFile(null)
      setInput('')
      sendMessage({ text: text || 'Please look at this image and advise.', files: [{ type: 'file', mediaType, url: dataUrl }] })
    } else {
      setInput('')
      sendMessage({ text })
    }
    if (inputRef.current) inputRef.current.style.height = 'auto'
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.closest('form')
      if (form) form.requestSubmit()
    }
  }, [])

  // Message part extractors
  const getMessageText = (parts: UIMessage['parts']) => {
    return parts.filter((p): p is { type: 'text'; text: string } => p.type === 'text').map((p) => p.text).join('')
  }

  const getMessageImages = (parts: UIMessage['parts']) => {
    return parts.filter(
      (p): p is { type: 'file'; mediaType: string; url: string } =>
        p.type === 'file' && ('mediaType' in p) && (p as { mediaType: string }).mediaType.startsWith('image/')
    )
  }

  const getToolResult = (parts: UIMessage['parts']) => {
    for (const part of parts) {
      if ('toolCallId' in part && 'output' in part && part.output) {
        const output = part.output as { success?: boolean; bookingDetails?: Record<string, string> }
        if (output.success && output.bookingDetails) return output.bookingDetails
      }
    }
    return null
  }

  const hasToolPending = (parts: UIMessage['parts']) => {
    return parts.some(
      (p) => 'toolCallId' in p && 'state' in p &&
        ((p as { state: string }).state === 'input-available' || (p as { state: string }).state === 'input-streaming')
    )
  }

  const isWelcomeScreen = messages.length <= 1 && !isLoading && !skinAnalysis && !isAnalyzing && !callbackSuccess && !bookingResult

  // Get contextual suggestions for the last assistant message
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant' && m.id !== 'welcome')
  const lastMsgText = lastAssistantMsg ? getMessageText(lastAssistantMsg.parts) : ''
  const lastMsgHasBooking = lastAssistantMsg ? !!getToolResult(lastAssistantMsg.parts) : false
  const contextualChips = !isWelcomeScreen && !isLoading && lastMsgText
    ? getContextualSuggestions(lastMsgText, lastMsgHasBooking)
    : []

  // Widget size classes
  const panelClasses = widgetSize === 'expanded'
    ? 'fixed z-[60] flex flex-col overflow-hidden rounded-[28px] border border-gray-200/50 bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] backdrop-blur-sm max-sm:inset-x-2 max-sm:bottom-2 max-sm:top-14 sm:bottom-4 sm:right-4 sm:h-[85vh] sm:w-[560px]'
    : 'fixed z-[60] flex flex-col overflow-hidden rounded-[28px] border border-gray-200/50 bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] backdrop-blur-sm max-sm:inset-x-2 max-sm:bottom-2 max-sm:top-14 sm:bottom-6 sm:right-6 sm:h-[660px] sm:w-[420px]'

  const showFormOverlay = showCallbackForm || showBookingForm || showScanLeadForm || showPhotoSourcePicker

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" aria-hidden="true" />
      <input ref={scanInputRef} type="file" accept="image/*" capture="environment" onChange={handleScanSelect} className="hidden" aria-hidden="true" />
      <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleScanSelect} className="hidden" aria-hidden="true" />

      {/* ---- Floating Chat Button ---- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-[60] flex h-[62px] w-[62px] items-center justify-center rounded-full bg-gradient-to-br from-brand-900 to-brand-950 text-white shadow-[0_8px_30px_-4px_rgba(26,24,22,0.4)]"
            aria-label="Chat with Vernon"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            {!hasOpened && <span className="absolute inset-0 animate-ping rounded-full bg-brand-800/30" />}
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-earth-400 opacity-50" />
              <span className="relative h-2.5 w-2.5 rounded-full border-2 border-white bg-earth-500" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---- Chat Panel ---- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className={panelClasses}
          >
            {/* ---- Header ---- */}
            <div className="relative flex items-center justify-between px-5 py-4 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-earth-400 to-earth-600 shadow-inner">
                    <span className="text-sm font-bold text-white">V</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-900 bg-earth-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-tight">Vernon AI</h3>
                  <p className="text-[11px] text-white/60">Skin & Hair Care Assistant</p>
                </div>
              </div>

              <div className="relative flex items-center gap-1">
                {/* Expand / collapse toggle (desktop only) */}
                <button
                  onClick={() => setWidgetSize((s) => s === 'default' ? 'expanded' : 'default')}
                  className="hidden rounded-full p-2 transition-colors hover:bg-white/10 sm:flex"
                  aria-label={widgetSize === 'default' ? 'Expand chat' : 'Shrink chat'}
                >
                  {widgetSize === 'default' ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                  )}
                </button>
                {/* Minimize */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="relative rounded-full p-2 transition-colors hover:bg-white/10"
                  aria-label="Minimize chat"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ---- Error Banner ---- */}
            <AnimatePresence>
              {chatError && (
                <ErrorBanner
                  onRetry={() => { setChatError(null); regenerate() }}
                  onWhatsApp={() => {
                    const encoded = encodeURIComponent('Hi, I was trying to chat on your website but ran into an issue. Can you help me?')
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
                  }}
                />
              )}
            </AnimatePresence>

            {/* ---- Messages Area ---- */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-sand-50 to-white px-4 py-4" style={{ overscrollBehavior: 'contain' }}>
              <div className="space-y-4">
                {/* Welcome Screen */}
                {isWelcomeScreen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-5">
                    <div className="rounded-2xl border border-earth-100/60 bg-white p-5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]">
                      <div className="mb-3 flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-earth-400 to-earth-600">
                          <span className="text-xs font-bold text-white">V</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-brand-950">Vernon</span>
                          <span className="ml-2 rounded-full bg-earth-50 px-2 py-0.5 text-[10px] font-medium text-earth-600">AI Assistant</span>
                        </div>
                      </div>
                      <p className="text-[14px] leading-relaxed text-gray-600">
                        {getMessageText(messages[0]?.parts || [])}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                        {treatmentContext ? `About ${treatmentContext}` : 'How can I help?'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {activeSuggestions.map((s) => (
                          <button
                            key={s.label}
                            onClick={() => handleSuggestionClick(s.message)}
                            className="group flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-3 text-left text-[13px] text-gray-700 shadow-sm transition-all hover:border-earth-200 hover:bg-earth-50/50 hover:shadow-md active:scale-[0.98]"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-earth-50 text-earth-600 transition-colors group-hover:bg-earth-100">
                              <SuggestionIcon type={s.icon} />
                            </span>
                            <span className="leading-tight">{s.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Message List */}
                {!isWelcomeScreen && messages.map((message, idx) => {
                  if (message.id === 'welcome' && idx === 0) return null

                  const text = getMessageText(message.parts)
                  const images = getMessageImages(message.parts)
                  const toolResult = getToolResult(message.parts)
                  const toolPending = hasToolPending(message.parts)

                  if (message.role === 'user') {
                    return (
                      <motion.div key={message.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex justify-end">
                        <div className="max-w-[80%]">
                          {images.length > 0 && (
                            <div className="mb-1.5 flex justify-end">
                              {images.map((img, i) => (
                                <img key={i} src={img.url} alt="Uploaded" className="h-32 w-32 rounded-2xl rounded-br-md object-cover shadow-sm" />
                              ))}
                            </div>
                          )}
                          {text && (
                            <div className="rounded-2xl rounded-br-md bg-gradient-to-br from-brand-900 to-brand-950 px-4 py-3 text-[14px] leading-relaxed text-white shadow-sm">
                              <p className="whitespace-pre-wrap">{text}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div key={message.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex items-start gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-earth-400 to-earth-600 text-[10px] font-bold text-white shadow-sm">V</div>
                      <div className="max-w-[85%] space-y-2">
                        {toolResult && <BookingCard data={toolResult} />}
                        {toolPending && !toolResult && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 rounded-xl bg-earth-50 px-3 py-2">
                            <svg className="h-3.5 w-3.5 animate-spin text-earth-500" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="text-xs font-medium text-earth-600">Looking that up...</span>
                          </motion.div>
                        )}
                        {text && (
                          <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[14px] leading-relaxed text-gray-700 shadow-[0_1px_4px_rgba(0,0,0,0.04)] ring-1 ring-gray-100/80">
                            {renderMessageText(text)}
                          </div>
                        )}
                        {text && (
                          <button
                            onClick={() => speakMessage(message.id, text)}
                            className={`ml-1 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] transition-all ${speakingMsgId === message.id ? 'bg-earth-100 text-earth-700' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                            aria-label={speakingMsgId === message.id ? 'Stop speaking' : 'Read aloud'}
                          >
                            {speakingMsgId === message.id ? (
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>
                            ) : (
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                            )}
                            <span>{speakingMsgId === message.id ? 'Stop' : 'Listen'}</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )
                })}

                {/* Skin Analysis Loading */}
                {isAnalyzing && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-earth-400 to-earth-600 text-[10px] font-bold text-white shadow-sm">V</div>
                    <div className="rounded-2xl rounded-tl-md bg-white px-4 py-4 shadow-sm ring-1 ring-gray-100/80">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 shrink-0">
                          <svg className="h-8 w-8 animate-spin text-earth-300" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="h-3.5 w-3.5 text-earth-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-earth-800">Analyzing your photo...</p>
                          <p className="mt-0.5 text-[11px] text-earth-500">Scanning for concerns, estimating skin age, and finding the best treatments for you</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Skin Analysis Results */}
                {skinAnalysis && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-earth-400 to-earth-600 text-[10px] font-bold text-white shadow-sm">V</div>
                    <div className="max-w-[90%]">
                      {skinAnalysis.success && skinAnalysis.analysis ? (
                        <SkinAnalysisCard
                          result={skinAnalysis.analysis}
                          disclaimer={skinAnalysis.disclaimer || 'This is an AI screening, not a medical diagnosis.'}
                          onBookConsult={() => setShowBookingForm(true)}
                        />
                      ) : (
                        <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[14px] leading-relaxed text-gray-700 shadow-sm ring-1 ring-gray-100/80">
                          <p>{skinAnalysis.error || 'Could not analyze the image. Please try again with a clearer photo.'}</p>
                          <button
                            onClick={() => { setSkinAnalysis(null); scanLead ? setShowPhotoSourcePicker(true) : setShowScanLeadForm(true) }}
                            className="mt-2 rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-[12px] font-medium text-earth-700 transition-all hover:bg-earth-100"
                          >
                            Try Again
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Callback Success Card */}
                {callbackSuccess && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-earth-400 to-earth-600 text-[10px] font-bold text-white shadow-sm">V</div>
                    <div className="rounded-2xl rounded-tl-md border border-green-100 bg-green-50 px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <p className="text-[13px] font-medium text-green-800">Callback Requested!</p>
                      </div>
                      <p className="mt-1 text-[12px] text-green-700">We&apos;ll call you back within 30 minutes during working hours (11 AM - 9 PM).</p>
                    </div>
                  </motion.div>
                )}

                {/* Booking Success Card (from direct form) */}
                {bookingResult && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-earth-400 to-earth-600 text-[10px] font-bold text-white shadow-sm">V</div>
                    <div className="max-w-[85%]">
                      <BookingCard data={bookingResult} />
                    </div>
                  </motion.div>
                )}

                {/* Contextual follow-up chips */}
                {contextualChips.length > 0 && !isLoading && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-1.5 pl-9">
                    {contextualChips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => handleSend(chip.message)}
                        className="rounded-full border border-earth-200 bg-white px-3 py-1.5 text-[12px] font-medium text-earth-700 shadow-sm transition-all hover:border-earth-300 hover:bg-earth-50 hover:shadow active:scale-[0.97]"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* ---- Callback Form (inline overlay) ---- */}
            <AnimatePresence>
              {showCallbackForm && (
                <CallbackForm
                  onSuccess={handleCallbackSuccess}
                  onClose={() => setShowCallbackForm(false)}
                />
              )}
            </AnimatePresence>

            {/* ---- Booking Form (inline overlay) ---- */}
            <AnimatePresence>
              {showBookingForm && (
                <BookingForm
                  onSuccess={handleBookingSuccess}
                  onClose={() => setShowBookingForm(false)}
                />
              )}
            </AnimatePresence>

            {/* ---- Scan Lead Form (inline overlay) ---- */}
            <AnimatePresence>
              {showScanLeadForm && (
                <ScanLeadForm
                  onSubmit={handleScanLeadSubmit}
                  onClose={() => setShowScanLeadForm(false)}
                />
              )}
            </AnimatePresence>

            {/* ---- Photo Source Picker (camera vs gallery) ---- */}
            <AnimatePresence>
              {showPhotoSourcePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mx-2 mb-3 overflow-hidden rounded-2xl border border-earth-200/80 bg-gradient-to-br from-earth-50 to-white shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-earth-100 bg-earth-50/50 px-4 py-2.5">
                    <span className="text-[13px] font-semibold text-earth-800">Choose Photo Source</span>
                    <button onClick={() => setShowPhotoSourcePicker(false)} className="rounded-full p-1 text-earth-400 hover:bg-earth-100 hover:text-earth-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <button
                      onClick={() => { setShowPhotoSourcePicker(false); scanInputRef.current?.click() }}
                      className="flex flex-col items-center gap-2 rounded-xl border border-earth-200 bg-white px-4 py-4 transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-[0.97]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                        <svg className="h-5 w-5 text-brand-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-medium text-gray-700">Take Photo</span>
                    </button>
                    <button
                      onClick={() => { setShowPhotoSourcePicker(false); galleryInputRef.current?.click() }}
                      className="flex flex-col items-center gap-2 rounded-xl border border-earth-200 bg-white px-4 py-4 transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-[0.97]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-earth-100">
                        <svg className="h-5 w-5 text-earth-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                      </div>
                      <span className="text-[12px] font-medium text-gray-700">From Gallery</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- Quick Actions Bar ---- */}
            {!isWelcomeScreen && !showFormOverlay && (
              <div className="flex items-center justify-around border-t border-gray-100 bg-gray-50/50 px-2 py-1.5">
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-gray-500 transition-colors hover:bg-earth-50 hover:text-earth-700"
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="text-[10px] font-medium">Book</span>
                </button>
                <button
                  onClick={() => window.open(`tel:${CLINIC_PHONE}`, '_self')}
                  className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-gray-500 transition-colors hover:bg-earth-50 hover:text-earth-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-[10px] font-medium">Call</span>
                </button>
                <button
                  onClick={() => setShowCallbackForm(true)}
                  className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-gray-500 transition-colors hover:bg-earth-50 hover:text-earth-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15v-2.25A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.055.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                  </svg>
                  <span className="text-[10px] font-medium">Callback</span>
                </button>
                <button
                  onClick={() => setShowScanLeadForm(true)}
                  className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-gray-500 transition-colors hover:bg-earth-50 hover:text-earth-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                  <span className="text-[10px] font-medium">Scan</span>
                </button>
                <button
                  onClick={() => {
                    const encoded = encodeURIComponent('Hi, I have a question about treatments at Vernon Clinic.')
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
                  }}
                  className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-gray-500 transition-colors hover:bg-[#25D366]/10 hover:text-[#25D366]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-[10px] font-medium">WhatsApp</span>
                </button>
              </div>
            )}

            {/* ---- Input Area ---- */}
            <div className="border-t border-gray-100 bg-white">
              <AnimatePresence>
                {imagePreview && (
                  <div className="px-4 pt-3">
                    <ImagePreview src={imagePreview} onRemove={() => { setImagePreview(null); setImageFile(null) }} />
                  </div>
                )}
              </AnimatePresence>

              <form onSubmit={onSubmit} className="p-3">
                <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50/50 px-2 py-1.5 transition-colors focus-within:border-earth-300 focus-within:bg-white focus-within:shadow-sm">
                  <div className="flex shrink-0 items-center gap-0.5 pb-1">
                    {hasSpeechSupport && (
                      <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${isRecording ? 'bg-red-50 text-red-500' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                        aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
                      >
                        {isRecording ? (
                          <span className="relative flex h-[18px] w-[18px] items-center justify-center">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-40" />
                            <svg className="relative h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                          </span>
                        ) : (
                          <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>

                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about treatments, costs, booking..."
                    rows={1}
                    className="max-h-[120px] min-h-[36px] min-w-0 flex-1 resize-none bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    disabled={isLoading}
                  />

                  <div className="shrink-0 pb-1">
                    <button
                      type="submit"
                      disabled={isLoading || (!input.trim() && !imagePreview)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${input.trim() || imagePreview ? 'bg-brand-950 text-white shadow-sm hover:bg-brand-800 active:scale-95' : 'text-gray-300'} disabled:cursor-not-allowed`}
                      aria-label="Send message"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Footer: Privacy + Branding */}
                <div className="mt-2 flex items-center justify-between px-1">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span>Your data is private</span>
                  </div>
                  <p className="text-[10px] text-gray-300">Powered by Vernon AI</p>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
