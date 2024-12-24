'use server';
import { jwtVerify, SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';

const secretKey = process.env.PASSWORD_RESET_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: {
	userId: number;
	tokenId: string;
	expiresAt: Date;
}) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(payload.expiresAt)
		.sign(encodedKey);
}

export async function decrypt(token: string) {
	try {
		const { payload } = await jwtVerify(token, encodedKey, {
			algorithms: ['HS256'],
		});
		return payload;
	} catch (error) {
		console.log('Failed to verify token');
	}
}

export async function getExpiresAt() {
	return new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
}

export async function createToken(userId: number) {
	const tokenId = uuidv4();
	const expiresAt = await getExpiresAt();
	const token = await encrypt({ userId, tokenId, expiresAt });
	return { token, expiresAt };
}

export async function verifyToken(token: string) {
	const payload = await decrypt(token);
	return payload || {};
}
