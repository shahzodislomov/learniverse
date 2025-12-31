import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Challenge from '@/models/Challenge'
import Submission from '@/models/Submission'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    await connectDB()

    const { username } = await params

    // Find user by username
    const user = await User.findOne({ username }).lean()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user's rank (position in scoreboard)
    const rank = await User.countDocuments({
      $or: [
        { totalPoints: { $gt: user.totalPoints } },
        { totalPoints: user.totalPoints, createdAt: { $lt: user.createdAt } },
      ],
    })

    // Get solved challenges with details
    const solvedChallenges = await Challenge.find({
      _id: { $in: user.solvedChallenges || [] },
    })
      .select('title category difficulty points')
      .lean()

    // Get solve details (order, first blood) for each challenge
    const solveDetails = await Submission.find({
      user: user._id,
      challenge: { $in: user.solvedChallenges || [] },
      correct: true,
    })
      .select('challenge solveOrder firstBlood solvedAt')
      .lean()

    // Create a map of challenge ID to solve details
    const solveMap = new Map()
    solveDetails.forEach((solve: any) => {
      solveMap.set(solve.challenge.toString(), {
        solveOrder: solve.solveOrder,
        firstBlood: solve.firstBlood,
        solvedAt: solve.solvedAt,
      })
    })

    // Combine challenge data with solve details
    const solvedChallengesWithDetails = solvedChallenges.map((challenge: any) => {
      const solveInfo = solveMap.get(challenge._id.toString()) || {}
      return {
        id: challenge._id,
        title: challenge.title,
        category: challenge.category,
        difficulty: challenge.difficulty,
        points: challenge.points,
        solveOrder: solveInfo.solveOrder,
        firstBlood: solveInfo.firstBlood || false,
        solvedAt: solveInfo.solvedAt,
      }
    })

    // Sort by solve order (first solved first)
    solvedChallengesWithDetails.sort((a, b) => {
      if (a.solveOrder && b.solveOrder) return a.solveOrder - b.solveOrder
      if (a.solveOrder) return -1
      if (b.solveOrder) return 1
      return 0
    })

    // Count first bloods
    const firstBloodCount = solvedChallengesWithDetails.filter((c) => c.firstBlood).length

    // Check if user is in top 10
    const isTop10 = rank < 10

    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        role: user.role || 'user',
        totalPoints: user.totalPoints || 0,
        solvedCount: solvedChallengesWithDetails.length,
        rank: rank + 1, // 1-indexed
        createdAt: user.createdAt,
        isTop10,
        firstBloodCount,
      },
      solvedChallenges: solvedChallengesWithDetails,
    })
  } catch (error: any) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

