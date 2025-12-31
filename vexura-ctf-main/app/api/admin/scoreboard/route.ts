import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Challenge from '@/models/Challenge'
import Submission from '@/models/Submission'
import { requireAdmin } from '@/lib/admin'
import mongoose from 'mongoose'

// POST - Recalculate scores for all users or specific user
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    const body = await request.json()
    const { userId, action } = body

    if (action === 'recalculate') {
      // Recalculate scores for all users or specific user
      const query = userId ? { _id: userId } : {}

      const users = await User.find(query).select('solvedChallenges')
      let updated = 0

      for (const user of users) {
        // Get all solved challenges
        const challenges = await Challenge.find({
          _id: { $in: user.solvedChallenges },
        }).select('points')

        // Calculate total points
        const totalPoints = challenges.reduce((sum, challenge) => sum + challenge.points, 0)

        // Update user
        await User.findByIdAndUpdate(user._id, { totalPoints: totalPoints })
        updated++
      }

      return NextResponse.json({
        message: `Recalculated scores for ${updated} user(s)`,
        updated,
      })
    }

    if (action === 'remove-duplicates') {
      // Remove duplicate solves
      const duplicates = await Submission.aggregate([
        {
          $match: { correct: true },
        },
        {
          $group: {
            _id: { user: '$user', challenge: '$challenge' },
            count: { $sum: 1 },
            ids: { $push: '$_id' },
          },
        },
        {
          $match: { count: { $gt: 1 } },
        },
      ])

      let removed = 0
      for (const dup of duplicates) {
        // Keep the first submission, delete the rest
        const toDelete = dup.ids.slice(1)
        await Submission.deleteMany({ _id: { $in: toDelete } })
        removed += toDelete.length
      }

      return NextResponse.json({
        message: `Removed ${removed} duplicate solve(s)`,
        removed,
      })
    }

    if (action === 'soft-reset') {
      // Soft reset: Clear all solves but keep challenges and users
      const session = await mongoose.startSession()
      session.startTransaction()

      try {
        // Clear all submissions
        await Submission.deleteMany({}, { session })

        // Reset all user scores and solved challenges
        await User.updateMany({}, { $set: { totalPoints: 0, solvedChallenges: [] } }, { session })

        // Clear challenge solvedBy arrays
        await Challenge.updateMany({}, { $set: { solvedBy: [] } }, { session })

        await session.commitTransaction()

        return NextResponse.json({
          message: 'Scoreboard soft reset completed',
        })
      } catch (error) {
        await session.abortTransaction()
        throw error
      } finally {
        session.endSession()
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Error managing scoreboard:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

