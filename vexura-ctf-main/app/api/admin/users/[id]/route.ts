import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Challenge from '@/models/Challenge'
import Submission from '@/models/Submission'
import { requireAdmin } from '@/lib/admin'
import { userUpdateSchema, userPasswordResetSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'

// GET - Get user details with solve history
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    const { id } = await params

    const user = await User.findById(id)
      .select('username email role totalPoints isBanned createdAt solvedChallenges')
      .lean()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get solve history
    const solves = await Submission.find({ user: id, correct: true })
      .sort({ submittedAt: -1 })
      .populate('challenge', 'title category difficulty points')
      .lean()

    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || 'user',
        totalPoints: user.totalPoints || 0,
        isBanned: user.isBanned || false,
        solvedCount: user.solvedChallenges?.length || 0,
        createdAt: user.createdAt,
      },
      solveHistory: solves.map((solve: any) => ({
        id: solve._id,
        challenge: solve.challenge
          ? {
            id: solve.challenge._id,
            title: solve.challenge.title,
            category: solve.challenge.category,
            difficulty: solve.challenge.difficulty,
            points: solve.challenge.points,
          }
          : null,
        submittedAt: solve.submittedAt,
      })),
    })
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update user (role, ban status)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    const { id } = await params
    const body = await request.json()

    // Validate input
    const updateData: any = {}
    if (body.role !== undefined) {
      if (!['user', 'admin'].includes(body.role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
      }
      updateData.role = body.role
    }
    if (body.isBanned !== undefined) {
      updateData.isBanned = Boolean(body.isBanned)
    }

    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent self-ban or self-demotion
    if (admin.userId === id) {
      if (updateData.isBanned === true) {
        return NextResponse.json({ error: 'Cannot ban yourself' }, { status: 400 })
      }
      if (updateData.role === 'user') {
        return NextResponse.json({ error: 'Cannot remove your own admin role' }, { status: 400 })
      }
    }

    Object.assign(user, updateData)
    await user.save()

    return NextResponse.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isBanned: user.isBanned,
      },
    })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Reset user password
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    const { id } = await params
    const body = await request.json()

    // Validate input
    const validationResult = userPasswordResetSchema.safeParse({ userId: id, ...body })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { newPassword } = validationResult.data

    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    return NextResponse.json({ message: 'Password reset successfully' })
  } catch (error: any) {
    console.error('Error resetting password:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

