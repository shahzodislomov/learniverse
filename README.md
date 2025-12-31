# Learniverse Hub - Cybersecurity Learning Platform

A comprehensive cybersecurity learning platform built with **Next.js 16**, **React**, **shadcn/ui**, and **Convex**.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Backend**: Convex
- **State Management**: TanStack Query
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
learniverse-hub/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── courses/             # Courses routes
│   │   ├── [slug]/          # Dynamic course detail
│   │   └── [slug]/lesson/[lessonId]/  # Dynamic lesson
│   ├── labs/                # Labs routes
│   │   └── [labId]/         # Dynamic lab detail
│   ├── news/                # News page
│   ├── community/           # Community page
│   ├── dashboard/           # User dashboard
│   ├── profile/             # User profile
│   ├── auth/                # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   └── admin/               # Admin panel
├── components/              # Reusable components
│   ├── layout/             # Layout components
│   ├── ui/                 # shadcn/ui components
│   ├── course/             # Course-specific components
│   ├── lab/                # Lab-specific components
│   └── news/               # News-specific components
├── lib/                    # Utilities and providers
│   ├── utils.ts           # Utility functions
│   ├── convex.tsx         # Convex provider
│   └── query-provider.tsx # TanStack Query provider
├── hooks/                  # Custom React hooks
├── convex/                 # Convex backend functions
└── public/                 # Static assets

```

## 🎯 Features

- 📚 **Course Management** - Browse and enroll in cybersecurity courses
- 🧪 **Interactive Labs** - Hands-on practical exercises
- 📰 **News & Updates** - Latest cybersecurity news
- 👥 **Community** - Connect with other learners
- 📊 **Dashboard** - Track your progress
- 🔐 **Authentication** - Secure login and registration
- ⚙️ **Admin Panel** - Manage courses, lessons, and news

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learniverse-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Convex URL:
   ```
   NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling

The project uses Tailwind CSS with custom design tokens defined in `app/globals.css`:
- Custom color scheme (dark theme)
- Typography (Inter & JetBrains Mono fonts)
- Custom gradients and animations

### Components

shadcn/ui components are configured in `components.json` and can be customized:
```bash
npx shadcn@latest add [component-name]
```

## 🔗 Dynamic Routes

Next.js App Router provides file-based routing with dynamic segments:

- `/courses/[slug]` - Individual course pages
- `/courses/[slug]/lesson/[lessonId]` - Lesson player
- `/labs/[labId]` - Lab details
- `/admin/courses/[courseId]/lessons` - Admin lesson management

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

```bash
npm run build
```

Then deploy to Vercel or your preferred hosting platform.

### Other Platforms

- **Netlify**: Configure build command as `npm run build`
- **Railway**: Add Next.js app and deploy
- **AWS/Google Cloud**: Use Docker or serverless deployment

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Convex Documentation](https://docs.convex.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js 16