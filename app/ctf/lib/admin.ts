import { getCurrentUser } from './auth'
import connectDB from './db'
import User from '@/models/User'

export interface AdminUser {
  userId: string
  username: string
  email: string
  role: string
}

/**
 * Check if current user is admin
 * Returns admin user object or null
 */
export async function requireAdmin(): Promise<AdminUser | null> {
  const user = await getCurrentUser()
  
  if (!user) {
    return null
  }

  try {
    await connectDB()
    const userDoc = await User.findById(user.userId).select('role isBanned').lean()

    if (!userDoc) {
      console.error(`[requireAdmin] User ${user.userId} not found in database`)
      return null
    }

    if (userDoc.isBanned) {
      console.error(`[requireAdmin] User ${user.userId} is banned`)
      return null
    }

    if (userDoc.role !== 'admin') {
      console.error(`[requireAdmin] User ${user.userId} role is "${userDoc.role}", not "admin"`)
      return null
    }

    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: userDoc.role,
    }
  } catch (error) {
    console.error('[requireAdmin] Database error:', error)
    // If DB fails, check JWT role as fallback
    if (user.role === 'admin') {
      console.warn('[requireAdmin] DB check failed but JWT role is admin, allowing access')
      return {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: 'admin',
      }
    }
    return null
  }
}

/**
 * Get full user document with admin check
 */
export async function getAdminUser() {
  const admin = await requireAdmin()
  if (!admin) {
    return null
  }

  await connectDB()
  const userDoc = await User.findById(admin.userId).lean()
  return userDoc
}

