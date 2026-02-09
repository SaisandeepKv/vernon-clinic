import { createHmac } from 'crypto'
import { cookies } from 'next/headers'
import { verifySupabaseAuth } from './auth-supabase'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vernon2024'
const SESSION_SECRET = process.env.SESSION_SECRET || 'vernon-admin-secret-key-change-in-production'

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function generateToken(): string {
  const payload = {
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', SESSION_SECRET).update(data).digest('base64url')
  return `${data}.${signature}`
}

export function validateToken(token: string): boolean {
  try {
    const [data, signature] = token.split('.')
    if (!data || !signature) return false

    // Verify signature
    const expected = createHmac('sha256', SESSION_SECRET).update(data).digest('base64url')
    if (signature !== expected) return false

    // Verify payload
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
    if (payload.role !== 'admin') return false
    if (Date.now() > payload.exp) return false
    return true
  } catch {
    return false
  }
}

/** Verify admin auth from cookies in API routes. Returns true if authenticated. */
export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    if (!token) return false
    return validateToken(token)
  } catch {
    return false
  }
}

interface UnifiedAuthResult {
  authenticated: boolean
  userId: string | null
  role: 'super_admin' | 'admin' | null
  email: string | null
  displayName: string | null
  method: 'supabase' | 'hmac' | null
}

/**
 * Unified auth: tries Supabase Auth first, falls back to HMAC token.
 * This allows both auth methods to work during migration.
 */
export async function verifyAdminAuthUnified(): Promise<UnifiedAuthResult> {
  // Try Supabase Auth first
  try {
    const supaResult = await verifySupabaseAuth()
    if (supaResult.authenticated) {
      return {
        authenticated: true,
        userId: supaResult.userId,
        role: supaResult.role,
        email: supaResult.email,
        displayName: supaResult.displayName,
        method: 'supabase',
      }
    }
  } catch {
    // Supabase not configured or error, continue to HMAC
  }

  // Fall back to HMAC
  const isHmacValid = await verifyAdminAuth()
  if (isHmacValid) {
    return {
      authenticated: true,
      userId: null,
      role: 'admin',
      email: null,
      displayName: 'Admin',
      method: 'hmac',
    }
  }

  return {
    authenticated: false,
    userId: null,
    role: null,
    email: null,
    displayName: null,
    method: null,
  }
}
