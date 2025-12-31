/**
 * Script to make a user an admin
 * Usage: node scripts/make-admin.js <email>
 */

const mongoose = require('mongoose')

// Try to load .env.local if dotenv is available
try {
  require('dotenv').config({ path: '.env.local' })
} catch (e) {
  // dotenv not available, use environment variables directly
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ctfvexura'

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isBanned: { type: Boolean, default: false },
  totalPoints: { type: Number, default: 0 },
  solvedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function makeAdmin() {
  const email = process.argv[2]

  if (!email) {
    console.error('❌ Please provide an email address')
    console.log('Usage: node scripts/make-admin.js <email>')
    process.exit(1)
  }

  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB\n')

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      console.error(`❌ User with email "${email}" not found`)
      process.exit(1)
    }

    if (user.role === 'admin') {
      console.log(`ℹ️  User "${user.username}" is already an admin`)
      process.exit(0)
    }

    user.role = 'admin'
    await user.save()

    console.log(`✅ Successfully made "${user.username}" (${user.email}) an admin`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

makeAdmin()

