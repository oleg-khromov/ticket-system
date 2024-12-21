'use server';
import { ResetPasswordFormSchema } from '@/schemas';
import { createToken } from '@/lib/token';
import { sendResetPasswordEmail } from '@/utils/email';
import { getUserByEmail, createPasswordResetToken } from '@/queries';

export interface ResetPasswordFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	email?: string;
	success?: boolean;
}

export async function actionResetPassword(
	state: ResetPasswordFormState | undefined,
	formData: FormData,
): Promise<ResetPasswordFormState | undefined> {
	const validatedFields = ResetPasswordFormSchema.safeParse({
		email: formData.get('email') as string,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			email: formData.get('email') as string,
		};
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return {
			errors: {
				email: "This email doesn't exist in the system.",
			},
			email,
		};
	}

	const { token, expiresAt } = await createToken(existingUser.id);

	const createdToken = await createPasswordResetToken({
		token,
		userId: existingUser.id,
		expiresAt,
	});

	if (!createdToken) {
		return {
			message: 'An error occurred while creating password reset token.',
		};
	}

	const sendEmail = await sendResetPasswordEmail(existingUser.email, token);

	if (sendEmail.error)
		return {
			message: 'An error occurred while sending email to reset password.',
		};
	else
		return {
			success: true,
		};
}
