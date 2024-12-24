'use server';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt, getSession } from '@/lib/session';
import { routes } from '@/utils/constants';

const protectedRoutePatterns: RegExp[] = [
	/^\/categories$/,
	/^\/categories\/(new|\d+)$/,
	/^\/categories\/\d+\/edit$/,
	/^\/tickets$/,
	/^\/tickets\/(new|\d+)$/,
	/^\/tickets\/\d+\/edit$/,
	/^\/users$/,
	/^\/users\/(\d+)$/,
	/^\/users\/\d+\/edit$/,
];

const publicRoutePatterns: RegExp[] = [
	/^\/signin$/,
	/^\/signup$/,
	/^\/reset-password$/,
	/^\/change-password(\/.*)?$/,
	/^\/$/,
];

const isRouteMatching = (patterns: RegExp[], path: string): boolean =>
	patterns.some((pattern) => pattern.test(path));

export default async function middleware(
	req: NextRequest,
): Promise<NextResponse> {
	const path: string = req.nextUrl.pathname;

	const isProtectedRoute: boolean = isRouteMatching(
		protectedRoutePatterns,
		path,
	);
	const isPublicRoute: boolean = isRouteMatching(publicRoutePatterns, path);

	const session = await getSession();
	const user = await decrypt(session);

	if (!isProtectedRoute && !isPublicRoute) {
		return new NextResponse('Not Found', { status: 404 });
	}

	if (isProtectedRoute && !user?.userId) {
		return NextResponse.redirect(new URL(routes.SIGNIN, req.nextUrl));
	}

	if (isPublicRoute && user?.userId && path !== routes.HOME) {
		return NextResponse.redirect(new URL(routes.TICKETS, req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
