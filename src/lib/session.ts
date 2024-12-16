import 'server-only';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

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

export function getExpiresAt() {
	return new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
}

export async function createSession(userId: number) {
	const expiresAt = getExpiresAt();
	const session = await encrypt({ userId, expiresAt });
	await setCookie(session, expiresAt);
}

export async function updateSession() {
	const session = (await cookies()).get('session')?.value || '';
	const payload = await decrypt(session);

	if (!session || !payload) {
		return null;
	}

	const expiresAt = getExpiresAt();
	await setCookie(session, expiresAt);
}
