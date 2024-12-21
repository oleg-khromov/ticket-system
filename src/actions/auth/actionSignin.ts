'use server';
import { SignInFormSchema } from '@/schemas';
import { verifyPassword } from '@/lib/bcrypt';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { getUserWithPasswordByEmail } from '@/queries';

export interface SignInFormState {
	errors?: Record<string, string | string[]>;
	email?: string;
}

export async function actionSignin(
	state: SignInFormState | undefined,
	formData: FormData,
): Promise<SignInFormState | undefined> {
	const validatedFields = SignInFormSchema.safeParse({
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			email: formData.get('email') as string,
		};
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserWithPasswordByEmail(email);

	if (!existingUser) {
		return {
			errors: {
				email: 'Invalid credentials.',
			},
			email,
		};
	}

	const matchedPassword = await verifyPassword(password, existingUser.password);

	if (!matchedPassword) {
		return {
			errors: {
				password: 'Invalid credentials.',
			},
			email,
		};
	}

	await createSession(existingUser.id);

	redirect('/tickets');
}
