'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { navigation } from '@/data/navigation'
import { NavItem } from '@/types'

// Category icons for the mega menu
const categoryIcons: Record<string, React.ReactNode> = {
  'Hair Restoration': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  'Laser & Pico Technology': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  'Clinical Dermatology': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M5.82 10.57l7.07-7.07a2.25 2.25 0 013.18 0l1.41 1.41a2.25 2.25 0 010 3.18l-7.07 7.07M7.5 11.25l-2.25 2.25m10.5-1.5H18M15 18h.008v.008H15V18zm2.25 0h.008v.008h-.008V18zm2.25 0h.008v.008h-.008V18z" />
    </svg>
  ),
  'Aesthetics & Anti-Aging': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  'Body & Wellness': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
}

function useHoverIntent(delay = 150) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), delay)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { open, setOpen, handleEnter, handleLeave }
}

function NavDropdown({ item }: { item: NavItem }) {
  const { open, setOpen, handleEnter, handleLeave } = useHoverIntent(120)

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="nav-link text-sm font-medium text-vernon-600 transition-colors hover:text-vernon-900"
      >
        {item.label}
      </Link>
    )
  }

  // Treatments get the mega menu
  if (item.label === 'Treatments') {
    return (
      <>
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <button
            className="flex items-center gap-1 text-sm font-medium text-vernon-600 transition-colors hover:text-vernon-900"
            onClick={() => setOpen(!open)}
          >
            {item.label}
            <svg
              className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {open && (
          <div
            className="absolute left-0 right-0 top-full z-50 border-b border-vernon-100 bg-white shadow-2xl"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="section-max-width section-padding py-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-vernon-900">Our Treatments</h3>
                  <p className="mt-1 text-sm text-vernon-500">
                    Surgeon-led care across five disciplines
                  </p>
                </div>
                <Link
                  href="/treatments"
                  className="group flex items-center gap-2 rounded-lg bg-vernon-50 px-4 py-2 text-sm font-medium text-vernon-700 transition-colors hover:bg-vernon-100"
                  onClick={() => setOpen(false)}
                >
                  View all treatments
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-5 gap-6">
                {navigation.find((n) => n.label === 'Treatments')?.children?.map((category) => (
                  <div key={category.href} className="group/cat">
                    <Link
                      href={category.href}
                      className="mb-3 flex items-center gap-2 rounded-lg border border-transparent px-2 py-2 transition-all hover:border-clinical-100 hover:bg-clinical-50/50"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-vernon-100 text-vernon-600 transition-colors group-hover/cat:bg-clinical-100 group-hover/cat:text-clinical-600">
                        {categoryIcons[category.label] || (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-vernon-900">
                        {category.label}
                      </span>
                    </Link>
                    <div className="space-y-0.5 pl-2">
                      {category.children?.map((treatment) => (
                        <Link
                          key={treatment.href}
                          href={treatment.href}
                          className="block rounded-md px-2 py-1.5 text-sm text-vernon-500 transition-colors hover:bg-vernon-50 hover:text-vernon-900"
                          onClick={() => setOpen(false)}
                        >
                          {treatment.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom bar with highlights */}
              <div className="mt-6 flex items-center gap-6 border-t border-vernon-100 pt-6">
                <div className="flex items-center gap-2 text-xs text-vernon-400">
                  <svg className="h-4 w-4 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  UK-trained surgeon
                </div>
                <div className="flex items-center gap-2 text-xs text-vernon-400">
                  <svg className="h-4 w-4 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  ISHRS member
                </div>
                <div className="flex items-center gap-2 text-xs text-vernon-400">
                  <svg className="h-4 w-4 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  Official filler trainer
                </div>
                <div className="flex items-center gap-2 text-xs text-vernon-400">
                  <svg className="h-4 w-4 text-clinical-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  US-FDA approved technology
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-vernon-600 transition-colors hover:text-vernon-900"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-64 pt-3">
          <div className="rounded-xl border border-vernon-100 bg-white p-2 shadow-xl animate-fade-in">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-lg px-3 py-2.5 text-sm text-vernon-600 transition-colors hover:bg-vernon-50 hover:text-vernon-900"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-vernon-950/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white shadow-2xl animate-slide-in-right">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-vernon-100 bg-white px-6 py-4">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Image src="/images/vernon-logo.png" alt="Vernon Skin and Hair Clinic" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
            <span className="font-display text-lg font-medium text-vernon-900">Vernon</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-vernon-400 hover:bg-vernon-50 hover:text-vernon-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-4">
          {navigation.map((item) => (
            <div key={item.href} className="border-b border-vernon-50">
              {item.children ? (
                <div>
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between px-3 py-3.5 text-left"
                  >
                    <span className="text-base font-medium text-vernon-900">{item.label}</span>
                    <svg
                      className={`h-4 w-4 text-vernon-400 transition-transform ${expandedCategory === item.label ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {expandedCategory === item.label && (
                    <div className="pb-3">
                      {item.label === 'Treatments' ? (
                        // Treatment categories with nested items
                        <div className="space-y-2">
                          {item.children.map((category) => (
                            <div key={category.href} className="rounded-lg bg-vernon-50/50 px-3 py-2">
                              <Link
                                href={category.href}
                                className="flex items-center gap-2 py-1 text-sm font-semibold text-vernon-700"
                                onClick={onClose}
                              >
                                {categoryIcons[category.label] && (
                                  <span className="text-vernon-500">
                                    {categoryIcons[category.label]}
                                  </span>
                                )}
                                {category.label}
                              </Link>
                              {category.children && (
                                <div className="mt-1 space-y-0.5 border-l-2 border-vernon-200 pl-3 ml-2">
                                  {category.children.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      className="block py-1.5 text-sm text-vernon-500 active:text-vernon-900"
                                      onClick={onClose}
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          <Link
                            href="/treatments"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-clinical-600"
                            onClick={onClose}
                          >
                            View all treatments
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        // Simple dropdown items
                        <div className="space-y-0.5 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm text-vernon-600 active:bg-vernon-50"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block px-3 py-3.5 text-base font-medium text-vernon-900"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="border-t border-vernon-100 px-6 py-6">
          <Link
            href="/contact"
            className="btn-primary block w-full text-center"
            onClick={onClose}
          >
            Book Consultation
          </Link>
          <a
            href="tel:+919100017567"
            className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-vernon-200 py-2.5 text-sm font-medium text-vernon-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +91 91000 17567
          </a>
          {/* Social icons */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/vernonskinclinic/" target="_blank" rel="noopener noreferrer" className="text-vernon-400 hover:text-pink-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/vhthairclinic/" target="_blank" rel="noopener noreferrer" className="text-vernon-400 hover:text-blue-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.youtube.com/@VERNONSKINCLINIC" target="_blank" rel="noopener noreferrer" className="text-vernon-400 hover:text-red-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'border-b border-vernon-100/60 bg-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-2xl' : 'border-b border-transparent bg-white/70 backdrop-blur-xl'}`}>
      {/* Top bar */}
      <div className="hidden border-b border-white/5 bg-vernon-950 sm:block">
        <div className="section-max-width section-padding flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <span className="text-2xs text-vernon-300">
              Banjara Hills &middot; Manikonda &middot; Gachibowli
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919100017567" className="text-2xs text-vernon-300 hover:text-white transition-colors">
              +91 91000 17567
            </a>
            <span className="text-vernon-700">|</span>
            <a href="mailto:info@vernonskinclinic.com" className="text-2xs text-vernon-300 hover:text-white transition-colors">
              info@vernonskinclinic.com
            </a>
            <span className="text-vernon-700">|</span>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/vernonskinclinic/" target="_blank" rel="noopener noreferrer" className="text-vernon-400 hover:text-white transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/vhthairclinic/" target="_blank" rel="noopener noreferrer" className="text-vernon-400 hover:text-white transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@VERNONSKINCLINIC" target="_blank" rel="noopener noreferrer" className="text-vernon-400 hover:text-white transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="section-max-width section-padding">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3">
            <Image src="/images/vernon-logo.png" alt="Vernon Skin and Hair Clinic" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
            <div className="flex flex-col">
              <span className="font-display text-lg font-medium leading-tight text-vernon-900">
                Vernon
              </span>
              <span className="text-2xs leading-tight text-vernon-400">
                Skin & Hair Clinic
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavDropdown key={item.href} item={item} />
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+919100017567"
              className="btn-ghost gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-vernon-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-vernon-800 hover:shadow-md active:scale-[0.98]">
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 text-vernon-600 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
