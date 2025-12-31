import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import Challenge from '@/models/Challenge'
import User from '@/models/User'
import Submission from '@/models/Submission'
import { getCurrentUser } from '@/lib/auth'
import { rateLimit } from '@/lib/rateLimit'
import mongoose from 'mongoose'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting
    const rateLimitResult = rateLimit(user.userId)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { flag } = await request.json()
    const { id } = await params

    if (!flag) {
      return NextResponse.json({ error: 'Flag is required' }, { status: 400 })
    }

    // Get challenge with flag (check if active)
    const challenge = await Challenge.findOne({ _id: id, isActive: true })

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    // Check if user already solved this challenge
    const userDoc = await User.findById(user.userId)
    if (!userDoc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const alreadySolved = userDoc.solvedChallenges.some(
      (challengeId) => challengeId.toString() === id
    )

    if (alreadySolved) {
      return NextResponse.json({ error: 'Challenge already solved' }, { status: 400 })
    }

    // Verify flag (case-insensitive, trimmed)
    const isCorrect = challenge.flag.trim().toLowerCase() === flag.trim().toLowerCase()

    if (isCorrect) {
      // Use transaction to prevent race conditions for first blood
      const session = await mongoose.startSession()
      session.startTransaction()

      try {
        // Check if this is the first solve (first blood) - must be done in transaction
        const existingSolves = await Submission.countDocuments({
          challenge: id,
          correct: true,
        }).session(session)

        const solveOrder = existingSolves + 1
        const isFirstBlood = solveOrder === 1

        // Calculate points (first blood gets 10% bonus)
        const basePoints = challenge.points
        const bonusPoints = isFirstBlood ? Math.floor(basePoints * 0.1) : 0
        const totalPoints = basePoints + bonusPoints

        // Save submission with solve order and first blood
        await Submission.create(
          [
            {
              user: user.userId,
              challenge: id,
              flag: flag.trim(),
              correct: true,
              solveOrder,
              firstBlood: isFirstBlood,
              solvedAt: new Date(),
            },
          ],
          { session }
        )

        // Update user's solved challenges and points
        userDoc.solvedChallenges.push(challenge._id)
        userDoc.totalPoints += totalPoints
        await userDoc.save({ session })

        // Update challenge's solvedBy
        challenge.solvedBy.push(user.userId as any)
        await challenge.save({ session })

        await session.commitTransaction()

        return NextResponse.json({
          success: true,
          message: isFirstBlood
            ? 'Flag is correct! 🩸 First Blood!'
            : 'Flag is correct!',
          points: totalPoints,
          basePoints,
          bonusPoints,
          firstBlood: isFirstBlood,
          solveOrder,
        })
      } catch (error) {
        await session.abortTransaction()
        throw error
      } finally {
        session.endSession()
      }
    } else {
      // Save incorrect submission (for logging)
      await Submission.create({
        user: user.userId,
        challenge: id,
        flag: flag.trim(),
        correct: false,
      })

      return NextResponse.json(
        {
          success: false,
          message: 'Incorrect flag. Try again!',
        },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Error submitting flag:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

