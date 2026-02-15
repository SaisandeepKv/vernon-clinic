import { Client } from '@notionhq/client'

// ---------------------------------------------------------------------------
// Notion Integration
// Posts bookings + callback requests to Notion databases
// Booking Tracker DB: f44e85eca60f42b286f512a41f04da78
// ---------------------------------------------------------------------------

const NOTION_DATABASE_ID = 'f44e85eca60f42b286f512a41f04da78'

function getNotionClient(): Client | null {
  const token = process.env.NOTION_API_KEY
  if (!token) return null
  return new Client({ auth: token })
}

export interface BookingData {
  patientName: string
  phone: string
  treatment: string
  location: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
}

export interface CallbackData {
  name: string
  phone: string
  concern?: string
  source?: string
}

export async function postBookingToNotion(
  booking: BookingData
): Promise<{ success: boolean; pageUrl?: string; error?: string }> {
  const notion = getNotionClient()
  if (!notion) {
    console.log('⚠️ NOTION_API_KEY not set — skipping Notion sync')
    return { success: false, error: 'Notion not configured' }
  }

  try {
    // Determine the date — use preferred date or today
    const bookingDate =
      booking.preferredDate && booking.preferredDate !== 'To be confirmed'
        ? booking.preferredDate
        : new Date().toISOString().split('T')[0]

    // Map treatment name to a valid select option
    const validTreatments = [
      'General Consultation',
      'Hair Transplant',
      'PRP & GFC Therapy',
      'DHI Hair Transplant',
      'Pico Laser',
      'Chemical Peel',
      'Botox',
      'Dermal Fillers',
      'Laser Hair Removal',
      'Acne Treatment',
      'Skin Consultation',
      'Other',
    ]

    const treatmentMatch = validTreatments.find(
      (t) =>
        t.toLowerCase() === booking.treatment.toLowerCase() ||
        booking.treatment.toLowerCase().includes(t.toLowerCase()) ||
        t.toLowerCase().includes(booking.treatment.toLowerCase())
    )

    const treatmentValue = treatmentMatch || 'Other'

    // Build the time note
    const timeNote = booking.preferredTime
      ? `Preferred time: ${booking.preferredTime}. `
      : ''
    const notesText = `${timeNote}${booking.notes || ''}`.trim()

    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        'Patient Name': {
          title: [{ text: { content: booking.patientName } }],
        },
        Phone: {
          phone_number: booking.phone,
        },
        Treatment: {
          select: { name: treatmentValue },
        },
        Location: {
          select: { name: booking.location },
        },
        Date: {
          date: { start: bookingDate },
        },
        Status: {
          select: { name: 'Pending' },
        },
        Source: {
          select: { name: 'Website Chatbot' },
        },
        ...(notesText
          ? {
              Notes: {
                rich_text: [{ text: { content: notesText } }],
              },
            }
          : {}),
      },
    })

    const pageUrl =
      'url' in response ? (response.url as string) : undefined

    console.log('✅ Booking posted to Notion:', pageUrl)
    return { success: true, pageUrl }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown Notion error'
    console.error('❌ Notion booking failed:', message)
    return { success: false, error: message }
  }
}

// ---------------------------------------------------------------------------
// Callback Request → Notion
// Posts to the same Booking Tracker database with Source = "Callback Request"
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Skin Analysis → Notion
// Saves analysis results to Booking Tracker with Status = "Skin Analysis"
// Also checks if a scan already exists for the same phone today
// ---------------------------------------------------------------------------

export interface SkinAnalysisData {
  name: string
  phone: string
  score: number
  skinAge?: number
  imageType: string
  summary: string
  concerns: string
  hairStage?: string
}

export async function checkScanExistsToday(
  phone: string
): Promise<{ exists: boolean }> {
  const notion = getNotionClient()
  if (!notion) return { exists: false }

  try {
    const today = new Date().toISOString().split('T')[0]
    const response = await notion.dataSources.query({
      data_source_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          { property: 'Phone', phone_number: { equals: phone } },
          { property: 'Status', select: { equals: 'Skin Analysis' } },
          { property: 'Date', date: { equals: today } },
        ],
      },
      page_size: 1,
    })

    return { exists: response.results.length > 0 }
  } catch (error) {
    console.error('Notion scan check error:', error)
    return { exists: false }
  }
}

export async function postSkinAnalysisToNotion(
  data: SkinAnalysisData
): Promise<{ success: boolean; error?: string }> {
  const notion = getNotionClient()
  if (!notion) {
    console.log('⚠️ NOTION_API_KEY not set — skipping Notion sync')
    return { success: false, error: 'Notion not configured' }
  }

  try {
    const today = new Date().toISOString().split('T')[0]

    // Build analysis summary for Notes field
    const notesLines = [
      `AI Skin Analysis — Score: ${data.score}/100`,
      data.skinAge ? `Skin Age: ${data.skinAge} years` : '',
      `Type: ${data.imageType}`,
      `Summary: ${data.summary}`,
      data.hairStage ? `Hair Loss Stage: ${data.hairStage}` : '',
      `Concerns: ${data.concerns}`,
    ]
      .filter(Boolean)
      .join('\n')

    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        'Patient Name': {
          title: [{ text: { content: data.name } }],
        },
        Phone: {
          phone_number: data.phone,
        },
        Treatment: {
          select: { name: 'Skin Consultation' },
        },
        Location: {
          select: { name: 'Banjara Hills' },
        },
        Date: {
          date: { start: today },
        },
        Status: {
          select: { name: 'Skin Analysis' },
        },
        Source: {
          select: { name: 'Website Chatbot' },
        },
        Notes: {
          rich_text: [{ text: { content: notesLines.slice(0, 2000) } }],
        },
      },
    })

    console.log('✅ Skin analysis saved to Notion for:', data.phone)
    return { success: true }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown Notion error'
    console.error('❌ Notion skin analysis save failed:', message)
    return { success: false, error: message }
  }
}

// ---------------------------------------------------------------------------
// Callback Request → Notion
// Posts to the same Booking Tracker database with Source = "Callback Request"
// ---------------------------------------------------------------------------

export async function postCallbackToNotion(
  data: CallbackData
): Promise<{ success: boolean; pageUrl?: string; error?: string }> {
  const notion = getNotionClient()
  if (!notion) {
    console.log('⚠️ NOTION_API_KEY not set — skipping Notion sync')
    return { success: false, error: 'Notion not configured' }
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        'Patient Name': {
          title: [{ text: { content: data.name } }],
        },
        Phone: {
          phone_number: data.phone,
        },
        Treatment: {
          select: { name: data.concern ? 'General Consultation' : 'Other' },
        },
        Location: {
          select: { name: 'Banjara Hills' },
        },
        Date: {
          date: { start: new Date().toISOString().split('T')[0] },
        },
        Status: {
          select: { name: 'Callback Requested' },
        },
        Source: {
          select: { name: data.source || 'Website Chatbot' },
        },
        ...(data.concern
          ? {
              Notes: {
                rich_text: [
                  { text: { content: `Callback request. Concern: ${data.concern}` } },
                ],
              },
            }
          : {
              Notes: {
                rich_text: [
                  { text: { content: 'Callback request from website chatbot' } },
                ],
              },
            }),
      },
    })

    const pageUrl =
      'url' in response ? (response.url as string) : undefined

    console.log('✅ Callback request posted to Notion:', pageUrl)
    return { success: true, pageUrl }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown Notion error'
    console.error('❌ Notion callback failed:', message)
    return { success: false, error: message }
  }
}
