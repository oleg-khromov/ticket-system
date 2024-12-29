'use server';
import { SignUpFormSchema } from '@/schemas';
import { getHashPassword } from '@/lib/bcrypt';
import { createSession } from '@/lib/session';
import { sendConfirmationEmail } from '@/utils/email';
import { redirect } from 'next/navigation';
import { createUser, getUserByEmail } from '@/queries';
import { routes } from '@/utils/constants';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionSignup(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, SignUpFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;
	const { password, confirmPassword, ...userWithoutPasswords } = data;
	const { email } = userWithoutPasswords;

	const existingUser = await getUserByEmail(email);
	if (existingUser) {
		return {
			errors: {
				email: 'This email already exist in the system.',
			},
			data: {
				...userWithoutPasswords,
			},
		};
	}

	const hashedPassword = await getHashPassword(password);
	const createdUser = await createUser({
		...userWithoutPasswords,
		password: hashedPassword,
	});
	if (!createdUser) {
		return {
			message: 'An error occurred while creating your account.',
		};
	}

	await createSession(createdUser.id);

	const sendEmail = await sendConfirmationEmail(createdUser.email);
	if (sendEmail.error)
		return {
			message:
				'An error occurred while sending email to reset password. But you can SIGN IN',
		};
	else redirect(routes.SIGNIN);
}
