'use server';
import prisma from '@/lib/db';
import { UpdateUserFormSchema } from '@/lib/validation';

export async function getUsers() {
	return await prisma.user.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			role: true,
			phoneNumber: true,
		},
		orderBy: [
			{
				firstName: 'asc',
			},
			{
				lastName: 'asc',
			},
		],
	});
}

export async function getUser(id: number) {
	return await prisma.user.findUnique({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			role: true,
			phoneNumber: true,
		},
		where: {
			id,
		},
	});
}

type Role = 'ADMIN' | 'USER';
// enum Role {
// 	ADMIN = 'ADMIN',
// 	USER = 'USER',
// }

export interface AddUpdateUserFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: Role;
	phoneNumber?: string;
}

export async function updateUser(
	state: AddUpdateUserFormState | undefined,
	formData: FormData,
): Promise<AddUpdateUserFormState | undefined> {
	const user = {
		id: formData.get('id') as string,
		firstName: formData.get('firstName') as string,
		lastName: formData.get('lastName') as string,
		email: formData.get('email') as string,
		role: formData.get('role') as Role,
		phoneNumber: formData.get('phoneNumber') as string,
	};
	console.log(user);

	const validatedFields = UpdateUserFormSchema.safeParse(user);
	console.log(validatedFields);

	if (!validatedFields.success)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			...user,
		};

	const { id, firstName, lastName, email, role, phoneNumber } =
		validatedFields.data;

	const existingUsers = await prisma.user.findMany({
		where: {
			id: {
				not: parseInt(id),
			},
			email,
		},
		select: {
			id: true,
		},
	});

	if (existingUsers.length)
		return {
			errors: {
				email: 'A user with that email already exist in the system.',
			},
			...user,
		};

	const updatedUser = await prisma.user.update({
		where: {
			id: parseInt(id),
		},
		data: {
			firstName,
			lastName,
			email,
			role: role === 'ADMIN' ? 'ADMIN' : 'USER',
			phoneNumber,
		},
	});

	if (!updatedUser)
		return {
			...user,
			message: 'An error occurred while updating user.',
		};

	return {
		...user,
		message: 'User has updated successfully.',
	};
}

// enum STATUS {
// 	PENDING = 'Pending',
// 	INPROGRESS = 'InProgress',
// 	RESOLVER = 'Resolved',
// }
// type UNRESOLVER_STATUS = 'Pending' | 'InProgress';

export async function deleteUser(
	id: number,
): Promise<{ errors?: string; success?: string } | undefined> {
	console.log(id, 33333);
	const existingTickets = await prisma.ticket.findFirst({
		where: {
			OR: [
				{
					assignedTo: id,
					status: 'Pending',
				},
				{
					assignedTo: id,
					status: 'InProgress',
				},
			],
		},
	});

	if (existingTickets)
		return {
			errors: 'This user has unresolved tickets.',
		};
	const deletedUser = await prisma.user.delete({
		where: {
			id,
		},
	});

	if (deletedUser)
		return {
			success: `User ${deletedUser.firstName} ${deletedUser.lastName} has deleted successfully`,
		};

	// redirect('/categories');
}
