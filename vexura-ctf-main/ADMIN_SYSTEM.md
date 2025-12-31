# Admin System Implementation Guide

## ✅ Implementation Status

All features have been implemented and tested. The admin system is fully functional with proper security.

---

## 🔐 1. Authentication & Roles

### User Roles
- **`user`** (default) - Regular CTF participant
- **`admin`** - Platform administrator with full access

### Role Storage
- Role is stored in MongoDB `User` model
- Role is included in JWT token payload
- Role is verified on both frontend and backend

### Files Modified:
- `models/User.ts` - Added `role` field (enum: 'user' | 'admin')
- `lib/auth.ts` - JWT includes role in TokenPayload
- `app/api/auth/login/route.ts` - Includes role in JWT on login
- `app/api/auth/register/route.ts` - Sets default role 'user', includes in JWT

---

## 🛡️ 2. Admin Route Protection

### Frontend Protection
- **Middleware** (`middleware.ts`):
  - Checks if route starts with `/admin`
  - Verifies JWT token exists
  - Queries database to verify user role is 'admin'
  - Redirects to `/403` if not admin
  - Redirects to `/login` if not authenticated

- **Admin Layout** (`app/admin/layout.tsx`):
  - Client-side check via API call
  - Redirects non-admin users to `/403`
  - Shows loading state during check

### Backend Protection
- **All Admin API Routes**:
  - Use `requireAdmin()` from `lib/admin.ts`
  - Returns 403 if user is not admin
  - Checks both JWT and database role
  - Verifies user is not banned

### Files:
- `middleware.ts` - Server-side route protection
- `lib/admin.ts` - Admin verification utility
- `app/admin/layout.tsx` - Client-side protection
- `app/403/page.tsx` - Forbidden page

---

## 👑 3. Admin Panel Features

### Dashboard (`/admin`)
- **Statistics Cards**:
  - Total users
  - Total challenges
  - Active challenges
  - Total solves
- **Recent Activity**:
  - Latest solves
  - New users

### Challenge Management (`/admin/challenges`)
- **Create Challenge**:
  - Title, description (markdown supported)
  - Category: web, crypto, pwn, misc, forensics, osint, rev
  - Difficulty: easy, medium, hard
  - Points
  - Flag (stored securely, never exposed to non-admin)
  - Active/Inactive toggle

- **Edit Challenge**:
  - Update all fields
  - Cannot delete if challenge has solves

- **Delete Challenge**:
  - Only if no solves exist
  - Otherwise, deactivate

- **View Flags**:
  - Admin can see all flags
  - Toggle visibility with eye icon

### User Management (`/admin/users`)
- **View All Users**:
  - Search by username/email
  - Pagination support
  - See role, points, solves, ban status

- **Change User Roles**:
  - Toggle between 'user' and 'admin'
  - Cannot remove own admin role
  - Cannot ban yourself

- **Reset Passwords**:
  - Admin can reset any user's password
  - New password must be at least 6 characters
  - Password is hashed with bcrypt

- **Ban/Unban Users**:
  - Soft ban (isBanned flag)
  - Banned users cannot log in
  - Cannot ban yourself

### Scoreboard Control (`/admin/scoreboard`)
- **Recalculate Scores**:
  - Recalculate all user points
  - Based on solved challenges

- **Remove Duplicates**:
  - Clean up duplicate submissions
  - Keep first solve only

- **Soft Reset**:
  - Clear all solves and scores
  - Keep users and challenges
  - Uses MongoDB transactions

---

## 🧩 4. Challenge System

### Unlimited Challenges
- Challenges never expire
- No time limits
- `isActive` flag controls visibility
- Scoreboard updates dynamically

### Solvers Visibility
- **API Endpoint**: `GET /api/challenges/[id]/solvers`
- Shows all users who solved challenge
- Displays:
  - Username (clickable → profile)
  - Solve order (1st, 2nd, 3rd...)
  - Solve time
  - First Blood badge

### First Blood System
- **Automatic Detection**:
  - First solver gets `firstBlood: true`
  - Uses MongoDB transactions to prevent race conditions
  - Only ONE first blood per challenge

- **Bonus Points**:
  - 10% bonus points automatically
  - Example: 100 points → 110 points for first blood

- **Visual Indicators**:
  - Red/neon badge
  - Pulsing animation
  - Special message on solve

### Duplicate Prevention
- Users cannot solve same challenge twice
- Checked before flag submission
- Returns error if already solved

---

## 👤 5. User Profiles

### Public Profiles (`/users/[username]`)
- **Accessible to Everyone** (read-only)
- **Shows**:
  - Username and role badge
  - Global rank
  - Total points
  - Solved challenges count
  - First blood count
  - Top 10 badge (if applicable)

- **Solved Challenges List**:
  - Challenge name
  - Category
  - Difficulty
  - Points earned
  - Solve order
  - First Blood badge
  - Solve date

### Private Profile (`/profile`)
- User's own profile
- Same information as public profile
- Edit capabilities (future feature)

---

## 🐛 6. Navbar Bug Fixes

### Issues Fixed:
1. ✅ Login/Register buttons now hide after authentication
2. ✅ Username and Profile link appear when logged in
3. ✅ Admin link only appears for admin users
4. ✅ Logout button appears when authenticated
5. ✅ Real-time updates on login/logout (no page refresh)

### Implementation:
- Global `auth-changed` event
- Navbar listens for events
- Auto-refreshes auth state
- Mobile menu also updated

### Files:
- `components/Navbar.tsx` - Fixed auth state detection
- `app/login/page.tsx` - Dispatches auth-changed event
- `app/register/page.tsx` - Dispatches auth-changed event
- `lib/authContext.tsx` - Global auth context (optional)

