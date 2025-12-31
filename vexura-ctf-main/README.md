# CTFVexura - Capture The Flag Platform

A modern, hacker-themed CTF (Capture The Flag) platform built with Next.js, featuring a dark UI with neon green/cyan accents, glassmorphism effects, and smooth animations.

## 🚀 Features

- **Authentication System**: User registration, login, and JWT-based session management
- **Challenges System**: 
  - Multiple categories (Web, Crypto, Forensics, OSINT, Reverse, Misc)
  - Difficulty levels (Easy, Medium, Hard)
  - Points-based scoring
  - Solved/Unsolved indicators
- **Challenge Modal**: Interactive modal with flag submission and animations
- **Scoreboard**: Real-time leaderboard with rankings
- **User Profile**: View solved challenges, points, and progress
- **Rate Limiting**: Protection against brute force attacks
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ctfvexura
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ctfvexura
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   RATE_LIMIT_WINDOW_MS=60000
   RATE_LIMIT_MAX_REQUESTS=10
   ```

4. **Set up MongoDB**
   - Make sure MongoDB is running on your system
   - Update `MONGODB_URI` in `.env.local` if needed

5. **Seed the database with sample challenges**
   ```bash
   npm run seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ctfvexura/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── challenges/   # Challenge endpoints
│   │   ├── scoreboard/   # Scoreboard endpoint
│   │   └── user/         # User profile endpoint
│   ├── challenges/       # Challenges page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── profile/          # User profile page
│   ├── scoreboard/       # Scoreboard page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── ChallengeCard.tsx # Challenge card component
│   ├── ChallengeModal.tsx # Challenge modal
│   └── LoadingSkeleton.tsx # Loading skeleton
├── lib/                  # Utility functions
│   ├── db.ts            # MongoDB connection
│   ├── auth.ts          # JWT authentication
│   └── rateLimit.ts     # Rate limiting
├── models/               # Mongoose models
│   ├── User.ts          # User model
│   ├── Challenge.ts     # Challenge model
│   └── Submission.ts    # Submission model
├── scripts/              # Utility scripts
│   └── seed.js          # Database seed script
├── middleware.ts         # Next.js middleware
└── package.json         # Dependencies
```

## 🎨 Design Features

- **Dark Hacker Theme**: Black/dark gray backgrounds with neon accents
- **Glassmorphism**: Frosted glass effects on cards and modals
- **Glowing Effects**: Neon green and cyan glow on borders and text
- **Monospace Fonts**: Terminal-style typography
- **Smooth Animations**: Page transitions, hover effects, and modal animations
- **Responsive Layout**: Mobile-first design

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Rate limiting on flag submissions
- Server-side flag validation
- No flag exposure in frontend

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Challenges
- `GET /api/challenges` - Get all challenges
- `GET /api/challenges/[id]` - Get a specific challenge
- `POST /api/challenges/[id]/submit` - Submit a flag

### Scoreboard
- `GET /api/scoreboard` - Get scoreboard data

### User
- `GET /api/user/profile` - Get user profile

## 🎯 Usage

1. **Register/Login**: Create an account or login
2. **Browse Challenges**: View all available challenges on the challenges page
3. **Filter Challenges**: Use category and difficulty filters
4. **Solve Challenges**: Click on a challenge to open the modal and submit flags
5. **View Scoreboard**: Check your ranking on the scoreboard
6. **View Profile**: See your solved challenges and progress

## 🧪 Adding Challenges

Use the seed script to add challenges:

```bash
npm run seed
```

Or manually add challenges by editing `scripts/seed.js` and running it again.

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Environment Variables**: Make sure to set all environment variables in your production environment

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the repository.

---

**Happy Hacking! 🎉**

