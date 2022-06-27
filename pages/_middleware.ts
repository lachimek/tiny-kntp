// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl.clone();
  if (
    pathname.startsWith('/api/') ||
    pathname === '/' ||
    pathname === '/favicon.ico'
  ) {
    return;
  }
  const data = await fetch(
    `${req.nextUrl.origin}/api/get-redirect-url/${pathname.split('/')[1]}`
  );
  const redirectUrl = await data.json();
  if (data.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
  return NextResponse.redirect(redirectUrl.redirectUrl);
}
