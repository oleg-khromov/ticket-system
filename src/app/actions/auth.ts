'use server';

import { registerFormSchema } from '@/lib/validation';
import { getHashPassword } from '@/lib/bcrypt';
import { createSession } from '@/lib/sessions';
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

export interface IRegisterFormState extends IUser {
	errors?: Record<string, string[]>;
}

export async function register(
	currentState: IRegisterFormState,
	formData: FormData,
) {
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

	const validatedFields = registerFormSchema.safeParse(userWithPasswords);

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

	await createSession(createdUser.id);

	redirect('/');
}
