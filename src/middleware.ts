import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.PAYLOAD_SECRET!;
const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export async function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('payload-token')?.value;
  
  // Check if the token exists
  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to dashboard and exams routes if token exists
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/exams')) {
    return NextResponse.next();
  }

  // Allow other routes to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/exams/:path*'],
};
