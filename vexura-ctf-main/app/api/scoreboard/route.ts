import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()

    const users = await User.find()
      .select('username totalPoints solvedChallenges')
      .sort({ totalPoints: -1, createdAt: 1 })
      .lean()

    const scoreboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      totalPoints: user.totalPoints,
      solvedCount: user.solvedChallenges.length,
    }))

    return NextResponse.json({ scoreboard })
  } catch (error: any) {
    console.error('Error fetching scoreboard:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

