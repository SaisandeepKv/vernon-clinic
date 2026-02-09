import { NextResponse } from 'next/server'
import { verifyAdminAuth } from '@/lib/auth'
import {
  isPostHogConfigured,
  getPageViews,
  getUniqueVisitors,
  getTopPages,
  getDeviceBreakdown,
  getGeography,
  getBrowserBreakdown,
} from '@/lib/posthog'

export async function GET(request: Request) {
  const isAdmin = await verifyAdminAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isPostHogConfigured()) {
    return NextResponse.json({ error: 'PostHog not configured', configured: false }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const dateFrom = searchParams.get('dateFrom') || '-7d'
  const dateTo = searchParams.get('dateTo') || ''
  const params = { dateFrom, dateTo }

  try {
    const [pageViews, visitors, topPages, devices, geography, browsers] = await Promise.allSettled([
      getPageViews(params),
      getUniqueVisitors(params),
      getTopPages(params),
      getDeviceBreakdown(params),
      getGeography(params),
      getBrowserBreakdown(params),
    ])

    return NextResponse.json({
      configured: true,
      pageViews: pageViews.status === 'fulfilled' ? pageViews.value : null,
      visitors: visitors.status === 'fulfilled' ? visitors.value : null,
      topPages: topPages.status === 'fulfilled' ? topPages.value : null,
      devices: devices.status === 'fulfilled' ? devices.value : null,
      geography: geography.status === 'fulfilled' ? geography.value : null,
      browsers: browsers.status === 'fulfilled' ? browsers.value : null,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Analytics fetch failed', configured: true },
      { status: 500 }
    )
  }
}
