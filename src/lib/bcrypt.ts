import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Hashes a plain text password using bcrypt.
 * @param plainPassword - The password to be hashed.
 * @returns The hashed password as a string.
 */
export async function getHashPassword(plainPassword: string): Promise<string> {
	const saltRounds = parseInt(process.env.BCRYPT_SALT || '10', 10); // Determines the cost of hashing
	const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
	return hashedPassword;
}

/**
 * Verifies a plain text password against a hashed password.
 * @param plainPassword - The plain text password to verify.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A boolean indicating whether the password matches.
 */
export async function verifyPassword(
	plainPassword: string,
	hashedPassword: string,
): Promise<boolean> {
	const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
	return isMatch;
}
