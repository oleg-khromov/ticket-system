'use server';
import { ChangePasswordFormSchema } from '@/schemas';
import { getHashPassword } from '@/lib/bcrypt';
import { verifyToken } from '@/lib/token';
import {
	updateUserPassword,
	getPasswordResetToken,
	deletePasswordResetToken,
} from '@/queries';

export interface ChangePasswordFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	success?: boolean;
}

export async function actionChangePassword(
	state: ChangePasswordFormState | undefined,
	formData: FormData,
): Promise<ChangePasswordFormState | undefined> {
	const validatedFields = ChangePasswordFormSchema.safeParse({
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirmPassword') as string,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const token = formData.get('token') as string;
	const { password } = validatedFields.data;

	if (!token)
		return {
			message: 'Invalid token.',
		};

	const payload = await verifyToken(token as string);
	const { userId, expiresAt } = payload as {
		userId: number;
		expiresAt: string;
	};

	if (!userId)
		return {
			message: 'Invalid token.',
		};

	if (new Date(expiresAt) < new Date())
		return {
			message: 'Token has expired.',
		};

	const existingToken = await getPasswordResetToken(userId, token);

	if (!existingToken || new Date(existingToken.expiresAt) < new Date()) {
		return {
			message: 'Invalid or expired token.',
		};
	}

	const hashedPassword = await getHashPassword(password);

	await updateUserPassword(userId, hashedPassword);
	await deletePasswordResetToken(userId, token);

	return {
		success: true,
	};
}
