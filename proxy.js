import { NextResponse } from 'next/server';

const ADMIN_TOKEN = 'adm_sess_lk6269121509_secure';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_auth')?.value;
  const isAuthenticated = token === ADMIN_TOKEN;

  if (pathname === '/admin' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (pathname.startsWith('/admin/') && !isAuthenticated) {
    const loginUrl = new URL('/admin', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
