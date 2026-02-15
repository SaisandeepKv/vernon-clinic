import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ClinicUpdates } from '@/components/sections/ClinicUpdates'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { ExitIntentPopup } from '@/components/ui/ExitIntentPopup'
import { CallbackWidget } from '@/components/ui/CallbackWidget'
import { TreatmentFinderQuiz } from '@/components/ui/TreatmentFinderQuiz'
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { SchemaOrg } from '@/components/schema/SchemaOrg'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { PageTransition } from '@/components/ui/PageTransition'
import { PostHogProvider } from '@/components/providers/PostHogProvider'
import { generateMedicalOrganizationSchema, generateWebSiteSchema } from '@/lib/schema'
import { locations } from '@/data/locations'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vernonskinclinic.com'),
  title: {
    default: 'Vernon Skin and Hair Clinic | Best Dermatologist in Hyderabad | Dr. Brahmananda Reddy',
    template: '%s | Vernon Skin and Hair Clinic Hyderabad',
  },
  description:
    'Vernon Skin and Hair Clinic – Hyderabad\'s premier dermatology center. UK-trained surgeon Dr. R. Brahmananda Reddy offers hair transplant, Pico laser, Botox, and clinical dermatology across Banjara Hills, Manikonda & Gachibowli.',
  keywords: [
    'best dermatologist in Hyderabad',
    'skin clinic Hyderabad',
    'hair transplant Hyderabad',
    'Pico laser Hyderabad',
    'Vernon Skin Clinic',
    'Vernon Skin and Hair Clinic',
    'Dr Brahmananda Reddy',
    'dermatologist Banjara Hills',
    'skin doctor Manikonda',
    'hair loss treatment Hyderabad',
    'Botox Hyderabad',
    'acne scar treatment Hyderabad',
    'laser hair removal Hyderabad',
  ],
  authors: [{ name: 'Vernon Skin and Hair Clinic' }],
  creator: 'Vernon Skin and Hair Clinic',
  publisher: 'Vernon Skin and Hair Clinic',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vernonskinclinic.com',
    siteName: 'Vernon Skin and Hair Clinic',
    title: 'Vernon Skin and Hair Clinic | Best Dermatologist in Hyderabad',
    description:
      'UK-trained dermatosurgeon Dr. Brahmananda Reddy. Hair transplant, Pico laser, clinical dermatology. Banjara Hills, Manikonda, Gachibowli.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vernon Skin and Hair Clinic - Hyderabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vernon Skin and Hair Clinic | Best Dermatologist in Hyderabad',
    description:
      'UK-trained dermatosurgeon Dr. Brahmananda Reddy. Hair transplant, Pico laser, clinical dermatology.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vernonskinclinic.com',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <SchemaOrg schema={generateMedicalOrganizationSchema(locations)} />
        <SchemaOrg schema={generateWebSiteSchema()} />
      </head>
      <body className="min-h-screen font-sans">
        <PostHogProvider>
          <SmoothScroll />
          <ScrollProgressBar />
          <ClinicUpdates />
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppFloat />
          <ExitIntentPopup />
          <CallbackWidget />
          <TreatmentFinderQuiz />
          <StickyMobileCTA />
          <ChatWidget />
        </PostHogProvider>
      </body>
    </html>
  )
}
