# CTF Platform Setup Guide

## Quick Start

### 1. Run Convex Development Server
```bash
npx convex dev
```
This will:
- Sync the new schema (ctfChallenges, ctfSubmissions, userProfiles)
- Generate TypeScript types
- Deploy your backend functions

### 2. Create Admin Account
1. Navigate to `/auth/register`
2. Sign up with email: `wenaco34@gmail.com`
3. This account is automatically assigned admin privileges

### 3. Add CTF Challenges
1. Go to `/admin/ctf`
2. Click "Create Challenge"
3. Fill in:
   - **Title**: Challenge name
   - **Description**: What users need to do
   - **Category**: Web, Crypto, Forensics, OSINT, Reverse, or Misc
   - **Difficulty**: Easy (100-200 pts), Medium (250-400 pts), Hard (500-800 pts)
   - **Points**: Base points for solving
   - **Flag Format**: e.g., `WEN{...}`
   - **Flag**: The actual flag (e.g., `WEN{example_flag}`)
   - **Active**: Check to make visible to users

### 4. Test the System
1. Visit `/ctf/challenges` - See all active challenges
2. Click a challenge to view details
3. Submit the flag
4. Check `/ctf/scoreboard` - See your score
5. Check `/profile` - View your CTF statistics

## Features Implemented

### ✅ Fixed Issues
- **Navbar**: Now appears on all CTF pages
- **Static Data**: Completely removed, everything is dynamic from backend
- **Profile Stats**: Real-time CTF statistics (rank, points, challenges solved)
- **Admin Panel**: Full CTF challenge management interface
- **Challenge Cards**: Border colors match difficulty (green/yellow/red)
- **Community**: Shows real authenticated users
- **Access Control**: Admin panel restricted to wenaco34@gmail.com
- **Rules Page**: Complete with scoring system and code of conduct

### 🎯 New Features
- **First Blood Bonus**: First solver gets 50% extra points
- **Live Scoreboard**: Real-time rankings with solve counts
- **User Profiles**: Stored in database with avatar and bio
- **Challenge Categories**: Web, Crypto, Forensics, OSINT, Reverse, Misc
- **Difficulty Levels**: Easy, Medium, Hard with visual indicators

## File Structure

```
app/
├── ctf/
│   ├── layout.tsx              # MainLayout wrapper
│   ├── page.tsx                # CTF home
│   ├── challenges/
│   │   └── page.tsx            # Challenge list (Convex)
│   ├── scoreboard/
│   │   └── page.tsx            # Live scoreboard (Convex)
│   ├── rules/
│   │   └── page.tsx            # Rules and scoring
│   └── components/
│       ├── ChallengeCard.tsx   # Challenge card with difficulty colors
│       └── ChallengeModal.tsx  # Submit flags (Convex)
├── admin/
│   ├── ctf/
│   │   └── page.tsx            # Admin challenge management
│   └── layout.tsx              # Added CTF link
├── profile/
│   └── Profile.tsx             # Real CTF stats (Convex)
├── community/
│   └── Community.tsx           # Real users list (Convex)
└── 403/
    └── page.tsx                # Forbidden access page

convex/
├── schema.ts                   # Database schema
├── ctfChallenges.ts           # CTF queries & mutations
└── userProfiles.ts            # User management
```

## API Endpoints (Convex)

### Queries
- `ctfChallenges.getAllChallenges(userEmail?)` - Get challenges with solve status
- `ctfChallenges.getUserStats(userEmail)` - Get user's CTF stats
- `ctfChallenges.getScoreboard(limit?)` - Get leaderboard
- `ctfChallenges.getChallengeSolvers(challengeId)` - Get solvers list
- `userProfiles.getAllUsers()` - Get all registered users
- `userProfiles.checkAdmin(email)` - Check if user is admin

### Mutations
- `ctfChallenges.submitFlag(challengeId, userEmail, flag)` - Submit flag
- `ctfChallenges.adminCreateChallenge(...)` - Create challenge (admin only)
- `ctfChallenges.adminUpdateChallenge(...)` - Update challenge (admin only)
- `ctfChallenges.adminDeleteChallenge(...)` - Delete challenge (admin only)
- `userProfiles.updateProfile(...)` - Update user profile

## Scoring System

### Base Points by Difficulty
- **Easy**: 100-200 points
- **Medium**: 250-400 points  
- **Hard**: 500-800 points

### Bonuses
- **First Blood**: +50% bonus points (e.g., 300pt challenge = 450pt for first solver)

### Ranking
- Primary: Total points (higher is better)
- Tie-breaker: Last solve time (earlier is better)

## Admin Features

### Challenge Management (`/admin/ctf`)
- ➕ Create new challenges
- ✏️ Edit existing challenges
- 🗑️ Delete challenges
- 👁️ View/hide flags
- 🔄 Toggle active/inactive status
- 📊 View solve counts

### Access Control
- Only `wenaco34@gmail.com` can access admin panel
- Non-admins redirected to `/403`
- Admin flag set automatically on profile creation

## User Experience

### Challenge List (`/ctf/challenges`)
- Filter by category (Web, Crypto, etc.)
- Filter by difficulty (Easy, Medium, Hard)
- Search by title/description
- Difficulty-colored borders
- Solved indicator with checkmark

### Challenge Modal
- View full description
- Submit flag with validation
- First blood notification
- See all solvers with rankings
- First blood badge (🩸) for first solver

### Scoreboard (`/ctf/scoreboard`)
- Live rankings
- Total points
- Challenges solved
- First blood count
- Current user highlighted
- Top 3 highlighted with medals

### Profile (`/profile`)
- CTF statistics:
  - Current rank
  - Percentile (top X%)
  - Total points
  - Challenges completed/total
  - First bloods earned
- Progress bar
- Avatar customization (emoji)
- Bio editing

## Troubleshooting

### Type Errors
If you see TypeScript errors about missing Convex functions:
```bash
npx convex dev --once
```

### No Challenges Showing
1. Check admin panel - are challenges marked as "Active"?
2. Run Convex dev to sync schema
3. Check browser console for errors

### Can't Access Admin Panel
- Only `wenaco34@gmail.com` has admin access
- Make sure you're logged in with that email
- Check `/403` if redirected

### Scoreboard Not Updating
- Ensure Convex dev is running
- Check that flag submissions are working
- Refresh the page (Convex queries auto-update)

## Next Steps

Consider adding:
1. **Challenge Hints** - Give users hints (deduct points)
2. **Teams** - Allow team formations and team scoring
3. **Writeups** - Let users submit solution writeups
4. **Time Limits** - Competition mode with start/end times
5. **Categories** - More specific challenge categories
6. **Tags** - Tag challenges for better search
7. **Achievements** - Badges for milestones
8. **Challenge Files** - Downloadable files for challenges
9. **Dynamic Scoring** - Points decrease as more solve
10. **Rate Limiting** - Prevent brute force attempts

## Support

For issues or questions about the CTF platform:
1. Check the implementation summary: `IMPLEMENTATION_SUMMARY.md`
2. Review Convex logs: `npx convex logs`
3. Check browser console for frontend errors