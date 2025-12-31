import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Challenge from '@/models/Challenge'
import Submission from '@/models/Submission'
import { requireAdmin } from '@/lib/admin'

// GET - List all users
export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const skip = (page - 1) * limit

    // Build search query
    const query: any = {}
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .select('username email role totalPoints isBanned createdAt solvedChallenges')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ])

    return NextResponse.json({
      users: users.map((user: any) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || 'user',
        totalPoints: user.totalPoints || 0,
        isBanned: user.isBanned || false,
        solvedCount: user.solvedChallenges?.length || 0,
        createdAt: user.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

