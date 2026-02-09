'use client'

import Link from 'next/link'
import Image from 'next/image'
import { locations } from '@/data/locations'
import { socialLinks } from '@/components/sections/SocialMedia'

function BackToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-2 rounded-full border border-vernon-700 px-4 py-2 text-xs font-medium text-vernon-400 transition-all hover:border-clinical-500/40 hover:text-clinical-400"
      aria-label="Back to top"
    >
      <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
      </svg>
      Back to top
    </button>
  )
}

export function Footer() {
  return (
    <footer className="relative bg-night-950">
      {/* Top gradient accent line */}
      <div className="h-px w-full bg-gradient-to-r from-vernon-800 via-clinical-500/40 to-vernon-800" />

      {/* Main footer content */}
      <div className="section-max-width section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/vernon-logo.png" alt="Vernon Skin and Hair Clinic" width={36} height={36} className="h-9 w-9 rounded-lg bg-white object-contain" />
              <div>
                <span className="font-display text-lg font-medium text-white">Vernon</span>
                <span className="block text-2xs text-vernon-400">Skin & Hair Clinic</span>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-vernon-400">
              Founded by UK-trained dermatosurgeon Dr. R. Brahmananda Reddy,
              Vernon Skin and Hair Clinic brings international standards of
              dermatological care to Hyderabad. ISHRS member. Board-certified
              aesthetic physician. Official filler trainer.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <div className="group flex flex-col transition-colors">
                <span className="text-2xs uppercase tracking-wider text-vernon-500">Experience</span>
                <span className="font-display text-2xl text-white">13+</span>
                <span className="text-2xs text-vernon-500">Years</span>
              </div>
              <div className="h-12 w-px bg-vernon-800" />
              <div className="group flex flex-col transition-colors">
                <span className="text-2xs uppercase tracking-wider text-vernon-500">Locations</span>
                <span className="font-display text-2xl text-white">3</span>
                <span className="text-2xs text-vernon-500">Hyderabad</span>
              </div>
              <div className="h-12 w-px bg-vernon-800" />
              <div className="group flex flex-col transition-colors">
                <span className="text-2xs uppercase tracking-wider text-vernon-500">Training</span>
                <span className="font-display text-2xl text-white">UK</span>
                <span className="text-2xs text-vernon-500">Certified</span>
              </div>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-vernon-400">
              Treatments
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Hair Transplant', href: '/treatments/hair-restoration/hair-transplant' },
                { label: 'Pico Laser', href: '/treatments/laser-and-pico/pico-laser-pigmentation' },
                { label: 'Laser Hair Removal', href: '/treatments/laser-and-pico/laser-hair-reduction' },
                { label: 'Botox & Fillers', href: '/treatments/aesthetics/botox-fillers' },
                { label: 'Acne Scar Treatment', href: '/treatments/clinical-dermatology/acne-scar-revision' },
                { label: 'Vitiligo Surgery', href: '/treatments/clinical-dermatology/vitiligo-surgery' },
                { label: 'PRP Therapy', href: '/treatments/hair-restoration/prp-gfc-therapy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-vernon-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-vernon-400">
              Clinic
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'About Dr. Reddy', href: '/about/dr-brahmananda-reddy' },
                { label: 'Dr. Asritha Reddy', href: '/about/dr-asritha-reddy' },
                { label: 'Our Team', href: '/about/our-team' },
                { label: 'Our Story', href: '/about/our-story' },
                { label: 'Results Gallery', href: '/gallery' },
                { label: 'Blog', href: '/blog' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-vernon-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-vernon-400">
              Locations
            </h3>
            <ul className="mt-4 space-y-4">
              {locations.map((loc) => (
                <li key={loc.id}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="block text-sm font-medium text-white hover:text-clinical-400 transition-colors"
                  >
                    {loc.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-vernon-500 line-clamp-2">
                    {loc.address}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="tel:+919100017567"
                className="flex items-center gap-2 text-sm font-medium text-clinical-400 hover:text-clinical-300 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91 91000 17567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-vernon-800/60">
        <div className="section-max-width section-padding py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-vernon-500">
              &copy; {new Date().getFullYear()} Vernon Skin and Hair Clinic. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <BackToTop />
              <span className="mx-1 h-4 w-px bg-vernon-700" />
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-vernon-500 transition-colors hover:text-white" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-vernon-500 transition-colors hover:text-white" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-vernon-500 transition-colors hover:text-white" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href={socialLinks.google} target="_blank" rel="noopener noreferrer" className="text-vernon-500 transition-colors hover:text-white" aria-label="Google Reviews">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              </a>
              <span className="mx-1 h-4 w-px bg-vernon-700" />
              <Link href="/privacy" className="text-xs text-vernon-500 hover:text-vernon-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-vernon-500 hover:text-vernon-300 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
