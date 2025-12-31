import { NextResponse } from 'next/server'
import { removeAuthToken } from '@/lib/auth'
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await removeAuthToken()
    return NextResponse.json({ message: 'Logout successful' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

