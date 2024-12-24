'use server';
import { SignInFormSchema } from '@/schemas';
import { verifyPassword } from '@/lib/bcrypt';
import { createSession } from '@/lib/session';
import { getUserWithPasswordByEmail } from '@/queries';
import { IActionFormState } from '@/types/interfaces';
import { validateForm } from '@/utils/utils';

export async function actionSignin(
	state: IActionFormState | undefined,
	formData: FormData,
): Promise<IActionFormState | undefined> {
	const validatedForm = validateForm(formData, SignInFormSchema);
	if (!validatedForm.success) return validatedForm;

	const { data } = validatedForm;
	const { email, password } = data;

	const existingUser = await getUserWithPasswordByEmail(email);
	if (!existingUser) {
		return {
			errors: {
				email: 'Invalid credentials.',
			},
			data: {
				email,
			},
		};
	}

	const matchedPassword = await verifyPassword(password, existingUser.password);
	if (!matchedPassword) {
		return {
			errors: {
				password: 'Invalid credentials.',
			},
			data: { email },
		};
	}

	await createSession(existingUser.id);

	return {
		data: {
			id: existingUser?.id.toString(),
			role: existingUser.role,
		},
		success: true,
	};
}
