import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Compile protected paths regex once (outside function for performance)
// Matches: /home, /debates, /profile, /journal, /leaderboard, /settings, and their sub-routes
const PROTECTED_PATHS_REGEX = /^\/(home|debates|profile|journal|leaderboard|settings|discuss)(?:\/|$)/

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Quick check: use regex for O(1) path matching instead of O(n) array iteration
  const isProtectedPath = PROTECTED_PATHS_REGEX.test(pathname)

  // Skip auth check for public routes - reduces unnecessary auth calls
  if (!isProtectedPath) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }

  // Only create Supabase client and check auth for protected routes
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // If accessing protected route without auth, redirect to login
  if (!user) {
    const redirectUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     *
     * Optimized to reduce middleware executions on static/non-auth routes
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|robots.txt|sitemap.xml).*)',
  ],
}
