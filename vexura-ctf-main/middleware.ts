import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

const protectedRoutes = ['/challenges', '/profile']
const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  const isProtectedRoute = protectedRoutes.some((r) =>
    pathname.startsWith(r)
  )
  const isAuthRoute = authRoutes.some((r) =>
    pathname.startsWith(r)
  )

  // 🔒 oddiy protected route’lar
  if (isProtectedRoute && !token) {
    return NextResponse.next() // ❗ redirect yo‘q
  }

  // 🔁 login/register
  if (isAuthRoute && token) {
    const user = await verifyToken(token)
    if (user) {
      return NextResponse.next()
    }
  }

  // ❗ /admin bu yerda umuman tekshirilmaydi
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
