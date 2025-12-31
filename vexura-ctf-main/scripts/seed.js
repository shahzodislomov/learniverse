/**
 * Admin seed script to add challenges to the database
 * Usage: npm run seed
 */

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

const sampleChallenges = [
  {
    title: 'Welcome Flag',
    description: `Welcome to CTFVexura! This is your first challenge.

Find the flag hidden in the homepage source code. Look carefully at the HTML comments.

Flag format: CTFVexura{...}`,
    flag: 'CTFVexura{welcome_to_the_platform}',
    difficulty: 'Easy',
    points: 50,
    category: 'Misc',
  },
  {
    title: 'Base64 Secret',
    description: `A secret message has been encoded. Can you decode it?

SGVsbG8gV29ybGQhIFRoZSBmbGFnIGlzOiBDVEZWZXh1cmF7YmFzZTY0X2lzX2Vhc3l9`,
    flag: 'CTFVexura{base64_is_easy}',
    difficulty: 'Easy',
    points: 75,
    category: 'Crypto',
  },
  {
    title: 'Cookie Monster',
    description: `A web application is storing sensitive information in cookies. 
Find the admin cookie value to get the flag.

Hint: Check the browser's developer tools and look for cookies.`,
    flag: 'CTFVexura{cookies_are_delicious}',
    difficulty: 'Easy',
    points: 100,
    category: 'Web',
  },
  {
    title: 'Hidden in Plain Sight',
    description: `Sometimes the best hiding place is right in front of you.

Look at the image metadata. What information can you extract?

Note: This is a placeholder challenge. In a real scenario, you would provide an image file.`,
    flag: 'CTFVexura{metadata_reveals_all}',
    difficulty: 'Medium',
    points: 150,
    category: 'Forensics',
  },
  {
    title: 'Social Engineering',
    description: `Find information about the platform creator using OSINT techniques.

What is the creator's favorite programming language mentioned in their GitHub profile?

Hint: This is a simulated challenge. In reality, you would search public profiles.`,
    flag: 'CTFVexura{osint_is_powerful}',
    difficulty: 'Medium',
    points: 200,
    category: 'OSINT',
  },
  {
    title: 'Reverse the Binary',
    description: `A binary file has been provided. Reverse engineer it to find the flag.

The binary checks for a specific input. What input makes it output "Access Granted"?

Note: This is a placeholder. In a real challenge, you would receive a binary file.`,
    flag: 'CTFVexura{reverse_engineering_fun}',
    difficulty: 'Hard',
    points: 300,
    category: 'Reverse',
  },
  {
    title: 'SQL Injection Basics',
    description: `A login form is vulnerable to SQL injection. 
Bypass the authentication to get the flag.

Username field is vulnerable. Try common SQL injection payloads.

Flag format: CTFVexura{...}`,
    flag: 'CTFVexura{sql_injection_101}',
    difficulty: 'Medium',
    points: 250,
    category: 'Web',
  },
  {
    title: 'Caesar Cipher',
    description: `A message has been encrypted using a Caesar cipher with a shift of 13.

Encrypted: PGSIrehkn{cebtenzzvat_vf_sha}

Decrypt it to find the flag!`,
    flag: 'CTFVexura{programming_is_fun}',
    difficulty: 'Easy',
    points: 80,
    category: 'Crypto',
  },
]

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing challenges (optional - comment out if you want to keep existing)
    // await Challenge.deleteMany({})
    // console.log('Cleared existing challenges')

    // Insert challenges
    for (const challenge of sampleChallenges) {
      const existing = await Challenge.findOne({ title: challenge.title })
      if (!existing) {
        await Challenge.create(challenge)
        console.log(`✓ Created challenge: ${challenge.title}`)
      } else {
        console.log(`- Challenge already exists: ${challenge.title}`)
      }
    }

    console.log('\n✓ Seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()

