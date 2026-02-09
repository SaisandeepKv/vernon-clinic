import { NextResponse } from 'next/server'
import { verifyAdminAuthUnified } from '@/lib/auth'

export async function GET() {
  const result = await verifyAdminAuthUnified()

  if (!result.authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({
    authenticated: true,
    email: result.email,
    role: result.role,
    displayName: result.displayName,
    method: result.method,
  })
}
