import { NextResponse } from 'next/server'
import { postCallbackToNotion } from '@/lib/notion'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, concern } = body

    if (!name || name.trim().length < 2) {
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

    const result = await postCallbackToNotion({
      name: name.trim(),
      phone: phone.trim(),
      concern: concern?.trim() || undefined,
      source: 'Website Chatbot',
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `We'll call you back within 30 minutes during working hours (11 AM - 9 PM).`,
      })
    }

    return NextResponse.json(
      { success: false, error: result.error || 'Failed to save callback request' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Callback API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
