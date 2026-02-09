import { NextResponse } from 'next/server'
import { validateCredentials, generateToken } from '@/lib/auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = generateToken()

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  })

  return response
}
