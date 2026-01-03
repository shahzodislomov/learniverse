import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'

export interface TokenPayload {
  userId: string
  username: string
  email: string
  role: 'user' | 'admin'
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch (error) {
    return null
  }
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return null
  }

  return verifyToken(token)
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function removeAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

