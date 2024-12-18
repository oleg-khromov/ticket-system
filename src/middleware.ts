'use server';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt, getSession } from '@/lib/session';

const protectedRoutes = ['/dashboard'];
const publicRoutes = [
	'/signin',
	'/signup',
	'/reset-password',
	'/change-password/*',
	'/',
];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	const session = await getSession();
	const payload = await decrypt(session);

	if (isProtectedRoute && !payload?.userId) {
		return NextResponse.redirect(new URL('/signin', req.nextUrl));
	}

	if (
		isPublicRoute &&
		payload?.userId &&
		!req.nextUrl.pathname.startsWith('/dashboard')
	) {
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
