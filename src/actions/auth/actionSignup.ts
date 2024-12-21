'use server';
import { SignUpFormSchema } from '@/schemas';
import { getHashPassword } from '@/lib/bcrypt';
import { createSession } from '@/lib/session';
import { sendConfirmationEmail } from '@/utils/email';
import { redirect } from 'next/navigation';
import { createUser, getUserByEmail } from '@/queries';

export interface SignUpFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

export async function actionSignup(
	state: SignUpFormState | undefined,
	formData: FormData,
): Promise<SignUpFormState | undefined> {
	const user = {
		firstName: formData.get('firstName') as string,
		lastName: formData.get('lastName') as string,
		phoneNumber: formData.get('phoneNumber') as string,
		email: formData.get('email') as string,
	};

	const userWithPasswords = {
		...user,
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirmPassword') as string,
	};

	const validatedFields = SignUpFormSchema.safeParse(userWithPasswords);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...user,
		};
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return {
			errors: {
				email: 'This email already exist in the system.',
			},
			...user,
		};
	}

	const hashedPassword = await getHashPassword(password);

	const createdUser = await createUser({
		...user,
		password: hashedPassword,
	});

	if (!createdUser) {
		return {
			message: 'An error occurred while creating your account.',
		};
	}

	await sendConfirmationEmail(createdUser.email);
	// const { error } = await sendConfirmationEmail(createdUser.email);
	// if (error) return { message: 'Failed to send confirmation email' };

	await createSession(createdUser.id);

	redirect('/signin');
}
