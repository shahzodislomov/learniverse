import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Challenge from '@/models/Challenge'
import Submission from '@/models/Submission'
import { requireAdmin } from '@/lib/admin'

export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    // Get statistics
    const [
      totalUsers,
      totalChallenges,
      activeChallenges,
      totalSolves,
      recentSolves,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      Challenge.countDocuments(),
      Challenge.countDocuments({ isActive: true }),
      Submission.countDocuments({ correct: true }),
      Submission.find({ correct: true })
        .sort({ submittedAt: -1 })
        .limit(10)
        .populate('user', 'username')
        .populate('challenge', 'title')
        .lean(),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('username email createdAt totalPoints')
        .lean(),
    ])

    // Calculate solve rate
    const solveRate = totalChallenges > 0 ? (totalSolves / totalUsers / totalChallenges) * 100 : 0

    return NextResponse.json({
      stats: {
        totalUsers,
        totalChallenges,
        activeChallenges,
        totalSolves,
        solveRate: Math.round(solveRate * 100) / 100,
      },
      recentActivity: {
        solves: recentSolves.map((solve: any) => ({
          id: solve._id,
          username: solve.user?.username || 'Unknown',
          challenge: solve.challenge?.title || 'Unknown',
          submittedAt: solve.submittedAt,
        })),
        users: recentUsers.map((user: any) => ({
          id: user._id,
          username: user.username,
          email: user.email,
          points: user.totalPoints,
          joinedAt: user.createdAt,
        })),
      },
    })
  } catch (error: any) {
    console.error('Error fetching admin dashboard:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

