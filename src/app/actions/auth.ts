'use server';
import { SignupFormSchema } from '@/lib/validation';
import { getHashPassword } from '@/lib/bcrypt';
import { createSession } from '@/lib/session';
import prisma from '@/lib/prisma';
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

export interface SignupFormState extends IUser {
	errors?: Record<string, string | string[]>;
	message?: string;
}

export async function signup(
	state: SignupFormState | undefined,
	formData: FormData,
): Promise<SignupFormState | undefined> {
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

	const validatedFields = SignupFormSchema.safeParse(userWithPasswords);

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

	await createSession(createdUser.id);

	redirect('/');
}
