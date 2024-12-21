'use server';
import { UpdateUserFormSchema } from '@/schemas';
import { updateUser, getUsersByEmailAndExcludeById } from '@/queries';
import { RoleType } from '@/types/interfaces';

export interface AddUpdateUserFormState {
	errors?: Record<string, string | string[]>;
	message?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: RoleType;
	phoneNumber?: string;
}

export async function actionUpdateUser(
	state: AddUpdateUserFormState | undefined,
	formData: FormData,
): Promise<AddUpdateUserFormState | undefined> {
	const user = {
		id: formData.get('id') as string,
		firstName: formData.get('firstName') as string,
		lastName: formData.get('lastName') as string,
		email: formData.get('email') as string,
		role: formData.get('role') as RoleType,
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

	const existingUsers = await getUsersByEmailAndExcludeById(
		parseInt(id),
		email,
	);

	if (existingUsers.length)
		return {
			errors: {
				email: 'A user with that email already exist in the system.',
			},
			...user,
		};

	const updatedUser = await updateUser(parseInt(id), {
		firstName,
		lastName,
		email,
		role: role === 'ADMIN' ? 'ADMIN' : 'USER',
		phoneNumber,
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
