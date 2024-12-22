'use server';
import { ChangePasswordFormSchema } from '@/schemas';
import { getHashPassword } from '@/lib/bcrypt';
import { verifyToken } from '@/lib/token';
import {
	updateUserPassword,
	getPasswordResetToken,
	deletePasswordResetToken,
} from '@/queries';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionChangePassword(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, ChangePasswordFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;
	const { password } = data;

	const token = formData.get('token') as string;

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
		message: 'Password has changed successfully.',
		success: true,
	};
}
