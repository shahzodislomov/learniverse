import type { Id } from "../../../convex/_generated/dataModel"

// Convex-compatible challenge type (what the API returns)
export type ConvexDifficulty = 'Easy' | 'Medium' | 'Hard'
export type ConvexCategory = 'Web' | 'Crypto' | 'Forensics' | 'OSINT' | 'Reverse' | 'Misc'

export interface IConvexChallenge {
  _id: Id<"ctfChallenges">
  _creationTime: number
  title: string
  description: string
  flag: string
  flagFormat: string
  difficulty: ConvexDifficulty
  points: number
  category: ConvexCategory
  isActive: boolean
  createdAt: number
  updatedAt: number
  createdBy: string
  // Computed fields added by getAllChallenges query
  solveCount?: number
  isSolved?: boolean
}

// Legacy types for admin interface (category/difficulty enums)
export type Difficulty = 'easy' | 'medium' | 'hard'
export type Category = 'web' | 'crypto' | 'forensics' | 'pwn' | 'osint' | 'rev' | 'misc'

