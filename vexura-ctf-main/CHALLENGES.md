# How to Add Challenges to CTFVexura

There are **three ways** to add challenges to your CTF platform:

## Method 1: Using the Seed Script (Recommended for Initial Setup)

The seed script is the easiest way to add multiple challenges at once.

### Steps:

1. **Edit the seed script** (`scripts/seed.js`):
   - Open `scripts/seed.js`
   - Find the `sampleChallenges` array
   - Add your challenge objects to the array

2. **Challenge Format**:
   ```javascript
   {
     title: 'Challenge Title',
     description: `Challenge description with hints and instructions.
     
     You can use multiple lines.
     Flag format: CTFVexura{...}`,
     flag: 'CTFVexura{your_flag_here}',
     difficulty: 'Easy', // or 'Medium' or 'Hard'
     points: 100, // Points based on difficulty
     category: 'Web', // or 'Crypto', 'Forensics', 'OSINT', 'Reverse', 'Misc'
   }
   ```

3. **Run the seed script**:
   ```bash
   npm run seed
   ```

4. **Note**: The script checks for existing challenges by title, so it won't create duplicates.

---

## Method 2: Using the Admin API Endpoint

For adding challenges programmatically or via API calls.

### Setup:

1. **Set admin emails** in `.env.local`:
   ```env
   ADMIN_EMAILS=admin@example.com,another@example.com
   ```

2. **Create a challenge via API**:
   ```bash
   curl -X POST http://localhost:3000/api/admin/challenges \
     -H "Content-Type: application/json" \
     -H "Cookie: auth-token=YOUR_JWT_TOKEN" \
     -d '{
       "title": "My New Challenge",
       "description": "Solve this challenge to get the flag!",
       "flag": "CTFVexura{my_flag}",
       "difficulty": "Medium",
       "points": 200,
       "category": "Web"
     }'
   ```

### Using JavaScript/TypeScript:

```typescript
const response = await fetch('/api/admin/challenges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    title: 'My New Challenge',
    description: 'Solve this challenge to get the flag!',
    flag: 'CTFVexura{my_flag}',
    difficulty: 'Medium',
    points: 200,
    category: 'Web',
  }),
})

const data = await response.json()
console.log(data)
```

---

## Method 3: Direct Database Insertion (Advanced)

For direct MongoDB access.

### Using MongoDB Shell:

```javascript
use ctfvexura

db.challenges.insertOne({
  title: "My Challenge",
  description: "Challenge description here",
  flag: "CTFVexura{flag_here}",
  difficulty: "Easy",
  points: 100,
  category: "Web",
  solvedBy: [],
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Using Mongoose in Node.js:

```javascript
const mongoose = require('mongoose')
const Challenge = require('./models/Challenge')

await mongoose.connect(process.env.MONGODB_URI)

const challenge = await Challenge.create({
  title: 'My Challenge',
  description: 'Challenge description',
  flag: 'CTFVexura{flag}',
  difficulty: 'Easy',
  points: 100,
  category: 'Web',
})
```

---

## Challenge Fields Reference

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| `title` | String | Yes | Unique challenge title |
| `description` | String | Yes | Challenge description, hints, instructions |
| `flag` | String | Yes | The correct flag (case-insensitive comparison) |
| `difficulty` | String | Yes | `'Easy'`, `'Medium'`, or `'Hard'` |
| `points` | Number | Yes | Non-negative integer (typically: Easy=50-100, Medium=150-250, Hard=300+) |
| `category` | String | Yes | `'Web'`, `'Crypto'`, `'Forensics'`, `'OSINT'`, `'Reverse'`, or `'Misc'` |

---

## Points Recommendation

Based on difficulty:
- **Easy**: 50-100 points
- **Medium**: 150-250 points
- **Hard**: 300-500 points

---

## Flag Format

Recommended format: `CTFVexura{your_flag_here}`

The flag comparison is **case-insensitive** and trims whitespace, so:
- `CTFVexura{flag}` = `ctfvexura{flag}` = `CTFVexura{FLAG}`

---

## Example Challenge

```javascript
{
  title: 'XSS Challenge',
  description: `Find and exploit the XSS vulnerability in the search form.
  
  The search form doesn't properly sanitize user input.
  Try injecting JavaScript to steal the admin cookie.
  
  Flag format: CTFVexura{...}`,
  flag: 'CTFVexura{xss_is_dangerous}',
  difficulty: 'Medium',
  points: 200,
  category: 'Web',
}
```

---

## Tips

1. **Start with the seed script** for initial setup
2. **Use the API endpoint** for dynamic challenge creation
3. **Test your flags** before adding challenges
4. **Use descriptive titles** that hint at the challenge type
5. **Provide clear descriptions** with hints if needed
6. **Set appropriate difficulty** and points based on complexity

---

## Troubleshooting

### Challenge not appearing?
- Check MongoDB connection
- Verify the challenge was created: `db.challenges.find()`
- Check browser console for errors
- Restart the dev server

### Admin API returning 403?
- Make sure your email is in `ADMIN_EMAILS` in `.env.local`
- Verify you're logged in (check auth token)
- Check the API route logs

### Duplicate challenge error?
- Challenges must have unique titles
- Check existing challenges before creating new ones

