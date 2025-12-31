import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import Challenge from '@/models/Challenge'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const challenge = await Challenge.findOne({
      _id: id,
      isActive: true,
    })
      .select('-flag')
      .lean()

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    // Check if user has solved it
    const user = await getCurrentUser()
    if (user) {
      const userDoc = await import('@/models/User').then((m) => m.default)
      const userWithChallenges = await userDoc.findById(user.userId).select('solvedChallenges')
        ; (challenge as any).isSolved = userWithChallenges?.solvedChallenges
          .map((challengeId: any) => challengeId.toString())
          .includes(id) || false
    } else {
      ; (challenge as any).isSolved = false
    }

    return NextResponse.json({ challenge })
  } catch (error: any) {
    console.error('Error fetching challenge:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

