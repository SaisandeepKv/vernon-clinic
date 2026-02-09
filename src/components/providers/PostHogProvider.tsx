'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

let initialized = false

function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && initialized) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) url += '?' + search
      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

  useEffect(() => {
    if (!key || !host || initialized) return
    posthog.init(key, {
      api_host: host,
      capture_pageview: false, // We handle it manually
      capture_pageleave: true,
      persistence: 'localStorage+cookie',
      autocapture: false,
    })
    initialized = true
  }, [key, host])

  // No-op if PostHog not configured
  if (!key || !host) return <>{children}</>

  return (
    <>
      <PostHogPageview />
      {children}
    </>
  )
}
