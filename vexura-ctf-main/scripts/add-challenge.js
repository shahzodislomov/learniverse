/**
 * CLI script to add a single challenge
 * Usage: node scripts/add-challenge.js
 */

const readline = require('readline')
const mongoose = require('mongoose')

// Try to load .env.local if dotenv is available
try {
  require('dotenv').config({ path: '.env.local' })
} catch (e) {
  // dotenv not available, use environment variables directly
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ctfvexura'

const ChallengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  flag: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  points: Number,
  category: { type: String, enum: ['Web', 'Crypto', 'Forensics', 'OSINT', 'Reverse', 'Misc'] },
  solvedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function addChallenge() {
  try {
    console.log('🚀 CTFVexura Challenge Creator\n')
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB\n')

    const title = await question('Challenge Title: ')
    if (!title.trim()) {
      console.error('❌ Title is required!')
      process.exit(1)
    }

    // Check if challenge already exists
    const existing = await Challenge.findOne({ title: title.trim() })
    if (existing) {
      console.error(`❌ Challenge with title "${title}" already exists!`)
      process.exit(1)
    }

    console.log('\nDescription (Press Enter twice when done):')
    const descriptionLines = []
    let emptyCount = 0
    while (true) {
      const line = await question('')
      if (line === '') {
        emptyCount++
        if (emptyCount >= 2) break
      } else {
        emptyCount = 0
        descriptionLines.push(line)
      }
    }
    const description = descriptionLines.join('\n')

    const flag = await question('\nFlag: ')
    if (!flag.trim()) {
      console.error('❌ Flag is required!')
      process.exit(1)
    }

    console.log('\nDifficulty options: Easy, Medium, Hard')
    const difficulty = await question('Difficulty: ')
    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      console.error('❌ Difficulty must be Easy, Medium, or Hard!')
      process.exit(1)
    }

    const pointsInput = await question('Points: ')
    const points = parseInt(pointsInput, 10)
    if (isNaN(points) || points < 0) {
      console.error('❌ Points must be a non-negative number!')
      process.exit(1)
    }

    console.log('\nCategory options: Web, Crypto, Forensics, OSINT, Reverse, Misc')
    const category = await question('Category: ')
    if (!['Web', 'Crypto', 'Forensics', 'OSINT', 'Reverse', 'Misc'].includes(category)) {
      console.error('❌ Invalid category!')
      process.exit(1)
    }

    // Create challenge
    const challenge = await Challenge.create({
      title: title.trim(),
      description: description.trim(),
      flag: flag.trim(),
      difficulty,
      points,
      category,
    })

    console.log('\n✅ Challenge created successfully!')
    console.log(`   ID: ${challenge._id}`)
    console.log(`   Title: ${challenge.title}`)
    console.log(`   Difficulty: ${challenge.difficulty}`)
    console.log(`   Points: ${challenge.points}`)
    console.log(`   Category: ${challenge.category}`)

    rl.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    rl.close()
    process.exit(1)
  }
}

addChallenge()

