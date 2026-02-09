// Server-side PostHog helpers for analytics API

const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY || ''
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID || ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export function isPostHogConfigured(): boolean {
  return !!(POSTHOG_API_KEY && POSTHOG_PROJECT_ID)
}

interface PostHogQueryParams {
  dateFrom: string
  dateTo: string
}

export async function queryPostHog(
  endpoint: string,
  body: Record<string, unknown>
) {
  const res = await fetch(
    `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/${endpoint}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PostHog API error ${res.status}: ${text}`)
  }
  return res.json()
}

export async function getPageViews({ dateFrom, dateTo }: PostHogQueryParams) {
  return queryPostHog('query/', {
    query: {
      kind: 'TrendsQuery',
      series: [{ event: '$pageview', kind: 'EventsNode', math: 'total' }],
      dateRange: { date_from: dateFrom, date_to: dateTo },
      interval: 'day',
    },
  })
}

export async function getUniqueVisitors({ dateFrom, dateTo }: PostHogQueryParams) {
  return queryPostHog('query/', {
    query: {
      kind: 'TrendsQuery',
      series: [{ event: '$pageview', kind: 'EventsNode', math: 'dau' }],
      dateRange: { date_from: dateFrom, date_to: dateTo },
      interval: 'day',
    },
  })
}

export async function getTopPages({ dateFrom, dateTo }: PostHogQueryParams) {
  return queryPostHog('query/', {
    query: {
      kind: 'TrendsQuery',
      series: [{ event: '$pageview', kind: 'EventsNode', math: 'total' }],
      dateRange: { date_from: dateFrom, date_to: dateTo },
      breakdownFilter: {
        breakdown_type: 'event',
        breakdown: '$current_url',
      },
    },
  })
}

export async function getDeviceBreakdown({ dateFrom, dateTo }: PostHogQueryParams) {
  return queryPostHog('query/', {
    query: {
      kind: 'TrendsQuery',
      series: [{ event: '$pageview', kind: 'EventsNode', math: 'dau' }],
      dateRange: { date_from: dateFrom, date_to: dateTo },
      breakdownFilter: {
        breakdown_type: 'event',
        breakdown: '$device_type',
      },
    },
  })
}

export async function getGeography({ dateFrom, dateTo }: PostHogQueryParams) {
  return queryPostHog('query/', {
    query: {
      kind: 'TrendsQuery',
      series: [{ event: '$pageview', kind: 'EventsNode', math: 'dau' }],
      dateRange: { date_from: dateFrom, date_to: dateTo },
      breakdownFilter: {
        breakdown_type: 'event',
        breakdown: '$geoip_city_name',
      },
    },
  })
}

export async function getBrowserBreakdown({ dateFrom, dateTo }: PostHogQueryParams) {
  return queryPostHog('query/', {
    query: {
      kind: 'TrendsQuery',
      series: [{ event: '$pageview', kind: 'EventsNode', math: 'dau' }],
      dateRange: { date_from: dateFrom, date_to: dateTo },
      breakdownFilter: {
        breakdown_type: 'event',
        breakdown: '$browser',
      },
    },
  })
}
