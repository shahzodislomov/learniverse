import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import Challenge from '@/models/Challenge'
import Submission from '@/models/Submission'
import User from '@/models/User'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    // Verify challenge exists
    const challenge = await Challenge.findById(id).lean()
    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    // Get all correct submissions ordered by solve order
    const solves = await Submission.find({
      challenge: id,
      correct: true,
    })
      .sort({ solveOrder: 1, solvedAt: 1 })
      .populate('user', 'username')
      .lean()

    const solvers = solves.map((solve: any) => ({
      id: solve._id,
      username: solve.user?.username || 'Unknown',
      solveOrder: solve.solveOrder || 0,
      solvedAt: solve.solvedAt || solve.submittedAt,
      firstBlood: solve.firstBlood || false,
    }))

    return NextResponse.json({
      challenge: {
        id: challenge._id,
        title: challenge.title,
      },
      solvers,
      totalSolves: solvers.length,
    })
  } catch (error: any) {
    console.error('Error fetching solvers:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

