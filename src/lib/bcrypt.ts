'use server';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export async function getHashPassword(plainPassword: string): Promise<string> {
	const saltRounds = parseInt(process.env.BCRYPT_SALT || '10', 10);
	const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
	return hashedPassword;
}

export async function verifyPassword(
	plainPassword: string,
	hashedPassword: string,
): Promise<boolean> {
	const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
	return isMatch;
}
