'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { navigation } from '@/data/navigation'
import { NavItem } from '@/types'

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
        className="text-[13px] font-medium text-brand-500 transition-colors hover:text-brand-950"
      >
        {item.label}
      </Link>
    )
  }

  if (item.label === 'Treatments') {
    return (
      <>
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          <button
            className="flex items-center gap-1 text-[13px] font-medium text-brand-500 transition-colors hover:text-brand-950"
            onClick={() => setOpen(!open)}
          >
            {item.label}
            <svg
              className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {open && (
          <div
            className="absolute left-0 right-0 top-full z-50"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="mt-2 border-y border-brand-100/60 bg-white/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
              <div className="container-main py-10">
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <p className="overline">Treatments</p>
                    <h3 className="mt-2 font-display text-2xl text-brand-950">
                      Surgeon-led care across five disciplines
                    </h3>
                  </div>
                  <Link
                    href="/treatments"
                    className="group flex items-center gap-2 rounded-full bg-brand-50 px-5 py-2.5 text-sm font-medium text-brand-700 transition-all hover:bg-brand-100"
                    onClick={() => setOpen(false)}
                  >
                    View all
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-5 gap-8">
                  {navigation.find((n) => n.label === 'Treatments')?.children?.map((category) => (
                    <div key={category.href}>
                      <Link
                        href={category.href}
                        className="group/cat mb-4 flex items-center gap-2.5"
                        onClick={() => setOpen(false)}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-earth-50 text-earth-600 transition-colors group-hover/cat:bg-earth-100">
                          {categoryIcons[category.label] || (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-brand-900 group-hover/cat:text-earth-700">
                          {category.label}
                        </span>
                      </Link>
                      <div className="space-y-0.5">
                        {category.children?.map((treatment) => (
                          <Link
                            key={treatment.href}
                            href={treatment.href}
                            className="block rounded-lg px-2 py-1.5 text-[13px] text-brand-400 transition-colors hover:bg-brand-50 hover:text-brand-900"
                            onClick={() => setOpen(false)}
                          >
                            {treatment.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="flex items-center gap-1 text-[13px] font-medium text-brand-500 transition-colors hover:text-brand-950"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="min-w-[220px] rounded-2xl border border-brand-100/60 bg-white p-2 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] animate-fade-in">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-xl px-3.5 py-2.5 text-sm text-brand-500 transition-colors hover:bg-brand-50 hover:text-brand-900"
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-brand-950/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-sand-50 shadow-2xl animate-slide-in-right">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-sand-50 px-6 py-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <Image src="/images/vernon-logo.png" alt="Vernon" width={32} height={32} className="h-8 w-8 rounded-xl object-contain" />
            <span className="font-display text-xl text-brand-950">Vernon</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-brand-400 transition-colors hover:bg-brand-100 hover:text-brand-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-2">
          {navigation.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between px-4 py-4"
                  >
                    <span className="text-lg font-medium text-brand-900">{item.label}</span>
                    <svg
                      className={`h-4 w-4 text-brand-300 transition-transform duration-200 ${expandedCategory === item.label ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {expandedCategory === item.label && (
                    <div className="pb-4">
                      {item.label === 'Treatments' ? (
                        <div className="space-y-3 px-2">
                          {item.children.map((category) => (
                            <div key={category.href} className="rounded-2xl bg-white p-4">
                              <Link
                                href={category.href}
                                className="flex items-center gap-2 text-sm font-semibold text-brand-800"
                                onClick={onClose}
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-earth-50 text-earth-600">
                                  {categoryIcons[category.label] && (
                                    <span className="[&>svg]:h-4 [&>svg]:w-4">{categoryIcons[category.label]}</span>
                                  )}
                                </span>
                                {category.label}
                              </Link>
                              {category.children && (
                                <div className="mt-2 space-y-0.5 pl-9">
                                  {category.children.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      className="block py-1.5 text-sm text-brand-400 active:text-brand-900"
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
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-earth-600"
                            onClick={onClose}
                          >
                            View all treatments
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-0.5 px-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xl px-3 py-2.5 text-sm text-brand-500 active:bg-white"
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
                  className="block px-4 py-4 text-lg font-medium text-brand-900"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="px-6 py-8">
          <Link
            href="/contact"
            className="btn-primary block w-full text-center"
            onClick={onClose}
          >
            Book Consultation
          </Link>
          <a
            href="tel:+919100017567"
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white py-3 text-sm font-medium text-brand-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +91 91000 17567
          </a>
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
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'border-b border-brand-100/50 bg-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-2xl'
            : 'bg-sand-50/80 backdrop-blur-xl'
        }`}
      >
        <div className="container-main">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3">
              <Image
                src="/images/vernon-logo.png"
                alt="Vernon Skin and Hair Clinic"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl leading-tight text-brand-950">
                  Vernon
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-brand-400">
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

            {/* Desktop CTA */}
            <div className="hidden items-center gap-2 lg:flex">
              <a href="tel:+919100017567" className="btn-ghost gap-1.5 text-[13px]">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-950 px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-brand-800 active:scale-[0.97]"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="rounded-full p-2.5 text-brand-600 transition-colors hover:bg-brand-100 lg:hidden"
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
