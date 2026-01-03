import { z } from 'zod'

// Challenge validation schemas
export const challengeCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required'),
  flag: z.string().min(1, 'Flag is required'),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    errorMap: () => ({ message: 'Difficulty must be easy, medium, or hard' }),
  }),
  points: z.number().int().min(0, 'Points must be non-negative').max(10000, 'Points too high'),
  category: z.enum(['web', 'crypto', 'forensics', 'pwn', 'osint', 'rev', 'misc'], {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
  isActive: z.boolean().default(true),
})

export const challengeUpdateSchema = challengeCreateSchema.partial().extend({
  id: z.string().min(1, 'Challenge ID is required'),
})

// User management schemas
export const userUpdateSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  role: z.enum(['user', 'admin']).optional(),
  isBanned: z.boolean().optional(),
})

export const userPasswordResetSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

// Scoreboard management
export const recalculateScoresSchema = z.object({
  userId: z.string().optional(), // If provided, recalculate for specific user
})

export type ChallengeCreateInput = z.infer<typeof challengeCreateSchema>
export type ChallengeUpdateInput = z.infer<typeof challengeUpdateSchema>
export type UserUpdateInput = z.infer<typeof userUpdateSchema>
export type UserPasswordResetInput = z.infer<typeof userPasswordResetSchema>

