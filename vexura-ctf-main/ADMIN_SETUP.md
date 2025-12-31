# Admin Dashboard Setup Guide

## Initial Setup

### 1. Make Your First Admin User

After registering your account, make yourself an admin:

```bash
npm run make-admin <your-email>
```

Example:
```bash
npm run make-admin admin@example.com
```

### 2. Access Admin Dashboard

1. Log in with your admin account
2. Navigate to `/admin`
3. You'll see the admin dashboard

## Admin Features

### Dashboard (`/admin`)
- Overview statistics
- Recent activity (solves, new users)
- Quick stats cards

### Challenge Management (`/admin/challenges`)
- **Create** new challenges
- **Edit** existing challenges
- **Delete** challenges (only if no solves)
- **Activate/Deactivate** challenges
- **View flags** (admin only)
- Search and filter challenges

### User Management (`/admin/users`)
- View all users
- Search users
- **Change user roles** (user ↔ admin)
- **Ban/Unban users**
- **Reset user passwords**
- View user solve history

### Scoreboard Control (`/admin/scoreboard`)
- **Recalculate scores** for all users
- **Remove duplicate solves**
- **Soft reset** scoreboard (clears all solves)

## Security Features

✅ **Role-based access control** - Only admins can access `/admin` routes
✅ **JWT verification** - Every admin action requires valid JWT
✅ **Server-side validation** - All inputs validated with Zod
✅ **Flag protection** - Flags never sent to non-admin clients
✅ **IDOR protection** - Users can only access their own data
✅ **Rate limiting** - Flag submissions are rate-limited
✅ **Banned user check** - Banned users cannot log in

## API Routes

All admin routes are prefixed with `/api/admin/`:

- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/challenges` - List all challenges (with flags)
- `POST /api/admin/challenges` - Create challenge
- `GET /api/admin/challenges/[id]` - Get challenge (with flag)
- `PUT /api/admin/challenges/[id]` - Update challenge
- `DELETE /api/admin/challenges/[id]` - Delete challenge
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/[id]` - Get user details
- `PUT /api/admin/users/[id]` - Update user (role, ban)
- `POST /api/admin/users/[id]` - Reset user password
- `POST /api/admin/scoreboard` - Scoreboard operations

## Challenge Categories

- `web` - Web security challenges
- `crypto` - Cryptography challenges
- `forensics` - Digital forensics
- `pwn` - Binary exploitation
- `osint` - Open source intelligence
- `rev` - Reverse engineering
- `misc` - Miscellaneous

## Challenge Difficulties

- `easy` - Beginner level (50-100 points)
- `medium` - Intermediate level (150-250 points)
- `hard` - Advanced level (300+ points)

## Important Notes

⚠️ **Self-Protection**: Admins cannot ban themselves or remove their own admin role

⚠️ **Challenge Deletion**: Challenges with existing solves cannot be deleted (deactivate instead)

⚠️ **Scoreboard Reset**: Soft reset is **destructive** and cannot be undone

⚠️ **Flag Visibility**: Only admins can see flags in the admin panel

## Troubleshooting

### Can't access `/admin`
- Make sure you're logged in
- Verify your account has `role: 'admin'` in the database
- Check browser console for errors

### "Unauthorized - Admin access required"
- Your JWT token might be expired - try logging out and back in
- Verify your user role in the database

### Challenges not showing to users
- Check that `isActive: true` in the challenge
- Verify the challenge category/difficulty matches the filter

### Users can't solve challenges
- Check if user is banned (`isBanned: false`)
- Verify challenge is active (`isActive: true`)
- Check rate limiting settings

