import { NextResponse } from 'next/server'
import { postBookingToNotion } from '@/lib/notion'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { patientName, phone, treatment, location, preferredDate, preferredTime, notes } = body

    if (!patientName || patientName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name is required (min 2 characters)' },
        { status: 400 }
      )
    }

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit phone number is required' },
        { status: 400 }
      )
    }

    const result = await postBookingToNotion({
      patientName: patientName.trim(),
      phone: phone.trim(),
      treatment: treatment?.trim() || 'General Consultation',
      location: location || 'Banjara Hills',
      preferredDate,
      preferredTime,
      notes,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Appointment request received for ${patientName}. Our care coordinator will contact you at ${phone} within 30 minutes during working hours (11 AM – 9 PM).`,
        bookingDetails: {
          name: patientName.trim(),
          phone: phone.trim(),
          treatment: treatment?.trim() || 'General Consultation',
          location: location || 'Banjara Hills',
          date: preferredDate || 'To be confirmed',
          time: preferredTime || 'To be confirmed',
        },
      })
    }

    return NextResponse.json(
      { success: false, error: result.error || 'Failed to save booking' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Book API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
