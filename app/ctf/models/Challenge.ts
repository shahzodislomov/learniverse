import mongoose, { Schema, Document, Model } from 'mongoose'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type Category = 'web' | 'crypto' | 'forensics' | 'pwn' | 'osint' | 'rev' | 'misc'

export interface IChallenge extends Document {
  _id: mongoose.Types.ObjectId | string
  title: string
  description: string
  flag: string
  difficulty: Difficulty
  points: number
  category: Category
  isActive: boolean
  solvedBy: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const ChallengeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    flag: {
      type: String,
      required: [true, 'Flag is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: [true, 'Difficulty is required'],
    },
    points: {
      type: Number,
      required: [true, 'Points are required'],
      min: [0, 'Points must be non-negative'],
    },
    category: {
      type: String,
      enum: ['web', 'crypto', 'forensics', 'pwn', 'osint', 'rev', 'misc'],
      required: [true, 'Category is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    solvedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
ChallengeSchema.index({ category: 1, difficulty: 1 })
ChallengeSchema.index({ solvedBy: 1 })

// Safe model creation pattern for Next.js hot reloading
let Challenge: Model<IChallenge>

if (mongoose.models && mongoose.models.Challenge) {
  Challenge = mongoose.models.Challenge as Model<IChallenge>
} else {
  Challenge = mongoose.model<IChallenge>('Challenge', ChallengeSchema)
}

export default Challenge

