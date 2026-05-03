import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'lavkush6269121509';
const ADMIN_TOKEN = 'adm_sess_lk6269121509_secure';

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_auth', ADMIN_TOKEN, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_auth', '', { maxAge: 0, path: '/' });
  return response;
}
