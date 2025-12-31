# Migration to Next.js 16

This project has been migrated from Vite + React Router to Next.js 16 with App Router.

## Key Changes

### 1. **Project Structure**
- `src/` → Removed
- `app/` → Next.js App Router pages
- `components/` → Shared components (root level)
- `lib/` → Utilities and providers
- `hooks/` → Custom hooks
- `public/` → Static assets (unchanged)
- `convex/` → Backend (unchanged)

### 2. **Routing**
- **React Router** → **Next.js App Router**
- File-based routing with dynamic segments
- `/courses/[slug]` - Dynamic course pages
- `/courses/[slug]/lesson/[lessonId]` - Dynamic lesson pages
- `/labs/[labId]` - Dynamic lab pages
- `/admin/courses/[courseId]/lessons` - Nested admin routes

### 3. **Navigation**
- `<Link to="...">` → `<Link href="...">`
- `useNavigate()` → `useRouter()` from `next/navigation`
- `navigate()` → `router.push()`
- `useParams()` from `react-router-dom` → `useParams()` from `next/navigation`

### 4. **Client Components**
- All interactive components now have `"use client"` directive
- Server components used where possible for better performance

### 5. **Environment Variables**
- `VITE_CONVEX_URL` → `NEXT_PUBLIC_CONVEX_URL`
- Create `.env.local` file with your Convex URL

### 6. **Configuration Files**
- `vite.config.ts` → `next.config.js`
- Updated `tsconfig.json` for Next.js
- Added `.eslintrc.json` for Next.js ESLint
- Updated `components.json` for shadcn with App Router

### 7. **Scripts**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Running the Project

1. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your NEXT_PUBLIC_CONVEX_URL
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Features Retained

- ✅ All routes and pages migrated
- ✅ Authentication flow (localStorage-based)
- ✅ Convex integration
- ✅ shadcn/ui components
- ✅ Tailwind CSS styling
- ✅ Framer Motion animations
- ✅ TanStack Query for data fetching
- ✅ Admin panel
- ✅ Course management
- ✅ Lab system
- ✅ News section
- ✅ Community features

## Next.js Benefits

1. **File-based routing** - No need to manually configure routes
2. **Dynamic routes** - Built-in support for slugs and parameters
3. **Server Components** - Better performance by default
4. **Optimized images** - Automatic image optimization with `next/image`
5. **Built-in API routes** - Easy backend integration
6. **Better SEO** - Server-side rendering support
7. **Production-ready** - Optimized builds out of the box

## Notes

- SVG icons can be imported as React components (configured with @svgr/webpack)
- For external images with `next/image`, configure `remotePatterns` in `next.config.js`
- The old `src/` directory can be safely deleted
- Vite-specific files have been removed