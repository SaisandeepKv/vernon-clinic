'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation } from '@/data/navigation'
import { NavItem } from '@/types'

// ---------------------------------------------------------------------------
// Hover-intent hook — opens immediately, closes after a delay
// ---------------------------------------------------------------------------
function useHoverIntent(delay = 150) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }, [])

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), delay)
  }, [delay])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { open, setOpen, handleEnter, handleLeave }
}

// ---------------------------------------------------------------------------
// Mega-menu panel for Treatments
// ---------------------------------------------------------------------------
function TreatmentsMegaMenu({
  open,
  onEnter,
  onLeave,
  onLinkClick,
}: {
  open: boolean
  onEnter: () => void
  onLeave: () => void
  onLinkClick: () => void
}) {
  const treatmentsItem = navigation.find((n) => n.label === 'Treatments')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="absolute left-0 right-0 top-full z-50 border-b border-vernon-100 bg-white/98 shadow-lg backdrop-blur-xl"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div className="section-max-width section-padding py-8">
            {/* Header row */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-wider text-vernon-400">
                Treatments
              </h3>
              <Link
                href="/treatments"
                className="group flex items-center gap-1.5 text-sm font-medium text-vernon-600 transition-colors hover:text-vernon-950"
                onClick={onLinkClick}
              >
                View all
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Grid of categories */}
            <div className="grid grid-cols-5 gap-8">
              {treatmentsItem?.children?.map((category) => (
                <div key={category.href}>
                  <Link
                    href={category.href}
                    className="mb-3 block text-sm font-semibold text-vernon-950 transition-colors hover:text-clinical-600"
                    onClick={onLinkClick}
                  >
                    {category.label}
                  </Link>
                  <div className="space-y-0.5">
                    {category.children?.map((treatment) => (
                      <Link
                        key={treatment.href}
                        href={treatment.href}
                        className="block py-1 text-sm text-vernon-400 transition-colors hover:text-vernon-950"
                        onClick={onLinkClick}
                      >
                        {treatment.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Simple dropdown for About, Locations, etc.
// ---------------------------------------------------------------------------
function SimpleDropdown({
  item,
  open,
  onEnter,
  onLeave,
  onLinkClick,
}: {
  item: NavItem
  open: boolean
  onEnter: () => void
  onLeave: () => void
  onLinkClick: () => void
}) {
  return (
    <AnimatePresence>
      {open && item.children && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute left-0 top-full z-50 w-56 pt-2"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div className="rounded-lg border border-vernon-100 bg-white p-1.5 shadow-lg">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-md px-3 py-2 text-sm text-vernon-600 transition-colors hover:bg-vernon-50 hover:text-vernon-950"
                onClick={onLinkClick}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Desktop nav item
// ---------------------------------------------------------------------------
function NavDropdown({ item }: { item: NavItem }) {
  const { open, setOpen, handleEnter, handleLeave } = useHoverIntent(120)

  // Plain link (no children)
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="text-sm font-medium text-vernon-600 transition-colors hover:text-vernon-950"
      >
        {item.label}
      </Link>
    )
  }

  const isTreatments = item.label === 'Treatments'

  return (
    <>
      <div
        className={isTreatments ? undefined : 'relative'}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <button
          className="flex items-center gap-1 text-sm font-medium text-vernon-600 transition-colors hover:text-vernon-950"
          onClick={() => setOpen(!open)}
        >
          {item.label}
          <svg
            className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {!isTreatments && (
          <SimpleDropdown
            item={item}
            open={open}
            onEnter={handleEnter}
            onLeave={handleLeave}
            onLinkClick={() => setOpen(false)}
          />
        )}
      </div>

      {/* Treatments mega-menu renders at header level */}
      {isTreatments && (
        <TreatmentsMegaMenu
          open={open}
          onEnter={handleEnter}
          onLeave={handleLeave}
          onLinkClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Mobile navigation
// ---------------------------------------------------------------------------
function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-vernon-950/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white shadow-2xl"
          >
            {/* Mobile header */}
            <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-vernon-100 bg-white px-6">
              <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
                <Image
                  src="/images/vernon-logo.png"
                  alt="Vernon Skin and Hair Clinic"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-display text-base font-medium leading-tight text-vernon-950">
                    Vernon
                  </span>
                  <span className="text-2xs leading-tight text-vernon-400">
                    Skin & Hair Clinic
                  </span>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-vernon-400 transition-colors hover:bg-vernon-50 hover:text-vernon-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav className="px-4 py-3">
              {navigation.map((item) => (
                <div key={item.href} className="border-b border-vernon-50 last:border-b-0">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedCategory(expandedCategory === item.label ? null : item.label)
                        }
                        className="flex w-full items-center justify-between px-3 py-3 text-left"
                      >
                        <span className="text-sm font-medium text-vernon-950">{item.label}</span>
                        <svg
                          className={`h-4 w-4 text-vernon-400 transition-transform duration-200 ${
                            expandedCategory === item.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedCategory === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3">
                              {item.label === 'Treatments' ? (
                                <div className="space-y-1.5">
                                  {item.children.map((category) => (
                                    <div key={category.href} className="rounded-lg bg-vernon-50/60 px-3 py-2">
                                      <Link
                                        href={category.href}
                                        className="block py-1 text-sm font-semibold text-vernon-950"
                                        onClick={onClose}
                                      >
                                        {category.label}
                                      </Link>
                                      {category.children && (
                                        <div className="mt-1 space-y-0.5 border-l border-vernon-200 pl-3">
                                          {category.children.map((sub) => (
                                            <Link
                                              key={sub.href}
                                              href={sub.href}
                                              className="block py-1.5 text-sm text-vernon-400 active:text-vernon-950"
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
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-clinical-600"
                                    onClick={onClose}
                                  >
                                    View all treatments
                                    <svg
                                      className="h-3.5 w-3.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                  </Link>
                                </div>
                              ) : (
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-3 text-sm font-medium text-vernon-950"
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
                className="block w-full rounded-lg bg-vernon-950 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-vernon-900 active:scale-[0.98]"
                onClick={onClose}
              >
                Book Consultation
              </Link>
              <a
                href="tel:+919100017567"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-vernon-200 py-2.5 text-sm font-medium text-vernon-600 transition-colors hover:bg-vernon-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91 91000 17567
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
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
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-vernon-200/60 bg-white/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="section-max-width section-padding">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5">
              <Image
                src="/images/vernon-logo.png"
                alt="Vernon Skin and Hair Clinic"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display text-lg font-medium leading-tight text-vernon-950">
                  Vernon
                </span>
                <span className="text-2xs leading-tight text-vernon-400">
                  Skin & Hair Clinic
                </span>
              </div>
            </Link>

            {/* Desktop nav — centered */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navigation.map((item) => (
                <NavDropdown key={item.href} item={item} />
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-vernon-950 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-vernon-900 active:scale-[0.98]"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="rounded-lg p-2 text-vernon-600 transition-colors hover:bg-vernon-50 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
