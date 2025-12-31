import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import Challenge from '@/models/Challenge'
import { requireAdmin } from '@/lib/admin'
import { challengeCreateSchema } from '@/lib/validations'

// GET - Get single challenge with flag (admin only)
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
    const challenge = await Challenge.findById(id).lean()

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    return NextResponse.json({
      challenge: {
        id: challenge._id,
        title: challenge.title,
        description: challenge.description,
        flag: challenge.flag, // Admin can see flag
        difficulty: challenge.difficulty,
        points: challenge.points,
        category: challenge.category,
        isActive: challenge.isActive,
        solvedCount: challenge.solvedBy?.length || 0,
        createdAt: challenge.createdAt,
        updatedAt: challenge.updatedAt,
      },
    })
  } catch (error: any) {
    console.error('Error fetching challenge:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update challenge
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

    // Validate input (all fields optional for update)
    const updateData: any = {}
    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.flag !== undefined) updateData.flag = body.flag.trim()
    if (body.difficulty !== undefined) {
      if (!['easy', 'medium', 'hard'].includes(body.difficulty)) {
        return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 })
      }
      updateData.difficulty = body.difficulty
    }
    if (body.points !== undefined) {
      const points = parseInt(body.points, 10)
      if (isNaN(points) || points < 0) {
        return NextResponse.json({ error: 'Invalid points' }, { status: 400 })
      }
      updateData.points = points
    }
    if (body.category !== undefined) {
      if (!['web', 'crypto', 'forensics', 'pwn', 'osint', 'rev', 'misc'].includes(body.category)) {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
      }
      updateData.category = body.category
    }
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive)

    // Check if challenge exists
    const challenge = await Challenge.findById(id)
    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    // Check for duplicate title if title is being updated
    if (updateData.title && updateData.title !== challenge.title) {
      const existing = await Challenge.findOne({ title: updateData.title })
      if (existing) {
        return NextResponse.json(
          { error: 'Challenge with this title already exists' },
          { status: 400 }
        )
      }
    }

    // Update challenge
    Object.assign(challenge, updateData)
    await challenge.save()

    return NextResponse.json({
      message: 'Challenge updated successfully',
      challenge: {
        id: challenge._id,
        title: challenge.title,
        difficulty: challenge.difficulty,
        points: challenge.points,
        category: challenge.category,
        isActive: challenge.isActive,
      },
    })
  } catch (error: any) {
    console.error('Error updating challenge:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete challenge
export async function DELETE(
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

    const challenge = await Challenge.findById(id)
    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    // Check if challenge has solves
    if (challenge.solvedBy.length > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete challenge with existing solves. Deactivate it instead.',
        },
        { status: 400 }
      )
    }

    await Challenge.findByIdAndDelete(id)

    return NextResponse.json({ message: 'Challenge deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting challenge:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

