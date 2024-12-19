'use server';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt, getSession } from '@/lib/session';

const protectedRoutes = ['/categories', '/tickets', '/users'];
const publicRoutes = [
	'/signin',
	'/signup',
	'/reset-password',
	'/change-password',
	'/',
];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some((route) =>
		path.startsWith(route),
	);
	const isPublicRoute = publicRoutes.some((route) =>
		route === '/' ? path === '/' : path.startsWith(route),
	);
	console.log('sssssssssssss', path, isProtectedRoute, isPublicRoute);

	const session = await getSession();
	const payload = await decrypt(session);

	if (isProtectedRoute && !payload?.userId) {
		return NextResponse.redirect(new URL('/signin', req.nextUrl));
	}

	if (isPublicRoute && payload?.userId && !path.startsWith('/tickets')) {
		return NextResponse.redirect(new URL('/tickets', req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
