'use server';
import { SignInFormSchema, SignUpFormSchema } from '@/lib/validation';
import { getHashPassword, verifyPassword } from '@/lib/bcrypt';
import { createSession, deleteSession } from '@/lib/session';
import { sendConfirmationEmail } from '@/utils/email';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

interface IUser {
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	email?: string;
}

interface IUserWithPasswords extends IUser {
	password?: string;
	confirmPassword?: string;
}

export interface SignUpFormState extends IUser {
	errors?: Record<string, string | string[]>;
	message?: string;
}

export interface SignInFormState {
	errors?: Record<string, string | string[]>;
	email?: string;
}

export async function signup(
	state: SignUpFormState | undefined,
	formData: FormData,
): Promise<SignUpFormState | undefined> {
	const user = {
		firstName: formData.get('firstName') as string,
		lastName: formData.get('lastName') as string,
		phoneNumber: formData.get('phoneNumber') as string,
		email: formData.get('email') as string,
	};

	const userWithPasswords: IUserWithPasswords = {
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

	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			email: true,
		},
	});

	if (existingUser) {
		return {
			errors: {
				email: 'This email already exist in the system.',
			},
			...user,
		};
	}

	const hashedPassword = await getHashPassword(password);

	const createdUser = await prisma.user.create({
		data: {
			...user,
			password: hashedPassword,
		},
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

	redirect('/dashboard');
}

export async function signin(
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

	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
			email: true,
			password: true,
		},
	});

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

	redirect('/dashboard');
}

export async function logout() {
	await deleteSession();
	redirect('/');
}
