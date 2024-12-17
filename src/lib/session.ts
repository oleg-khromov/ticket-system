'use server';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { userId: number; expiresAt: Date }) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1d')
		.sign(encodedKey);
}

export async function decrypt(session: string) {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		});
		return payload;
	} catch (error) {
		console.log('Failed to verify session');
		// return null;
	}
}

export async function setCookie(session: string, expiresAt: Date) {
	const cookieStore = await cookies();

	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
}

export async function getExpiresAt() {
	return new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
}

export async function createSession(userId: number) {
	const expiresAt = await getExpiresAt();
	const session = await encrypt({ userId, expiresAt });
	await setCookie(session, expiresAt);
}

export async function updateSession() {
	const session = await getSession();

	if (!session) {
		return null;
	}

	const payload = await decrypt(session);

	if (!payload) {
		return null;
	}

	const expiresAt = await getExpiresAt();
	await setCookie(session, expiresAt);
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete('session');
}

export async function getSession() {
	const cookieStore = await cookies();
	const session = cookieStore.get('session')?.value || '';
	return session;
}

export async function verifySession() {
	const session = await getSession();
	const payload = await decrypt(session);

	if (!payload?.userId) {
		redirect('/signin');
	}

	return { userId: payload?.userId };
}
