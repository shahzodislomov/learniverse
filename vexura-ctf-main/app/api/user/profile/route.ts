import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Challenge from '@/models/Challenge'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userDoc = await User.findById(user.userId)
      .select('username email totalPoints solvedChallenges createdAt')
      .populate('solvedChallenges', 'title category difficulty points')
      .lean()

    if (!userDoc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        username: userDoc.username,
        email: userDoc.email,
        role: userDoc.role || 'user',
        totalPoints: userDoc.totalPoints,
        solvedChallenges: userDoc.solvedChallenges,
        solvedCount: userDoc.solvedChallenges.length,
        createdAt: userDoc.createdAt,
      },
    })
  } catch (error: any) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