---

## 📜 7. Rules Page

### Route: `/rules`

### Content:
- **Platform Rules**:
  - ❌ No DDoS or traffic flooding
  - ❌ No brute forcing platform services
  - ❌ No platform exploitation
  - ❌ No flag sharing
  - ❌ No cheating or automation

- **Contact Information**:
  - Telegram: @v3xura
  - Email: abdullohkurbonov2008@gmail.com

- **Additional Notes**:
  - Challenges are unlimited
  - Admin decisions are final

### Design:
- Hacker/terminal-style UI
- Neon green/cyan accents
- Smooth animations

---

## 🔒 Security Implementation

### Backend Security
1. **JWT Verification**: Every admin API route verifies JWT
2. **Role Check**: Database query to verify admin role
3. **Banned User Check**: Banned users cannot access
4. **Input Validation**: Zod schemas for all inputs
5. **Transactions**: MongoDB transactions for critical operations
6. **Rate Limiting**: Prevents brute force attacks

### Frontend Security
1. **Middleware Protection**: Server-side route protection
2. **Client-Side Check**: Admin layout verifies access
3. **Flag Protection**: Flags never sent to non-admin clients
4. **IDOR Prevention**: Users can only access their own data

### Files:
- `lib/admin.ts` - Admin verification
- `lib/validations.ts` - Zod schemas
- `middleware.ts` - Route protection
- All admin API routes - Protected with `requireAdmin()`

---

## 📁 File Structure

```
app/
├── admin/                    # Admin pages
│   ├── layout.tsx           # Admin layout with protection
│   ├── page.tsx             # Admin dashboard
│   ├── challenges/          # Challenge management
│   ├── users/               # User management
│   └── scoreboard/          # Scoreboard control
├── api/
│   ├── admin/               # Admin API routes (all protected)
│   │   ├── dashboard/
│   │   ├── challenges/
│   │   ├── users/
│   │   └── scoreboard/
│   └── auth/                # Authentication
├── users/[username]/        # Public user profiles
├── rules/                   # Rules page
└── 403/                     # Forbidden page

components/
├── admin/                   # Admin components
│   └── ChallengeModal.tsx
├── Navbar.tsx               # Fixed auth state
└── ChallengeModal.tsx       # Shows solvers

lib/
├── admin.ts                 # Admin utilities
├── auth.ts                  # Auth utilities
├── authContext.tsx          # Auth context (optional)
└── validations.ts           # Zod schemas

models/
├── User.ts                  # Role, isBanned fields
├── Challenge.ts             # isActive field
└── Submission.ts            # solveOrder, firstBlood, solvedAt
```

---

## 🚀 Quick Start

### 1. Make Yourself Admin
```bash
npm run make-admin your-email@example.com
```

### 2. Access Admin Panel
1. Log in with admin account
2. Navigate to `/admin`
3. You'll see the admin dashboard

### 3. Test Features
- Create a challenge
- View users
- Check solvers list
- Test first blood system

---

## ✅ Verification Checklist

- [x] Navbar shows/hides buttons correctly
- [x] Admin link only appears for admins
- [x] `/admin` routes protected (middleware + API)
- [x] Non-admin users redirected to `/403`
- [x] JWT includes role
- [x] Database role check in middleware
- [x] All admin API routes protected
- [x] Challenge CRUD works
- [x] User management works
- [x] First blood system works
- [x] Solvers list displays
- [x] Public profiles work
- [x] Rules page exists
- [x] Challenges unlimited

---

## 🔧 Troubleshooting

### Admin link not showing?
1. Check user role in database: `db.users.findOne({email: "your@email.com"})`
2. Verify JWT includes role
3. Check browser console for errors
4. Try logging out and back in

### Cannot access `/admin`?
1. Verify you're logged in
2. Check role is 'admin' in database
3. Check if user is banned
4. Verify JWT token is valid

### Navbar not updating?
1. Check if `auth-changed` event is dispatched
2. Verify `/api/user/profile` returns role
3. Check browser console for errors
4. Try hard refresh (Ctrl+Shift+R)

---

## 📝 API Endpoints Summary

### Admin Endpoints (All Protected)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/challenges` - List challenges (with flags)
- `POST /api/admin/challenges` - Create challenge
- `GET /api/admin/challenges/[id]` - Get challenge (with flag)
- `PUT /api/admin/challenges/[id]` - Update challenge
- `DELETE /api/admin/challenges/[id]` - Delete challenge
- `GET /api/admin/users` - List users
- `GET /api/admin/users/[id]` - Get user details
- `PUT /api/admin/users/[id]` - Update user (role, ban)
- `POST /api/admin/users/[id]` - Reset password
- `POST /api/admin/scoreboard` - Scoreboard operations

### Public Endpoints
- `GET /api/challenges/[id]/solvers` - Get challenge solvers
- `GET /api/users/[username]` - Get public profile

---

## 🎯 Key Features

1. **Role-Based Access**: Secure admin-only access
2. **Real-Time Navbar**: Updates instantly on auth changes
3. **First Blood System**: Automatic detection with bonus points
4. **Solvers Visibility**: See who solved what, when
5. **Public Profiles**: Share achievements
6. **Unlimited Challenges**: No time limits
7. **Secure Admin Panel**: Full CRUD with proper security

---

## 🔐 Security Best Practices

- ✅ JWT tokens include role
- ✅ Database verification for admin access
- ✅ Server-side validation on all inputs
- ✅ MongoDB transactions for critical operations
- ✅ Rate limiting on submissions
- ✅ Banned user checks
- ✅ Self-protection (can't ban/remove own admin)
- ✅ Flags never exposed to non-admin clients

---

The admin system is **production-ready** and **fully secure**! 🚀

