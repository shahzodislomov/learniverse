import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISubmission extends Document {
  user: mongoose.Types.ObjectId
  challenge: mongoose.Types.ObjectId
  flag: string
  correct: boolean
  submittedAt: Date
  solveOrder?: number // Order in which challenge was solved (1st, 2nd, 3rd...)
  firstBlood: boolean // True if this is the first solve
  solvedAt?: Date // Timestamp when challenge was solved (for correct submissions)
}

const SubmissionSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    challenge: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    solveOrder: {
      type: Number,
      default: null,
    },
    firstBlood: {
      type: Boolean,
      default: false,
    },
    solvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
SubmissionSchema.index({ user: 1, challenge: 1 })
SubmissionSchema.index({ submittedAt: -1 })
SubmissionSchema.index({ challenge: 1, solveOrder: 1 }) // For solver list queries
SubmissionSchema.index({ challenge: 1, firstBlood: 1 }) // For first blood queries

// Safe model creation pattern for Next.js hot reloading
let Submission: Model<ISubmission>

if (mongoose.models && mongoose.models.Submission) {
  Submission = mongoose.models.Submission as Model<ISubmission>
} else {
  Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema)
}

export default Submission

