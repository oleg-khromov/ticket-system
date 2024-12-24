'use server';
import { ResetPasswordFormSchema } from '@/schemas';
import { createToken } from '@/lib/token';
import { sendResetPasswordEmail } from '@/utils/email';
import { getUserByEmail, createPasswordResetToken } from '@/queries';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionResetPassword(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, ResetPasswordFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;
	const { email } = data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser) {
		return {
			errors: {
				email: "This email doesn't exist in the system.",
			},
			data,
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
			data: {
				token: createdToken.token,
			},
			message: 'An error occurred while sending email to reset password.',
		};
	else
		return {
			message: 'The email to change password was sent successfully.',
			success: true,
		};
}
