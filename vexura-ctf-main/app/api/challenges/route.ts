import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import Challenge from '@/models/Challenge'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const user = await getCurrentUser()
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')

    // Build query
    const query: any = {}
    if (category) query.category = category
    if (difficulty) query.difficulty = difficulty

    const challenges = await Challenge.find({ ...query, isActive: true })
      .select('-flag')
      .lean()

    // If user is logged in, mark which challenges they've solved
    if (user) {
      const userDoc = await import('@/models/User').then((m) => m.default)
      const userWithChallenges = await userDoc.findById(user.userId).select('solvedChallenges')
      const solvedIds = new Set(
        userWithChallenges?.solvedChallenges.map((id: any) => id.toString()) || []
      )

      challenges.forEach((challenge) => {
        ; (challenge as any).isSolved = solvedIds.has(challenge._id.toString())
      })
    } else {
      challenges.forEach((challenge) => {
        ; (challenge as any).isSolved = false
      })
    }

    return NextResponse.json({ challenges })
  } catch (error: any) {
    console.error('Error fetching challenges:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

