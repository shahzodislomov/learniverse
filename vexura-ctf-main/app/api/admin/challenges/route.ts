import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import connectDB from '@/lib/db'
import Challenge from '@/models/Challenge'
import { requireAdmin } from '@/lib/admin'
import { challengeCreateSchema } from '@/lib/validations'

// GET - List all challenges (admin only, includes flags)
export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    const challenges = await Challenge.find()
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      challenges: challenges.map((challenge) => ({
        id: challenge._id,
        title: challenge.title,
        description: challenge.description,
        flag: challenge.flag, // Admin can see flags
        difficulty: challenge.difficulty,
        points: challenge.points,
        category: challenge.category,
        isActive: challenge.isActive,
        solvedCount: challenge.solvedBy?.length || 0,
        createdAt: challenge.createdAt,
        updatedAt: challenge.updatedAt,
      })),
    })
  } catch (error: any) {
    console.error('Error fetching challenges:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new challenge
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    await connectDB()

    const body = await request.json()

    // Validate input
    const validationResult = challengeCreateSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Check for duplicate title
    const existing = await Challenge.findOne({ title: data.title })
    if (existing) {
      return NextResponse.json(
        { error: 'Challenge with this title already exists' },
        { status: 400 }
      )
    }

    // Create challenge
    const challenge = await Challenge.create({
      title: data.title,
      description: data.description,
      flag: data.flag.trim(),
      difficulty: data.difficulty,
      points: data.points,
      category: data.category,
      isActive: data.isActive ?? true,
    })

    return NextResponse.json(
      {
        message: 'Challenge created successfully',
        challenge: {
          id: challenge._id,
          title: challenge.title,
          difficulty: challenge.difficulty,
          points: challenge.points,
          category: challenge.category,
          isActive: challenge.isActive,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating challenge:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
