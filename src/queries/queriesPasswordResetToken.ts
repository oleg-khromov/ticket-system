import prisma from '@/lib/db';
import { IPasswordResetToken } from '@/types/interfaces';

export async function getPasswordResetToken(
	userId: number,
	token: string,
): Promise<IPasswordResetToken | null> {
	return await prisma.passwordResetToken.findUnique({
		where: {
			userId,
			token,
		},
	});
}

export async function createPasswordResetToken(data: IPasswordResetToken) {
	return await prisma.passwordResetToken.create({
		data,
	});
}

export async function deletePasswordResetToken(userId: number, token: string) {
	await prisma.passwordResetToken.delete({
		where: { userId, token },
	});
}
