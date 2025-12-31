import mongoose, { Schema, Document, Model } from 'mongoose'

export type UserRole = 'user' | 'admin'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  role: UserRole
  totalPoints: number
  solvedChallenges: mongoose.Types.ObjectId[]
  isBanned: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [20, 'Username must be at most 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    solvedChallenges: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Index for faster scoreboard queries
UserSchema.index({ totalPoints: -1 })

// Safe model creation pattern for Next.js hot reloading
// Check if model exists in mongoose.models, otherwise create it
let User: Model<IUser>

if (mongoose.models && mongoose.models.User) {
  // Model already exists, use it
  User = mongoose.models.User as Model<IUser>
} else {
  // Model doesn't exist, create it
  User = mongoose.model<IUser>('User', UserSchema)
}

export default User


